const fs = require('fs');
var content = JSON.parse(fs.readFileSync(__dirname + '/db.json'));

exports.get = function () {
	return content;
}

exports.set = function (newContent) {
	content = newContent;
}

exports.getServers = function () {
	return content.servers;
}

exports.save = function () {
	var contentCopy = JSON.stringify(content);
	// rename db.json to db.old.json
	fs.rename(__dirname + '/db.json', __dirname + '/db.old.json', function (err, data) {
		if (!err) {
			// write db.json
			fs.writeFile(__dirname + '/db.json', contentCopy, function (err, data) {
				if (!err) {
					// read db.json
					fs.readFile(__dirname + '/db.json', function (err, data) {
						// compare db.json to content
						if (!err && data == contentCopy) {
							// remove db.old.json
							fs.unlink(__dirname + '/db.old.json', function (err, data) {
								if (!err) {
									console.log('database save successful');
								}
							});
						}
					});
				}
			});
		}
	});
}

exports.getServerById = function (id) {
	for (var i = 0; i < content.servers.length; i++) {
		if (content.servers[i].id == id) {
			return content.servers[i];
		}
	}
}