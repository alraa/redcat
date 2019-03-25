const imagemin = require('imagemin')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')
const fs = require('fs')

// ;(async path => {
// 	const files = await imagemin(['images/*.{jpg,png}'], 'build/images', {
// 		plugins: [imageminJpegtran(), imageminPngquant({ quality: '65-80' })],
// 	})

// 	//=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
// })()

exports.compress = path =>
    new Promise((resolve, reject) =>
        imagemin([path], 'build/images', {
            plugins: [imageminJpegtran(), imageminPngquant({ quality: '3' })],
        })
            .then(([{ data, path }]) => {
                // fs.unlinkSync(path)
                // console.log(path)
                // fs.writeFileSync(path, data)
                resolve()
            })
            .catch(reject),
    )
