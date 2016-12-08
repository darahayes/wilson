const pino = require('pino')

function wilson() {
  if (!(this instanceof wilson)) {
    return new wilson()
  }
  this._receiver = null
  this._transport = null
  this.logger = pino()
}

wilson.prototype.transport = function (transport, opts) {
  this._transport = transport(this, opts)
}

wilson.prototype.receive = function (handler) {
  this._receiver = handler
}

wilson.prototype.received = function(message, done) {
  this.logger.info({info: 'message received', message: message})
  if (this._receiver) {
    this._receiver(message, this._transport.dispatch, done)
  }
  else {
    done()
  }
}

wilson.prototype.dispatch = function (key, msg) {
  this._transport.dispatch(key, msg)
}

wilson.prototype.start = function (done) {
  done = done || function() {}
  this._transport.start(done)
  return this
}

module.exports = wilson
