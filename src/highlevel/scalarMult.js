nacl.scalarMult = function(n, p) {
	checkArrayTypes(n, p)
	if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size')
	if (p.length !== crypto_scalarmult_BYTES) throw new Error('bad p size')
	var q = new Uint8Array(crypto_scalarmult_BYTES)
	crypto_scalarmult(q, n, p)
	return q
}

nacl.scalarMult.base = function(n) {
	checkArrayTypes(n)
	if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size')
	var q = new Uint8Array(crypto_scalarmult_BYTES)
	crypto_scalarmult_base(q, n)
	return q
}

nacl.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES
nacl.scalarMult.groupElementLength = crypto_scalarmult_BYTES
