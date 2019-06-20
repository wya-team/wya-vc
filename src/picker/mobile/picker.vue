<template>
	<div class="vcm-picker" @click="handleClick">
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
import { isEqualWith, pick } from 'lodash';
import Core, { Func } from './core';
import MPickerPopup from './picker-popup';
import List from '../../list/index.m';
import { getSelectedData } from '../../utils/index';
import { VcError } from '../../vc/index';
import Extends from '../../extends';


export default {
	name: "vcm-picker",
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
				// 数组情况下同值会重新set
				if (isEqualWith(v, this.currentValue)) {
					return;
				}

				this.currentValue = v;
			}
		},
		currentValue() {
			// ...
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
					onOk: (v, label, data) => {
						this.currentValue = v;
						this.$emit('ok', v, label, data);

						this.sync(label);
					},
					onCancel: res => {
						this.$emit('cancel');
					},
					getInstance: vm => this.pickerInstance = vm
				});
			} catch (e) {
				throw new VcError('m-picker', e);
			}
		},
		/**
		 * v-model 同步, 外部的数据改变时不会触发
		 */
		sync(label) {
			this.$emit('change', this.currentValue, label);
			// form表单
			this.dispatch('vc-form-item', 'form-change', this.currentValue);
		}
	}
};

</script>