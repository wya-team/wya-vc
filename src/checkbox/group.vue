<template>
	<i-checkbox-group 
		:value="value"
		:size="size"
		@on-change="$emit('change', arguments[0])"
		@input="$emit('input', arguments[0])"
	>
		<slot />
	</i-checkbox-group> 
</template>
<script>
import CheckboxGroup from 'iview/src/components/checkbox-group';
import formHack from '../extends/mixins/form-hack';

export default {
	// name: 'vc-checkbox-group',
	components: {
		'i-checkbox-group': CheckboxGroup
	},
	mixins: [formHack],
	props: {
		...CheckboxGroup.props
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