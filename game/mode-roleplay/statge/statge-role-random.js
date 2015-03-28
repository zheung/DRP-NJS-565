var orderPlay = function(players)
{
	var result = [];
	
	var findLord = false;
	for(i=0; i < players.length; i++)
	{
		if(players[i].role.name=="role-lord" && !findLord)
			findLord = true;
		else if(players[i].role.name=="role-lord" && findLord)
			break;
	
		if(findLord)
			result.push(players[i]);
		
		if(i == players.length-1)
			i = -1;
	}
	
	return result;
}

exports.flow = function(game)
{
	game.emitAll("msg", "开始角色选择阶段[选择模式: 随机].");

	utils.shuffle(game.loader.option.mode.roles[game.players.length], function(role, index)
	{
		game.players[index].role = game.loader.pool[role];
	});
	
	game.players = orderPlay(game.players);

	var result = "";
	for(i=0; i<game.players.length; i++)
		result += "["+game.players[i].user.nick+"] 是 "+game.players[i].role.disp+"; ";
	game.emitAll("msg", "角色选择结果: "+result, 1);

	game.emitAll("msg", "结束角色选择阶段[选择模式: 随机].", 0, true);
	
	game.events.emit("role-end");
};