var crypto = require('crypto'); 
var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
var clearEncoding = 'utf8';
var cipherEncoding = 'hex';

encryptString = function(text) {

var cipher = crypto.createCipher(algorithm, key);
return cipher.update(text, clearEncoding, cipherEncoding) + cipher.final(cipherEncoding);

};

var key = "12345678910111213141516"; 

decryptString = function(text) {

var decipher =  crypto.createDecipher(algorithm, key);
	return decipher.update(text, cipherEncoding, clearEncoding) + decipher.final(clearEncoding);
};
console.log(encryptString('test'));
console.log(decryptString(encryptString('test')));