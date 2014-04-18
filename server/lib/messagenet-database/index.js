var Datastore = require('nedb')
  , db = {
		modules: new Datastore({ filename: __dirname + '/modules.nedb' }),
		channels: new Datastore({ filename: __dirname + '/channels.nedb' }),
  		servers: new Datastore({ filename: __dirname + '/servers.nedb' })
	}

db.modules.loadDatabase(function (err) {
	if (err) console.error(err);
});
db.channels.loadDatabase(function (err) {
	if (err) console.error(err);
});
db.servers.loadDatabase(function (err) {
	if (err) console.error(err);
});

// modules
exports.getModules = function (callback) {
	db.modules.find({}, callback);
}

exports.getModule = function (id, callback) {
	db.modules.findOne({_id: id}, callback);
}

// channels
exports.getChannels = function (callback) {
	db.channels.find({}, callback);
}

exports.getChannel = function (id, callback) {
	db.channels.findOne({_id: id}, callback);
}

// servers
exports.getServers = function (callback) {
	db.servers.find({}, callback);
}

exports.getServer = function (id, callback) {
	db.servers.findOne({_id: id}, callback);
}