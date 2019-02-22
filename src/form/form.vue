<template>
	<i-form
		ref="form"
		:model="model"
		:rules="rules"
		:inline="inline"
		:label-position="labelPosition"
		:label-width="labelWidth"
		:show-message="showMessage"
		:autocomplete="autocomplete"
	>
		<slot />
	</i-form>
</template>
<script>
import Form from 'iview/src/components/form';

export default {
	name: "vc-form",
	components: {
		'i-form': Form
	},
	props: {
		...Form.props
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	mounted() {
		this.validate = this.$refs.form.validate;
		this.validateField = this.$refs.form.validateField;
		this.resetFields = this.$refs.form.resetFields;
	},
	methods: {
	}
};
</script>
<style></style>