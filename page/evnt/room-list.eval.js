(function() {
	var roomBox = $('div#room.box').empty(), users = result.users;
	if(!roomBox.length) roomBox = $('<div id="room" class="box">').insertAfter($('div#rooms.dash'));

	$('<p id="room" class="text owner">房主: </p>').appendTo(roomBox)
		.append($('<span id="room" class="owner">').html(result.owner));
			
	for(var i in users)
		$('<p id="room" class="text user">玩家: </p>').appendTo(roomBox)
			.append($('<span id="room" class="owner">').html(users[i]));
})();