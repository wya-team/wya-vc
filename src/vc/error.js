class VcError {
	constructor(target, msg, options = {}) {
		if (!msg || !target) return;
		
		msg = `[@wya/vc - ${target}]: ${msg}`;
		this.msg = msg;

		process.env.NODE_ENV === 'development' && console.error(msg);
	}
}

export default VcError;
