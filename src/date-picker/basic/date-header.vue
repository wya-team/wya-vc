<template>
	<div class="vc-date-header">
		<template v-if="currentView !== 'timerange'">
			<vc-icon v-if="showPrev" class="vc-date-header__arrow is-prev is-prev-year" type="d-arrow-left" @click="handlePrevYear" />
			<vc-icon v-if="showPrev && isDate" class="vc-date-header__arrow is-prev" type="arrow-left" @click="handlePrevMonth" />
			<span class="vc-date-header__label" @click="handleShowYearPicker">{{ year }}</span>
			<span v-if="isDate" class="vc-date-header__label" @click="handleShowMonthPicker">{{ month }}</span>
			<vc-icon v-if="showNext" class="vc-date-header__arrow is-next is-next-year" type="d-arrow-right" @click="handleNextYear" />
			<vc-icon v-if="showNext && isDate" class="vc-date-header__arrow is-next" type="arrow-right" @click="handleNextMonth" />
		</template>
		<template v-else>
			<!-- 在面板为时间范围的时候才显示 -->
			<span>{{ title }}</span>
		</template>
	</div>
</template>

<script>
import { Utils } from '@wya/utils';
import { prevYear, nextYear, prevMonth, nextMonth } from '../helper/date-utils';
import Icon from '../../icon/index';

export default {
	name: 'vc-date-header',
	components: {
		'vc-icon': Icon,
	},
	model: {
		prop: 'panelDate',
		event: 'change'
	},
	props: {
		panelDate: Date,
		showNext: {
			type: Boolean,
			default: true
		},
		showPrev: {
			type: Boolean,
			default: true
		},
		currentView: String,
		title: String
	},
	computed: {
		year() {
			return this.panelDate.getFullYear() + '年';
		},
		month() {
			let month = this.panelDate.getMonth() + 1;
			return Utils.preZero(month) + '月';
		},
		isDate() {
			return ['date', 'daterange'].includes(this.currentView);
		}
	},
	methods: {
		handleShowYearPicker() {
			this.$emit('change-current-view', 'year');
		},
		handleShowMonthPicker() {
			this.$emit('change-current-view', 'month');
		},
		handlePrevMonth() {
			let prevM = prevMonth(this.panelDate);
			this.$emit('change', prevM, 'prev-month');
		},
		handlePrevYear() {
			let amount = this.currentView === 'year' ? 10 : 1;
			let prevY = prevYear(this.panelDate, amount);
			this.$emit('change', prevY, 'prev-year');
		},
		handleNextMonth() {
			let nextM = nextMonth(this.panelDate);
			this.$emit('change', nextM, 'next-month');
		},
		handleNextYear() {
			let amount = this.currentView === 'year' ? 10 : 1;
			let nextY = nextYear(this.panelDate, amount);
			this.$emit('change', nextY, 'next-year');
		},
	},
};
</script>

<style lang="scss">
@import '../../style/vars.scss';

$block: vc-date-header;

@include block($block) {
	height: 32px;
	line-height: 32px;
	text-align: center;
	border-bottom: 1px solid #e8eaec;
	user-select: none;
	@include element(arrow) {
		display: inline-block;
		width: 20px;
		height: 24px;
		line-height: 26px;
		margin-top: 2px;
		font-size: 14px;
		text-align: center;
		cursor: pointer;
		color: #c5c8ce;
		vertical-align: unset;
		transition: color .2s ease-in-out;
		&:hover {
			color: #2D8CF0;
		}
		@include when(prev) {
			float: left;
		}
		@include when(prev-year) {
			margin-left: 10px;
		}
		@include when(next) {
			float: right;
		}
		@include when(next-year) {
			margin-right: 10px;
		}
	}
	@include element(label) {
		cursor: pointer;
		&:hover {
			color: #2D8CF0;
		}
	}
}
</style>
