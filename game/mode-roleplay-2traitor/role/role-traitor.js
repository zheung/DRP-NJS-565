exports.checkWin = function(game)
{
	if(!this.deadOrder)
		for(i=0; i<game.players.length; i++)
			if(game.players[i].role.name == gRoleName.lord)
				if(game.players[i].deadOrder == game.players.length - 1)
					return true;
				
	return false;
};

exports.checkLost = function(game)
{
	return this.deadOrder?true:false;
}