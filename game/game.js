var events = require("events");
var fs = require("fs");

exports.deck = require("./deck");

exports.players = [];
exports.mode;

exports.events = new events.EventEmitter();

exports.emitAll = function()
{
	for(var name in exports.players)
		exports.players[name].user.emit.apply(exports.players[name].user, arguments);
};

exports.poll = function(players, question, emitEnd, preFunc, dealFunc, endFunc)
{
	if(players.length > 0)
	{
		var player = players[0];
		
		player.user.once("select", function(choice)
		{
			dealFunc(choice, player);
			
			players.splice(0, 1);
			
			exports.questAll(players, question, choice, emitEnd, dealFunc, endFunc);

		});

		player.user.emit("select", question, preFunc());
	}
	else
	{
		exports.events.emit(emitEnd);
		endFunc(exports);
	}
};

exports.init = function(mode, users)
{
	exports.mode = mode;

	for(var name in users)
		exports.players.push({ "user":users[name] });

	exports.events.removeAllListeners();

	var events = mode.events;
	for(var evenName in events)
	{
		alert("注册事件["+evenName+"]");
		
		(function(evenName)
		{
			exports.events.on(evenName, function()
			{
				alert("触发事件["+evenName+"]");
				mode.pool.events[evenName].flow(exports);
			});
	 	})(evenName);
	}
};

exports.flow = function()
{
	exports.loader.option.mode.flow(exports);
};