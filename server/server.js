console.log('  __  __                                _   _      _   \n |  \\/  |                              | \\ | |    | |  \n | \\  / | ___  ___ ___  __ _  __ _  ___|  \\| | ___| |_ \n | |\\/| |/ _ \\/ __/ __|/ _` |/ _` |/ _ \\ . ` |/ _ \\ __|\n | |  | |  __/\\__ \\__ \\ (_| | (_| |  __/ |\\  |  __/ |_ \n |_|  |_|\\___||___/___/\\__,_|\\__, |\\___|_| \\_|\\___|\\__|\n                              __/ |                    \n                             |___/                     \n-------------------------------------------------------');
/*--------------------------------------------------[require]--------------------------------------------------*/

// native
var net = require('net')
  , https = require('https')
  , fs = require('fs')
  , path = require('path');

// express
var express = require('express')
  , Resource = require('express-resource');

// custom
var crypto = require(__dirname + '/lib/messagenet-crypto/')
  , db = require(__dirname + '/lib/messagenet-database/')
  , config = require(__dirname + '/lib/messagenet-config/');

/*--------------------------------------------------[variables]--------------------------------------------------*/

var servers = new Object();

/*--------------------------------------------------[express]--------------------------------------------------*/

var app = express();

app.use(express.static(path.join(__dirname, '/../web/')));

app.resource('api/modules', require('./routes/modules'));
app.resource('api/channels', require('./routes/channels'));
app.resource('api/settings', require('./routes/settings'));

https.createServer({
	key: fs.readFileSync(__dirname + '/ssl/ssl.key'),
	cert: fs.readFileSync(__dirname + '/ssl/ssl.cert')
}, app).listen(config.http.port, function () {
	console.log('express is running on port ' + config.http.port);
});

/*--------------------------------------------------[tcp]--------------------------------------------------*/
servers.tcp = net.createServer(function (conn) {
	console.log("server connected");

	conn.on("end", function() {
		console.log('Server: Client disconnected');
	});

	conn.on("data", function(d) {
		var data = JSON.parse(d);
		db.getServer(data.id, function (err, server) {
			if (!err) {
				// log access
				console.log(server.ip + ':' + server.port + ': ' + d.toString());

				// decrypt
				db.getServer(config.id, function (err, own) {
					if (!err) {
						var message = crypto.decrypt(data.message, own.key);

						console.log(message);

						growl.sendNotification(message.from, {
							title: server.name + ': ' + message.from,
							text: message.data
						});
					} else {
						console.error('could not get own server');
						console.error(err);
					}
				});
			} else {
				console.error('could not get server');
				console.error(err);
			}
		});
	});
}).listen(config.tcp.port, function () {
	console.log('TCP server running on port ' + config.tcp.port);
});

// connect to every server
// var dbServers = db.getServers();
// for (var i = 0; i < dbServers.length; i++) {
// 	if(dbServers[i].id != config.id) {
// 		connectToServer(dbServers[i]);
// 		console.log('connecting to ' + dbServers[i].ip + ":" + dbServers[i].port);
// 	}	
// }

// function connectToServer (server) {
// 	var socket = new net.Socket();
// 	socket.connect(server.port, server.ip, function () {
// 		console.log('connected to ' + server.ip + ':' + server.port);
		
// 		// send initial packet
// 		socket.write(JSON.stringify({
// 			'id': config.id,
// 			'message': crypto.encrypt({
// 				'from':'startup',
// 				'data':'this is not a test'
// 			}, server.key)
// 		}));
// 		socket.end();
// 	});

// 	socket.on('data', function (data) {
// 		// log message
// 		console.log(data.toString());
// 		data = crypto.decryptString(data.toString(), server.key);
// 		console.log("Response from server: %s", data);
		
// 		// send message
// 		socket.write(crypto.encryptString('test', server.key));
// 		socket.end();
// 	});
// 	socket.on('error', function (err) {
// 		socket.destroy();
// 		setTimeout(function () {
// 			connectToServer(server);
// 		}, 60000);
// 	});
// }

/*--------------------------------------------------[old]--------------------------------------------------*/
// getting icons
// var icons = {
// 	nodejs: fs.readFileSync(__dirname + '/icons/nodejs.png'),
// 	rss: fs.readFileSync(__dirname + '/icons/rss.png')
// }

// this will be turned into seperate modules later
// some of the code is for testing purposes only and will be moved to seperate files or deleted

// configure growl
// var growler = require('growler');
// var growl = new growler.GrowlApplication('Messagenet');

// growl.setNotifications({
// 	'Response from Client': {
// 		icon: icons.nodejs
// 	},
// 	'Server Status': {
// 		icon: icons.nodejs
// 	},
// 	'startup': {
// 		icon: icons.nodejs
// 	},
// 	'rss': {
// 		icon: icons.rss
// 	}
// });
// growl.register();

// modules
// new require(__dirname + '/modules/rss').Event('feedSubscription',{
// 	url: 'http://registry.npmjs.org/-/rss?descending=true&limit=5'
// }, function (err, data) {
// 	growl.sendNotification('rss', {
// 		title: data.item.title,
// 		text: data.item.description,
// 		sticky: false
// 	});
// });

// new require(__dirname + '/modules/rss').Event('feedSubscription',{
// 	url: 'http://blog.fefe.de/rss.xml'
// }, function (err, data) {
// 	growl.sendNotification('rss', {
// 		title: 'blog.fefe.de',
// 		text: data.item.title,
// 		sticky: true
// 	});
// });