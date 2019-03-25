const name = 'page'

const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        seoTitle: { type: String, default: null },
        name: { type: String, default: null },
        alt: { type: String, required: true },
        hmtl: { type: String, require: true },
        seoDescription: { type: String },
        place: { type: String, required: true, enum: ['header', 'footer', 'hidden'] },
    },
    { versionKey: false, timestamps: true },
)

module.exports = mongoose.model(name, schema)
