<template>
	<i-radio-group 
		:value="value"
		:type="type"
		:size="size"
		:vertical="vertical"
		@on-change="$emit('change', arguments[0])"
		@input="$emit('input', arguments[0])"
	>
		<slot />
	</i-radio-group> 
</template>
<script>
import RadioGroup from 'iview/src/components/radio-group';

export default {
	name: "vc-radio-group",
	components: {
		'i-radio-group': RadioGroup
	},
	props: {
		...RadioGroup.props
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