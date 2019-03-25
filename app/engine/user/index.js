const { User } = require('../../database')
const co = require('co')

ENGINE.on('user/login', require('./login'))
ENGINE.on('user/registration', require('./registration'))
ENGINE.on('user/confirm-registration', require('./confirmRegistration'))

ENGINE.on('user/reset-password-request', require('./resetPasswordRequest'))
ENGINE.on('user/reset-password-confirm', require('./resetPasswordConfirm'))
ENGINE.on('user/reset-password-with-old', require('./resetPasswordWithOld'))
ENGINE.on('user/set-new-password', require('./setNewPassword'))

ENGINE.on('user/manually-create', require('./manuallyCreateUser'))

ENGINE.on('user/gets', (resolve, reject, queryparams = {}) => {
    let query = {}

    if (queryparams.nameReg) {
        let arr = queryparams.nameReg.split(' ')
        query.$and = []
        arr.map(name => {
            let reg = { $regex: name, $options: 'i' }
            query.$and.push({
                $or: [{ 'personMeta.name': reg }, { 'personMeta.surname': reg }, { 'personMeta.patronymic': reg }],
            })
        })
    }

    if (queryparams.hasOwnProperty('admin')) {
        query.$or = [
            { 'accountMeta.admin': true },
            { 'accountMeta.providers': true },
            { 'accountMeta.offers': true },
            { 'accountMeta.clients': true },
            { 'accountMeta.items': true },
        ]
    }

    User.find(query, { hash: 0, salt: 0 })
        .skip(+queryparams.skip || 0)
        .limit(+queryparams.limit || 50)
        .sort({ [queryparams.sortBy || '_id']: +queryparams.sortWith || -1 })
        .exec()
        .then(async res => {
            resolve({ result: res, total: await User.countDocuments(query) })
        })
        .catch(err => {
            console.error(err)
            reject()
        })
})

ENGINE.on('user/get', (resolve, reject, _id) => {
    User.findById(_id, { hash: 0, salt: 0 })
        .then(res => resolve({ result: res }))
        .catch(err => {
            console.error(err)
            reject()
        })
})

ENGINE.on('user/update-safe', (resolve, reject, user_id, data) => {
    let fields = ['personMeta', 'socials', 'wishList']

    let update = {}
    fields.map(f => {
        if (data.hasOwnProperty(f)) {
            update[f] = data[f]
        }
    })

    User.findById(user_id)
        .then(user => user.update({ $set: update }, { new: true }))
        .then(user => resolve())
        .catch(err => {
            console.error(err)
            reject(err)
        })
})

ENGINE.on('user/update-for-admin', (resolve, reject, user_id, data) => {
    co(function*() {
        let { email, name, accountMeta } = data

        let user = yield User.findById(user_id)

        user.email = email
        user.accountMeta = accountMeta
        user.personMeta.name = name

        yield user.save()

        resolve()
    }).catch(err => {
        console.error(err)
        reject()
    })
})

ENGINE.on('user/delete', (resolve, reject, _id) => {
    User.findByIdAndRemove(_id)
        .then(res => resolve())
        .catch(err => {
            console.error(err)
            reject()
        })
})

// ENGINE.on('user/update', async (resolve, reject, _id, update, safe = false) => {
// 	const user = await User.findById(_id)

// 	user.append(update, safe)

// 	user.save()
// 		.then(res => resolve())
// 		.catch(err => {
// 			console.error(err)
// 			reject()
// 		})
// })

// ENGINE.on('user/basket/get', (resolve, reject, _id) => {
// 	User.findById(_id, { basket: 1 }).lean().exec()
// 		.then(async ({ basket }) => {
// 			let item_ids = []
// 			basket.map(({ item_id }) => item_ids.push(item_id))

// 			let items = await Item.find({ _id: { $in: item_ids } }, { qualities: 1, name: 1 })

// 			console.log({ items })

// 			for (let i = 0; i < basket.length; i++) {
// 				let fullItem = items.find(({ _id }) => _id == basket[i].item_id)

// 				if (fullItem) {
// 					basket[i].price = fullItem.qualities[basket[i].quality].site
// 					basket[i].image = fullItem.qualities[basket[i].quality].images.length
// 						? fullItem.qualities[basket[i].quality].images[0]
// 						: null
// 					basket[i].name = fullItem.name
// 				}
// 			}

// 			resolve({ result: basket })
// 		})
// 		.catch(err => {
// 			console.error(err)
// 			reject()
// 		})
// })

// ENGINE.on('user/basket/add-item', (resolve, reject, user_id, { item_id, quality, size, count }) => {
// 	User.findById(user_id, { hash: 0, salt: 0 })
// 		.then(async user => {
// 			let exists = user.basket.findIndex(
// 				item => item.item_id == item_id && item.quality == quality && item.size == size
// 			)

// 			if (exists === -1) {
// 				// push

// 				let newItem = { item_id, quality, size, count: Math.max(count, 1), image: null, name: null }

// 				user.basket.push(newItem)
// 			} else {
// 				// update

// 				user.basket[exists].count += Math.max(count, 1)
// 			}

// 			user.save((err, res) => {
// 				if (err) {
// 					return reject(err)
// 				}
// 				resolve({ status: 200, message: 'Успешно!', result: res.basket })
// 			})
// 		})
// 		.catch(err => {
// 			console.error(err)
// 			reject()
// 		})
// })

// ENGINE.on('user/personMeta/update', (resolve, reject, user_id, data) => {
// 	User.findById(user_id)
// 		.then(user => user.update({ $set: { personMeta: data } }, { new: true }))
// 		.then(user => resolve())
// 		.catch(err => {
// 			console.error(err)
// 			reject(err)
// 		})
// })

// ENGINE.on('user/socials/update', (resolve, reject, user_id, data) => {
// 	User.findById(user_id)
// 		.then(user => user.update({ $set: { socials: data } }, { new: true }))
// 		.then(user => resolve())
// 		.catch(err => {
// 			console.error(err)
// 			reject(err)
// 		})
// })

// ENGINE.on('user/wishList/update', (resolve, reject, user_id, data) => {
// 	User.findById(user_id)
// 		.then(user => user.update({ $set: { wishList: data } }, { new: true }))
// 		.then(user => resolve())
// 		.catch(err => {
// 			console.error(err)
// 			reject(err)
// 		})
// })

// ENGINE.on('user/basket/delete-item', (resolve, reject, user_id, item_id) => {
// 	User.findById(user_id, { hash: 0, salt: 0 })
// 		.then(user => {
// 			user.basket = user.basket.filter(item => item._id != item_id)

// 			user.save((err, res) => {
// 				if (err) {
// 					return reject(err)
// 				}
// 				resolve({ status: 200, message: 'Успешно!', result: res.basket })
// 			})
// 		})
// 		.catch(err => {
// 			console.error(err)
// 			reject()
// 		})
// })
