const pino = require('pino')

function thingy() {
  if (!(this instanceof thingy)) {
    return new thingy()
  }
  this._receiver = null
  this._transport = null
  this.logger = pino()
}

thingy.prototype.transport = function (transport, opts) {
  this._transport = transport(this, opts)
}

thingy.prototype.receive = function (handler) {
  this._receiver = handler
}

thingy.prototype.received = function(message, done) {
  this.logger.info({info: 'message received', message: message})
  if (this._receiver) {
    this._receiver(message, this._transport.dispatch, done)
  }
  else {
    done()
  }
}

thingy.prototype.dispatch = function (key, msg) {
  this._transport.dispatch(key, msg)
}

thingy.prototype.start = function (done) {
  done = done || function() {}
  this._transport.start(done)
  return this
}

module.exports = thingy
