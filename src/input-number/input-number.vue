<template>
	<i-input-number 
		:max="max"
		:min="min"
		:value="value"
		:step="step"
		:size="size"
		:disabled="disabled"
		:placeholder="placeholder"
		:formatter="formatter"
		:parser="parser"
		:readonly="readonly"
		:editable="editable"
		:precision="precision"
		:element-id="elementId"
		:active-change="activeChange"
		@on-change="$emit('change', arguments[0])"
		@on-focus="$emit('focus', arguments[0])"
		@on-blur="$emit('blur', arguments[0])"
		@input="$emit('input', arguments[0])"
	/>
</template>
<script>
import InputNumber from 'iview/src/components/input-number';
import formHack from '../extends/mixins/form-hack';

export default {
	// name: "vc-input-number",
	components: {
		'i-input-number': InputNumber
	},
	mixins: [formHack],
	props: {
		...InputNumber.props
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>
<style></style>