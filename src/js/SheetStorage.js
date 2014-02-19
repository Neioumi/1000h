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
  getDate: SheetStorage_getDate,
  setDate: SheetStorage_setDate,
   remove: SheetStorage_remove,
   keyFor: SheetStorage_keyFor
};

Object.defineProperties(SheetStorage.prototype, {
  "title": {
    enumerable: true,
    get: function ()      { return this.get("title"); },
    set: function (value) { this.set("title", value); }
  },
  "startDate": {
    enumerable: true,
    get: function ()      { return this.getDate("start_date"); },
    set: function (value) { this.setDate("start_date", value); }
  },
  "goalDate": {
    enumerable: true,
    get: function ()      { return this.getDate("goal_date"); },
    set: function (value) { this.setDate("goal_date", value); }
  }
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

/**
 * Return the value as Date object.
 *
 * @param {String} name the key
 * @param {Date} the value
 */
function SheetStorage_getDate(name) {
  var date = this.get(name);
  return date !== null ? new Date(Number(date)) : null;
}

/**
 * Store the value as UTC milliseconds using getTime() method.
 *
 * @param {String} name the key
 * @param {Object} date the value
 */
function SheetStorage_setDate(name, date) {
  this.set(name, date.getTime());
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