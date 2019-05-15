<template>
	<i-time-picker 
		:type="mode"
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
		:transfer="portal"
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
import formHack from '../extends/mixins/form-hack';

export default {
	components: {
		'i-time-picker': TimePicker
	},
	mixins: [formHack],
	props: {
		...TimePicker.props,
		...Picker.props,
		mode: {
			type: String,
			default: 'time'
		},
		portal: {
			type: Boolean,
			default: true
		},
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