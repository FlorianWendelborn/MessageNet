var db = require(__dirname + '/../lib/messagenet-database/');

exports.index = function(req, res) {
	db.getSettings(function (err, data) {
		if (!err) {
			res.send(data);
		} else {
			res.send("error");
		}
	});
}

exports.show = function (req, res) {
	db.getSetting(req.params.setting, function (err, data) {
		if (!err) {
			res.send(data);
		} else {
			res.send("error");
		}
	});
}