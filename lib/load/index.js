
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
  // fetch files in dir
  fs.readdirSync(root).forEach((file) => {
    // resolve absolute path of directory
    const directory = path.resolve(root, file)

    // fetch file status
    const stat = fs.lstatSync(directory)

    // if dir, create resource based on its name
    if (stat.isDirectory()) resource(app, { name: file, directory })
  })
}

/**
 * Define resource in `conf`.
 */

function resource(app, conf) {
  // log to those in DEBUG mode
  debug(`resource: ${conf.name}`)

  // create resource
  app.use(Resource(conf.name, require(conf.directory)).middleware())

  // serve content based on client's specification
  app.use(function *(next) {
    yield next
    if (this.request.accepts(['application/json', 'text/xml']) === 'text/xml') {
      this.set('Content-Type', 'text/xml')
      this.body = `<xml version="1.0">${toXml(this.body)}</xml>`
    }
  })
}
