const config = require('../../config')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(config.mongoDb.link, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
})

mongoose.connection.on('error', err => {
    console.error('Connect to database error')
    console.error(err)
})
mongoose.connection.once('open', () => {
    console.log('MongoDB connected!', config.mongoDb.link)
})

DATABASE = new Promising()

module.exports = {
    ...require('./user'),
    Category: require('./category'),
    Subcategory: require('./subcategory'),
    Color: require('./color'),
    Brand: require('./brand'),
    Item: require('./item'),
    Order: require('./order'),
    Page: require('./page'),
    OrderedItem: require('./orderedItem'),
    ...require('./moneyBackRequest'),
    ...require('./helpTop'),
    ...require('./helpDelivery'),
    ...require('./helpVideo'),
    ...require('./helpContact'),
    ...require('./tradingAction'),
}
