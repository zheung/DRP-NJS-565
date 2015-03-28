exports.checkWin = function(game)
{
	for(i=0; i<game.players.length; i++)
		if(!game.players[i].deadOrder)
			if(game.players[i].role.name == gRoleName.rebel || game.players[i].role.name == gRoleName.traitor)
				return false;
	
	return true;
};

exports.checkLost = function(game)
{
	//for(i=0; i<game.players.length; i++)
		//if(game.players[i].role == gRole.lord)
			return this.deadOrder?true:false;
};