'use strict'

const Pino = require('pino')

const defaults = {
  tag: 'untagged'
}

const Wilson = module.exports = function (config) {
  if (!(this instanceof Wilson)) {
    return new Wilson(config)
  }

  this.logger = Pino()
  this.config = Object.assign({}, defaults, config)

  this._receiver = null
  this._transport = null
}

Wilson.prototype.transport = function (transport, opts) {
  this._transport = transport(this, opts)
}

Wilson.prototype.receive = function (handler) {
  this._receiver = handler
}

Wilson.prototype.received = function(message, done) {
  this.logger.info({info: 'message received', message: message})
  if (this._receiver) {
    this._receiver(message, this._transport.dispatch, done)
  }
  else {
    done()
  }
}

Wilson.prototype.dispatch = function (key, msg) {
  this._transport.dispatch(key, msg)
}

Wilson.prototype.start = function (done) {
  done = done || function() {}
  this._transport.start(done)
  return this
}