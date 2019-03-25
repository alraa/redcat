const name = 'trandingaction'

const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        active: { type: Boolean, default: false },
        icon: { type: String, default: null },
        description: { type: String, default: '' },
        itemIds: { type: String, default: [] },

        bonusItemId: { type: String, default: null },
        discount: { type: String, default: null },
    },
    { versionKey: false, timestamps: false },
)

let TrandingAction = mongoose.model(name, schema)

module.exports = { TrandingAction }
