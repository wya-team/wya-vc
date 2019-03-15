<template>
	<vc-modal
		v-model="visible"
		:confirm="confirm"
		:title="title"
		:content="content"
		:mode="mode"
		:show-cancel="showCancel"
		@ok="handleOk"
		@cancel="handleCancel"
	/>
</template>

<script>
import Modal from './modal';
import CreatePortal from '../create-portal/index';

const config = {
	name: "vc-tpl-basic",
	components: {
		'vc-modal': Modal
	},
	props: {
		title: String,
		content: [String, Function],
		mode: String,
		showCancel: Boolean
	},
	data() {
		return {
			visible: false,
			confirm: true,
            
		};
	},
	computed: {
		
	},
	mounted() {
		this.visible = true;
	},
	methods: {
		handleOk() {
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

export const ModalConfirm = CreatePortal({}, config);
</script>
