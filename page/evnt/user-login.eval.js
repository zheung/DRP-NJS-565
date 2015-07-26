(function() {
	if(result) {
		$('<p id="nick">').html($('input#nick').remove().val()).prependTo(document.body);
		$('button#login').remove();
		
		$('<div id="online" class="box">').appendTo(document.body)
			.append($('<p id="users" class="text online">在线人数: </p>').append(usersOnline = $('<span id="users" class="online">')))
			.append($('<p id="rooms" class="text online">在线房间: </p>').append(roomsOnline = $('<span id="rooms" class="online">')));
		
		$('<div id="rooms" class="box">').appendTo(document.body)
			.append($('<div id="rooms" class="dash">')
				.append($('<button id="room" class="create want">创建房间</button>').on('click', function() {
					emit('room-create-want');
				})))
			.append($('<div id="room" class="box">')).append($('<div id="rooms" class="list">'));

		emit('gain-online');
		emit('gain-rooms', 1, 5);
	}
	else
		alert('该昵称已被使用！');
})();