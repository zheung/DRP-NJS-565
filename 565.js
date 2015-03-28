//--------------原生模块
var http = require("http");
var url = require("url");
var fs = require("fs");
//--------------引用模块
var sio = require("socket.io");
//--------------自用模块
utils = require("./utils");
var loader = require("./loader");
//--------------正式代码
var users = {};
var nicks = {};
var readys = {};

var online = 0;
var ready = 1;

var owner;
var game;

loader.init();
for(var modeName in loader.modes)
{
	loader.mode = loader.modes[modeName];
	break;
}

var server = http.createServer(function(req, res)
{
	if(req.url=="/hello")
		req.end("world");

	if(req.url=="/")
	{
		res.writeHead(200, { "Content-Type":"text/html" });
		res.end(fs.readFileSync("./html/index.html").toString());
	}
	else if(req.url=="/index.css")
	{
		res.writeHead(200, { "Content-Type":"text/css" });
		res.end(fs.readFileSync("./html/index.css").toString());
	}
	else if(req.url=="/index.js")
	{
		res.writeHead(200, { "Content-Type":"application/x-javascript" });
		res.end(fs.readFileSync("./html/index.js").toString());
	}
	else if(req.url=="/test")
	{
		res.writeHead(200, { "Content-Type":"text/html" });
		res.end(fs.readFileSync("./html/test.html").toString());
	}
	else
		utils.toHome(res);
});

var io = sio.listen(server);

server.listen(565);

io.sockets.on("connection",  function(socket)
{
	socket.on("enter", function(nick)
	{
		if(!users[nick])
		{
			socket.emit("enter", true);

			socket.nick = nick;
			users[nick] = socket;
			nicks[nick] = nick;
			readys[nick] = false;

			if(++online == 1)
			{
				owner = nick;
				socket.emit("msg", "你是第1位进入的用户, 现在你是房主.");
				
				socket.emit("mode", loader.mode.name, utils.leachArray(loader.modes, ["name", "disp"]));
			}
			else
				socket.emit("msg", "你是第"+online+"进入的用户, 房主是["+owner+"]");

			io.sockets.emit("users", nicks, readys, owner);
			io.sockets.emit("msg", "用户["+nick+"] 已进入, 当前人数: "+online);

			alert("用户["+nick+"] 已进入, 当前人数: "+online+", 当前房主["+owner+"]");
		}
		else
		{
			socket.emit("enter", false, "该昵称已被使用.");

			alert("用户["+nick+"] 因昵称已被使用而未能进入.");
		}
	});

	socket.on("disconnect", function()
	{
		if(!socket.nick) return;

		if(readys[socket.nick]) ready--;
		
		delete users[socket.nick];
		delete nicks[socket.nick];
		delete readys[socket.nick];
		io.sockets.emit("users", nicks, readys, owner);

		if(socket.nick==owner)
		{
			owner = null;

			for(var u in users)
			{
				owner = nicks[u];

				readys[u] = false;
				
				io.sockets.emit("msg", "原房主已退出, 新房主是["+owner+"]");
				
				users[owner].emit("mode", loader.mode, utils.leachArray(loader.modes, ["name", "disp"]));
				
				break;
			}
		}

		io.sockets.emit("users", nicks, readys, owner);
		io.sockets.emit("msg", "用户["+socket.nick+"] 已退出, 当前人数: "+ --online);

		alert("用户["+socket.nick+"] 已退出, 当前人数:"+ online+", 当前房主["+owner+"]");
	});

	socket.on("msg", function(cotent)
	{
		if(!socket.nick) return;

		io.sockets.emit("msg", "<strong><font color=\"blue\">"+socket.nick+"</font></strong> 说: "+cotent);
	});

	socket.on("ready", function()
	{
		if(!socket.nick) return;

		ready++;

		readys[socket.nick] = true;

		io.sockets.emit("users", nicks, readys, owner);
		socket.broadcast.emit("msg", "用户["+socket.nick+"] 已准备.");

		alert("用户["+socket.nick+"] 已准备.");
	});

	socket.on("cancel", function()
	{
		if(!socket.nick) return;

		ready--;

		readys[socket.nick] = false;

		io.sockets.emit("users", nicks, readys, owner);
		socket.broadcast.emit("msg", "用户["+socket.nick+"] 已取消准备.");

		alert("用户["+socket.nick+"] 已取消准备.");
	});

	socket.on("mode", function(modeName)
	{
		if(socket.nick == owner)
			loader.mode = loader.modes[modeName];
		
		alert("游戏模式已更改, 当前为["+loader.mode.disp+"]");
		io.sockets.emit("msg", "游戏模式已更改, 当前为["+loader.mode.disp+"].");
	});

	socket.on("start", function()
	{
		if(!socket.nick) return;

		if(ready==online)
		{
			alert("游戏开始");
			io.sockets.emit("msg", "游戏马上开始!!!", 0, true);

			game = requireNew("./game/game");

			game.init(loader.load(), users);
			game.flow();
		}
		else
			socket.emit("msg", "部分用户尚未准备, 游戏不能开始.");
	});
});