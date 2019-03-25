const config = require('../../config')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const App = express()
const server = require('http').Server(App)
const path = require('path')
const { decodeToken, getPrettyDate } = require('../cheatsheet')

App.use((req, res, next) => {
    req.requestStart = Date.now()
    next()
})

App.use(bodyParser.json({ limit: '5mb' }))
App.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))
App.use(cors())
App.use(cookieParser())
App.use(
    session({
        secret: config.secret,
        stringify: false,
        cookie: { path: '/', httpOnly: true, maxAge: null },
        saveUninitialized: false,
        resave: false,
    }),
)
App.get('/favicon.ico', (req, res) => res.sendFile(path.resolve(__dirname, 'favicon.ico')))
App.use((req, res, next) => {
    req.isAuth = false
    if (!req.headers.token || req.headers.token.split('.').length !== 3) {
        return next()
    }

    req.user = decodeToken(req.headers.token)
    req.isAuth = true
    next()
})

App.use(express.static(path.resolve(__dirname, '../../app/public')))
App.use(express.static(path.resolve(__dirname, '../../admin')))

App.get('/admin', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../admin/index.html'))
})

App.use((req, res, next) => {
    console.log(`${getPrettyDate()} - ${req.method}: ${req.url}`)
    next()
})

App.use((req, res, next) => {
    const response = (defStatus, defMessage) => (data = {}) => {
        let status = data.status || defStatus
        let result = data.result || null
        let message = data.message || defMessage
        let code = data.code || null
        res.status(status).json({ ...data, result, message, code })
    }
    res.reply = response(200, 'Успешно!')
    res.replyErr = response(500, 'Внутренняя ошибка сервера')
    next()
})

App.use('/api', require('./routers'))

App.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../'))
})

App.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../admin/index.html'))
})

App.use((err, req, res, next) => res.status(500).json(err))

module.exports = server.listen(config.server.port, config.server.ip, () => {
    console.log('HTTP server started on port', config.server.port)
})
