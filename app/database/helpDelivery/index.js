const name = 'helpdelivery'

const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        icon: { type: String, required: true },
        name: { type: String, required: true },
        html: { type: String, required: true },
        order: { type: Number, default: 100000 },
    },
    { versionKey: false, timestamps: false },
)

let HelpDelivery = mongoose.model(name, schema)

module.exports = { HelpDelivery }
