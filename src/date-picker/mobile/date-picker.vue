<template>
	<div class="vcm-date-picker" @click="handleClick">
		<slot 
			v-if="$slots.default || $scopedSlots.default" 
			:label="formatterValue" 
		/>
		<vcm-list-item v-else :extra="formatterValue" />
	</div>
</template>

<script>
import { pick } from 'lodash';
import Core, { Func } from './core';
import List from '../../list/index.m';
import { VcError } from '../../vc/index';
import { getSelectedData } from '../../utils/index';
import emitter from '../../extends/mixins/emitter'; // 表单验证
import { value2date, date2value, parseMode } from '../utils';

export default {
	name: "vcm-date-picker",
	components: {
		'vcm-list-item': List.Item
	},
	mixins: [emitter],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		...pick(Core.props, [
			'mode',
			'minDate',
			'maxDate',
			'startHour',
			'endHour',
			'format',
			'value'
		]),
		loadData: Function,
		extra: {
			type: String,
			default: '请选择'
		},
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
			return this.formatter(this.currentValue, this.format) || this.extra;
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(v, old) {

				if (v && new Date(v) == 'Invalid Date') {
					throw new VcError('m-data-picker', 'Invalid Date');
				}

				/**
				 * 事件对象情况下同值会重新set
				 * 如果v为undefined，this.currentValue也undefined
				 * NaN !== NaN true -> this.currentValue = undefined;
				 */
				if (+new Date(v) !== +this.currentValue) {
					this.currentValue = v;
				}

			}
		},
		currentValue(v) {
			console.log(v);
			this.$emit('change', v, this.current);
			// form表单
			this.dispatch('vc-form-item', 'form-change', v);
		}
	},
	destoryed() {
		this.pickerInstance && this.pickerInstance.$emit('destroy');
	},
	methods: {
		handleClick() {
			let { mode, minDate, maxDate, format, value } = this;
			Func.popup({
				mode,
				minDate,
				maxDate,
				format,
				value,
				onOk: res => {
					this.currentValue = res;
					this.$emit('ok', this.currentValue);
				},
				onCancel: res => {
					this.$emit('cancel');
				},
				getInstance: vm => this.pickerInstance = vm
			});
		}
	}
};

</script>

