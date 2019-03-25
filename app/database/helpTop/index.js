const name = 'helptop'

const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        name: { type: String, required: true },
        icon: { type: String, required: true },
        boxes: {
            type: [
                {
                    name: { type: String, required: true },
                    short: { type: String, required: true },
                    html: { type: String, required: true },
                    _id: false,
                },
            ],
            default: [],
        },
        order: { type: Number, default: 100000 },
    },
    { versionKey: false, timestamps: false },
)

let HelpTop = mongoose.model(name, schema)

module.exports = { HelpTop }
