const name = 'moneybackrequest'

const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        user_id: { type: String, required: true },
        sum: { type: Number, required: true },
        status: { type: String, enum: ['new', 'confirmed', 'declined'], default: 'new' },
        card: { type: String, required: true },
    },
    { versionKey: false, timestamps: true },
)

const MoneyWithdraw = mongoose.model(name, schema)

module.exports = { MoneyWithdraw }
