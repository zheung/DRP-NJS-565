(function() {
	if(result) {
		$('div#room.box').hide();
		$('div#rooms.list').show();
		
		$('div#rooms.dash').empty().append($('<button id="room" class="create want">创建房间</button>')
			.on('click', function() { emit('room-create-want'); }));
		
		emitLink([['gain-online'], ['gain-rooms', 1, 5]]);
	}
	else
		alert('你没有加入房间吧?');
})();