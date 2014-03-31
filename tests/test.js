var crypto = require('./crypto.js');

console.log(crypto.encryptString("this is not a test, seriously, dafuq man. f32590ufds0)(§=$(?$)$"));

console.log(crypto.decryptString("90f6bdb3bad5d5d9e2e3a1fb37ad5770b55197cbf61386caac4212c120cc84dc5a1755339326652b7d7d51c7c02798d53d4491afcb20aec645cd6d982bcf9014e0a6be4c4847ec43d86fb119271ab0ee"));