var Datastore = require('nedb')
  , db = {
  	modules: new Datastore({ filename: __dirname + '/modules.nedb' }),
  	channels: new Datastore({ filename: __dirname + '/channels.nedb' })
  }

db.modules.loadDatabase(function (err) {
	if (err) console.error(err);
});
db.channels.loadDatabase(function (err) {
	if (err) console.error(err);
});

var fs = require('fs');
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

exports.getServer = function (id) {
	for (var i = 0; i < content.servers.length; i++) {
		if (content.servers[i].id == id) {
			return content.servers[i];
		}
	}
}

// already asynchronous
// modules
exports.getModules = function (callback) {
	return process.nextTick(function () {
		return callback(null, content.modules);
	});
}

exports.getModule = function (id, callback) {
	return process.nextTick(function () {
		return callback(null, content.modules[id]);
	});
}

// channels
exports.getChannels = function (callback) {
	return process.nextTick(function () {
		return callback(null, content.channels);
	});
}

exports.getChannel = function (id, callback) {
	return process.nextTick(function () {
		return callback(null, content.channels[id]);
	});
}

// other
exports.save = function (callback) {
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
									callback(null, 'successful');
								} else {
									callback(err, null);
								}
							});
						} else {
							callback(err, null);
						}
					});
				} else {
					callback(err, null);
				}
			});
		} else {
			callback(err, null);
		}
	});
}