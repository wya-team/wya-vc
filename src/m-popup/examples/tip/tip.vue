<template>
	<vcm-popup v-model="show" :position="param.position" @change="handleChange">
		tip <br>
		tip <br>
		tip <br>
		tip <br>
		tip <br>
		tip <br>
		tip <br>
		tip <br>
		tip <br>
		tip <br>
		tip <br>
		tip <br>
		tip <br>
		tip <br>
		tip <br>
		tip <br>
		tip <br>
		tip <br>
		tip <br>
		tip <br>
		tip <br>
		tip <br>
		tip <br>
		tip <br>
		tip <br>
		tip <br>
	</vcm-popup>
</template>

<script>
import MPopup from '../../m-popup.vue';
import CreatePortal from '../../../create-portal/index';

const config = {
	name: 'vc-popup-basic-tip',
	components: {
		'vcm-popup': MPopup
	},
	props: {
		param: Object
	},
	data() {
		return {
			show: false
		};
	},
	computed: {

	},
	watch: {

	},
	created() {
	},
	mounted() {
		this.show = true;
	},
	methods: {
		handleChange() {
			this.$emit('sure');
		}
	},
};

export default config;

export const Tip = CreatePortal({}, config);

</script>

<style lang="scss" scoped>
</style>
