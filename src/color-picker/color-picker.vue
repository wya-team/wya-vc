<template>
	<i-color-picker 
		:value="value"
		:disabled="disabled"
		:editable="editable"
		:alpha="alpha"
		:hue="hue"
		:recommend="recommend"
		:colors="colors"
		:format="format"
		:size="size"
		@on-change="$emit('change', arguments[0])"
		@on-active-change="$emit('active-change', arguments[0])"
		@on-open-change="$emit('open-change', arguments[0])"
		@input="$emit('input', arguments[0])"
	/>
</template>
<script>
import ColorPicker from 'iview/src/components/color-picker';

export default {
	name: "vc-color-picker",
	components: {
		'i-color-picker': ColorPicker
	},
	props: {
		...ColorPicker.props
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