
/**
 * Module dependencies.
 */

import responseTime from 'koa-response-time'
import compress from 'koa-compress'
import logger from 'koa-logger'
import router from 'koa-router'
import load from './lib/load'
import koa from 'koa'

/**
 * Initialize an app with the given `opts`.
 * Expose app
 * @param {Object} opts
 * @return {Application}
 * @api public
 */

export default function() {
  const app = koa();

  // logging
  app.use(logger());

  // x-response-time
  app.use(responseTime());

  // compression
  app.use(compress());

  // routing
  app.use(router(app));

  // boot
  load(app, __dirname + '/api');

  return app;
}
