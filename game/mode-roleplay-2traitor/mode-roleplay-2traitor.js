exports.flow = function(game)
{
//先定义阶段间的连接
//身份选择阶段
	game.events.on("position-end", function()
	{
		game.events.emit("role", game);
	});
//武将选择阶段
	game.events.on("role-end", function()
	{
		game.events.emit("general", game);
	});
//游戏开始阶段
	game.events.on("general-end", function()
	{
		game.events.emit("game-start", game);
	});
	
	game.events.on("game-start-end", function()
	{
		game.events.emit("round", game);
	});
	
	
//开始第一个阶段, 开始游戏
//位置选择阶段
	game.events.emit("position", game);
};