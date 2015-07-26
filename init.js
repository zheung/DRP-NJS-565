exports.init = function() {
//全局模块
	http = require('http');
	url = require('url');
	fs = require('fs');

	utils = require('./utils');
	loader = require("./loader")
//全局函数
	time = function() {
		return new Date().format('yy-MM-dd hh:mm:ss');
	};

	log = function(string) {
		console.log(string);
	};

	alert = function(string) {
		log(time()+' '+string);
	};

	kong = function() {};
	
	requireNew = function(path) {
		delete require.cache[require.resolve(path)];
		return require(path);
	};
	
	dealer = function(type) {
		try {
			return requireNew('./page/evnt/'+type+'.deal.js').apply(this, Array.prototype.slice.call(arguments, [1]));
		} catch(e) { if(e.code != 'MODULE_NOT_FOUND') log(e); }
	};
	
	evaler = function(type) {
		try {
			return fs.readFileSync('./page/evnt/'+type+'.eval.js').toString();
		} catch(e) { if(e.errno != -4058) log(e); };
	};
	
	push = function(sockets, type, result) {
		try {
			var code = fs.readFileSync('./page/evnt/'+type+'.eval.js').toString();
		
			for(var i in sockets) sockets[i].emit('msg', type, result, code);
		} catch(e) { if(e.errno != -4058) log(e); }
	};
//全局变量
	conf = { roomer:{ rooms:[], users:{} } };
//全局原型
	Date.prototype.format = function(format) {
		var o = {
			'M+' : this.getMonth()+1, //month
			'd+' : this.getDate(), //day
			'h+' : this.getHours(), //hour
			'm+' : this.getMinutes(), //minute
			's+' : this.getSeconds(), //second
			'q+' : Math.floor((this.getMonth()+3)/3), //quarter
			'S' : this.getMilliseconds() //millisecond
		};
		
		if(/(y+)/.test(format))
			format = format.replace(RegExp.$1, (this.getFullYear()+'').substr(4- RegExp.$1.length));
		
		for(var k in o)
			if(new RegExp('('+ k +')').test(format))
				format = format.replace(RegExp.$1, RegExp.$1.length==1? o[k] : ('00'+ o[k]).substr((''+ o[k]).length));

		return format;
	};

	String.prototype.surWith = function(startStr, endStr) {
		if(typeof(startStr)!='string' && typeof(endStr)!='string') return false;
		
		var result = true;
		
		if(typeof(startStr)=='string')
			if(this.indexOf(startStr) != 0)
				result = false;

		if(typeof(endStr)=='string')
			if(this.lastIndexOf(endStr) != (this.length-endStr.length))
				result = false;

		return result;
	};
}