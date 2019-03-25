const { Item, Category, Subcategory, Brand, Color } = require('../../database')
const _ = require('object-get')
const co = require('co')

ENGINE.on('item/create', (resolve, reject, item) => {
    co(function*() {
        const newItem = new Item(item)

        if (!_(newItem, 'qualities.middle.site')) {
            newItem.qualities.middle = null
        }
        if (!_(newItem, 'qualities.high.site')) {
            newItem.qualities.high = null
        }
        if (!_(newItem, 'qualities.premium.site')) {
            newItem.qualities.premium = null
        }

        if (newItem.published) {
            if (yield Item.findOne({ code: newItem.code }, { _id: 1 })) {
                return resolve({ code: 'duplicate_code' })
            }

            // if (yield Item.findOne({ name: newItem.name }, { _id: 1 })) {
            // 	return resolve({ code: 'duplicate_name' })
            // }

            // while (yield Item.findOne({ alt: newItem.alt }, { _id: 1 })) {

            // }

            if (yield Item.findOne({ alt: newItem.alt }, { _id: 1 })) {
                return resolve({ code: 'duplicate_alt' })
            }
        }

        yield newItem.save()

        resolve()
    }).catch(err => {
        console.error(err)
        reject(err)
    })
})

ENGINE.on('item/get', (resolve, reject, query, isAdmin = false) => {
    co(function*() {
        let item = yield Item.findOne(query)
            .lean()
            .exec()

        const defaultQuality = {
            site: null,
            self: null,
            images: [],
            video: '',
        }

        if (item.qualities.middle === null) {
            item.qualities.middle = defaultQuality
        }
        if (item.qualities.high === null) {
            item.qualities.high = defaultQuality
        }
        if (item.qualities.premium === null) {
            item.qualities.premium = defaultQuality
        }
        if (item.qualities.noQuality === null) {
            item.qualities.noQuality = defaultQuality
        }

        resolve({ result: item })
    }).catch(err => {
        console.error(err)
        reject(err)
    })
})

// ПАГИНАЦИЯ

