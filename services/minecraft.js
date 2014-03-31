const net = require('net');
const fs = require('fs');
const crypto = require(__dirname + '/../crypto.js');
const Rcon = require('rcon');

var config = JSON.parse(fs.readFileSync(__dirname + '/../config.json'));

var socket = new net.Socket();
socket.connect(config.tcp.port, 'localhost', function () {
    console.log("Client: Connected to server");
});

socket.on("data", function (data) {
	console.log("Response from server: %s", data);
	console.log(JSON.parse(crypto.decryptString(data.toString())));
});

var interval;
var lastResult;

var con = new Rcon(config.minecraft.ip, config.minecraft.port, config.minecraft.password);
con.on('auth', function() {
	socket.write(crypto.encryptString(JSON.stringify({
		from: 'minecraft-server',
		message: "connected to " + config.minecraft.ip + ":" + config.minecraft.port
	})));
	interval = setInterval(function () {
		con.send("list");
	},5000);
}).on('response', function(str) {
	var result;
	// parse
	if (str.substr(0,10) == 'There are ') {
		result = str.split('\n')[1];
		if (result == '') {
			result = 'no players online';
		}
	}

	// send
	if (result != lastResult) {
		lastResult = result;
		socket.write(crypto.encryptString(JSON.stringify({
			from: 'minecraft-server',
			message: result
		})));
	}
}).on('end', function() {
	console.log("Socket closed!");
	process.exit();
});
con.connect();