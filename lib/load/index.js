
/**
 * Module dependencies.
 */

import Resource from 'koa-resource-router'
const debug = require('debug')('api')
import path from 'path'
import fs from 'fs'
import toXml from 'xml-object'

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
  app.use(function *(next) {
    yield next
    if (this.request.accepts(['json', 'xml']) === 'xml') {
      this.set('Content-Type', 'text/xml')
      this.body = `<xml version="1.0">${toXml(this.body)}</xml>`
    }
  })
}
