(function(roomName) {
	console.log(result);
	if(result[0]) {
		$('div#room.box').show();
		$('div#rooms.list').hide();
		
		$('div#rooms.dash').empty().append($('<button id="room" class="exit">退出房间</button>')
			.on('click', function() { if(confirm('确定要退出房间吗?')) emit('room-exit'); }));
		
		var roomBox = $('div#room.box').empty(), roomInfo = result[1], users = roomInfo.users;
		
		$('<p id="room" class="text owner">房主: </p>').appendTo(roomBox)
			.append($('<span id="room" class="owner">').html(roomInfo.owner));
				
		for(var i in users)
			$('<p id="room" class="text user">玩家: </p>').appendTo(roomBox)
				.append($('<span id="room" class="owner">').html(users[i]));
	}
	else if(result[1] == 1) alert('你已经在房间中');
	else if(result[1] == 2) alert('该房间不存在');
})();