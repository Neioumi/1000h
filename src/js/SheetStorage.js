/**
 * Sheet Storage object associated with the sheet ID.
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
 * @param {Number} sheetId sheet ID
 */
function SheetStorage(sheetId) {
  this.sheetId = sheetId;
}

SheetStorage.createId = SheetStorage_createId;

SheetStorage.prototype = {
     get: SheetStorage_get,
     set: SheetStorage_set,
  remove: SheetStorage_remove,
  keyFor: SheetStorage_keyFor
};

Object.defineProperty(SheetStorage.prototype, "title", {
  enumerable: true,
  get: SheetStorage_get_title,
  set: SheetStorage_set_title
});

// --- implement -------------------------------------------

/**
 * Create new sheet ID.
 *
 * @return {Number} new sheet ID
 */
function SheetStorage_createId() {
  var new_id = Number(Storage.get("sheet_id_sequence", 0)) + 1;
  Storage.set("sheet_id_sequence", new_id);
  return new_id;
}

function SheetStorage_get_title() {
  return this.get("title");
}

function SheetStorage_set_title(title) {
  this.set("title", title);
}

function SheetStorage_get(name, defaultValue) {
  return Storage.get(this.keyFor(name), defaultValue);
}

function SheetStorage_set(name, value) {
  Storage.set(this.keyFor(name), value);
}

function SheetStorage_remove(name) {
  Storage.remove(this.keyFor(name));
}

/**
 * Make a key for raw Storage.
 *
 * @param {String} name name
 * @return {String} key
 */
function SheetStorage_keyFor(name) {
  return "sheet[" + this.sheetId.toString() + "]." + name;
}

if (_NODE_JS) {
} else if (_WORKER) {
} else if (_BROWSER) {
}

// --- export ----------------------------------------------
if (_NODE_JS) {
    module.exports = SheetStorage;
}
global.SheetStorage = SheetStorage;

})(this.self || global);
