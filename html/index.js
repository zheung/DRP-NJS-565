var socket;
var nick;

function enter()
{
	socket = io.connect("http://localhost:565");
	socket.emit("enter", document.getElementById("nick").value.trim());

	socket.on("enter", function(result, reason)
	{
		if(result)
		{
			nick = document.getElementById("nick").value;
			var eb = document.getElementById("enter-box");
			eb.parentNode.removeChild(eb);
			document.getElementById("chat-box").style.display="block";
			document.getElementById("users-box").style.display="block";
			document.getElementById("option-box").style.display="block";

		}
		else
		{
			alert(reason);
		}
	});

	socket.on("users", function(nicks, readys, owner)
	{
		var ub = document.getElementById("users-box");
		while(ub.hasChildNodes())
			ub.removeChild(ub.firstChild);

		var allReady = true, findNotReady = false;
		for(u in nicks)
		{
			var isOwner = u==owner;
			var isReady = readys[u];

			var ol;
			if(isOwner || isReady)
				ol = document.createElement("font");
			else
				ol = document.createElement("li");

			ol.innerHTML = u;

			if(isOwner)
			{
				ol.color = "red";

				olTemp = document.createElement("strong");
				olTemp.appendChild(ol);

				ol = document.createElement("li");
				ol.appendChild(olTemp);
			}
			else if(isReady)
			{
				ol.color = "blue";

				olTemp = document.createElement("li");
				olTemp.appendChild(ol);
				ol = olTemp;
			}

			ol.id = "online-"+u;
			ub.appendChild(ol);

			if(!findNotReady && !(isOwner || isReady))
			{
				allReady = false;
				findNotReady = true;
			}
		}

		var imOwner = owner==nick;

		document.getElementById("ready").style.display=imOwner?"none":"block";
		document.getElementById("start").style.display=imOwner?"block":"none";
		document.getElementById("option-box").style.display=imOwner?"block":"none";

		if(allReady)
			document.getElementById("start").disabled = "";
		else
			document.getElementById("start").disabled = "disabled";
	});

	socket.on("msg", function(content, tab, hr)
	{
		var m = document.createElement("li");

		while(tab-->0)
			m.innerHTML += "----";
		m.innerHTML += content;

		var mb = document.getElementById("msg-box");
		mb.insertBefore(m, mb.firstChild);

		if(hr)
			mb.insertBefore(document.createElement("hr"), mb.firstChild);
	});

	socket.on("mode", function(modeNow, modes)
	{
		var mode = document.getElementById("mode");

		for(var name in modes)
		{
			var option = document.createElement("option");

			option.value = name;
			option.innerHTML = modes[name].disp;

			if(name == modeNow)
				option.selected = "selected";
			
			mode.appendChild(option);
		}
	});

	socket.on("line", function()
	{
		var mb = document.getElementById("msg-box");
		mb.insertBefore(document.createElement("hr"), mb.firstChild);
	});

	socket.on("select", function(question, choices)
	{
		var s = document.getElementById("select-box");

		var oc = document.getElementsByName("select-choice");

		for(i=0; i < oc.length; i++)
			s.removeChild(oc[i]);

		document.getElementById("question").innerHTML = question;

		choices.forEach(function(choice)
		{
			var c = document.createElement("input");
			c.className = "select-choice";
			c.type = "button";
			c.value = choice;
			c.onclick = function()
			{
				select(choice);
			};

			s.appendChild(c);
		});

		s.style.display = "block";
	});
}

function msg()
{
	var ipt = document.getElementById("msg");

	if(ipt.value != "")
	{
		socket.emit("msg", ipt.value);

		ipt.value = "";
		ipt.focus();
	}
}

function keyDown(which, event)
{
	if(which.id=="msg")
		if(event.which == 13)
			msg();

	if(which.id=="nick")
		if(event.which == 13)
			enter();
}

function ready()
{
	var r = document.getElementById("ready");
	if(r.value == "准备")
	{
		r.value = "取消";
		socket.emit("ready");
	}
	else
	{
		r.value = "准备";
		socket.emit("cancel");
	}
}

function start()
{
	socket.emit("start");
}

function mode(which)
{
	socket.emit("mode", which.options[which.selectedIndex].value);
}

function select(content)
{
	socket.emit("select", content);
	document.getElementById("select-box").style.display = "none";
}

function test()
{
	var m = document.createElement("div");
	m.id = "mask";
	document.body.appendChild(m);

	setTimeout(function(){ m.className = "masked"; });
}