const net = require('net');
const fs = require('fs');
const crypto = require(__dirname + '/crypto.js');

var config = JSON.parse(fs.readFileSync(__dirname + '/config.json'));

var socket = new net.Socket();
socket.connect(config.tcp.port, 'localhost', function () {
    console.log("Client: Connected to server");
});

socket.on("data", function (data) {
	console.log(data.toString());

	data = crypto.decryptString(data.toString());
	
	console.log("Response from server: %s", data);
	
	socket.write(crypto.encryptString(process.argv[2]));
	
	socket.end();
});