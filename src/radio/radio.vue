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
import formHack from '../extends/mixins/form-hack';

export default {
	// name: "vc-radio",
	components: {
		'i-radio': Radio
	},
	mixins: [formHack],
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