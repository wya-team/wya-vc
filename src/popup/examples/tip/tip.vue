<template>
	<vcm-popup 
		v-model="visible" 
		:placement="param.placement" 
		class="vc-popup-basic-tip"
		@visible-change="handleChange"
	>
		<div @click="handleClose">
			点击关闭
		</div>
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
		tip2 <br>
	</vcm-popup>
</template>

<script>
import MPopup from '../../index.m';
import Portal from '../../../portal/index';

const wrapperComponent = {
	name: 'vc-popup-basic-tip',
	components: {
		'vcm-popup': MPopup
	},
	props: {
		param: Object
	},
	data() {
		return {
			visible: false
		};
	},
	computed: {

	},
	watch: {

	},
	mounted() {
		this.visible = true;
	},
	methods: {
		handleClose() {
			this.visible = false;
		},
		handleChange(v) {
			this.$emit('close');
		}
	},
};

export default wrapperComponent;

export const Tip = new Portal(wrapperComponent, {});

</script>

<style lang="scss">

</style>
