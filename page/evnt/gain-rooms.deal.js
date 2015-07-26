module.exports = function(page, size) {
	var result = [], rooms = conf.roomer.rooms, roomNames = Object.keys(rooms);
	
	for(var i=(page-1)*size; i<page*size; i++) {
		var roomName = roomNames[i];
		
		if(roomNames[i]) {
			var room = rooms[roomName];
			
			result.push({ name:room.name, owner:room.owner.nick });
		}
		else break;
	}

	return result;
};