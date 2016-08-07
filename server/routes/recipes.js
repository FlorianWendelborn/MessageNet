var db = require(__dirname + '/../lib/messagenet-database/');

exports.index = function(req, res) {
	db.getRecipes(function (err, data) {
		if (!err) {
			res.send(data);
		} else {
			res.send("error");
		}
	});
}

exports.show = function (req, res) {
	db.getRecipe(req.params.recipe, function (err, data) {
		if (!err) {
			res.send(data);
		} else {
			res.send("error");
		}
	});
}

exports.create = function (req, res) {
	db.addRecipe(req.body, function (err, data) {
		if (!err) {
			res.send({err: false});
		} else {
			res.send({err: true});
		}
	});
}