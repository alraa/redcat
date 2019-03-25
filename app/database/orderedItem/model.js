const name = 'ordereditem'

const mongoose = require('mongoose')

/**
 * 'new'			отображать итемы только когда статус заказа "оплачен"
 * 'process'		в обрабоке
 * 'agreed'			согласован с китайцем
 * 'paid'			деньги переданы за товар КИТАЙЦУ, это не оплата покупателя
 * 'out_of_stock'	нет в наличии
 * 'sent'			отправлен	-	когда все тоары в заказе получают статус 'sent' или 'out_of_stock', весь заказ получает статус 'sent'
 * 'canceled'		не знаю
 */

const schema = mongoose.Schema(
    {
        order_id: { type: String, required: true },
        item_id: { type: String, required: true },
        selectedQuality: { type: String, required: true, enum: ['middle', 'high', 'premium'] },
        selectedSize: { type: String, default: null },
        onCaptureQualityPrice: { type: Number, required: true },
        status: {
            type: String,
            enum: ['new', 'process', 'agreed', 'paid', 'out_of_stock', 'sent', 'canceled'],
            default: 'new',
        },
        isFinalStatus: { type: Boolean, default: false },
    },
    { versionKey: false, timestamps: true },
)

const Model = mongoose.model(name, schema)

module.exports = Model
