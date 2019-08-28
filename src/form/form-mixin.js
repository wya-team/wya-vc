import { sortBy } from 'lodash';

export default {
	name: 'vc-form',
	components: {},
	props: {
		model: {
			type: Object
		},
		rules: {
			type: Object
		},
		labelWidth: {
			type: Number,
		},
		showMessage: {
			type: Boolean,
			default: true
		},
		inline: {
			type: Boolean,
			default: false
		},
		scrollIntoError: {
			type: Boolean,
			default: true
		},
		labelPosition: {
			validator: v => /^(left|right|top)$/.test(v),
			default: 'right'
		},
		autocomplete: {
			validator: v => /^(on|off)$/.test(v),
			default: 'off'
		},
	},
	provide() {
		return { form: this };
	},
	data() {
		return {
			fields: []
		};
	},
	created() {
		this.$on('form-item-add', (item) => {
			item && this.fields.push(item);
			return false;
		});
		this.$on('form-item-remove', (item) => {
			item.prop && this.fields.splice(this.fields.indexOf(item), 1);
			return false;
		});
	},
	methods: {
		resetFields() {
			this.fields.forEach(item => {
				item.resetField();
			});
		},

		validate(callback) {
			return new Promise((resolve, reject) => {
				let valid = true;
				let count = 0;
				let originErrors = [];
				this.fields.forEach(item => {
					item.validate('', (res = {}) => {
						if (res.msg || res.message) {
							originErrors.push(res);
							valid = false;
						}
						if (++count === this.fields.length) {
							let errors = this.sortErrors(originErrors);

							// 全部校验完成
							if (errors.length !== 0) {
								reject(errors);
								this.scrollIntoView(errors[0].prop);
								this._toast(errors[0].msg || errors[0].message);
							} else {
								resolve();
							}
							callback && callback(valid, errors);
						}
					});
				});
			});
		},

		getField(prop) {
			const field = this.fields.find(item => item.prop === prop);
			if (!field) { throw new Error('请选择有用的prop值'); }

			return field;
		},

		validateField(prop, callback) {
			return new Promise((resolve, reject) => {
				let field = this.getField(prop);
				let valid = true;
				field.validate('', (res = {}) => {
					let errorMsg = res.msg || res.message;
					if (errorMsg) {
						valid = false;
						reject(errorMsg);
						this.scrollIntoView(prop);
						this._toast(errorMsg);
					} else {
						resolve();
					}
					callback && callback(valid, errorMsg);
				});
			});
		},

		scrollIntoView(prop, opts = {}) {
			if (!this.scrollIntoError) return;

			let field = this.getField(prop);
			field.$el.scrollIntoView({
				behavior: 'smooth'
			});
		},

		/**
		 * 后续可以考虑过滤后给到前台
		 */
		sortErrors(errors) {
			let basicSort = {};
			let count = 0;

			let fn = (vnodes) => {
				vnodes.forEach((vnode, index) => {
					let isFormItem = /form-item$/.test(vnode.tag);
					if (!isFormItem) return;

					let { prop } = vnode.componentOptions.propsData || {}; 
					let { children } = vnode.componentOptions;
					if (prop) {
						basicSort[prop] = count++;
					} else if (children) {
						fn(children);
					}
				});
			};

			fn(this.$slots.default); // this.$children 无法重新排序

			errors = sortBy(errors, [(i) => basicSort[i.prop]]);
			return errors;
		},

		_toast(msg) {
			this.showMessage 
				&& this.throwToast 
				&& this.throwToast(msg);
		}
	}
};