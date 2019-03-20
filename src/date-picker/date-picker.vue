<template>
	<i-date-picker 
		:type="type"
		:value="value"
		:format="format"
		:placement="placement"
		:placeholder="placeholder"
		:options="options"
		:split-panels="splitPanels"
		:show-week-numbers="showWeekNumbers"
		:start-date="startDate"
		:confirm="confirm"
		:open="open"
		:size="size"
		:disabled="disabled"
		:clearable="clearable"
		:readonly="readonly"
		:editable="editable"
		:transfer="transfer"
		:element-id="elementId"
		:time-picker-options="timePickerOptions"
		@on-change="$emit('change', arguments[0])"
		@on-open-change="$emit('open-change', arguments[0])"
		@on-ok="$emit('ok', arguments[0])"
		@on-clear="$emit('clear', arguments[0])"
		@input="$emit('input', arguments[0])"
	>
		<slot />
	</i-date-picker>
</template>
<script>
import DatePicker from 'iview/src/components/date-picker';
import Picker from 'iview/src/components/date-picker/picker';

export default {
	name: "vc-date-picker",
	components: {
		'i-date-picker': DatePicker
	},
	props: {
		...DatePicker.props,
		...Picker.props,
		mode: {
			type: String,
			default: 'date'
		}
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