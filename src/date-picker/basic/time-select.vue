<template>
	<div class="vc-time-select">
		<div ref="hours" class="vc-time-select__list">
			<ul class="vc-time-select__ul">
				<li 
					v-for="(item, key) in hoursList" 
					v-show="!item.hide"
					:key="key" 
					:class="getCellClasses(item)"
					class="vc-time-select__li"
					@click="handleClick('hours', item)"
				>{{ preZero(item.text) }}</li>
			</ul>
		</div>
		<div ref="minutes" class="vc-time-select__list">
			<ul class="vc-time-select__ul">
				<li 
					v-for="(item, key) in minutesList" 
					v-show="!item.hide" 
					:key="key" 
					:class="getCellClasses(item)"
					class="vc-time-select__li"
					@click="handleClick('minutes', item)"
				>{{ preZero(item.text) }}</li>
			</ul>
		</div>
		<div v-show="showSeconds" ref="seconds" class="vc-time-select__list">
			<ul class="vc-time-select__ul">
				<li 
					v-for="(item, key) in secondsList" 
					v-show="!item.hide" 
					:key="key" 
					:class="getCellClasses(item)"
					class="vc-time-select__li"
					@click="handleClick('seconds', item)"
				>{{ preZero(item.text) }}</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { $, Utils } from '@wya/utils';
import _ from 'lodash';

export default {
	name: 'vc-time-select',
	components: {

	},
	props: {
		hours: {
			type: [Number, String],
			default: NaN
		},
		minutes: {
			type: [Number, String],
			default: NaN
		},
		seconds: {
			type: [Number, String],
			default: NaN
		},
		showSeconds: {
			type: Boolean,
			default: true
		},
		steps: {
			type: Array,
			default: () => []
		},
		disabledHours: {
			type: Array,
			default() {
				return [];
			}
		},
		disabledMinutes: {
			type: Array,
			default() {
				return [];
			}
		},
		disabledSeconds: {
			type: Array,
			default() {
				return [];
			}
		},
		hideDisabledOptions: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			spinerSteps: [1, 1, 1].map((one, i) => Math.abs(this.steps[i]) || one),
			compiled: false,
		};
	},
	computed: {
		hoursList() {
			let hours = [];
			const step = this.spinerSteps[0];
			const focusedHour = this.focusedColumn === 0 && this.focusedTime[0];
			const hourTmpl = {
				text: 0,
				selected: false,
				disabled: false,
				hide: false
			};
			for (let i = 0; i < 24; i += step) {
				const hour = { ...hourTmpl };
				hour.text = i;
				hour.focused = i === focusedHour;
				if (this.disabledHours.length && this.disabledHours.indexOf(i) > -1) {
					hour.disabled = true;
					if (this.hideDisabledOptions) hour.hide = true;
				}
				if (this.hours === i) hour.selected = true;
				hours.push(hour);
			}
			return hours;
		},
		minutesList() {
			let minutes = [];
			const step = this.spinerSteps[1];
			const focusedMinute = this.focusedColumn === 1 && this.focusedTime[1];
			const minuteTmpl = {
				text: 0,
				selected: false,
				disabled: false,
				hide: false
			};
			for (let i = 0; i < 60; i += step) {
				const minute = { ...minuteTmpl };
				minute.text = i;
				minute.focused = i === focusedMinute;
				if (this.disabledMinutes.length && this.disabledMinutes.indexOf(i) > -1) {
					minute.disabled = true;
					if (this.hideDisabledOptions) minute.hide = true;
				}
				if (this.minutes === i) minute.selected = true;
				minutes.push(minute);
			}
			return minutes;
		},
		secondsList() {
			let seconds = [];
			const step = this.spinerSteps[2];
			const focusedMinute = this.focusedColumn === 2 && this.focusedTime[2];
			const secondTmpl = {
				text: 0,
				selected: false,
				disabled: false,
				hide: false
			};
			for (let i = 0; i < 60; i += step) {
				const second = { ...secondTmpl };
				second.text = i;
				second.focused = i === focusedMinute;
				if (this.disabledSeconds.length && this.disabledSeconds.indexOf(i) > -1) {
					second.disabled = true;
					if (this.hideDisabledOptions) second.hide = true;
				}
				if (this.seconds === i) second.selected = true;
				seconds.push(second);
			}
			return seconds;
		}
	},
	watch: {
		hours(val) {
			if (!this.compiled) return;
			this.scroll('hours', this.hoursList.findIndex(obj => { return obj.text == val; }));
		},
		minutes(val) {
			if (!this.compiled) return;
			this.scroll('minutes', this.minutesList.findIndex(obj => obj.text == val));
		},
		seconds(val) {
			if (!this.compiled) return;
			this.scroll('seconds', this.secondsList.findIndex(obj => obj.text == val));
		},
	},
	mounted() {
		this.$nextTick(() => { 
			this.compiled = true; 
			this.isFirst = true;
		});
	},
	methods: {
		preZero: Utils.preZero,
		handleClick(type, cell) {
			if (cell.disabled) return;
			const data = { [type]: cell.text };
			this.isFirst = false;
			this.$emit('pick', data);
		},
		getCellClasses(cell) {
			let classes = [];

			if (cell.selected) classes.push('is-selected');
			if (cell.disabled) { classes.push('is-disabled'); }
			if (cell.focused) { classes.push('is-focused'); }

			// TODO 其他情况的样式
			return classes.join(' ');
		},
		scroll(type, index) {
			const from = this.$refs[type].scrollTop;
			const to = 24 * this.getScrollIndex(type, index);
			$(this.$refs[type]).scrollIntoView({
				from, 
				to, 
				duration: this.isFirst ? 0 : 500, // 首次展示时不执行滚动动画
			});
		},
		getScrollIndex(type, index) {
			const Type = _.startCase(type);
			const disabled = this[`disabled${Type}`];
			if (disabled.length && this.hideDisabledOptions) {
				let _count = 0;
				disabled.forEach(item => (item <= index ? _count++ : ''));
				index -= _count;
			}
			return index;
		},
	},
};
</script>

<style lang="scss">
@import '../../style/index.scss';

$block: vc-time-select;

@include block($block) {
	display: flex;
	font-size: 14px;
	@include element(list) {
		width: 56px; // time-picker
		max-height: 144px;
		overflow: hidden;
		border-left: 1px solid #e8eaec;
		position: relative;
		&:hover {
			overflow-y: auto;
		}
		ul {
			width: 100%;
			margin: 0;
			padding: 0 0 120px;
			list-style: none;
			li {
				width: 100%;
				height: 24px;
				line-height: 24px;
				margin: 0;
				padding: 0 0 0 16px;
				box-sizing: content-box;
				text-align: left;
				-webkit-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
				cursor: pointer;
				list-style: none;
				transition: background .2s ease-in-out;
			}
		}
	}
	@include element(li) {
		&:hover {
			background: #f3f3f3;
		}
		@include when(selected) {
			color: #2d8cf0;
			background: #f3f3f3;
			&:hover {
				color: #2d8cf0;
				background: #f3f3f3;
			}
		}
		@include when(disabled) {
			color: #c5c8ce;
			cursor: not-allowed;
		}
		@include when(focused) {
			background-color: #d5e8fc;
		}
	}
}
</style>
