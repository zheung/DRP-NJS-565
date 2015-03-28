exports.live;
exports.dead;
exports.general;

exports.draw = function(game, count, type)
{
	if(!tpye || type == 0)
		return exports.live.splice(0, count);
	else if(type == 2)
		return exports.general.splice(0, count);
};

exports.look = function(game, count)
{
	return exports.live.slice(0, count);
};

exports.fold = function(game, cards, type)
{
	cards.forEach(function(card)
	{
		if(!tpye || type == 0)
			exports.dead.push(card);
		else if(type == 2)
			exports.general.push(card);
	});
};

exports.find = function(game, type, findFunc)
{
	if(type == 0)
		return findFunc(exports.live);
	else if(type == 1)
		return findFunc(exports.dead);
	else if(type == 2)
		return findFunc(exports.general);
}