
# wilson
Wilson is a **tiny**, transport independent library for building message-based microservices that **do one thing only.**

## Usage

```js
'use strict'

const config = require('./config')
const wilson = require('wilson')

wilson(config)
  .transport(require('wilson-amqp'))
  .service(require('./service'))
  .start((err) => {
    if (err) {
      console.log(err)
      process.exit(1)
    }
    console.log('service started successfully')
  })
```

## Example Service

```js
/*
* example ./service.js
* do some async setup tasks if necessary
* callback with your receiver function
*/
module.exports = function(config, done) {
  console.log('service being initialized')
  done(null, onReceive)
}

/*
* handle incoming messages
* use dispatch(key, message) to send messages
*/
function onReceive(message, dispatch, done) {
  console.log('Service received a message', message)
  done()
}
```