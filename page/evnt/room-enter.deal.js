module.exports = function(roomName) {
	if(this.room) return [false, 1];

	var room = conf.roomer.rooms[roomName];
	if(!room) retrun [false, 2];
	
	this.room = room;
	var users = room.users;
	users[this.nick] = this;
	
	var userList = [];
	for(var nick in users) userList.push(nick); 
	var userList2 = [room.owner];
	for(var nick in users) userList2.push(users[nick]); 
	
	var result = { owner:room.owner.nick, users:userList };
	
	push(userList2, 'room-list', result);
	
	return [true, result];
};