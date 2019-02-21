<template>
	<i-switch 
		:value="value"
		:size="size"
		:disabled="disabled"
		:true-value="trueValue"
		:false-value="falseValue"
		:loading="loading"
		@on-change="$emit('change', arguments[0])"
		@input="$emit('input', arguments[0])"
	>
		<slot slot="open" name="open" />
		<slot slot="close" name="close" />
		<slot />
	</i-switch>
</template>
<script>
import Switch from 'iview/src/components/switch';

export default {
	name: "vc-switch",
	components: {
		'i-switch': Switch
	},
	props: {
		...Switch.props
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