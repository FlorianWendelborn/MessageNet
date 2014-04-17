var content = JSON.parse(require('fs').readFileSync(__dirname + '/../../../config.json'))

function update () {
	exports.http = content.http;
	exports.tcp = content.tcp;
	exports.id = content.id;
}
update();

// #todo - implement save function || autosave
function set (newConfig) {
	content = newConfig;
	update();
}