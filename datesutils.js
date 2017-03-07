var numDaysBetween = function(d1, d2) {
  var diff = Math.abs(d1.getTime() - d2.getTime());
  return diff / (1000 * 60 * 60 * 24);
};

var d1 = new Date(2011, 0, 1); // Jan 1, 2011
var d2 = new Date(2011, 0, 2); // Jan 2, 2011
numDaysBetween(d1, d2); // => 1
var d3 = new Date(2010, 0, 1); // Jan 1, 2010
numDaysBetween(d1, d3); // => 365


// Date.parse supports the format mm/dd/yyyy not dd/mm/yyyy. For that either you have to use a library like moment.js or do something as given below

var dateFrom = "02/05/2013";
var dateTo = "02/09/2013";
var dateCheck = "02/07/2013";

var d1 = dateFrom.split("/");
var d2 = dateTo.split("/");
var c = dateCheck.split("/");

var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
var check = new Date(c[2], parseInt(c[1])-1, c[0]);

console.log(check > from && check < to)
