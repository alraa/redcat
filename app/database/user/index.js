const name = 'user'

const mongoose = require('mongoose')
const crypto = require('crypto')
const { encodeToken } = require('../../cheatsheet')

const schema = mongoose.Schema(
    {
        email: { type: String, trim: true, unique: true, required: true },
        hash: String,
        salt: String,

        accountMeta: {
            admin: { type: Boolean, default: false }, // полный доступ
            providers: { type: Boolean, default: false }, // доступ к стр-це поставщиков
            offers: { type: Boolean, default: false }, // доступ к стр-це заказов
            clients: { type: Boolean, default: false }, // доступ к аккаутам клентов
            items: { type: Boolean, default: false }, // доступ к созданию, редактированию аккаунтов
        },

        personMeta: {
            name: { type: String, default: null }, // имя
            surname: { type: String, default: null }, // фамиллия
            patronymic: { type: String, default: null }, // отчество

            city: { type: String, default: null },
            index: { type: String, default: null },
            address: { type: String, default: null },

            birthDate: { type: Date, default: null },
            growthWeight: { type: String, default: null },
            footSize: { type: String, default: null },
        },

        wishList: {
            type: [
                {
                    item_id: { type: String, required: true },
                    quality: { type: String, enum: ['middle', 'heigh', 'premium'], default: null },
                    count: { type: String, default: null },
                },
            ],
            default: [],
        },

        balance: { type: Number, default: 0 },

        socials: {
            twitter: { type: String, default: null },
            facebook: { type: String, default: null },
            instagram: { type: String, default: null },
            vk: { type: String, default: null },
        },
    },
    { versionKey: false, timestamps: true },
)

schema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex')
    return this
}
schema.methods.validPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex')

    return this.hash === hash
}
schema.methods.createToken = function() {
    return encodeToken({
        _id: this._id,
        email: this.email,
        timestamp: new Date(),
    })
}
schema.methods.append = function(data, safe = false) {
    let fields = safe ? module.exports.importantFields : module.exports.guardedFields

    fields.map(f => {
        delete data[f]
    })

    Object.keys(data).map(f => {
        this[f] = data[f]
    })
}
schema.pre('save', function() {
    delete this.createdAt
    delete this.updatedAt
})
schema.pre('validate', function() {
    delete this.createdAt
    delete this.updatedAt
})

let User = mongoose.model(name, schema)
module.exports = { User }

mongoose.connection.once('open', () => {
    User.countDocuments()
        .then(count => {
            if (count === 0) {
                new User({
                    email: process.env.DEF_ADMIN_EMAIL,
                    personMeta: {
                        name: process.env.DEF_ADMIN_NAME,
                    },
                    accountMeta: {
                        admin: true,
                    },
                })
                    .setPassword(process.env.DEF_ADMIN_PASS)
                    .save()
            }
        })
        .catch(err => {
            console.error(err)
            process.exit(err.code)
        })
})
