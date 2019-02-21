<template>
	<i-checkbox 
		:value="value"
		:label="label"
		:disabled="disabled"
		:indeterminate="indeterminate"
		:size="size"
		:true-value="trueValue"
		:false-value="falseValue"
		@on-change="$emit('change', arguments[0])"
		@input="$emit('input', arguments[0])"
	>
		<slot />
	</i-checkbox> 
</template>
<script>
import Checkbox from 'iview/src/components/checkbox';

export default {
	name: "vc-checkbox",
	components: {
		'i-checkbox': Checkbox
	},
	props: {
		...Checkbox.props
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