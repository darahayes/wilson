
# wilson
Wilson is a tiny service layer for wiring up functions to well known locations. 

## Usage

```js
'use strict'

const Config = require('./config')
const Service = require('./service')
const Transport = require('wilson-amqp')
const Wilson = require('wilson')

Wilson(Config)
  .transport(Transport)
  .service(Service)
  .start((err) => {
    if (err) {
      console.log(err)
      process.exit(1)
    }
  })
```

## License
All rights reserved. 2016 nearForm.
