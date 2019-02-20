<template>
	<form class="vcm-form">
		<slot />
	</form>
</template>

<script>
export default {
	name: 'vcm-form',
	components: {},
	props: {
		model: {
			type: Object
		},
		rules: {
			type: Object
		},
		labelWidth: {
			type: Number
		},
		showMessage: {
			type: Boolean,
			default: true
		},
		labelPosition: {
			validator(value) {
				return ['left', 'right', 'top'].indexOf(value) !== -1;
			},
			default: 'right'
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
				let errorsList = [];
				this.fields.forEach(item => {
					item.validate('', errors => {
						if (errors) {
							errorsList.push(errors);
							valid = false;
						}
						if (++count === this.fields.length) {
							// 全部校验完成
							if (errorsList.length !== 0) {
								reject(errorsList);
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

</script>

<style scoped lang='scss'>
</style>
