<template>
	<i-time-picker 
		:type="type"
		:value="value"
		:format="format"
		:steps="steps"
		:placement="placement"
		:placeholder="placeholder"
		:confirm="confirm"
		:open="open"
		:size="size"
		:disabled="disabled"
		:clearable="clearable"
		:readonly="readonly"
		:editable="editable"
		:transfer="transfer"
		:element-id="elementId"
		@on-change="$emit('change', arguments[0])"
		@on-open-change="$emit('open-change', arguments[0])"
		@on-ok="$emit('ok', arguments[0])"
		@on-clear="$emit('clear', arguments[0])"
		@input="$emit('input', arguments[0])"
	>
		<slot />
	</i-time-picker>
</template>
<script>
import TimePicker from 'iview/src/components/time-picker';
import Picker from 'iview/src/components/date-picker/picker';

export default {
	name: "vc-time-picker",
	components: {
		'i-time-picker': TimePicker
	},
	props: {
		...TimePicker.props,
		...Picker.props
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