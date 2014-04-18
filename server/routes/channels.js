var db = require(__dirname + '/../lib/messagenet-database/');

exports.index = function(req, res) {
	db.getChannels(function (err, data) {
		if (!err) {
			res.send(data);
		} else {
			res.send("error");
		}
	});
}

exports.show = function (req, res) {
	db.getChannel(req.params.channel, function (err, data) {
		if (!err) {
			res.send(data);
		} else {
			res.send("error");
		}
	});
}