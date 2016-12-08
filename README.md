# wilson

## Usage

```js
'use strict'
const wilson = require('wilson')()
const amqp = require('wilson-amqp')

let options = {
  url: 'amqp://localhost:5672',
  q: 'node_worker',
}

wilson.transport(amqp, options)

wilson.receive((msg, dispatch, done) => {
  dispatch('some.queue', {'msg': 'hello from wilson'})
  done()
})

wilson.start((err) => {
  if (err) {
    throw err
  }
  console.log('wilson started')
})

```
