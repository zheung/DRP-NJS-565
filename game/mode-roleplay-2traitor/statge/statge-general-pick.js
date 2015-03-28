exports.flow = function(game)
{
	var temp = [].concat(game.players);
	
	game.poll(temp, "请输入你的武将", "general-end", function(player)
	{
		if(player.role.name == "role-lord")
			return game.deck.draw(game, 2);
		
		
	}, 
	function(choice, player)
	{
		if(choice)
			player.sex = choice;
	}, function(game)
	{
		var result = "";
		for(i=0; i<game.players.length; i++)
			result += "["+game.players[i].user.nick+"]的性别是["+game.players[i].sex+"]; ";
		game.emitAll("msg", "性别选择结果: "+result, 1);

		game.emitAll("msg", "结束武将选择阶段[选择模式: 随机].", 0, true);
	});
};