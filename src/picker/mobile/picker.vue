<template>
	<div class="vcm-picker" @click="handleClick">
		<slot 
			v-if="$slots.default || $scopedSlots.default" 
			:label="formatterValue" 
		/>
		<vcm-list-item v-else :extra="formatterValue" />
	</div>
</template>

<script>
import Core, { Func } from './core';
import MPickerPopup from './picker-popup';
import List from '../../list/index.m';
import { getSelectedData } from '../../utils/index';
import emitter from '../../extends/mixins/emitter'; // 表单验证


export default {
	name: "vcm-picker",
	components: {
		'vcm-list-item': List.Item
	},
	mixins: [emitter],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		...Core.props,
		...MPickerPopup.props,
		loadData: Function,
		extra: {
			type: String,
			default: '请选择'
		},
		formatter: {
			type: Function,
			default: (v) => (!v ? v : v.join(',')) 
		}
	},
	data() {
		return {
			currentValue: []
		};
	},
	computed: {
		formatterValue() {
			const { label = [] } = getSelectedData(this.currentValue, this.dataSource);
			return this.formatter(label) || this.extra;
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
			this.$emit('change', v);
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
		async handleClick() {
			try {
				if ((!this.dataSource || this.dataSource.length === 0) && this.loadData) {
					// 数据加载完成后，用户需要绑定到dataScource
					await this.loadData();
				}
				/**
				 * 有待优化，dataSource源数据异步
				 */
				let { dataSource, cols, cascade, itemStyle, title, cancelText, okText, showToolbar, value, show } = this;
				Func.popup({
					dataSource,
					cols,
					cascade,
					itemStyle,
					title,
					cancelText,
					showToolbar,
					show,
					okText,
					value,
					onOk: res => {
						this.currentValue = res.value;
						this.$emit('ok');
					},
					onCancel: res => {
						this.$emit('cancel');
					},
					getInstance: vm => this.pickerInstance = vm
				});
			} catch (e) {
				console.log('[vcm-picker]', e);
			}
		}
	}
};

</script>