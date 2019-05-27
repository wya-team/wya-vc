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
		<vcm-picker-view 
			ref="target"
			v-model="currentValue"
			:data-source="dataSource"
			:cols="cols"
			:item-style="itemStyle"
			:cascade="cascade"
			:allow-dispatch="false"
			@picker-change="$emit('picker-change', arguments[0], arguments[1])"
		/>
	</vcm-picker-popup>
</template>

<script>
import { pick } from 'lodash';
import MPickerPopup from './picker-popup';	
import MPickerView from './picker-view';	
import CreatePortal from '../../create-portal/index';
import { getSelectedData } from '../../utils/index';

const config = {
	name: 'vcm-picker-core',
	components: {
		'vcm-picker-popup': MPickerPopup,
		'vcm-picker-view': MPickerView
	},
	// inheritAttrs: false, Portal暂时无法使用
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		...pick(MPickerPopup.props, [
			'title',
			'cancelText',
			'okText',
			'showToolbar'
		]),
		...pick(MPickerView.props, [
			'value',
			'dataSource',
			'itemStyle',
			'cols',
			'cascade'	
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
			isActive: false
		};
	},
	computed: {

	},
	watch: {
		value: {
			immediate: true,
			handler(v) {
				/**
				 * 不使用this.currentValue = v; 避免同步修改源数据，这里有取消操作
				 * @type {[type]}
				 */
				this.currentValue = v && v.length > 0 ? [...v] : [];
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

			let { label, data } = getSelectedData(this.currentValue, this.dataSource);

			this.isActive = false;

			this.ok(this.currentValue, label, data);
			// 普通组件
			this.$emit('change', this.currentValue, label, data);
		},
		handleCancel(v) {
			this.isActive = false;
			this.cancel();
		},
		/**
		 * 取消兼容
		 */
		ok(value, label, data) {
			const { onOk } = this;
			onOk ? onOk(value, label, data) : this.$emit('ok', value, label, data);
		},
		/**
		 * 取消兼容
		 */
		cancel() {
			const { onCancel } = this;
			onCancel ? onCancel() : this.$emit('cancel');
		},
	},
};

export default config;
export const Func = CreatePortal({
	promise: false
}, config);
</script>

<style lang="scss">
</style>
