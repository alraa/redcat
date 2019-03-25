const Brand = require('../../database/brand')

ENGINE.on('brand/create', (resolve, reject, brand) => {
    console.log(brand)
    new Brand(brand)
        .save()
        .then(res => resolve())
        .catch(err => {
            console.error(err)
            reject()
        })
})
ENGINE.on('brand/gets', (resolve, reject) => {
    Brand.find({})
        .then(res => resolve({ result: res }))
        .catch(err => {
            console.error(err)
            reject()
        })
})
ENGINE.on('brand/get', (resolve, reject, query) => {
    Brand.findOne(query)
        .then(res => resolve({ result: res }))
        .catch(err => {
            console.error(err)
            reject()
        })
})
ENGINE.on('brand/update', async (resolve, reject, _id, data) => {
    let brand = await Brand.findById(_id)

    Object.keys(data).map(f => {
        brand[f] = data[f]
    })

    brand
        .save()
        .then(res => resolve())
        .catch(err => {
            console.error(err)
            reject()
        })
})
ENGINE.on('brand/delete', (resolve, reject, _id) => {
    Brand.findByIdAndRemove(_id)
        .then(() => resolve())
        .catch(() => reject())
})
