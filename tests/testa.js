var crypto = require('crypto');

var key = '12345678910111213141516';
var plain = 'test';

var cipher = crypto.createCipher('aes256', key);
var ciphered = cipher.update(plain, 'utf8', 'hex') + cipher.final('hex');
var decipher = crypto.createDecipher('aes256', key);
var deciphered = decipher.update(ciphered, 'hex', 'utf8') + decipher.final('utf8');

console.log(deciphered, plain);