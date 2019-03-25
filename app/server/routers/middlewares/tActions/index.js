const tAction = require('../../../../database').TrandingAction

module.exports = {
    tActions: {
        get: (req, res, next) => {
            tAction
                .find()
                .then(actions => res.json({ res: { actions } }))
                .catch(next)
        },
        getOne: (req, res, next) => {
            tAction
                .findById(req.params.id)
                .then(action => res.json({ res: { action } }))
                .catch(next)
        },
        create: (req, res, next) => {
            new tAction(req.body)
                .save()
                .then(action => res.json({ res: { action } }))
                .catch(next)
        },
        update: (req, res, next) => {
            tAction
                .findByIdAndUpdate(req.params.id, req.body)
                .then(() => res.end())
                .catch(next)
        },
        remove: (req, res, next) => {
            tAction
                .findByIdAndRemove(req.params.id)
                .then(() => res.end())
                .catch(next)
        },
    },
}
