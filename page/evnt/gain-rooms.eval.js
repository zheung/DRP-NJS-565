(function() {
	if(result) {
		var roomsList = $('div#rooms.list').empty();

		if(!result.length) $('<p id="room" class="empty">').html('没有房间').appendTo(roomsList);

		for(var i in result) {
			var roomInfo = result[i];
			
			$('<p id="room" class="info">').appendTo(roomsList)
			.append($('<span id="room" class="text name">房间名称: </span>'))
				.append($('<span id="room" class="name">').html(roomInfo.name))
			.append($('<span id="room" class="text owner"> | 房主: </span>'))
				.append($('<span id="room" class="owner">').html(roomInfo.owner))
			.append($('<button id="room" class="enter">进入房间</button>').on('click', function(){
				emit('room-enter', roomInfo.name);
			}));
		}
	}
})();