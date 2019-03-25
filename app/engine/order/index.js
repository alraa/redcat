const { Order, OrderedItem, User } = require('../../database')
const mongoose = require('mongoose')
const { sleep } = require('../../cheatsheet')
const co = require('co')
const yakassa = require('../../promises/yakassa')
const deliveryCost = require('../../countDeliveryCost')
const Decimal = require('decimal.js')

ENGINE.on('order/create-from-users-basket', require('./createFromUsersBasket'))

ENGINE.on('order/gets', (resolve, reject, opts = {}) => {
    co(function*() {
        let orders = yield Order.findWithQuery(opts)
        let total = yield Order.countDocuments()

        resolve({ result: orders, total })
    }).catch(err => {
        console.error(err)
        reject()
    })
})

ENGINE.on('order/gets-with-items', (resolve, reject, opts = {}) => {
    co(function*() {
        let orders = yield Order.findWithQuery(opts)
        let total = yield Order.countDocuments()

        let ids = orders.map(order => order._id)

        let orderedItems = yield OrderedItem.find({ order_id: { $in: ids } })

        resolve({ result: { orders, total, orderedItems } })
    }).catch(err => {
        reject()
    })
})

ENGINE.on('order/get', (resolve, reject, query) => {
    Order.findOne(query)
        .then(res => {
            resolve({ result: res })
        })
        .catch(err => {
            console.error(err)
            reject()
        })
})

ENGINE.on('order/get-with-items', (resolve, reject, query) => {
    co(function*() {
        let order = yield Order.findOne(query)

        let items = yield OrderedItem.find({ order_id: order._id })

        resolve({ result: { order, items } })
    }).catch(err => {
        console.error(err)
        reject()
    })
})

ENGINE.on('order/delete', (resolve, reject, _id) => {
    Order.findByIdAndRemove(_id)
        .then(res => resolve())
        .catch(err => {
            console.error(err)
            reject()
        })
})

ENGINE.on('order/get-ordered-items-by-order', (resolve, reject, { order_id }) => {
    co(function*() {
        let query = { order_id: { $in: Array.isArray(order_id) ? order_id : [order_id] } }

        let orderedItems = yield OrderedItem.find(query)

        resolve({ result: { orderedItems } })
    }).catch(err => {
        reject()
    })
})

ENGINE.on('order/set-status-to-item', (resolve, reject, order_id, item_id, status) => {
    co(function*() {
        let statuses = ['new', 'process', 'agreed', 'paid', 'out_of_stock', 'sent', 'canceled']

        if (!statuses.includes(status)) return reject({ status: 400 })

        let item = yield OrderedItem.findById(item_id)
        let order = yield Order.findById(item.order_id)

        console.log('item to trigger change order status:', item)

        if (item.isFinalStatus) return reject({ status: 400 })

        item.status = status

        if (item.status === 'sent') item.isFinalStatus = true

        yield item.save()
        yield order.updateStatus()
        yield order.save()

        resolve()
    }).catch(err => {
        console.error(err)
        reject()
    })
})

ENGINE.on('order/confirm-out-of-stock', (resolve, reject, order_id, item_id) => {
    co(function*() {
        console.log(`Confirm out of stock '${item_id}'`)

        let item = yield OrderedItem.findById(item_id)
        console.log({ item })
        let order = yield Order.findById(item.order_id)
        let user = yield User.findById(order.user_id)

        if (!user) {
            console.error(`user with id '${order.user_id}' not exists`)
            reject({ status: 500 })
        }

        if (item.status !== 'out_of_stock') {
            console.error(`Cant confirm out_of_stock if item is not out_of_stock`)
            return reject({ status: 400 })
        }

        if (item.isFinalStatus) {
            console.error(`Item has final satus`)
            return reject({ status: 400 })
        }

        item.isFinalStatus = true

        user.balance = new Decimal(user.balance).plus(item.onCaptureQualityPrice).toNumber()

        yield order.updateStatus()

        yield item.save()
        yield order.save()
        yield user.save()

        resolve()
    }).catch(err => {
        console.error(err)
        reject()
    })
})

