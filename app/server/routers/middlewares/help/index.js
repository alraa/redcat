const { HelpTop, HelpDelivery, HelpVideo, HelpContact } = require('../../../../database')

const // for front
    getAll = (req, res) =>
        Promise.all([HelpTop.find(), HelpDelivery.find(), HelpVideo.get(), HelpContact.find()])
            .then(([top, delivery, video, contact]) => res.json({ res: { top, delivery, video, contact } }))
            .catch(err => {
                console.error(err)
                res.status(500).end()
            }),
    // get one for admin

    getTop = (req, res) =>
        HelpTop.find()
            .then(top => res.json({ res: { top } }))
            .catch(err => {
                console.error(err)
                res.status(500).end()
            }),
    getDelivery = (req, res) =>
        HelpDelivery.find()
            .then(delivery => res.json({ res: { delivery } }))
            .catch(err => {
                console.error(err)
                res.status(500).end()
            }),
    getVideo = (req, res) =>
        HelpVideo.get()
            .then(video => res.json({ res: { video } }))
            .catch(err => {
                console.error(err)
                res.status(500).end()
            }),
    getContact = (req, res) =>
        HelpContact.find()
            .then(contact => res.json({ res: { contact } }))
            .catch(err => {
                console.error(err)
                res.status(500).end()
            }),
    //creating

    createTop = (req, res) =>
        new HelpTop(req.body)
            .save()
            .then(item => res.json({ res: item }))
            .catch(err => {
                console.error(err)
                res.status(500).end()
            }),
    createDelivery = (req, res) =>
        new HelpDelivery(req.body)
            .save()
            .then(item => res.json({ res: item }))
            .catch(err => {
                console.error(err)
                res.status(500).end()
            }),
    createContact = (req, res) =>
        new HelpContact(req.body)
            .save()
            .then(item => res.json({ res: item }))
            .catch(err => {
                console.error(err)
                res.status(500).end()
            }),
    // updating

    updateTop = (req, res) => {
        HelpTop.findByIdAndUpdate(req.params.id, req.body)
            .then(() => res.end())
            .catch(err => {
                console.error(err)
                res.status(500).end()
            })
    },
    updateDelivery = (req, res) => {
        HelpDelivery.findByIdAndUpdate(req.params.id, req.body)
            .then(() => res.end())
            .catch(err => {
                console.error(err)
                res.status(500).end()
            })
    },
    updateVideo = (req, res) => {
        HelpVideo.set(req.body.url)
            .then(() => res.end())
            .catch(err => {
                console.error(err)
                res.status(500).end()
            })
    },
    updateContact = (req, res) => {
        HelpContact.findByIdAndUpdate(req.params.id, req.body)
            .then(() => res.end())
            .catch(err => {
                console.error(err)
                res.status(500).end()
            })
    },
    // removing

    removeTop = (req, res) =>
        HelpTop.findByIdAndRemove(req.params.id)
            .then(() => res.end())
            .catch(err => {
                res.status(500).end()
            }),
    removeDelivery = (req, res) =>
        HelpDelivery.findByIdAndRemove(req.params.id)
            .then(() => res.end())
            .catch(err => {
                res.status(500).end()
            }),
    removeContact = (req, res) =>
        HelpContact.findByIdAndRemove(req.params.id)
            .then(() => res.end())
            .catch(err => {
                res.status(500).end()
            })
module.exports = {
    help: {
        getAll,

        getTop,
        getDelivery,
        getVideo,
        getContact,

        createTop,
        createDelivery,
        createContact,

        updateTop,
        updateDelivery,
        updateVideo,
        updateContact,

        removeTop,
        removeDelivery,
        removeContact,
    },
}
