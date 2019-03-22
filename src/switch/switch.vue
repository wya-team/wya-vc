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
import formHack from '../extends/mixins/form-hack';

export default {
	components: {
		'i-switch': Switch
	},
	mixins: [formHack],
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