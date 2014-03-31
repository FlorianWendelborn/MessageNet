const net = require('net');
const http = require('http');
const fs = require('fs');
const crypto = require(__dirname + '/crypto.js');
const growler = require('growler');

var config = JSON.parse(fs.readFileSync(__dirname + '/config.json'));
var db = require('./database/main.js');

var servers = new Object();

// getting growl icons
const icon = require('fs').readFileSync(__dirname + '/icons/nodejs.png');
const minecraft = require('fs').readFileSync(__dirname + '/icons/minecraft.png');
const rss = require('fs').readFileSync(__dirname + '/icons/rss.png');

// configure growl
var growl = new growler.GrowlApplication('Messagenet');

growl.setNotifications({
	'Response from Client': {
		icon: icon
	},
	'Server Status': {
		icon: icon
	},
	'startup': {
		icon: icon
	},
	'minecraft-server': {
		icon: minecraft
	},
	'rss': {
		icon: rss
	}
});
growl.register();

// configure http
servers.http = http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end('<!doctype html><html><head><title>MessageNet</title></head><body style="background-color: #000"><span style="color: #0f0">This is not the MessageNet.</span></body></html>');
}).listen(config.http.port, '127.0.0.1', function () {
	console.log('HTTP server running on port ' + config.http.port);
	growl.sendNotification('Server Status', {
		title: 'HTTP server online',
		text: 'running on port ' + config.http.port
	});
});

// configure tcp
servers.tcp = net.createServer(function (conn) {
	console.log("server connected");

	conn.on("end", function() {
		console.log('Server: Client disconnected');
	});

	conn.on("data", function(d) {
		var data = JSON.parse(d);
		var server = db.getServerById(data.id);
		
		// log access
		console.log(server.ip + ':' + server.port + ': ' + d.toString());

		// decrypt
		var message = crypto.decrypt(data.message, db.getServerById(config.id).key);

		console.log(message);

		growl.sendNotification(message.from, {
			title: server.name + ': ' + message.from,
			text: message.data
		});
	});
}).listen(config.tcp.port, function () {
	console.log('TCP server running on port ' + config.tcp.port);
	growl.sendNotification('Server Status', {
		title: 'TCP server online',
		text: 'running on port ' + config.tcp.port
	});
});

// connect to every server
var dbServers = db.getServers();
for (var i = 0; i < dbServers.length; i++) {
	if(dbServers[i].id != config.id) {
		connectToServer(dbServers[i]);
		console.log('connecting to ' + dbServers[i].ip + ":" + dbServers[i].port);
	}	
}

function connectToServer (server) {
	var socket = new net.Socket();
	socket.connect(server.port, server.ip, function () {
		console.log('connected to ' + server.ip + ':' + server.port);
		
		// send initial packet
		socket.write(JSON.stringify({
			'id': config.id,
			'message': crypto.encrypt({
				'from':'startup',
				'data':'this is not a test'
			}, server.key)
		}));
		socket.end();
	});

	socket.on('data', function (data) {
		// log message
		console.log(data.toString());
		data = crypto.decryptString(data.toString(), server.key);
		console.log("Response from server: %s", data);
		
		// send message
		socket.write(crypto.encryptString('test', server.key));
		socket.end();
	});
	socket.on('error', function (err) {
		socket.destroy();
		setTimeout(function () {
			connectToServer(server);
		}, 60000);
	});
}

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

new require(__dirname + '/modules/rss').Event('feedSubscription',{
	url: 'http://blog.fefe.de/rss.xml'
}, function (err, data) {
	growl.sendNotification('rss', {
		title: 'blog.fefe.de',
		text: data.item.title,
		sticky: true
	});
});