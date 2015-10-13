
/**
 * Module dependencies.
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _koaResourceRouter = require('koa-resource-router');

var _koaResourceRouter2 = _interopRequireDefault(_koaResourceRouter);

var _path2 = require('path');

var _path3 = _interopRequireDefault(_path2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

/**
 * Load resources in `root` directory.
 *
 * @param {Application} app
 * @param {String} root
 * @api private
 */

var debug = require('debug')('api');

exports['default'] = function (app, root) {
  _fs2['default'].readdirSync(root).forEach(function (file) {
    var dir = _path3['default'].resolve(root, file);
    var stats = _fs2['default'].lstatSync(dir);
    if (stats.isDirectory()) {
      var conf = require(dir + '/config.json');
      conf.name = file;
      conf.directory = dir;
      if (conf.routes) route(app, conf);else resource(app, conf);
    }
  });
};

/**
 * Define routes in `conf`.
 */

function route(app, conf) {
  debug('routes: ' + conf.name);

  var mod = require(conf.directory);

  for (var key in conf.routes) {
    var prop = conf.routes[key];
    var method = key.split(' ')[0];
    var _path = key.split(' ')[1];
    debug(method + ' ' + _path + ' -> .' + prop);

    var fn = mod[prop];
    if (!fn) throw new Error(conf.name + ': exports.' + prop + ' is not defined');

    app[method.toLowerCase()](_path, fn);
  }
}

/**
 * Define resource in `conf`.
 */

function resource(app, conf) {
  if (!conf.name) throw new Error('.name in ' + conf.directory + '/config.json is required');
  debug('resource: ' + conf.name);

  app.use((0, _koaResourceRouter2['default'])(conf.name, require(conf.directory)).middleware());
}
module.exports = exports['default'];