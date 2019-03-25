const path = require('path')
const md5 = require('md5-file')
const fs = require('fs')
const crypto = require('crypto')
const cloudinary = require('cloudinary')

cloudinary.config(require('../../../config').cloudinary)

const filesPath = path.resolve(__dirname, '../../public/files')

ENGINE.on('etc/get-categories-tree', require('./getCategoriesTree'))
ENGINE.on('etc/clear-old-links', require('./clearOldLinks'))
ENGINE.on('etc/admin-upload-file', (resolve, reject, newFile) => {
    cloudinary.v2.uploader.upload(newFile.path, function(error, result) {
        fs.unlinkSync(newFile.path)

        if (error) {
            reject()
            console.log(error)
            return
        }

        resolve({ result: { link: result.url } })
    })
})

ENGINE.on('etc/admin-upload-file-base64', (resolve, reject, { base64 }) => {
    if (!base64) return resolve({ status: 400, message: 'File not exists' })

    let filename = Date.now().toString(36) + '_' + crypto.randomBytes(2).toString('hex') + '.png'

    let newPath = path.resolve(filesPath, filename)

    fs.writeFileSync(newPath, new Buffer(base64, 'base64'))

    cloudinary.v2.uploader.upload(newPath, function(error, result) {
        fs.unlinkSync(newPath)

        if (error) return reject()

        resolve({ result: { link: result.url } })
    })
})

let clearOldLinks = () => {
    ENGINE.emit('etc/clear-old-links')
        .then(count => {
            if (count > 0) {
                console.log('old links removed:', count)
            }
        })
        .catch(err => {
            console.error('removing old links error')
            console.error(err)
        })
}

// clear old links on startup and every 1 hour
clearOldLinks()
setInterval(clearOldLinks, 3600000)
