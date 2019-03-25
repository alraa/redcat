const name = 'item'

const mongoose = require('mongoose')
const _ = require('object-get')

const theQuality = {
    self: { type: Number, default: null },
    site: { type: Number, default: null },
    overprice: { type: Number, default: null },
    images: { type: [String], default: [] },
    video: { type: String, default: null },
}

const seasons = {
    winter: { type: Boolean, default: null },
    spring: { type: Boolean, default: null },
    summer: { type: Boolean, default: null },
    autumn: { type: Boolean, default: null },
}

const linkToEnotherItem = {
    category_id: { type: String, default: null },
    subcategory_id: { type: String, default: null },
    item_id: { type: String, default: null },
    quality: { type: String, default: null, enum: ['middle', 'high', 'premium', null] },
}

const schema = mongoose.Schema(
    {
        code: { type: String, default: null },
        name: { type: String, default: null },
        alt: { type: String, default: null },

        category_id: { type: String, default: null },
        subcategory_id: { type: String, default: null },
        brand_ids: { type: [String], default: null },
        color_ids: { type: [String], default: null },

        sex: { type: String, default: 'unisex', enum: ['male', 'female', 'unisex'] },
        seasons: seasons,

        shortDescription: { type: String, default: null },
        fullDescription: { type: String, default: null },
        review360: { type: String, default: null },

        sizeX: { type: Number, default: null },
        sizeY: { type: Number, default: null },
        sizeZ: { type: Number, default: null },
        weight: { type: Number, default: null },

        sizes: { type: [String], default: null },

        overprice: { type: Number, default: 0 },
        deliveryPrice: { type: Number, default: 0 },

        qualities: {
            middle: {
                type: theQuality,
                default: null,
            },
            high: {
                type: theQuality,
                default: null,
            },
            premium: {
                type: theQuality,
                default: null,
            },
        },
        middlePrice: { type: Number, default: null },

        provider: {
            name: { type: String, default: null },
            photos: { type: [String], default: [] },
        },

        images: { type: [linkToEnotherItem], default: [] },

        youMightLike: { type: [linkToEnotherItem], default: [] },

        published: { type: Boolean, default: true },
    },
    { versionKey: false, timestamps: true },
)
schema.pre('validate', function() {
    // this.alt = toUrlString(this.name)

    const qualities = ['middle', 'high', 'premium', 'noQuality']

    qualities.map(q => {
        if (!_(this, `qualities[${q}].site`)) {
            this.qualities[q] = null
        }
    })

    let count = 0
    this.middlePrice = 0
    qualities.map(q => {
        if (this.qualities[q] !== null) {
            count++
            this.middlePrice += this.qualities[q].site
        }
    })

    this.middlePrice /= count
    this.middlePrice = Math.round(this.middlePrice)
})

schema.methods.append = function(data) {
    const fields = ['createdAt', 'updatedAt', '_id']

    fields.map(f => {
        delete data[f]
    })

    Object.keys(data).map(f => {
        this[f] = data[f]
    })
}
schema.methods.forUser = function(a) {
    delete this.provider
    delete this.overprice

    const qualities = ['middle', 'high', 'premium']

    qualities.map(q => {
        try {
            delete this[q].middle.self
        } catch (err) {}
    })

    delete this.deliveryPrice

    return this
}

module.exports = mongoose.model(name, schema)

module.exports.safeProjection = {
    provider: 0,
}

module.exports.guardedFields = ['createdAt', 'updatedAt', '_id']

// let Item = module.exports

