exports.flow = function(game)
{
	game.emitAll("msg", "开始位置选择阶段[选择模式: 随机].");
	
	game.players = utils.shuffle(game.players, function(player, index)
	{
		player.position = index;
	});

	var result = "";
	for(i=0; i<game.players.length; i++)
		result += "["+game.players[i].user.nick+"] 是 "+i+"号位; ";
	game.emitAll("msg", "位置选择结果: "+result, 1);

	game.emitAll("msg", "结束位置选择阶段[选择模式: 随机].", 0, true);

	game.events.emit("position-end");
};