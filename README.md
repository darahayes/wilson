# thingy
thingy is just a placeholder name...

## Usage

```js
'use strict'
const thingy = require('thingy')()
const amqp = require('thingy-amqp')

let options = {
  url: 'amqp://localhost:5672',
  q: 'node_worker',
}

thingy.transport(amqp, options)

thingy.receive((msg, dispatch, done) => {
  dispatch('some.queue', {'msg': 'hello from the thingy'})
  done()
})

thingy.start((err) => {
  if (err) {
    throw err
  }
  console.log('thingy started')
})

```
