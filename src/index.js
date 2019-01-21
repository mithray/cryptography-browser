const crypto = require('./dump.js');

let buf = Buffer.from('e');
let uint8 = new Uint8Array(buf)
console.log(uint8)
console.log(crypto.hash(uint8);

/*
let buf2_str = buf2.toString('utf8');
console.log(buf2_str);
let buf2_hash = crypto.hash(buf2)
let buf2_hash_str = buf2_hash;
console.log(buf2_hash_str);
*/