// console.log(new Decimal('0.1').plus('0.2').toNumber())

ENGINE.on('order/update', (resolve, reject, _id, update) => {
    delete update._id
    delete update.createdAt
    delete update.updatedAt

    Order.findByIdAndUpdate(_id, update)
        .then(res => resolve())
        .catch(err => {
            console.error(err)
            reject()
        })
})

ENGINE.on('ordered-item/update', (id, update) => {
    delete update.createdAt
    delete update.updatedAt

    OrderedItem.findByIdAndUpdate(id, update)
        .then(res => resolve())
        .catch(err => {
            console.error(err)
            reject()
        })
})

ENGINE.on('count-delivery-price', (resolve, reject, { type, weight, country }) => {
    let price = null

    console.log({ type, weight, country })

    switch (type.toLowerCase()) {
        case 'stdExpress_EXPRESS'.toLowerCase():
            price = deliveryCost.std(country, 'express', weight / 1000)
            break
        case 'stdExpress_STANDART'.toLowerCase():
            price = deliveryCost.std(country, 'standart', weight / 1000)
            break
        case 'ePacket'.toLowerCase():
            price = deliveryCost.ePacket(weight / 1000)
            break
        case 'ems'.toLowerCase():
            price = deliveryCost.ems(weight / 1000)
            break
        case 'dhl'.toLowerCase():
            price = deliveryCost.dhl(weight / 1000)
            break
        case 'postNl'.toLowerCase():
            price = deliveryCost.postNl(weight / 1000)
            break
        default:
            throw new Error("deliveryType got case 'default'")
    }

    resolve({ result: { price } })
})

//
// ────────────────────────────────────────────────────────────────────────────────────────
//   :::::: C H E C K   O R D E R   P A Y M E N T : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────
//

function recheck() {
    Order.find({ paid: false, lastStatus: null, paymentType: 'yakassa-prepayment' })
        .then(orders => {
            console.log('found ' + orders.length + ' orders waiting for payment')
            orders.map(order => {
                // console.log(order.yakassaPaymentObject ? 'check for payment ' + order.yakassaPaymentObject.id : 'wtf?')
                // console.log({ order })

                yakassa
                    .get(order.yakassaPaymentObject.id)
                    .then(async payment => {
                        console.log('paymant ' + payment.id + ' has status ' + payment.status)

                        // console.log({ payment })

                        switch (payment.status) {
                            /** if order canceled */
                            case 'canceled':
                                console.log('order ' + order._id + ' payment canceled')
                                order.pushStatus('canceled')
                                order.yakassaPaymentObject = payment
                                await order.save()
                                break

                            /** if order paid */
                            case 'succeeded':
                                order.pushStatus('new')
                                order.yakassaPaymentObject = payment
                                order.paid = true
                                await order.save()
                                console.log('order saved with status succeeded')
                                break
                            // case 'waiting_for_capture':
                            //   console.log('order ' + order._id + ' payment waiting_for_capture')
                            //   yakassa.action(order.yakassaPaymentObject, 'capture')
                            //     .then(captured => {
                            //       console.log('order ' + order._id + ' payment captured')
                            //       if (status === 'succeeded') {
                            //         order.pushStatus('new')
                            //         order.yakassaPaymentObject = captured
                            //         order.paid = true
                            //         order.save()
                            //       }
                            //     })
                            //     .catch(err => {
                            //       console.error(err)
                            //     })
                            //   break;

                            /** ??? */
                            default:
                                break
                        }
                    })
                    .catch(err => {
                        console.log('yakassa error')
                        console.error(err)
                    })
            })
        })
        .catch(err => {
            console.error(err)
            // TODO: handle error
        })

    setTimeout(recheck, 12596)
}

mongoose.connection.once('open', () => setTimeout(() => recheck(), 2000))
