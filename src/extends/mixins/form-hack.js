import emitter from './emitter';

const filterEmpty = (val) => {
	if (val instanceof Array) {
		val = val.filter(i => i !== '');
	}
	return val;
};

export default {
	name: "FormItem",
	mixins: [emitter],
	mounted() {
		this.$on('on-form-change', (val) => {
			this.dispatch('vc-form-item', 'form-change', filterEmpty(val));
		});
		this.$on('on-form-blur', (val) => {
			this.dispatch('vc-form-item', 'form-blur', filterEmpty(val));
		});
	}
};
