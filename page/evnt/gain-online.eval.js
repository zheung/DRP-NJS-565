(function() {
	if(result) {
		$('span#users.online').html(result.usersOnline);
		$('span#rooms.online').html(result.roomsOnline);
	}
})();