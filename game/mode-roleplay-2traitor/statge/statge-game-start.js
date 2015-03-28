exports.flow = function(game)
{
	game.events.on("game-start-general-end", function(game)
	{
		game.events.emit("game-start-deal");
	});
	
	game.events.on("game-start-deal-end", function(game)
	{
		game.events.emit("game-start-ending");
	});
	
	game.events.on("game-start-ending-end", function(game)
	{
		game.events.emit("game-start-end");
	});
	game.events.emit("game-start-ganeral");
};