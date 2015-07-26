module.exports = function(nick) {
	var roomer = conf.roomer;
	
	if(!roomer.users[nick]) {
		this.nick = nick;

		roomer.users[nick] = this;
		
		return true;
	}
	else return false;
};