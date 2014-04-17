var db = require(__dirname + '/../lib/messagenet-database/');

exports.index = function(req, res) {
	db.getModules(function (err, data) {
		if (!err) {
			res.send(data);
		} else {
			res.send("error");
		}
	});
}

exports.show = function (req, res) {
	db.getModule(req.params.module, function (err, data) {
		if (!err) {
			res.send(data);
		} else {
			res.send("error");
		}
	});
}