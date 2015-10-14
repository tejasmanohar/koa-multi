
/**
 * This file illustrates using resourceful
 * routing. Pay attention to the function names.
 */

const stats = {
  requests: 100000,
  average_duration: 52,
  uptime: 123123132
}

/**
 * GET all stats.
 */

export function *all() {
  this.body = stats
}

/**
 * GET a single stat.
 */

export function *get() {
  this.body = stats[this.params.name]
}
