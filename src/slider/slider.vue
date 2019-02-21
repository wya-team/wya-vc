<template>
	<i-slider 
		:value="value"
		:min="min"
		:max="max"
		:step="step"
		:disabled="disabled"
		:range="range"
		:show-input="showInput"
		:show-stops="showStops"
		:show-tip="showTip"
		:tip-format="tipFormat"
		:input-size="inputSize"
		@on-change="$emit('change', arguments[0])"
		@on-input="$emit('active-change', arguments[0])"
		@input="$emit('input', arguments[0])"
	/>
</template>
<script>
import Slider from 'iview/src/components/slider';

export default {
	name: "vc-slider",
	components: {
		'i-slider': Slider
	},
	props: {
		...Slider.props
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