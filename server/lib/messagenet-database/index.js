var Datastore = require('nedb')
  , db = {
		modules: new Datastore({ filename: __dirname + '/modules.nedb' }),
		channels: new Datastore({ filename: __dirname + '/channels.nedb' }),
  		servers: new Datastore({ filename: __dirname + '/servers.nedb' }),
  		settings: new Datastore({ filename: __dirname + '/settings.nedb' }),
  		recipes: new Datastore({ filename: __dirname + '/recipes.nedb' })
	}

for (var i in db) {
	db[i].loadDatabase(function (err) {
		if (err) console.error(err);
	});
}

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

// settings
exports.getSettings = function (callback) {
	db.settings.find({}, callback);
}
exports.getSetting = function (id, callback) {
	db.settings.findOne({_id: id}, callback);
}

// recipes
exports.getRecipes = function (callback) {
	db.recipes.find({}, callback);
}
exports.getRecipe = function (id, callback) {
	db.recipes.findOne({_id: id}, callback);
}
exports.addRecipe = function (recipe, callback) {
	db.recipes.insert(recipe, callback);
}