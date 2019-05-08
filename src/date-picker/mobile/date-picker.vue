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
		}
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
				/**
				 * 强制必须使用v-model，所以不需要判断一次
				 */
				this.currentValue = v;
			}
		},
		currentValue(v) {
			this.$emit('change', v, this.current);
			// form表单
			this.dispatch('vc-form-item', 'form-change', v);
		}
	},
	created() {
		this.current = null;
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
				getInstance: vm => this.pickerInstance = vm
			}).then(res => {
				this.currentValue = res.date;

				this.current = res;
			}).catch(err => {
				console.log(err);
			});
		}
	}
};

</script>

