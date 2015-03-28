Date.prototype.format = function(format)
{
	var o =
	{
		"M+" : this.getMonth()+1, //month
		"d+" : this.getDate(), //day
		"h+" : this.getHours(), //hour
		"m+" : this.getMinutes(), //minute
		"s+" : this.getSeconds(), //second
		"q+" : Math.floor((this.getMonth()+3)/3), //quarter
		"S" : this.getMilliseconds() //millisecond
	}
	
	if(/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4- RegExp.$1.length));
	
	for(var k in o)
		if(new RegExp("("+ k +")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length==1? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));

	return format;
}

String.prototype.surWith = function(startStr, endStr)
{
	if(typeof(startStr)!="string" && typeof(endStr)!="string") return false;
	
	var result = true;
	
	if(typeof(startStr)=="string")
		if(this.indexOf(startStr) != 0)
			result = false;

	if(typeof(endStr)=="string")
		if(this.lastIndexOf(endStr) != (this.length-endStr.length))
			result = false;

	return result;
};

time = function()
{
	return new Date().format("yy-MM-dd hh:mm:ss");
}

log = function(string)
{
	console.log(string);
}

alert = function(string)
{
	console.log(time()+" "+string);
}

kong = function() {}

exports.toHome = function(res)
{
	res.writeHead(301, { "Location": '/'});
	res.end();
}

exports.leach = function(objFull, keys)
{
	var objLite = {};
	
	for(i=0; i<keys.length; i++)
		objLite[keys[i]] = objFull[keys[i]];
	
	return objLite;
}

exports.leachArray = function(objsFull, keys)
{
	var objsLite = {};
	
	for(var name in objsFull)
		objsLite[name] = exports.leach(objsFull[name], keys);
	
	return objsLite;
}

requireNew = function(path)
{
	delete require.cache[require.resolve(path)];
	return require(path);
}

exports.shuffle = function(away, dealFunc)
{
	var temp = [].concat(away);
	var result = [];

	for(var i=0; i < away.length; i++)
	{
		var j = Math.floor(Math.random()*temp.length);

		if(dealFunc)
			dealFunc(temp[j], i);
		
		result.push(temp[j]);
		
		temp.splice(j, 1);
	}
	
	return result;
};