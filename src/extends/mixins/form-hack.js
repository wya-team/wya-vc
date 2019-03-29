import emitter from './emitter';

export default {
	name: "FormItem",
	mixins: [emitter],
	mounted() {
		this.$on('on-form-change', (...rest) => {
			this.dispatch('vc-form-item', 'form-change', ...rest);
		});
		this.$on('on-form-blur', (...rest) => {
			this.dispatch('vc-form-item', 'form-blur', ...rest);
		});
	}
};
