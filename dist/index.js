
/**
 * Module dependencies.
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _koaResponseTime = require('koa-response-time');

var _koaResponseTime2 = _interopRequireDefault(_koaResponseTime);

var _koaCompress = require('koa-compress');

var _koaCompress2 = _interopRequireDefault(_koaCompress);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _libLoad = require('./lib/load');

var _libLoad2 = _interopRequireDefault(_libLoad);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

/**
 * Initialize an app with the given `opts`.
 * Expose app
 * @param {Object} opts
 * @return {Application}
 * @api public
 */

exports['default'] = function () {
  var app = (0, _koa2['default'])();

  // logging
  app.use((0, _koaLogger2['default'])());

  // x-response-time
  app.use((0, _koaResponseTime2['default'])());

  // compression
  app.use((0, _koaCompress2['default'])());

  // routing
  app.use((0, _koaRouter2['default'])(app));

  // boot
  (0, _libLoad2['default'])(app, __dirname + '/api');

  return app;
};

module.exports = exports['default'];