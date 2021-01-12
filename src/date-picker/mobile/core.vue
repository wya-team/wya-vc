<template>
	<vcm-picker-popup
		v-model="isActive"
		:title="title"
		:cancel-text="cancelText"
		:ok-text="okText"
		:show-toolbar="showToolbar"	
		@ok="handleOk"
		@cancel="handleCancel"
		@close="handleClose"
	>
		<vcm-date-picker-view 
			ref="target"
			v-model="currentValue"
			:mode="mode"
			:min-date="minDate"
			:max-date="maxDate"
			:start-hour="startHour"	
			:end-hour="endHour"	
			:allow-dispatch="false"
			@picker-change="$emit('picker-change', arguments[0], arguments[1])"
		/>
	</vcm-picker-popup>
</template>

<script>
import { pick } from 'lodash';
import MPicker from '../../picker/index.m';	
import MDatePickerView from './date-picker-view';	
import Portal from '../../portal/index';
import { isBefore } from '../utils';

const wrapperComponent = {
	name: 'vcm-picker-core',
	components: {
		'vcm-picker-popup': MPicker.Popup,
		'vcm-date-picker-view': MDatePickerView
	},
	// inheritAttrs: false, Portal暂时无法使用
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		...pick(MPicker.Popup.props, [
			'title',
			'cancelText',
			'okText',
			'showToolbar'
		]),
		...pick(MDatePickerView.props, [
			'mode',
			'minDate',
			'maxDate',
			'startHour',
			'endHour',
			'value'
		]),
		visible: { // sync
			type: Boolean,
			default: true
		},
		/**
		 * 兼容portal设计, 实现Promise方式
		 */
		onOk: {
			type: Function
		},
		onCancel: {
			type: Function
		}
	},
	data() {
		return {
			isActive: false,
			currentValue: ''
		};
	},
	computed: {
		/**
		 * TODO: 季度模式默认值处理
		 */
		defaultValue() {
			const now = new Date();
			return isBefore(now, this.minDate) ? this.minDate : now;
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(v) {
				this.currentValue = this.correct(v, true);
			}
		},
		isActive(v) {
			this.$emit('visible-change', v);
		}
	},
	mounted() {
		this.isActive = true;
	},
	methods: {
		handleClose() {
			this.isActive = false;

			this.$emit('close'); // 兼容portal关闭
			// 普通组件
			this.$emit('update:visible', false);
		},
		handleOk() {

			this.isActive = false;

			this.ok(this.currentValue);
			// 普通组件
			this.$emit('change', this.currentValue);
		},
		handleCancel(v) {
			this.isActive = false;
			this.cancel();
		},
		/**
		 * 对值进行校正，如超出边界值时更正为边界值
		 * force 是否在没有初始值时强制赋予默认值
		 */
		correct(target, force = false) {
			// TODO: 季度模式数据校正处理
			if (this.mode === 'quarter') return target;
			if (!target) return force ? this.defaultValue : target;
			if (isBefore(target, this.minDate)) return this.minDate;
			if (isBefore(this.maxDate, target)) return this.minDate;
			return target;
		},
		/**
		 * ok兼容
		 */
		ok(it) {
			it = it ? this.correct(it) : this.minDate;
			this.currentValue = it;
			const { onOk } = this;
			onOk ? onOk(it) : this.$emit('ok', it);
		},
		/**
		 * 取消兼容
		 */
		cancel() {
			const { onCancel } = this;
			onCancel ? onCancel() : this.$emit('cancel');
		}
	},
};

export default wrapperComponent;
export const Func = new Portal(wrapperComponent, {
	promise: false
});
</script>

<style lang="scss">
</style>
