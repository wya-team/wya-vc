<template>
	<div class="vcm-picker" @click="handleClick">
		<slot 
			v-if="$slots.default || $scopedSlots.default" 
			:label="label" 
		/>
		<!-- 内容待自定义，todo, 默认使用list -->
		<div v-else>
			{{ label }}
		</div>
	</div>
</template>

<script>
import Core, { Func } from './core';
import { getSelectedData } from '../utils/index';
import emitter from '../extends/mixins/emitter'; // 表单验证


export default {
	name: "vcm-picker",
	components: {},
	mixins: [emitter],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		...Core.props,
		loadData: Function,
		extra: {
			type: String,
			default: '请选择'
		},
	},
	popup: Func.popup,
	data() {
		return {};
	},
	computed: {
		label() {
			const { label = [] } = getSelectedData(this.value, this.dataSource);
			return label.join(',') || this.extra;
		}
	},
	mounted() {
	},
	destoryed() {
		this.pickerInstance && this.pickerInstance.$emit('destory');
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
					getInstance: vm => this.pickerInstance = vm
				}).then(res => {
					this.$emit('change', res.value, res);

					// form表单
					this.dispatch('FormItem', 'on-form-change', res.value);
				}).catch(err => {
					console.log(err);
				});
			} catch (e) {
				console.log('[vcm-picker]', e);
			}
		}
	}
};

</script>

<style scoped lang='scss'>
</style>
