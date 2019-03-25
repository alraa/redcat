const name = 'helpcontact'

const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        icon: { type: String, required: true },
        name: { type: String, required: true },
        href: { type: String, default: null },
        usePopup: { type: Boolean, default: true },
        order: { type: Number, default: 100000 },
    },
    { versionKey: false, timestamps: false },
)

let HelpContact = mongoose.model(name, schema)

module.exports = { HelpContact }
