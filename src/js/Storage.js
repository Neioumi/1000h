/**
 * Storage object that wrapps localStorage and has some utilities.
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

function Storage() {}

Storage.get     = Storage_get;
Storage.set     = Storage_set;
Storage.getJSON = Storage_getJSON;
Storage.setJSON = Storage_setJSON;
Storage.has     = Storage_has;
Storage.remove  = Storage_remove;
Storage.clear   = Storage_clear;
Storage.keys    = Storage_keys;
Storage.key     = Storage_key;
Storage.length  = Storage_length;

// --- implement -------------------------------------------

/**
 * Return the value for the key.
 * If the value does not exist, it returns defaultValue.
 * If defaultValue is ommitted, null(not 'undefined') is used.
 *
 * @param {String} key the key
 * @param {Object} [defaultValue=null] default value
 * @return {Object} the value
 */
function Storage_get(key, defaultValue) {
  if (defaultValue === undefined) {
    defaultValue = null;
  }

  var value = localStorage.getItem(key);
  return value === null ? defaultValue : value;
}

/**
 * Store the value for the key.
 *
 * @param {String} key the key
 * @param {Object} value the value
 */
function Storage_set(key, value) {
  localStorage.setItem(key, value);
}

/**
 * Return the value as JSON parsed object.
 *
 * defaultValue is not parsed. You can specify various object.
 * You don't need to specify JSON string.
 *
 * @param {String} key the key
 * @param {Object} [defaultValue=null] default value
 * @return {Object} the JSON parsed value
 */
function Storage_getJSON(key, defaultValue) {
  if (defaultValue === undefined) {
    defaultValue = null;
  }

  var value = this.get(key);
  return value === null ? defaultValue : JSON.parse(value);
}

/**
 * Store the value as JSON string.
 *
 * @param {String} key the key
 * @param {Object} value the value
 */
function Storage_setJSON(key, value) {
  this.set(key, JSON.stringify(value));
}

/**
 * Return true if he key exists.
 *
 * @param {String} key the key
 * @return {Boolean}
 */
function Storage_has(key) {
  return key in localStorage;
}

/**
 * Remove the value for the key.
 *
 * @param {String} key the key
 */
function Storage_remove(key) {
  localStorage.removeItem(key);
}

/**
 * Clear all values.
 */
function Storage_clear() {
  localStorage.clear();
}

function Storage_keys() {
  return Object.keys(localStorage);
}

function Storage_key(index) {
  return localStorage.key(index);
}

function Storage_length() {
  return localStorage.length;
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
