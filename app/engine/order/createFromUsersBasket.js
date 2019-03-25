const { Order, User, Item, OrderedItem } = require('../../database')
const _ = require('object-get')
const co = require('co')
const stdExpress = require('./stdExpress')
const yakassa = require('../../promises/yakassa')
const deliveryCost = require('../../countDeliveryCost')

module.exports = (resolve, reject, user_id, body) => {
    co(function*() {
        //
        // ─── VALIDATE FORM ───────────────────────────────────────────────
        //

        console.log('body:', body)

        let user = yield User.findById(user_id)
        if (!user) return resolve({ status: 400, code: 'user_not_found' })
        if (['yakassa-prepayment'].indexOf(body.paymentType) === -1)
            return resolve({ status: 400, code: 'invalid_payment_type' })
        if (['bank_card'].indexOf(body.yakassaPaymentType) === -1)
            return resolve({ status: 400, code: 'invalid_payment_method' })
        if (!body.name) return resolve({ status: 400, code: 'name_is_required' })
        if (!body.email) return resolve({ status: 400, code: 'email_is_required' })
        if (!body.phone) return resolve({ status: 400, code: 'phone_is_required' })
        if (!body.country) return resolve({ status: 400, code: 'country_is_required' })
        if (!body.province) return resolve({ status: 400, code: 'province_is_required' })
        if (!body.city) return resolve({ status: 400, code: 'city_is_required' })
        if (!body.address) return resolve({ status: 400, code: 'address_is_required' })
        if (!body.basket) return resolve({ status: 400, code: 'empty_basket' })

        let basket = body.basket

        //
        // ─── CREATE ORDER ────────────────────────────────────────────────
        //

        let order = new Order({
            user_id: user._id,
            paymentType: body.paymentType,
            yakassaPaymentType: body.yakassaPaymentType,
            deliveryType: body.deliveryType,
            paidFromBalance: 0,

            // NOTE : should be updated just now
            onCaptureSumPrice: 0,
            onCaptureSumWeight: 0,
            deliveryPrice: 0,

            // NOTE : required fields from front form
            name: body.name,
            email: body.email,
            phone: body.phone,
            country: body.country,
            province: body.province,
            city: body.city,
            address: body.address,

            // NOTE : not required fields from front form
            growthWeight: body.growthWeight,
            footSize: body.footSize,
        })

        //
        // ─── FIND AND VALIDATE ALL ITEMS IN BASKET ───────────────────────
        //

        let item_ids = []
        basket.map(({ item_id }) => (item_id ? item_ids.push(item_id) : null))

        let items = yield Item.find({ _id: { $in: item_ids }, published: true }, { qualities: 1, weight: 1 })

        let failedItems = {}

        let orderedItems = []

        basket.map(({ item_id, quality, count, size }) => {
            // validate is item exists and is correct size and quality

            let item = items.find(({ _id }) => _id == item_id)

            if (!item) {
                failedItems[item_id] = 'not_exists'
                return
            }

            if (!_(item, `qualities[${quality}].site`)) {
                failedItems[item_id] = 'quality_failed'
                return
            }

            if (_(item, 'sizes.length') && !item.sizes.includes(size)) {
                failedItems[item_id] = 'size_failed'
                return
            }

            for (let i = 0; i < count; i++) {
                order.onCaptureSumPrice += +item.qualities[quality].site
                order.onCaptureSumWeight += item.weight
                orderedItems.push(
                    new OrderedItem({
                        order_id: order._id,
                        item_id: item._id,
                        selectedQuality: quality,
                        selectedSize: size,
                        onCaptureQualityPrice: +item.qualities[quality].site,
                    }),
                )
            }
        })

        if (Object.keys(failedItems).length > 0) {
            return resolve({
                status: 400,
                code: 'items_validation_failed',
                result: { failedItems },
            })
        }

        //
        // ─── COUNT DELIVERY PRICE ────────────────────────────────────────
        //

        console.log('counting for delivery:', order.deliveryType)

        switch (order.deliveryType) {
            case 'stdExpress_EXPRESS':
                order.deliveryPrice = deliveryCost.std(order.country, 'express', order.onCaptureSumWeight / 1000)
                break
            case 'stdExpress_STANDART':
                order.deliveryPrice = deliveryCost.std(order.country, 'standart', order.onCaptureSumWeight / 1000)
                break
            case 'ePacket':
                order.deliveryPrice = deliveryCost.ePacket(order.onCaptureSumWeight / 1000)
                break
            case 'ems':
                order.deliveryPrice = deliveryCost.ems(order.onCaptureSumWeight / 1000)
                break
            case 'dhl':
                order.deliveryPrice = deliveryCost.dhl(order.onCaptureSumWeight / 1000)
                break
            case 'postNl':
                order.deliveryPrice = deliveryCost.postNl(order.onCaptureSumWeight / 1000)
                break
            default:
                throw new Error(`deliveryType got case 'default' with value '${order.deliveryType}'`)
        }

        if (!order.deliveryPrice) return resolve({ status: 400, code: 'delivery_type_error' })

        order.onCaptureSumPrice += order.deliveryPrice

        console.log('calculated delivery price:', order.deliveryPrice)

        console.log({ order })

        //
        // ─── IF OK - SAVE ITEMS ─────────────────────────────────────────────────────────
        //

        console.log('saving items')

        yield Promise.all(orderedItems.map(item => item.save()))

        console.log('items saved')

        //
        // ─── CREATE OWN NUMBER OF ORDER ──────────────────────────────────
        //

        console.log('create order number')

        yield order.setCode()

        console.log('order number created: ' + order.code)

        //
        // ─── CREATING TRACK ─────────────────────────────────────────────────────────────
        //

        if (['stdExpress_EXPRESS', 'stdExpress_STANDART'].includes(order.deliveryType)) {
            console.log('creating track for std express for country ' + order.country)

            let newtrackNumber = yield stdExpress.createTrack({
                country: order.country,
                province: order.province,
                city: order.city,
                address: order.address,
                name: order.name,
                phone: order.phone,
                goodsName: 'Red Cat Store goods',
                goodsPrice: order.fullPrice,
                fast: order.deliveryType === 'stdExpress_EXPRESS' ? true : false,
                localOrder: order.code,
                weight: order.onCaptureSumWeight,
            })

            if (newtrackNumber.status == 'false') {
                switch (newtrackNumber.reason) {
                    case '5':
                        return resolve({ status: 400, code: 'country_failed' })
                    case '6':
                        return resolve({ status: 400, code: 'province_failed' })
                    case '7':
                        return resolve({ status: 400, code: 'city_failed' })
                    case '8':
                        return resolve({ status: 400, code: 'address_failed' })
                    case '9':
                        return resolve({ status: 400, code: 'name_failed' })
                    case '10':
                        return resolve({ status: 400, code: 'phone_failed' })
                    default:
                        return resolve({ status: 400, code: 'delivery_failed' })
                }
            }
            order.trackNumber = newtrackNumber['std order'] // названия переменных 80 уровня
        }

        //
        // CREATING PAYMENT
        //

        let createYakassa = {
            value: order.onCaptureSumPrice,
            description: 'Заказ на сайте Red Cat Store',
            type: body.yakassaPaymentType,
            phone: body.phone || null,
        }

        console.log({ createYakassa })

        let yakassaPayment = yield yakassa.create(createYakassa)

        console.log({ yakassaPayment })

        order.yakassaPaymentObject = yakassaPayment.body
        order.yakassaPaymentIdempotence = yakassaPayment.idemp

        let orderSaved = yield order.save()

        console.log('saved:', orderSaved)

        resolve({ result: { confirmation_url: orderSaved.yakassaPaymentObject.confirmation.confirmation_url } })
    }).catch(err => {
        console.error(err)
        reject({ status: 500 })
    })
}
