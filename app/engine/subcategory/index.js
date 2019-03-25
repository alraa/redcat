const Subcategory = require('../../database/subcategory')

ENGINE.on('subcategory/create', (resolve, reject, subcat) => {
    new Subcategory(subcat)
        .save()
        .then(res => resolve())
        .catch(err => {
            console.error(err)
            reject()
        })
})

ENGINE.on('subcategory/gets', (resolve, reject) => {
    Subcategory.find({})
        .then(res => resolve({ status: 200, result: res }))
        .catch(err => {
            console.error(err)
            reject()
        })
})

ENGINE.on('subcategory/get', (resolve, reject, query) => {
    Subcategory.findOne(query)
        .then(res => {
            resolve({ status: 200, result: res })
        })
        .catch(err => {
            console.error(err)
            reject()
        })
})

ENGINE.on('subcategory/update', async (resolve, reject, _id, data) => {
    let subcat = await Subcategory.findById(_id)

    Object.keys(data).map(f => {
        subcat[f] = data[f]
    })

    subcat
        .save()
        .then(res => resolve())
        .catch(err => {
            console.error(err)
            reject()
        })
})

ENGINE.on('subcategory/delete', (resolve, reject, _id) => {
    Subcategory.findByIdAndRemove(_id)
        .then(() => resolve())
        .catch(() => reject())
})
