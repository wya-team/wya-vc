<template>
	<div class="vc-time-panel">
		<vc-time-select 
			:hours="timeSlots[0]"
			:minutes="timeSlots[1]"
			:seconds="timeSlots[2]"
			:disabled-hours="disabledHours"
			:disabled-minutes="disabledMinutes"
			:disabled-seconds="disabledSeconds"
			:hide-disabled-options="hideDisabledOptions"
			:show-seconds="showSeconds"
			:steps="steps"
			@pick="handlePick"
		/>
		<vc-date-confrim 
			v-if="confirm"
			:show-time="false"
			current-view="time"
			@clear="handleClear"
			@ok="handleOK"
		/>
	</div>
</template>

<script>
import { getDateOfTime, clearTime } from '../../utils/date-utils';
import TimeMixin from '../mixins/time';
import Confirm from '../basic/confirm';
import TimeSelect from '../basic/time-select';

export default {
	name: 'vc-time-panel',
	components: {
		'vc-date-confrim': Confirm,
		'vc-time-select': TimeSelect
	},
	mixins: [TimeMixin],
	data() {
		return {
			date: this.value,
		};
	},
	computed: {
		showSeconds() {
			return !(this.format || '').match(/mm$/);
		},
		timeSlots() {
			let date = this.date[0];
			if (!date || !this.isReady) return [];
			return [date.getHours(), date.getMinutes(), date.getSeconds()];
		},
	},
	methods: {
		handlePick(value) {
			// TODO confirm为false 不能实时响应，但不关闭弹层
			let date = this.date[0] || clearTime(new Date());
			let newDate = getDateOfTime(date, value);
			this.date = [newDate];
			this.$emit('pick', this.date);
		},
		handleClear() {
			this.$emit('clear');
		},
		handleOK() {
			this.$emit('ok', this.date);
		},
	},
};
</script>

<style lang="scss">
@import '../../style/index.scss';

$block: vc-time-panel;

@include block($block) {
}
</style>
