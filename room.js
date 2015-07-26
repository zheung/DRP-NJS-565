var online = 0;
var ready = 1;

var owner;
var game;

exports.make = function() {
	return { users: {}, ready: [] };
};