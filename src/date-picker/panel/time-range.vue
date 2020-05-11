<template>
	<div class="vc-timerange-panel">
		<div class="vc-timerange-panel__wrapper">
			<div class="vc-timerange-panel__content is-left">
				<vc-date-header 
					current-view="timerange"
					title="开始时间"
				/>
				<vc-time-select 
					:hours="timeSlots.left.hours"
					:minutes="timeSlots.left.minutes"
					:seconds="timeSlots.left.seconds"
					:disabled-hours="disabledHours"
					:disabled-minutes="disabledMinutes"
					:disabled-seconds="disabledSeconds"
					:hide-disabled-options="hideDisabledOptions"
					:show-seconds="showSeconds"
					:steps="steps"
					@pick="handlePick(...arguments, 'left')"
				/>
			</div>
			<div class="vc-timerange-panel__content is-right">
				<vc-date-header 
					current-view="timerange"
					title="结束时间"
				/>
				<vc-time-select 
					:hours="timeSlots.right.hours"
					:minutes="timeSlots.right.minutes"
					:seconds="timeSlots.right.seconds"
					:disabled-hours="disabledHours"
					:disabled-minutes="disabledMinutes"
					:disabled-seconds="disabledSeconds"
					:hide-disabled-options="hideDisabledOptions"
					:show-seconds="showSeconds"
					:steps="steps"
					@pick="handlePick(...arguments, 'right')"
				/>
			</div>
		</div>
		<vc-date-confrim 
			v-if="confirm"
			:show-time="false"
			current-view="timerange"
			@clear="handleClear"
			@ok="handleOK"
		/>
	</div>
</template>

<script>
import { getDateOfTime, clearTime } from '../helper/date-utils';
import TimeMixin from '../mixins/time';
import Confirm from '../basic/confirm';
import TimeSelect from '../basic/time-select';
import DateHeader from '../basic/date-header';

export default {
	name: 'vc-timerange-panel',
	components: {
		'vc-date-header': DateHeader,
		'vc-time-select': TimeSelect,
		'vc-date-confrim': Confirm,
	},
	mixins: [TimeMixin],
	data() {
		return {
			dates: this.value,
		};
	},
	computed: {
		showSeconds() {
			return !(this.format || '').match(/mm$/);
		},
		timeSlots() {
			let leftDate = this.dates[0];
			let rightDate = this.dates[1];
			if (!leftDate || !rightDate || !this.isReady) {
				return {
					left: {},
					right: {}
				};
			}
			return {
				left: {
					hours: leftDate.getHours(), 
					minutes: leftDate.getMinutes(), 
					seconds: leftDate.getSeconds()
				},
				right: {
					hours: rightDate.getHours(), 
					minutes: rightDate.getMinutes(), 
					seconds: rightDate.getSeconds()
				},
			};
		}
	},
	methods: {
		handlePick(value, type) {
			let leftNewDate = this.dates[0] || clearTime(new Date()); 
			let rightNewDate = this.dates[1] || clearTime(new Date());
			type === 'left' && (leftNewDate = getDateOfTime(leftNewDate, value));
			type === 'right' && (rightNewDate = getDateOfTime(rightNewDate, value));
			let col = Object.keys(value)[0];
			if (leftNewDate > rightNewDate) {
				rightNewDate = getDateOfTime(rightNewDate, this.getComparedDate(leftNewDate, rightNewDate));
			}
			this.dates = [leftNewDate, rightNewDate];
			this.$emit('pick', this.dates);
		},
		getComparedDate(leftDate, rightDate) {
			let lhours = leftDate.getHours();
			let lminutes = leftDate.getMinutes();
			let lseconds = leftDate.getSeconds();
			let rhours = rightDate.getHours();
			let rminutes = rightDate.getMinutes();
			let rseconds = rightDate.getSeconds();
			let hours = lhours > rhours ? lhours : rhours; 
			let minutes = lminutes > rminutes ? lminutes : rminutes; 
			let seconds = lseconds > rseconds ? lseconds : rseconds;
			return { hours, minutes, seconds };
		},
		handleClear() {
			this.$emit('clear');
		},
		handleOK() {
			this.$emit('ok', this.dates);
		},
	},
};
</script>

<style lang="scss">
@import '../../style/vars.scss';

$block: vc-timerange-panel;

@include block($block) {
	@include element(wrapper) {
		display: flex; 
	}
	@include element(content) {
		// position: relative;
		.vc-time-select {
			position: relative;
			&:after {
				content: "";
				display: block;
				width: 2px;
				position: absolute;
				top: 0;
				bottom: 0;
				right: -2px;
				background: #e8eaec;
				z-index: 1;
			}
		}
		@include when(left) {
			.vc-time-select:after {
				left: auto;
				right: -2px;
			}
		}
		@include when(right) {
			.vc-time-select:after {
				right: auto;
				left: -2px
			}
		}
	}
}
</style>
