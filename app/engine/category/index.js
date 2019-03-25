const Category = require('../../database/category')

ENGINE.on('category/create', (resolve, reject, category) => {
    new Category(category)
        .save()
        .then(res => resolve())
        .catch(err => {
            console.error(err)
            reject()
        })
})

ENGINE.on('category/gets', (resolve, reject) => {
    Category.find({})
        .then(res => resolve({ result: res }))
        .catch(err => {
            console.error(err)
            reject()
        })
})

ENGINE.on('category/get', (resolve, reject, query) => {
    Category.findOne(query)
        .then(res => {
            resolve({ result: res })
        })
        .catch(err => {
            console.error(err)
            reject()
        })
})

ENGINE.on('category/update', async (resolve, reject, _id, category) => {
    let cat = Category.findById(_id)

    Object.keys(category).map(f => {
        cat[f] = category[f]
    })

    cat.save()
        .then(res => resolve())
        .catch(err => {
            console.error(err)
            reject()
        })
})

ENGINE.on('category/delete', (resolve, reject, _id) => {
    Category.findByIdAndRemove(_id)
        .then(() => resolve())
        .catch(() => reject())
})
