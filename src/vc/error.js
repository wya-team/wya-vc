class VcError {
	constructor(target, msg, options = {}) {
		if (process.env.NODE_ENV === 'development' && msg && target) {
			console.log(`[@wya/vc - ${target}]: ${msg}`);
		}
	}
}

export default VcError;
