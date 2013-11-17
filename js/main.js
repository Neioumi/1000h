// Set 3 status color


// Save Settings
$(document).ready(function(){
	$('#settings form').submit(saveSettings);
	loadSettings();
	dispSettings();
});

// Save settings to localStorage
function saveSettings() {
	localStorage.goal = $('#goal').val();
	localStorage.startdate = $('#startDate').val();
	localStorage.goaldate = $('#goalDate').val();
	return false;
}

// load settings from localStorage
function loadSettings() {
	$('#goal').val(localStorage.goal);
	$('#startDate').val(localStorage.startdate);
	$('#goalDate').val(localStorage.goaldate);
}

// Display settings on status-panel
function dispSettings() {
	$('#goaltxt').text(localStorage.goal);
	$('#startdatetxt').text(localStorage.startdate);
	$('#goaldatetxt').text(localStorage.goaldate);
}


// Display 1000 circles with .yet.
// 6*167line (The last line has 2 blanks)


// Set period
// Plan: 1000h/period * dates from the start.
// Set "delay" color:
// Check how many circles are in delay status.
// If a circle color isn't "done", change those circles class to "delay". (Doesn't matter innner span's class are set or not.)


// Set "done" color:
// When a circle is the first or just after a circle with .done, color can be changed by tap.
// ( In other case, how to shown user have to touch other circle? )
// Set class (.done_15min, .done_30min, .done_45min) to inner span.
// When tap 4 times, clear class of inner span, set .done to outer span. Tap one more, back to color delay/yet.
// Or, flick right to reset?
// When hold a circle, change class to done circles all at once.


