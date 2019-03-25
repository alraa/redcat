const name = 'helpvideo',
    id = 'single'

const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        id: { type: String, default: id, unique: true },
        url: { type: String, default: null },
    },
    { versionKey: false, timestamps: false },
)

let HelpVideo = mongoose.model(name, schema)

HelpVideo.set = url => HelpVideo.updateOne({ id }, { $set: { url } })
HelpVideo.get = () => HelpVideo.findOne({ id }, { url: 1 }).then(res => res.url)

module.exports = { HelpVideo }

mongoose.connection.once('open', () => {
    HelpVideo.findOne({ id })
        .then(res => {
            if (res === null) return new HelpVideo().save()
        })
        .catch(err => {
            console.error(err)
            process.exit(0)
        })
})
