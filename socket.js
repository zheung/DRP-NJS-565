exports.init = function(io) {
	io.sockets.on('connection', function(socket) {
		socket.on('msg', function(type) {
			socket.emit('msg', type, dealer.apply(socket, arguments), evaler(type));
		});
		
		socket.on('disconnect', function() {
			requireNew('./page/evnt/room-exit.deal.js').apply(socket);

			var nick = socket.nick;
			if(nick) delete conf.roomer.users[nick];
			
			clearInterval(socket.breath);
		});
		
		socket.breath = setInterval(function() {
			socket.emit('msg', 'gain-online', dealer.apply(socket, ['gain-online']), evaler('gain-online'));
		}, 5214);
	});
}