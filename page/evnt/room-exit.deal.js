module.exports = function() {
	var room = this.room;
	
	if(room) {
		delete this.room;
		
		if(room.owner==this) {
			for(var nick in room.users) {

				room.owner = room.users[nick];
				delete room.users[nick];

				return true;
			}
			delete conf.roomer.rooms[room.name];
			
			return true;
		}
		else {
			delete room.users[this.nick];
		}
			
	}
	else return false;
};