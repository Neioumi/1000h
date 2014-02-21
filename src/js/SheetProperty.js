/**
 * Sheet Property object associated with the sheet ID.
 * @module SheetProperty
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
 * Create a new property object.
 *
 * @constructor
 * @param {Number} sheetId sheet ID
 * @param {Object} prop properties
 */
function SheetProperty(sheetId, prop) {
  if (prop === undefined) {
    prop = {};
  }

  this.sheetId    = sheetId;
  this.storageKey = makeStorageKey(sheetId);
  this.prop = {
    title     : prop.title     == null ? null : prop.title,
    startDate : prop.startDate == null ? null : prop.startDate,
    goalDate  : prop.goalDate  == null ? null : prop.goalDate
  };
}

SheetProperty.createId = SheetProperty_createId;
SheetProperty.index    = SheetProperty_index;
SheetProperty.load     = SheetProperty_load;
SheetProperty.remove   = SheetProperty_remove;

SheetProperty.prototype = {
       save: SheetProperty_save,
     remove: function () { SheetProperty.remove(this.sheetId); }
};

Object.defineProperties(SheetProperty.prototype, {
  "title": {
    enumerable: true,
    get: function ()      { return this.prop.title; },
    set: function (value) { this.prop.title = value; }
  },
  "startDate": {
    enumerable: true,
    get: function ()      { return this.prop.startDate; },
    set: function (value) { this.prop.startDate = value; }
  },
  "goalDate": {
    enumerable: true,
    get: function ()      { return this.prop.goalDate; },
    set: function (value) { this.prop.goalDate = value; }
  }
});

// --- implement -------------------------------------------

/**
 * Create new sheet ID.
 *
 * @return {Number} new sheet ID
 */
function SheetProperty_createId() {
  var new_id = Number(Storage.get("sheet_id_sequence", 0)) + 1;
  Storage.set("sheet_id_sequence", new_id);
  return new_id;
}

function SheetProperty_index() {
  return Storage.getJSON("sheet_index", []);
}

/**
 * Load sheet property associated with sheet ID.
 *
 * @param {Number} sheetId sheet ID
 * @return {SheetProperty} loaded object
 */
function SheetProperty_load(sheetId) {
  var prop = {},
      data = Storage.getJSON(makeStorageKey(sheetId), {});

  prop.title = data.title === undefined ? null : data.title;
  ["startDate", "goalDate"].forEach(function (key) {
    prop[key] = timestampToDate(data[key]);
  });

  return new SheetProperty(sheetId, prop);
}

/**
 * Save property into storage.
 */
function SheetProperty_save() {
  var data = {
    title: this.prop.title
  };
  ["startDate", "goalDate"].forEach(function (key) {
    data[key] = dateToTimestamp(this.prop[key]);
  }, this);

  Storage.setJSON(this.storageKey, data);
  addToIndex(this.sheetId);
}

/**
 * Remove propety from storage.
 */
function SheetProperty_remove(sheetId) {
  removeFromIndex(sheetId);
  Storage.remove(makeStorageKey(sheetId));
}

// --- implement (private) ---------------------------------

function addToIndex(sheetId) {
  var index = Storage.getJSON("sheet_index", []);
  if (index.indexOf(sheetId) == -1) {
    index.push(sheetId);
    Storage.setJSON("sheet_index", index);
  }
}

function removeFromIndex(sheetId) {
  var index = Storage.getJSON("sheet_index", []),
      pos   = index.indexOf(sheetId);
  if (pos != -1) {
    index.splice(pos, 1);
    Storage.setJSON("sheet_index", index);
  }
}

function makeStorageKey(sheetId) {
  return "sheet[" + sheetId.toString() + "]";
}

function dateToTimestamp(date) {
  return date == null ? null : date.getTime();
}

function timestampToDate(timestamp) {
  return timestamp == null ? null : new Date(Number(timestamp));
}

if (_NODE_JS) {
} else if (_WORKER) {
} else if (_BROWSER) {
}

// --- export ----------------------------------------------
if (_NODE_JS) {
    module.exports = SheetProperty;
}
global.SheetProperty = SheetProperty;

})(this.self || global);
