(function() {
	var enter = function(e) {
		if(!(e && e.type=='keyup' && e.keyCode != 13 && e.keyCode != 108)) {
			var nickName = nick.val().trim();
			nickName?emit('user-login', nickName):alert('昵称不能为空');
		}
	};

	var nick = $('<input id="nick" tpye="text" placeholder="请输入你的昵称">').on('keyup', enter).appendTo(document.body);
	$('<button id="login">登录</button>').on('click', enter).appendTo(document.body);
	
	nick.val('Dr.但诺'+parseInt(Math.random()*100));//TODO debug
})();