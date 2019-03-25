const name = 'order'

const mongoose = require('mongoose')
const _ = require('object-get')
const co = require('co')

const sleep = (t = 1000) => new Promise(resolve => setTimeout(resolve, t))

let possibleOrderStatuses = [
    'new', // новый
    'process', // в обработке
    'sent', // отправлен
    'canceled', // закрыт по каким-либо причинам
    null, // не оплачен, без статуса
]

let status = {
    status: { type: String, enum: possibleOrderStatuses, required: true },
    timestamp: { type: Date, default: new Date() },
}

const schema = mongoose.Schema(
    {
        //
        // ─── ON CREATE DATA ──────────────────────────────────────────────
        //

        user_id: { type: String, required: true },
        code: { type: Number, unique: true, required: true },
        mode: { type: String, enum: ['retail', 'wholesale', 'dropshipping'], default: 'retail' },

        //
        // ─── DELIVERY ────────────────────────────────────────────────────
        //

        deliveryType: {
            type: String,
            enum: ['stdExpress_EXPRESS', 'stdExpress_STANDART', 'ePacket', 'ems', 'dhl', 'postNl'],
            required: true,
        },
        stdExpressData: { type: Object, default: null },
        trackNumber: { type: String, default: null },
        deliveryPrice: { type: Number, required: true },

        //
        // ─── PAYMENT ─────────────────────────────────────────────────────
        //

        onCaptureSumPrice: { type: Number, required: true },
        onCaptureSumWeight: { type: Number, required: true },

        paidFromBalance: { type: Number, default: 0 },

        paymentType: { type: String, required: true, enum: ['yakassa-prepayment'] },
        yakassaPaymentType: { type: String, required: true, enum: ['bank_card'] },
        yakassaPaymentObject: { type: Object, default: null },
        yakassaPaymentIdempotence: { type: String, default: null },

        paid: { type: Boolean, default: false },

        //
        // ─── STATUS AND HISTORY ──────────────────────────────────────────
        //

        statusHistory: { type: [status], default: [] },
        lastStatus: { type: status, default: null },
        hasOutOfStock: { type: Boolean, default: false },

        //
        // ─── FORM DATA ───────────────────────────────────────────────────
        //

        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },

        country: { type: String, required: true },
        province: { type: String, required: true },
        city: { type: String, required: true },
        address: { type: String, required: true },

        growthWeight: { type: String, default: null },
        footSize: { type: String, default: null },
    },
    { versionKey: false, timestamps: true },
)

let ready = false
let nextCode = 1000

schema.methods.setCode = function() {
    let _this = this
    return new Promise(async (resolve, reject) => {
        while (!ready) await sleep(1000)

        _this.code = nextCode++
        console.log('created code:', _this.code)
        resolve()
    })
}
schema.methods.pushStatus = function(status) {
    if (possibleOrderStatuses.includes(status) === false) {
        throw new Error('Invalid status of order')
    }

    if (!status) return this

    if (_(this, 'statusHistory[0].status') === status) {
        return this
    }

    this.statusHistory = [{ status }, ...this.statusHistory]
    this.lastStatus = { status }
    return this
}
schema.methods.updateStatus = function() {
    const { OrderedItem } = require('../../database')
    let _this = this
    return new Promise(async resolve => {
        co(function*() {
            let items = yield OrderedItem.find({ order_id: _this._id })

            console.log('updating status for order ' + this._id)
            console.log('order has ' + items.length + ' items')
            items.map(item => console.log('item has status ' + item.status))

            //
            // ─── CHECK IF ORDER HAS ALL ITEMS IN FINAL STATUS ────────────────
            //

            // app\database\orderedItem\model.js:23
            // let statuses = items.map(item => ({ status: item.status, final: item.isFinalStatus }))

            if (/** if new statu */ items.reduce((acc, item) => acc && item.status === 'new', true)) {
                _this.statusHistory = []
                _this.status = null
                _this.pushStatus('new')
            } /** if sent */ else if (
                items.reduce((acc, { status, isFinalStatus }) => acc && (status === 'sent' || isFinalStatus), true)
            ) {
                _this.pushStatus('sent')
                yield OrderedItem.updateMany({ order_id: order_id }, { isFinalStatus: true })
            } /** if status is in process */ else {
                _this.pushStatus('process')
            }

            _this.hasOutOfStock = items.some(item => item.status === 'out_of_stock' && !item.isFinalStatus)

            // console.log(`Order ${_this._id} updated, ${_this.hasOutOfStock ? 'has' : 'hasn\'t'} out of stock`)

            console.log('result status of order: ' + _this.status)
            console.log(`this order hasOutOfStock: ${_this.hasOutOfStock ? 'YES' : 'NO'}`)

            yield _this.save()

            resolve()
        })
    })
}

const Model = mongoose.model(name, schema)

Model.findWithQuery = (opts = {}) => {
    let query = {}

    if (opts.user_id) {
        query.user_id = { $in: Array.isArray(opts.user_id) ? opts.user_id : [opts.user_id] }
    }

    ;['code', 'mode', 'deliveryType', 'paymentType'].map(f => {
        if (opts.hasOwnProperty(f)) {
            query[f] = opts[f]
        }
    })

    if (opts.name) {
        query.name = { $regex: opts.name, $options: 'i' }
    }

    return Model.find(query)
        .skip(+opts.skip || 0)
        .limit(+opts.limit || 5)
        .sort({ [opts.sortBy || '_id']: opts.sortBack ? -1 : 1 })
        .lean()
        .exec()
}

Model.countWithQuery = (opts = {}) => {
    let query = {}

    if (opts.user_id) {
        query.user_id = { $in: Array.isArray(opts.user_id) ? opts.user_id : [opts.user_id] }
    }

    ;['code', 'mode', 'deliveryType', 'paymentType'].map(f => {
        if (opts.hasOwnProperty(f)) query[f] = opts[f]
    })

    if (opts.name) query.name = { $regex: opts.name, $options: 'i' }

    return Model.countDocuments(query)
        .skip(+opts.skip || 0)
        .limit(+opts.limit || 5)
        .sort({ [opts.sortBy || '_id']: opts.sortBack ? -1 : 1 })
        .lean()
        .exec()
}

module.exports = Model

mongoose.connection.on('open', () => {
    Model.find({}, { code: 1 })
        .sort({ code: -1 })
        .limit(1)
        .lean()
        .exec()
        .then(res => res[0] || null)
        .then(res => {
            nextCode = res ? res.code + 1 : 1000
            ready = true
        })
        .catch(err => {
            console.error(err)
            process.exit(err.code)
        })
})
