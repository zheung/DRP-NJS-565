exports.toHome = function(res) {
	res.writeHead(301, { "Location": '/'});
	res.end();
};

exports.leach = function(objFull, keys) {
	var objLite = {};
	
	for(var i=0; i<keys.length; i++)
		objLite[keys[i]] = objFull[keys[i]];
	
	return objLite;
};

exports.leachArray = function(objsFull, keys) {
	var objsLite = {};
	
	for(var name in objsFull)
		objsLite[name] = exports.leach(objsFull[name], keys);
	
	return objsLite;
};

exports.shuffle = function(away, dealFunc) {
	var temp = [].concat(away);
	var result = [];

	for(var i=0; i < away.length; i++) {
		var j = Math.floor(Math.random() * temp.length);

		if(dealFunc)
			dealFunc(temp[j], i);
		
		result.push(temp[j]);
		
		temp.splice(j, 1);
	}
	
	return result;
};