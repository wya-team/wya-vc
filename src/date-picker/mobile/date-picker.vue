<template>
	<div class="vcm-date-picker" @click="handleClick">
		<slot 
			v-if="$slots.default || $scopedSlots.default" 
			:label="label" 
		/>
		<!-- 内容待自定义，todo, 默认使用list -->
		<vcm-list-item v-else :extra="label"/>
	</div>
</template>

<script>
import Core, { Func } from './core';
import List from '../../list/index.m';
import { getSelectedData } from '../../utils/index';
import emitter from '../../extends/mixins/emitter'; // 表单验证

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
		...Core.props,
		loadData: Function,
		extra: {
			type: String,
			default: '请选择'
		},
	},
	data() {
		return {
			info: []
		};
	},
	computed: {
		label() {
			return this.info.join('') || this.extra;
		}
	},
	mounted() {
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
				this.info = res.label;
				this.$emit('change', res.date, res);

				// form表单
				this.dispatch('vc-form-item', 'form-change', res.date);
			}).catch(err => {
				console.log(err);
			});
		}
	}
};

</script>

