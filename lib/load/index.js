
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
    const directory = path.resolve(root, file)
    const stats = fs.lstatSync(directory)
    if (stats.isDirectory()) resource(app, { name: file, directory })
  })
}

/**
 * Define resource in `conf`.
 */

function resource(app, conf) {
  if (!conf.name) throw new Error(`.name in ${conf.directory}/config.json is required`)
  debug(`resource: ${conf.name}`)

  app.use(Resource(conf.name, require(conf.directory)).middleware())
}
