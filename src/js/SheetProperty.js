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
          title: prop.title       == null ? null : prop.title,
      startDate: prop.startDate   == null ? null : prop.startDate,
       goalDate: prop.goalDate    == null ? null : prop.goalDate,
           done: prop.done        == null ?    0 : prop.done,
          total: prop.total       == null ? 1000 : prop.total,
    hoursPerDay: prop.hoursPerDay == null ?    8 : prop.hoursPerDay
  };
  this._adjustStatus();
}

SheetProperty.createId = SheetProperty_createId;
SheetProperty.load     = SheetProperty_load;
SheetProperty.remove   = SheetProperty_remove;

SheetProperty.prototype = {
            save: SheetProperty_save,
          remove: function () { SheetProperty.remove(this.sheetId); },
  getElapsedTime: SheetProperty_getElapsedTime,
        getDelay: SheetProperty_getDelay
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
    set: SheetProperty_set_done
  },
  "delay": {
    enumerable: true,
    get: SheetProperty_get_delay
  },
  "yet": {
    enumerable: true,
    get: SheetProperty_get_yet
  },
  "total": {
    enumerable: true,
    get: function ()      { return this.prop.total; },
    set: SheetProperty_set_total
  },
  "hoursPerDay": {
    enumerable: true,
    get: function ()      { return this.prop.hoursPerDay; },
    set: function (value) { this.prop.hoursPerDay = value; }
  }
});

// --- implement -------------------------------------------

// --- module methods --------

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

  ["title", "done", "total", "hoursPerDay"].forEach(function (key) {
    prop[key] = data[key];
  });
  ["startDate", "goalDate"].forEach(function (key) {
    prop[key] = timestampToDate(data[key]);
  });

  return new SheetProperty(sheetId, prop);
}

// --- properties ------------

function SheetProperty_set_done(value) {
  if (value >= 0 && value <= this.prop.total) {
    this.prop.done = value;
  }
}

function SheetProperty_get_delay() {
  var delay = this.getDelay();
  return delay < 0 ? 0 : delay;
}

function SheetProperty_get_yet() {
  return this.prop.total - this.prop.done;
}

function SheetProperty_set_total(value) {
  if (value >= 0) {
    this.prop.total = value;
    if (this.prop.done > this.prop.total) {
      this.prop.done = this.prop.total;
    }
  }
}

// --- instance methods ------

function SheetProperty_getElapsedTime(now) {
  if (now == null) {
    now = new Date();
  }
  return now.getTime() - this.prop.startDate.getTime();
}

function SheetProperty_getDelay(now) {
  var estimated_hours, elapsed_hours, elapsed_days, remaining_hours_in_today;

  elapsed_hours = Math.floor(this.getElapsedTime(now) / (60 * 60 * 1000));
  elapsed_days  = Math.floor(elapsed_hours / 24);
  remaining_hours_in_today = 24 - (elapsed_hours % 24);

  estimated_hours = elapsed_days * this.prop.hoursPerDay;
  if (remaining_hours_in_today < this.prop.hoursPerDay) {
    estimated_hours += this.prop.hoursPerDay - remaining_hours_in_today;
  }

  return estimated_hours - this.prop.done;
}

/**
 * Save property into storage.
 */
function SheetProperty_save() {
  var data = {};

  ["title", "done", "total", "hoursPerDay"].forEach(function (key) {
    data[key] = this.prop[key];
  });
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

// --- utilities -------------

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
