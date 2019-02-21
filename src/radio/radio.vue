<template>
	<i-radio 
		:value="value"
		:label="label"
		:disabled="disabled"
		:size="size"
		:true-value="trueValue"
		:false-value="falseValue"
		@on-change="$emit('change', arguments[0])"
		@input="$emit('input', arguments[0])"
	>
		<slot />
	</i-radio> 
</template>
<script>
import Radio from 'iview/src/components/radio';

export default {
	name: "vc-radio",
	components: {
		'i-radio': Radio
	},
	props: {
		...Radio.props
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