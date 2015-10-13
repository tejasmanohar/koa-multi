
/**
 * Module dependencies.
 */

import Resource from 'koa-resource-router'
const debug = require('debug')('api')
import path from 'path'
import fs from 'fs'

/**
 * Load resources in `root` directory.
 *
 * @param {Application} app
 * @param {String} root
 * @api private
 */

export default function(app, root) {
  fs.readdirSync(root).forEach((file) => {
    const dir = path.resolve(root, file)
    const stats = fs.lstatSync(dir)
    if (stats.isDirectory()) {
      const conf = require(dir + '/config.json')
      conf.name = file
      conf.directory = dir
      if (conf.routes) route(app, conf)
      else resource(app, conf)
    }
  })
}

/**
 * Define routes in `conf`.
 */

function route(app, conf) {
  debug(`routes: ${conf.name}`)

  const mod = require(conf.directory)

  for (let key in conf.routes) {
    const prop = conf.routes[key]
    const method = key.split(' ')[0]
    const path = key.split(' ')[1]
    debug(`${method} ${path} -> .${prop}`)

    const fn = mod[prop]
    if (!fn) throw new Error(`${conf.name}: exports.${prop} is not defined`)

    app[method.toLowerCase()](path, fn)
  }
}

/**
 * Define resource in `conf`.
 */

function resource(app, conf) {
  if (!conf.name) throw new Error(`.name in ${conf.directory}/config.json is required`)
  debug(`resource: ${conf.name}`)

  app.use(Resource(conf.name, require(conf.directory)).middleware())
}
