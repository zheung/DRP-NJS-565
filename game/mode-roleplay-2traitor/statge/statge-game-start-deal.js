exports.flow = function(game)
{
	game.deck.live = game.loader.option.mode.cards;
	game.deck.dead = [];
	
	game.deck.live = utils.shuffle(game.deck.live);
	
	game.players.forEach(function(player)
	{
		player.hand = game.deck.draw(game, 4);
		player.user.emit("msg", "你当前的手牌是");
	});
	

	game.events.emit("game-start-deal-end", game);
};