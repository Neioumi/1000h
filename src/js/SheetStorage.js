/**
 * Storage object.
 * @module Storage
 */

(function(global) {
"use strict";

// --- define ----------------------------------------------
// platform detection
var _BROWSER = !!global.self;
var _WORKER  = !!global.WorkerLocation;
var _NODE_JS = !!global.process;

// --- variable --------------------------------------------

// --- interface -------------------------------------------

/**
 * Create a new storage.
 *
 * @constructor
 * @param {Number} id storage id
 */
function Storage(id) {
  this.id = id;
}

Storage.createId = Storage_createId;

Storage.prototype = {
  getItem: Storage_getItem,
  setItem: Storage_setItem,
  removeItem: Storage_removeItem,
  keyFor: Storage_keyFor
};

Object.defineProperty(Storage.prototype, "title", {
  get: Storage_get_title,
  set: Storage_set_title
});

// --- implement -------------------------------------------

/**
 * Create new id.
 *
 * @return {Number} new id
 */
function Storage_createId() {
  var new_id = Number(localStorage.getItem("id_sequence")) + 1;
  localStorage.setItem("id_sequence", new_id);
  return new_id;
}

function Storage_get_title() {
  return this.getItem("title");
}

function Storage_set_title(title) {
  this.setItem("title", title);
}

function Storage_getItem(name) {
  return localStorage.getItem(this.keyFor(name));
}

function Storage_setItem(name, value) {
  localStorage.setItem(this.keyFor(name), value);
}

function Storage_removeItem(name) {
  localStorage.removeItem(this.keyFor(name));
}

/**
 * Make a key for localStorage.
 *
 * @param {String} name name
 * @return {String} key
 */
function Storage_keyFor(name) {
  return name + this.id.toString();
}

if (_NODE_JS) {
} else if (_WORKER) {
} else if (_BROWSER) {
}

// --- export ----------------------------------------------
if (_NODE_JS) {
    module.exports = Storage;
}
global.Storage = Storage;

})(this.self || global);
