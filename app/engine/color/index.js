const Color = require('../../database/color')

const create = (resolve, reject, color) => {
    new Color(color)
        .save()
        .then(res => resolve())
        .catch(err => {
            console.error(err)
            reject()
        })
}

const gets = (resolve, reject) => {
    Color.find({})
        .then(res => resolve({ result: res }))
        .catch(err => {
            console.error(err)
            reject()
        })
}

const get = (resolve, reject, query) => {
    Color.findOne(query)
        .then(res => resolve({ result: res }))
        .catch(err => {
            console.error(err)
            reject()
        })
}

const update = (resolve, reject, _id, update) => {
    Color.findOneAndUpdate({ _id }, update)
        .then(res => resolve())
        .catch(err => {
            console.error(err)
            reject()
        })
}

const _delete = (resolve, reject, _id) => {
    Color.findOneAndRemove({ _id })
        .then(res => resolve())
        .catch(err => {
            console.error(err)
            reject()
        })
}

ENGINE.on('color/create', create)
    .on('color/gets', gets)
    .on('color/get', get)
    .on('color/update', update)
    .on('color/delete', _delete)
