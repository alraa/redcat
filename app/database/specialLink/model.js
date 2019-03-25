const name = 'link'

const mongoose = require('mongoose')
const crypto = require('crypto')

const schema = mongoose.Schema(
    {
        user_id: { type: String, required: true },
        type: { type: String, enum: ['password-reset', 'confirm-registration'], required: true },
        secret: { type: String, default: () => crypto.randomBytes(64).toString('hex') },
        expiresAt: { type: Date, default: () => new Date().setHours(new Date().getHours() + 6) },
        done: { type: Boolean, default: false },
    },
    { versionKey: false },
)
schema.pre('validate', function() {})

module.exports = mongoose.model(name, schema)
