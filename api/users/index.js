
/**
 * Module dependencies.
 */

import parse from 'co-body'

/**
 * This file illustrates using resourceful
 * routing. Pay attention to the function names.
 */

const users = {
  tobi: {
    name: 'tobi',
    age: 3,
    species: 'ferret'
  },

  loki: {
    name: 'loki',
    age: 2,
    species: 'ferret'
  },

  jane: {
    name: 'jane',
    age: 7,
    species: 'ferret'
  }
}

/**
 * GET all users.
 */

export function *index() {
  this.body = users
}

/**
 * GET user by :name.
 */

export function *show() {
  this.body = users[this.params.user]
}

/**
 * POST a new user.
 */

export function *create() {
  const body = yield parse(this)
  if (!body.name) this.throw(400, 'name required')
  users[body.name] = body
  this.status = 201
}