ENGINE.on('item/gets', (resolve, reject, opts = {}, projection = {}) => {
    co(function*() {
        let query = {
            $or: [],
            $and: [],
        }

        if (opts.hasOwnProperty('_id')) {
            let ids = Array.isArray(opts._id) ? opts._id : [opts._id]

            query._id = { $in: ids.filter(_id => _id) }
        }

        if (opts.name) {
            opts.name.split(' ').map(name => {
                query.$and.push({ name: { $regex: name, $options: 'i' } })
            })
        }

        //
        ;['category_id', 'subcategory_id', 'sex'].map(f => {
            if (opts.hasOwnProperty(f))
                query.$and.push({
                    [f]: { $in: Array.isArray(opts[f]) ? opts[f] : [opts[f]] },
                })
        })

        //
        ;['brand_ids', 'color_ids'].map(f => {
            if (opts.hasOwnProperty(f)) {
                if (Array.isArray(opts[f])) {
                    let $or = []

                    opts[f].map(id => $or.push({ [f]: id }))

                    query.$and.push({ $or })
                } else {
                    query[f] = opts[f]
                }
            }
        })

        //
        ;['published'].map(f => {
            if (opts.hasOwnProperty(f)) {
                query[f] = opts[f]
            }
        })

        //
        ;['winter', 'spring', 'summer', 'autumn'].map(season => {
            if (opts[season] === 'true' || opts[season] === 'false') {
                query.$and.push({
                    ['seasons.' + season]: opts[season] === 'true',
                })
            }
        })

        if (opts.minPrice || opts.maxPrice) {
            let site = {
                $gte: +opts.minPrice || 0,
                $lte: +opts.maxPrice || Number.MAX_SAFE_INTEGER,
            }

            let $or = [
                {
                    'qualities.middle.site': site,
                },
                {
                    'qualities.high.site': site,
                },
                {
                    'qualities.premium.site': site,
                },
            ]

            query.$and.push({ $or })
        }

        if (query.$and.length === 0) {
            delete query.$and
        }
        if (query.$or.length === 0) {
            delete query.$or
        }

        Item.find(query, projection)
            .skip(+opts.skip || 0)
            .limit(Math.min(+opts.limit || 25, 25))
            .sort({ [opts.sortBy || '_id']: opts.sortBack === 'true' ? 1 : -1 })
            .lean()
            .exec()
            .then(items => {
                // let category_ids = []
                // let subcategory_ids = []
                // let brand_ids = []
                // let color_ids = []

                // items.map(item => {
                // 	if (item.category_id) category_ids.push(item.category_id)
                // 	if (item.subcategory_id) subcategory_ids.push(item.subcategory_id)
                // 	if (item.brand_id) brand_ids.push(item.brand_id)
                // 	if (item.color_id) color_ids.push(item.color_id)
                // })

                // console.log({ category_ids })
                // console.log({ subcategory_ids })
                // console.log({ brand_ids })
                // console.log({ color_ids })

                // let promises = [
                // 	Category.find({ _id: { $in: category_ids } }),
                // 	Subcategory.find({ _id: { $in: subcategory_ids } }),
                // 	Brand.find({ _id: { $in: brand_ids } }),
                // 	Color.find({ _id: { $in: color_ids } }),
                // 	Item.countDocuments(query)
                // ]

                // NOTE: now getting all items from collections
                let promises = [
                    Category.find({}),
                    Subcategory.find({}),
                    Brand.find({}),
                    Color.find({}),
                    Item.countDocuments(query),
                ]

                Promise.all(promises).then(([cats, subcats, brands, colors, total]) => {
                    for (let i = 0; i < items.length; i++) {
                        items[i].category = cats.find(cat => cat._id == items[i].category_id)
                        items[i].subcategory = subcats.find(subcat => subcat._id == items[i].subcategory_id)
                        items[i].brand = brands.find(b => b._id == items[i].brand_id)
                        items[i].color = colors.find(c => c._id == items[i].color_id)
                    }

                    resolve({
                        result: { items, cats, subcats, brands, colors, total },
                    })
                })
            })
    }).catch(err => {
        console.error(err)
        reject()
    })

    return 0

    let query = {
        $and: [],
        $or: [],
    }

    // http://localhost/api/public/restful/item?
    // color=&limit=12&maxPrice=321&minPrice=123&sex=male&skip=0

    if (opts.name) {
        opts.name.split(' ').map(name => {
            query.$and.push({ name: { $regex: name, $options: 'i' } })
        })
    }

    const mayBeMany = ['category_id', 'subcategory_id', /* 'brand_id', 'color_id', */ 'sex']
    const oneAndOnly = ['published']
    const seasons = ['winter', 'spring', 'summer', 'autumn']

    mayBeMany.map(f => {
        if (opts.hasOwnProperty(f)) {
            query.$and.push({
                [f]: { $in: Array.isArray(opts[f]) ? opts[f] : [opts[f]] },
            })
        }
    })

    oneAndOnly.map(f => {
        if (opts.hasOwnProperty(f)) {
            query[f] = opts[f]
        }
    })

    seasons.map(season => {
        if (opts[season] === 'true' || opts[season] === 'false') {
            query.$and.push({
                ['seasons.' + season]: opts[season] === 'true',
            })
        }
    })

    if (opts.minPrice || opts.maxPrice) {
        let site = {
            $gte: +opts.minPrice || 0,
            $lte: +opts.maxPrice || Number.MAX_SAFE_INTEGER,
        }

        let $or = [
            {
                'qualities.middle.site': site,
            },
            {
                'qualities.high.site': site,
            },
            {
                'qualities.premium.site': site,
            },
        ]

        query.$and.push({ $or })
    }

    if (query.$and.length === 0) {
        delete query.$and
    }
    if (query.$or.length === 0) {
        delete query.$or
    }

    Item.find(query, projection)
        .skip(+opts.skip || 0)
        .limit(Math.min(+opts.limit || 25, 25))
        .sort({ [opts.sortBy || '_id']: opts.sortBack === 'true' ? 1 : -1 })
        .lean()
        .exec()
        .then(items => {
            // let category_ids = []
            // let subcategory_ids = []
            // let brand_ids = []
            // let color_ids = []

            // items.map(item => {
            // 	if (item.category_id) category_ids.push(item.category_id)
            // 	if (item.subcategory_id) subcategory_ids.push(item.subcategory_id)
            // 	if (item.brand_id) brand_ids.push(item.brand_id)
            // 	if (item.color_id) color_ids.push(item.color_id)
            // })

            // console.log({ category_ids })
            // console.log({ subcategory_ids })
            // console.log({ brand_ids })
            // console.log({ color_ids })

            // let promises = [
            // 	Category.find({ _id: { $in: category_ids } }),
            // 	Subcategory.find({ _id: { $in: subcategory_ids } }),
            // 	Brand.find({ _id: { $in: brand_ids } }),
            // 	Color.find({ _id: { $in: color_ids } }),
            // 	Item.countDocuments(query)
            // ]

            // NOTE: now getting all items from collections
            let promises = [
                Category.find({}),
                Subcategory.find({}),
                Brand.find({}),
                Color.find({}),
                Item.countDocuments(query),
            ]

            Promise.all(promises).then(([cats, subcats, brands, colors, total]) => {
                for (let i = 0; i < items.length; i++) {
                    items[i].category = cats.find(cat => cat._id == items[i].category_id)
                    items[i].subcategory = subcats.find(subcat => subcat._id == items[i].subcategory_id)
                    items[i].brand = brands.find(b => b._id == items[i].brand_id)
                    items[i].color = colors.find(c => c._id == items[i].color_id)
                }

                resolve({
                    result: { items, cats, subcats, brands, colors, total },
                })
            })
        })
        .catch(err => {
            console.error(err)
            reject(err)
        })
})

