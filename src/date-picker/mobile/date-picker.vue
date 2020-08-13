<template>
	<div class="vcm-date-picker" @click="handleClick">
		<slot 
			v-if="$slots.default || $scopedSlots.default" 
			:label="formatterValue" 
		/>
		<vcm-list-item 
			v-else 
			:label="label" 
			:label-width="labelWidth" 
			:extra="formatterValue" 
		/>
	</div>
</template>

<script>
import { pick } from 'lodash';
import Core, { Func } from './core';
import List from '../../list/index.m';
import { VcError } from '../../vc/index';
import { getSelectedData } from '../../utils/index';
import Extends from '../../extends';
import { value2date, date2value, parseMode, TYPE_VALUE_RESOLVER_MAP } from '../utils';
import { getDayCountOfMonth } from '../helper/date-utils';

export default {
	name: "vcm-date-picker",
	components: {
		'vcm-list-item': List.Item
	},
	mixins: [...Extends.mixins(['emitter'])],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		...pick(List.Item.props, [
			'label',
			'labelWidth'
		]),
		...pick(Core.props, [
			'mode',
			'minDate',
			'maxDate',
			'startHour',
			'endHour',
			'format',
			'value',
			'title',
			'cancelText',
			'okText',
			'showToolbar'
		]),
		loadData: Function,
		extra: {
			type: String,
			default: '请选择'
		},
		// 只能是String, 函数使用formatter
		format: {
			type: String,
			default: 'YYYY-MM-DD HH:mm'
		},
		formatter: {
			type: Function,
			default: (v, format) => {
				if (!v) return v;
				let arr = date2value(v);
				/**
				 * TODO
				 */
				return format
					.replace('YYYY', arr[0])
					.replace('MM', arr[1])
					.replace('DD', arr[2])
					.replace('HH', arr[3])
					.replace('mm', arr[4]);
			}
		},
		title: String
	},
	data() {
		return {
			currentValue: undefined
		};
	},
	computed: {
		formatterValue() {
			if (this.mode === 'quarter') {
				const { formatterText } = (TYPE_VALUE_RESOLVER_MAP[this.mode] || TYPE_VALUE_RESOLVER_MAP.default);
				return formatterText(this.currentValue);
			} else {
				return this.formatter(this.currentValue, this.format) || this.extra;
			}
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(v, old) {
				if ((v && new Date(v) == 'Invalid Date' && this.mode !== 'quarter') || (!Array.isArray(v) && this.mode === 'quarter')) {
					throw new VcError('m-data-picker', 'Invalid Date');
				}

				/**
				 * 事件对象情况下同值会重新set
				 * 如果v为undefined，this.currentValue也undefined
				 * NaN !== NaN true -> this.currentValue = undefined;
				 */
				if (+new Date(v) !== +this.currentValue) {
					this.currentValue = this.getCurrentValue(v);
				}

			}
		},
		currentValue(v) {
			// ...
		}
	},
	destroyed() {
		this.pickerInstance && this.pickerInstance.$emit('destroy');
	},
	methods: {
		handleClick() {
			let { mode, minDate, maxDate, format, value, title, cancelText, okText, showToolbar, show } = this;
			Func.popup({
				mode,
				minDate,
				maxDate,
				format,
				value,
				title,
				cancelText,
				showToolbar,
				show,
				okText,
				onOk: res => {
					this.currentValue = this.getCurrentValue(res);
					this.$emit('ok', this.currentValue);

					this.sync();
				},
				onCancel: res => {
					this.$emit('cancel');
				},
				getInstance: vm => this.pickerInstance = vm
			});
		},
		/**
		 * v-model 同步, 外部的数据改变时不会触发
		 */
		sync() {
			this.$emit('change', this.currentValue);
			// form表单
			this.dispatch('vc-form-item', 'form-change', this.currentValue);
		},
		/**
		 * 格式化季度数据，季度数据在picker-view是['2020', '2'] -> [‘2020-03-31’， ‘2020-06-29’]
		 * val是date数据则不进行转换
		 */
		getCurrentValue(val) {
			if (this.mode !== 'quarter' || !val.length || (val[0] instanceof Date && val[1] instanceof Date)) return val;
			return this.getMonthRange(val[0], val[1] - 1);
		},
		/**
		 * 获取季度对应的月份范围
		 */
		getMonthRange(year, quarter) {
			let [startMonth, endMonth] = [quarter * 3, quarter * 3 + 2];
			let endDay = getDayCountOfMonth(year, endMonth);
			return [
				new Date(year, startMonth),
				new Date(year, endMonth, endDay)
			];
		},
	}
};

</script>