// let baseItem = {
// 	seasons: {
// 		winter: true,
// 		spring: true,
// 		summer: false,
// 		autumn: true
// 	},
// 	qualities: {
// 		middle: {
// 			self: 100000,
// 			site: 120000,
// 			images: [
// 				'https://picsum.photos/401',
// 				'https://picsum.photos/402',
// 				'https://picsum.photos/403',
// 				'https://picsum.photos/404',
// 				'https://picsum.photos/405'
// 			],
// 			video: 'https://youtu.be/a1kc6aMqqss'
// 		},
// 		high: {
// 			self: 150000,
// 			site: 200000,
// 			images: [
// 				'https://picsum.photos/401',
// 				'https://picsum.photos/402',
// 				'https://picsum.photos/403',
// 				'https://picsum.photos/404',
// 				'https://picsum.photos/405'
// 			],
// 			video: 'https://youtu.be/a1kc6aMqqss'
// 		},
// 		premium: {
// 			self: 300000,
// 			site: 500000,
// 			images: [
// 				'https://picsum.photos/421',
// 				'https://picsum.photos/422',
// 				'https://picsum.photos/423',
// 				'https://picsum.photos/424',
// 				'https://picsum.photos/425'
// 			],
// 			video: 'https://youtu.be/a1kc6aMqqss'
// 		}
// 	},
// 	provider: {
// 		name: '',
// 		photos: []
// 	},
// 	brand_id: '5c0bcd3565f13a09dc815508',
// 	color_id: '5c1ef9a726b18b1d580afdd3',
// 	sex: 'male',
// 	shortDescription: 'Весенне-осенняя куртка Supreme белого цвета',
// 	fullDescription:
// 		'Полное описание к... бля бла бла. Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях.',
// 	review360: null,
// 	sizeX: 1000,
// 	sizeY: 400,
// 	sizeZ: 400,
// 	weight: 1300,
// 	sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
// 	overprice: 800,
// 	published: true,
// 	code: '362', /////////////////////////////////////////////////////////////////////////////////////////////////////
// 	name: 'Дубликат товара ', /////////////////////////////////////////////////////////////////////////////////////////////////////
// 	category_id: '5c1ef7b926b18b1d580afdc6',
// 	subcategory_id: '5c1ef82d26b18b1d580afdca',
// 	images: [
// 		{
// 			category_id: '5c1efbb526b18b1d580afdd7',
// 			subcategory_id: '5c1ef83c26b18b1d580afdcc',
// 			item_id: '5c1f00f0633da91e44900531',
// 			quality: 'middle'
// 		},
// 		{
// 			category_id: '5c1efbb526b18b1d580afdd7',
// 			subcategory_id: '5c1ef83c26b18b1d580afdcc',
// 			item_id: '5c1f00f0633da91e44900531',
// 			quality: 'middle'
// 		},
// 		{
// 			category_id: '5c1ef7c626b18b1d580afdc9',
// 			subcategory_id: '5c1ef88926b18b1d580afdd0',
// 			item_id: '5c1f03e9633da91e44900535',
// 			quality: 'middle'
// 		}
// 	],
// 	youMightLike: [
// 		{
// 			category_id: '5c1ef7c626b18b1d580afdc9',
// 			subcategory_id: '5c1ef88926b18b1d580afdd0',
// 			item_id: '5c1f03e9633da91e44900535',
// 			quality: 'middle'
// 		},
// 		{
// 			category_id: '5c1ef7c626b18b1d580afdc9',
// 			subcategory_id: '5c1ef88926b18b1d580afdd0',
// 			item_id: '5c1f03e9633da91e44900535',
// 			quality: 'high'
// 		},
// 		{
// 			category_id: '5c1efbb526b18b1d580afdd7',
// 			subcategory_id: '5c1ef83c26b18b1d580afdcc',
// 			item_id: '5c1f00f0633da91e44900531',
// 			quality: 'premium'
// 		}
// 	],
// 	alt: 'dublicat-tovara-',
// 	middlePrice: 330000
// }

// ;(async () => {
// 	for (let i = 0; i < 40; i++) {
// 		let newItem = new Item(baseItem)
// 		newItem.code = newItem.code + i
// 		newItem.name = newItem.name + '- number ' + i
// 		newItem.alt = newItem.alt + '-' + i

// 		await newItem.save()

// 		console.log('saved', i)
// 	}
// })()
