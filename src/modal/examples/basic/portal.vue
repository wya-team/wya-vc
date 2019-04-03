<template>
	<vc-modal
		v-model="visible"
		title="title"
		@ok="handleOk"
		@cancel="handleCancel"
	>
		<p> {{ data }} </p>
	</vc-modal>
</template>

<script>
import Modal from '../..';
import CreatePortal from '../../../create-portal/index';

const config = {
	name: "vc-tpl-basic",
	components: {
		'vc-modal': Modal
	},
	props: {
		data: Object
	},
	data() {
		return {
			visible: false
		};
	},
	computed: {
		
	},
	mounted() {
		this.visible = true;
	},
	methods: {
		handleOk() {
			console.log(2);
			/**
			 * v-model会默认被触发，要由该组件控制，给组件i-modal传值 loading: true
			 */
			// this.visible = false;
			this.$emit('sure');
		},
		handleCancel() {
			// this.visible = false;
			this.$emit('close');
		}
	}
};
export default config;

export const Portal = CreatePortal({}, config);
</script>
