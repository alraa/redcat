'use strict'
const EventEmitter = require('events')

class Promising {
    // log levels
    // 0 - errors only
    // 1 - warnings  and errors
    // 2 - all logs
    constructor(props = {}) {
        this.logs = props.logs || false
        this.events = {}
    }

    on(name, callback) {
        if (typeof name !== 'string') {
            throw new Error('First argument must be a string')
        }
        if (typeof callback !== 'function') {
            throw new Error('Second argument must be a function')
        }
        if (this.events[name]) {
            let err = 'Event ' + name + ' is already available'
            throw new Error(err)
        }

        this.events[name] = callback

        return this
    }
    emit(name) {
        if (this.logs) {
            console.log(`emitting event '${name}'`)
        }
        let callback = this.events[name]
        if (!callback || typeof callback !== 'function') throw new Error('No such event ' + `'${name}'`)

        delete arguments[0]
        let args = Array.from(arguments).slice(1)

        return new Promise((resolve, reject) => {
            callback(resolve, reject, ...args)
        })
    }
}

module.exports = Promising
