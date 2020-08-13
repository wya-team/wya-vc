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

	},
	watch: {
		value: {
			immediate: true,
			handler(v) {
				this.currentValue = v;
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
		 * ok兼容
		 */
		ok(it) {
			// 强制设置默认时间为当前时间
			if (!it) {
				it = new Date();
				this.currentValue = it;
			}
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
