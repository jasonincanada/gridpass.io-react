export function passwordFor(system, salt, digits) {
	const digits2 = digits
		.map(digit => digit.name + ' ' + digit.x + ' ' + digit.y)
		.join(' ');

	const seed = digits2 + ' ' + system + ' ' + salt;

	Math.seedrandom(seed);

	// TODO: missing 'm'
	const length = 16, charset = 'abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789()-_#$%';
	let retVal = '';

	for (let i = 0, n = charset.length; i < length; ++i) {
		retVal += charset.charAt(Math.floor(Math.random() * n));
	}

	return retVal;
}
