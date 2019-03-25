const Link = require('../../database/specialLink')
const { sleep } = require('../../cheatsheet')

module.exports = async (resolve, reject) => {
    let links = await Link.find({ $or: [{ done: true }, { expiresAt: { $lte: new Date() } }] }, { _id: 1 })

    for (let link of links) {
        await link.remove()
    }

    resolve(links)
}
