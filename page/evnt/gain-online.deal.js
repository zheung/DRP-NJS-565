module.exports = function() {
	var roomer = conf.roomer;
	return { usersOnline:Object.keys(roomer.users).length, roomsOnline:Object.keys(conf.roomer.rooms).length }; 
};