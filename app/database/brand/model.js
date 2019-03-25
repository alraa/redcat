const name = 'brand'

const mongoose = require('mongoose')
const { toUrlString } = require('../../cheatsheet')

const schema = mongoose.Schema(
    {
        name: { type: String, required: true, unique: true, trim: true },
        alt: { type: String, required: true, unique: true, trim: true },
    },
    { versionKey: false },
)
schema.pre('validate', function() {
    this.alt = toUrlString(this.name)
})

module.exports = mongoose.model(name, schema)
