(function(roomName) {
	if(result) {
		$('div#room.box').show();
		$('div#rooms.list').hide();
		
		$('div#rooms.dash').empty()
			.append($('<button id="room" class="exit">退出房间</button>')
				.on('click', function() { if(confirm('确定要退出房间吗?')) emit('room-exit'); }))
			.append($('<button id="game" class="start">开始游戏</button>')
				.on('click', function() { emit('game-start'); }));

		$('<p id="room" class="text owner">房主: </p>').appendTo($('div#room.box').empty())
			.append($('<span id="room" class="owner">').html(result));
	}
	else
		alert('该房间名称已被使用！');
})();