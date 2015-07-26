(function() {
	if(result) {
		var enter = function(e) {
			if(!(e && e.type=='keyup' && e.keyCode != 13 && e.keyCode != 108)) {
				var roomName = inputRoomName.val().trim();
				roomName?emit('room-create', roomName):alert('房间名称不能为空');
			}
		};
		
		var roomCreate, roomCancel;
		var inputRoomName = $('<input id="room" class="name" tpye="text" placeholder="请输入房间名称">').val(result+' 的房间')
			.on('keyup', enter).appendTo($('div#rooms.dash').empty())
			.after(roomCancel = $('<button id="room" class="create cancel">取消</button>').on('click', function() {
				inputRoomName.remove();
				roomCreate.remove();
				roomCancel.remove();
			}))
			.after(roomCreate = $('<button id="room" class="create">创建</button>').on('click', enter));
	}
	else
		alert('你已经在房间中');
})();