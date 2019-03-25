const name = 'color'

const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        name: { type: String, required: true, unique: true, trim: true },
        hex: { type: String, required: true, unique: true },
    },
    { versionKey: false },
)

module.exports = mongoose.model(name, schema)

// let colors = [
// 	{
// 		name: 'Черный',
// 		hex: '#000000'
// 	},
// 	{
// 		name: 'Белый',
// 		hex: '#FFFFFF'
// 	},
// 	{
// 		name: 'Красный',
// 		hex: '#FF0000'
// 	},
// 	{
// 		name: 'Зеленый',
// 		hex: '#00FF00'
// 	},
// 	{
// 		name: 'Синий',
// 		hex: '#0000FF'
// 	},
// 	{
// 		name: 'Фиолетовый',
// 		hex: '#EE82EE'
// 	},
// 	{
// 		name: 'Оранжевый',
// 		hex: '#FFA500'
// 	},
// 	{
// 		name: 'Розовый',
// 		hex: '#FFC0CB'
// 	},
// 	{
// 		name: 'Коричневый',
// 		hex: '#A52A2A'
// 	},
// 	{
// 		name: 'Серый',
// 		hex: '#808080'
// 	}
// ]

// colors.map(color => {
// 	new module.exports(color).save()
// })
