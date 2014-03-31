var os = require('os').platform();

switch (os) {
	case 'win32':
		var Service = require('node-windows').Service;
		
		var svc = new Service({
			name:'Messagenet',
			description: 'Growl messages to the max.',
			script: __dirname + '/server.js'
		});

		svc.on('install',function(){
			svc.start();
			console.log('Installation complete.');
		});

		svc.install();
	break;
	default:
		console.error('Operating system not supported.');
}