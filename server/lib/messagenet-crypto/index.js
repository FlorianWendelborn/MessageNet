var crypto = require('crypto');

// just in case somebody wants to change them 
const algorithm = 'aes256';
const input = 'utf8';
const output = 'hex';

exports.encryptString = function(text, key) {
	var cipher = crypto.createCipher(algorithm, key);
	return cipher.update(text, input, output) + cipher.final(output);
};

exports.decryptString = function(text, key) {
	var decipher =  crypto.createDecipher(algorithm, key);
	return decipher.update(text, output, input) + decipher.final(input);
};

exports.encrypt = function (json, key) {
	var cipher = crypto.createCipher(algorithm, key);
	return cipher.update(JSON.stringify(json), input, output) + cipher.final(output);
}

exports.decrypt = function (data, key) {
	var decipher =  crypto.createDecipher(algorithm, key);
	return JSON.parse(decipher.update(data, output, input) + decipher.final(input));
}