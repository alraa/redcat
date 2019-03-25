const name = 'category'

const mongoose = require('mongoose')
const { toUrlString } = require('../../cheatsheet')

const schema = mongoose.Schema(
    {
        name: { type: String, required: true, unique: true, trim: true },
        alt: { type: String, required: true, unique: true, trim: true },
    },
    { versionKey: false },
)
schema.pre('validate', function(next) {
    this.alt = toUrlString(this.name)
    next()
})

const Model = mongoose.model(name, schema)

module.exports = Model

mongoose.connection.once('open', () => {
    Model.countDocuments()
        .then(count => {
            if (count === 0) {
                Model.insertMany([
                    { name: 'Одежда', alt: 'dress' },
                    { name: 'Обувь', alt: 'shoes' },
                    { name: 'Аксессуары', alt: 'accessories' },
                ])
            }
        })
        .catch(err => {
            console.error(err)
            process.exit(err.code)
        })
})
