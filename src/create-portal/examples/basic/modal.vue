<template>
	<i-modal
		v-model="visible"
		title="title"
		@on-ok="handleOk"
		@on-cancel="handleCancel"
	>
		<p> {{ data }} </p>
	</i-modal>
</template>

<script>
import { Modal } from 'iview';
import CreatePortal from '../../index';

const config = {
	name: "vc-tpl-basic",
	components: {
		'i-modal': Modal
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

export const PModalWithBefore = CreatePortal({
	onBefore() {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, 1000);
		});
	}
}, config);

export const PModal = CreatePortal({}, config);
</script>
