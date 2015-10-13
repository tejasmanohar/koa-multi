
/**
 * Module dependencies.
 */

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.index = index;
exports.show = show;
exports.create = create;
var marked0$0 = [index, show, create].map(_regeneratorRuntime.mark);

var _coBody = require('co-body');

var _coBody2 = _interopRequireDefault(_coBody);

/**
 * This file illustrates using resourceful
 * routing using the koa-router module.
 */

var users = {
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
};

/**
 * GET all users.
 */

function index() {
  return _regeneratorRuntime.wrap(function index$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.body = users;

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

/**
 * GET user by :name.
 */

function show() {
  return _regeneratorRuntime.wrap(function show$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.body = users[this.params.user];

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[1], this);
}

/**
 * POST a new user.
 */

function create() {
  var body;
  return _regeneratorRuntime.wrap(function create$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return (0, _coBody2['default'])(this);

      case 2:
        body = context$1$0.sent;

        if (!body.name) this['throw'](400, '.name required');
        users[body.name] = body;
        this.status = 201;

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[2], this);
}