ENGINE.on('item/update', async (resolve, reject, _id, update) => {
    co(function*() {
        let item = yield Item.findById(_id)
            .lean()
            .exec()

        let newItem = { ...item, ...update }

        delete newItem._id
        delete newItem.createdAt
        delete newItem.updatedAt

        if (!_(newItem, 'qualities.middle.site')) {
            newItem.qualities.middle = null
        }
        if (!_(newItem, 'qualities.high.site')) {
            newItem.qualities.high = null
        }
        if (!_(newItem, 'qualities.premium.site')) {
            newItem.qualities.premium = null
        }

        if (newItem.published) {
            if (yield Item.findOne({ code: newItem.code, _id: { $ne: _id } }, { _id: 1 })) {
                return resolve({ code: 'duplicate_code' })
            }

            if (yield Item.findOne({ alt: newItem.alt, _id: { $ne: _id } }, { _id: 1 })) {
                return resolve({ code: 'duplicate_alt' })
            }
        }

        yield Item.findByIdAndUpdate(_id, newItem)

        resolve()
    })
})

ENGINE.on('item/action', (resolve, reject, _id, action) => {
    switch (action) {
        case 'show':
            Item.updateOne({ _id }, { $set: { published: true } })
                .then(res => resolve())
                .catch(err => {
                    console.error(err)
                    reject(err)
                })
            break
        case 'hide':
            Item.updateOne({ _id }, { $set: { published: false } })
                .then(res => resolve())
                .catch(err => {
                    console.error(err)
                    reject(err)
                })
            break
        default:
            next()
    }
})

ENGINE.on('item/delete', (resolve, reject, _id) => {
    Item.findByIdAndRemove(_id)
        .then(res => resolve())
        .catch(err => {
            console.error(err)
            reject(err)
        })
})

ENGINE.on('item/action-for-many', (resolve, reject, action, item_ids) => {
    let query = { _id: { $in: item_ids } }

    switch (action) {
        case 'show':
            Item.updateMany(query, { $set: { published: true } })
                .then(res => resolve())
                .catch(err => {
                    console.error(err)
                    reject(err)
                })
            break
        case 'hide':
            Item.updateMany(query, { $set: { published: false } })
                .then(res => resolve())
                .catch(err => {
                    console.error(err)
                    reject(err)
                })
            break
        case 'remove':
            Item.deleteMany(query)
                .then(res => resolve())
                .catch(err => {
                    console.error(err)
                    reject(err)
                })
            break
        default:
            reject({ status: 404, message: 'no such action' })
    }
})

ENGINE.on('item/get-next-code', (resolve, reject) => {
    co(function*() {
        let lastCodedItem = yield Item.findOne({}, { code: 1, _id: 0 })
            .sort({ code: -1 })
            .lean()
            .exec()

        let nextCode = +lastCodedItem.code + 1

        resolve({ result: { code: nextCode } })
    }).catch(err => reject())
})

// let a = {
// 	b: {}
// }

// console.log(_(a, 'b.c.d[8]'))
