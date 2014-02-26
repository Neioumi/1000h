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
    goalDate  : prop.goalDate  == null ? null : prop.goalDate,
    done      : prop.done      == null ? 0    : prop.done,
    delay     : prop.delay     == null ? 0    : prop.delay,
    yet       : prop.yet       == null ? 0    : prop.yet,
    total     : prop.total     == null ? 1000 : prop.total
  };
  this._adjustStatus();
}

SheetProperty.createId = SheetProperty_createId;
SheetProperty.load     = SheetProperty_load;
SheetProperty.remove   = SheetProperty_remove;

SheetProperty.prototype = {
       save: SheetProperty_save,
     remove: function () { SheetProperty.remove(this.sheetId); },

// private
  _adjustStatus: SheetProperty__adjustStatus
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
  },
  "done": {
    enumerable: true,
    get: function ()      { return this.prop.done; },
    set: function (value) { this.prop.done = value; this._adjustStatus(); }
  },
  "delay": {
    enumerable: true,
    get: function ()      { return this.prop.delay; },
    set: function (value) { this.prop.delay = value; this._adjustStatus(); }
  },
  "yet": {
    enumerable: true,
    get: function ()      { return this.prop.yet; },
    set: function (value) { this.prop.yet = value; this._adjustStatus(); }
  },
  "total": {
    enumerable: true,
    get: function ()      { return this.prop.total; },
    set: function (value) { this.prop.total = value; this._adjustStatus(); }
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

/**
 * Load sheet property associated with sheet ID.
 *
 * @param {Number} sheetId sheet ID
 * @return {SheetProperty} loaded object
 */
function SheetProperty_load(sheetId) {
  var prop = {},
      data = Storage.getJSON(makeStorageKey(sheetId), {});

  ["title", "done", "delay", "yet"].forEach(function (key) {
    prop[key] = data[key];
  });
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
}

/**
 * Remove propety from storage.
 */
function SheetProperty_remove(sheetId) {
  Storage.remove(makeStorageKey(sheetId));
}

// --- implement (private) ---------------------------------

/**
 * Adjust done, delay, yet values against total value.
 */
function SheetProperty__adjustStatus() {
  var diff = this.total - (this.done + this.delay + this.yet);
  if (diff > 0) {
    this.prop.yet += diff;
  } else if (diff < 0) {
    diff *= -1;

    if (this.prop.yet >= diff) {
      this.prop.yet -= diff;
    } else {
      diff -= this.prop.yet;
      this.prop.yet = 0;
      if (this.prop.delay >= diff) {
        this.prop.delay -= diff;
      } else {
        diff -= this.prop.delay;
        this.prop.delay = 0;
        if (this.prop.done >= diff) {
          this.prop.done -= diff;
        }
      }
    }
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
