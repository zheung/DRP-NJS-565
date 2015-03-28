exports.checkWin = function(game)
{
	for(i=0; i<game.players.length; i++)
		if(game.players[i].role.name == gRoleName.lord)
			return game.players[i].deadOrder?true:false;
};

exports.checkLost = function(game)
{
	for(i=0; i<game.players.length; i++)
		if(game.players[i].role.name == gRoleName.rebel)
			if(!game.players[i].deadOrder)
				return false;
			
	return true;
}