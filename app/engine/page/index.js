const Page = require('../../database/page')

ENGINE.on('page/create', (resolve, reject, data) => {
    new Page(data)
        .save()
        .then(res => resolve({ result: res }))
        .catch(err => resolve())
})

ENGINE.on('page/gets', (resolve, reject, data) => {
    Page.find({}, { hmtl: 0 })
        .then(res => resolve({ result: res }))
        .catch(err => reject())
})

ENGINE.on('page/get', (resolve, reject, _id) => {
    Page.findById(_id)
        .then(res => resolve({ result: res }))
        .catch(err => reject())
})

ENGINE.on('page/get-alt', (resolve, reject, alt) => {
    Page.findOne({ alt })
        .then(res => resolve({ result: res }))
        .catch(err => reject())
})

ENGINE.on('page/update', (resolve, reject, _id, update) => {
    Page.findByIdAndUpdate(_id, update, { new: true })
        .then(res => resolve(res))
        .catch(err => reject())
})

ENGINE.on('page/delete', (resolve, reject, _id) => {
    Page.findByIdAndRemove(_id)
        .then(res => resolve())
        .catch(err => reject())
})
