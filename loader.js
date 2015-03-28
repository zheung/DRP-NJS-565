var fs = require("fs");

exports.modes = {};
exports.mode;

exports.init = function()
{
	var fileNames = fs.readdirSync("./game/");
	
	fileNames.forEach(function(fileName)
	{
		if(fs.statSync("./game/"+fileName).isDirectory())
		{
			var mode = JSON.parse(fs.readFileSync("./game/"+fileName+"/loader/mode.json").toString());
			
			exports.modes[mode.name] = mode;
		}
	});
};

exports.load = function()
{
	var mode = exports.mode;
	
	var modePathFS = "./game/"+mode.name+"/loader/";
	
	var fileNames = fs.readdirSync(modePathFS);
	
	fileNames.forEach(function(fileName)
	{
		if(fileName.surWith(null, ".json") && fs.statSync(modePathFS+fileName).isFile())
		{
			var pord;
			
			if(fileName.surWith("pool-"))
				pord = "pool";
			
			if(fileName.surWith("deck-"))
				pord = "deck";
			
			if(!pord) return;
			
			var eleType = fileName.replace("\.json", "").replace(pord+"-", "");
			
			mode[pord][eleType] = JSON.parse(fs.readFileSync(modePathFS+fileName).toString());
		}
	});
	
	for(var poolName in mode.pool)
		for(var eleName in mode.pool[poolName])
		{
			var element = mode.pool[poolName][eleName];
			
			if(element.file)
			{
				var eleFunc = require(elements[eleName].file);

				for(var funcName in eleFunc)
					element[funcName] = eleFunc[funcName];
		
				delete element.file;
			}
		}
	
	return mode;
};
