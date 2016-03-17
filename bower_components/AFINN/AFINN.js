var fs = require('fs');

var AFINNObject = function() {
	var obj = {};

	var words = fs.readFileSync('AFINN-111.txt').toString().split('\n');

	for(i in words) {
	    var wordAndSentiment = words[i].split('\t');
	    obj[wordAndSentiment[0]] = wordAndSentiment[1];
	}

	return obj;
}

var AFINNJSON = function() {
	return JSON.stringify(AFINNObject());
}

exports.AFINNObject = AFINNObject;
exports.AFINNJSON = AFINNJSON;