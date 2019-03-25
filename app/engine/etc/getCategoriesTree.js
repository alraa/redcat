const Category = require('../../database/category')
const Subcategory = require('../../database/subcategory')

module.exports = (resolve, reject) => {
    let promises = []

    promises.push(
        Category.find({})
            .lean()
            .exec(),
    )
    promises.push(
        Subcategory.find({})
            .lean()
            .exec(),
    )

    Promise.all(promises)
        .then(results => {
            let cats = results[0]
            let subcats = results[1]

            cats.map((cat, index) => {
                cats[index].subcategories = subcats.filter(subcat => subcat.category_id == cat._id)
            })

            resolve({ status: 200, result: cats })
        })
        .catch(err => {
            console.error(err)
            reject({ status: 500 })
        })
}
