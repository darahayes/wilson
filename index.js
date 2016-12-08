'use strict'

const HyperId = require('hyperid')
const Pino = require('pino')

const defaults = {
  tag: 'untagged',
  transport: {},
  service: {}
}

const Wilson = module.exports = function (config) {
  if (!(this instanceof Wilson)) {
    return new Wilson(config)
  }

  this.id = HyperId().uuid
  this.log = Pino()
  this.config = Object.assign({}, defaults, config)

  this._service = null
  this._receiver = null
  this._transport = null
}

Wilson.prototype.transport = function (transport, opts) {
  this.config = Object.assign({}, this.config, {transport: opts})
  this._transport = transport(this, this.config)
  return this
}


Wilson.prototype.service = function (service, opts) {
  this.config = Object.assign({}, this.config, {service: opts})
  this._service = service
  return this
}

Wilson.prototype.received = function (message, done) {
  this.log.info({info: 'message received', message: message})
  if (this._receiver) {
    this._receiver(message, this._transport.dispatch, done)
  }
  else {
    done()
  }
}

Wilson.prototype.start = function (done) {
  this._service(this.config, (err, receiver) => {
    if (err) return done(err, null)

    this._receiver = receiver
    this._transport.start(done)    
  })
}

Wilson.prototype.dispatch = function (key, msg) {
  this._transport.dispatch(key, msg)
}