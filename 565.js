require('./init').init();

var server = http.createServer(function(req, res) {
	if(req.url=='/hello') req.end('world');

	if(req.url=='/') {
		res.writeHead(200, { 'Content-Type':'text/html' });
		res.end(fs.readFileSync('./page/index.html').toString());
	}
	else if(req.url=='/js/index.js') {
		res.writeHead(200, { 'Content-Type':'application/x-javascript' });
		res.end(fs.readFileSync('./page/js/index.js').toString());
	}
	else if(req.url=='/js/jquery.js') {
		res.writeHead(200, { 'Content-Type':'application/x-javascript' });
		res.end(fs.readFileSync('./page/js/jquery.js').toString());
	}
	else if(req.url=='/css/index.css') {
		res.writeHead(200, { 'Content-Type':'text/css' });
		res.end(fs.readFileSync('./page/css/index.css').toString());
	}
	else if(req.url=='/test') {
		res.writeHead(200, { 'Content-Type':'text/html' });
		res.end(fs.readFileSync('./page/test.html').toString());
	}
	else utils.toHome(res);
});

require('./socket').init(require('socket.io').listen(server));

server.listen(565);