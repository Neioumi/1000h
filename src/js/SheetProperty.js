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
 * Create a new property.
 *
 * @constructor
 * @param {Number} sheetId sheet ID
 */
function SheetProperty(sheetId) {
  this.sheetId    = sheetId;
  this.storageKey = "sheet[" + sheetId.toString() + "]";
  this.prop = {
    title     : null,
    startDate : null,
    goalDate  : null
  };
  this.load();
}

SheetProperty.createId = SheetProperty_createId;

SheetProperty.prototype = {
       load: SheetProperty_load,
       save: SheetProperty_save,
     remove: SheetProperty_remove
};

Object.defineProperties(SheetProperty.prototype, {
  "title": {
    enumerable: true,
    get: function ()      { return this.prop.title; },
    set: function (value) { this.prop.title = value; this.save(); }
  },
  "startDate": {
    enumerable: true,
    get: function ()      { return this.prop.startDate; },
    set: function (value) { this.prop.startDate = value; this.save(); }
  },
  "goalDate": {
    enumerable: true,
    get: function ()      { return this.prop.goalDate; },
    set: function (value) { this.prop.goalDate = value; this.save(); }
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

function SheetProperty_load() {
  var data = Storage.getJSON(this.storageKey, {});
  this.prop.title = data.title === undefined ? null : data.title;
  ["startDate", "goalDate"].forEach(function (key) {
    this.prop[key] = timestamp_to_date(data[key]);
  }, this);
}

function SheetProperty_save() {
  var data = {
    title: this.prop.title
  };
  ["startDate", "goalDate"].forEach(function (key) {
    data[key] = date_to_timestamp(this.prop[key]);
  }, this);
  Storage.setJSON(this.storageKey, data);
}

function SheetProperty_remove() {
  Storage.remove(this.storageKey);
}

function date_to_timestamp(date) {
  return date == null ? null : date.getTime();
}

function timestamp_to_date(timestamp) {
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
