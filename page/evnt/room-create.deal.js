module.exports = function(roomName) {
	var rooms = conf.roomer.rooms;
	
	if(rooms[roomName]) return false;
	
	this.room = rooms[roomName] = { name:roomName, users:{}, owner:this };
	
	return this.nick;
};