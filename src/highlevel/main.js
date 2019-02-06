function checkLengths(k, n) {
	if (k.length !== crypto_secretbox_KEYBYTES) throw new Error('bad key size')
	if (n.length !== crypto_secretbox_NONCEBYTES) throw new Error('bad nonce size')
}

function checkBoxLengths(pk, sk) {
	if (pk.length !== crypto_box_PUBLICKEYBYTES) throw new Error('bad public key size')
	if (sk.length !== crypto_box_SECRETKEYBYTES) throw new Error('bad secret key size')
}

function checkArrayTypes() {
	for (var i = 0; i < arguments.length; i++) {
		if (!(arguments[i] instanceof Uint8Array))
			throw new TypeError('unexpected type, use Uint8Array')
	}
}

function cleanup(arr) {
	for (var i = 0; i < arr.length; i++) arr[i] = 0
}

nacl.randomBytes = function(n) {
	var b = new Uint8Array(n)
	randombytes(b, n)
	return b
}

nacl.setPRNG = function(fn) {
	randombytes = fn
}

	// Initialize PRNG if environment provides CSPRNG.
	// If not, methods calling randombytes will throw.
	var crypto = typeof self !== 'undefined' ? (self.crypto || self.msCrypto) : null
	if (crypto && crypto.getRandomValues) {
		// Browsers.
		var QUOTA = 65536
		nacl.setPRNG(function(x, n) {
			var i, v = new Uint8Array(n)
			for (i = 0; i < n; i += QUOTA) {
				crypto.getRandomValues(v.subarray(i, i + Math.min(n - i, QUOTA)))
			}
			for (i = 0; i < n; i++) x[i] = v[i]
			cleanup(v)
		})
	} else if (typeof require !== 'undefined') {
		// Node.js.
		crypto = require('crypto')
		if (crypto && crypto.randomBytes) {
			nacl.setPRNG(function(x, n) {
				var i, v = crypto.randomBytes(n)
				for (i = 0; i < n; i++) x[i] = v[i]
				cleanup(v)
			})
		}
	}
