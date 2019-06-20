export default (el, opts = {}, vm = {}) => {
	try {
		let { value } = opts;
		let str = value ? 'visible' : 'hidden';
		
		if (el.style.visibility !== str) {
			el.style.visibility = str;
		}
	} catch (e) {
		console.log(e);
	}
};
