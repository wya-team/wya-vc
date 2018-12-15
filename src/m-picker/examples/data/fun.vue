<template>
	<div>
		<c-pick
			:data-source="area"
			v-model="show"
			:values.sync="values"
			:cols="3"
			value-key="region_name"
			@ok="handleConfirm"
			@cancel="handleCancel"/>
	</div>
</template>
<script>
import Picker from '../../m-picker.vue';
import area from './area-data';
import CreatePortal from '../../../create-portal/index';

const config = {
	name: "vcm-picker",
	components: {
		'CPick': Picker
	},
	data() {
		return {
			show: false,
			values: [],
			area: []
		};
	},
	mounted() {
		this.show = true;
		setTimeout(() => {
			this.area = area;
		}, 5000);
	},
	methods: {
		handleCancel(values) {
			this.$emit('close', values);
		},
		handleConfirm(values) {
			this.$emit('sure', values);
		},
	},
};
export default config;
export const pickerArea = CreatePortal({}, config);

</script>
