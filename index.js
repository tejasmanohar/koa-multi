
/**
 * Module dependencies.
 */

import responseTime from 'koa-response-time'
import compress from 'koa-compress'
import logger from 'koa-logger'
import load from './lib/load'
import koa from 'koa'

// koa app
const app = koa();

// logging
app.use(logger());

// x-response-time
app.use(responseTime());

// compression
app.use(compress());

// boot
load(app, __dirname + '/api')

// port
const port = process.env.PORT || 3000;

// start server
app.listen(port)

console.log(`listening on port ${port}`)
