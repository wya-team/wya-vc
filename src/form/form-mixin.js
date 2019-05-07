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
		labelPosition: {
			validator: v => /^(left|right|top)$/.test(v),
			default: 'right'
		},
		autocomplete: {
			validator: v => /^(on|off)$/.test(v),
			default: 'off'
		}
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
				let errorsList = [];
				this.fields.forEach(item => {
					item.validate('', res => {
						if (res && res.msg) {
							errorsList.push(res);
							valid = false;
						}
						if (++count === this.fields.length) {
							// 全部校验完成
							if (errorsList.length !== 0) {
								reject(errorsList);
								this.showMessage 
									&& this.throwToast 
									&& this.throwToast(errorsList[0].msg || errorsList[0].message);
							} else {
								resolve();
							}
							callback && callback(valid, errorsList);
						}
					});
				});
			});
		},
		validateField(prop, cb) {
			const field = this.fields.find(item => item.prop === prop);
			if (!field) { throw new Error('请选择有用的prop值'); }
			field.validate('', cb);
		}
	}
};