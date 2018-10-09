<template>
	<i-modal
		v-model="visible"
		title="Common Modal dialog box title"
		@on-ok="handleOk"
		@on-cancel="handleCancel"
	>
		<p>Content of dialog</p>
		<p>Content of dialog</p>
		<p>Content of dialog</p>
	</i-modal>
</template>

<script>
import { Modal } from 'iview';
import CreatePortal from '../../index';

export default {
	name: "vc-tpl-basic",
	components: {
		'i-modal': Modal
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
			this.visible = false;
			this.$emit('sure');
		},
		handleCancel() {
			this.visible = false;
			this.$emit('close');
		}
	}
};
export const PModalWithBefore = CreatePortal({
	onBefore() {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, 1000);
		});
	}
}, module.exports.default);

export const PModal = CreatePortal({}, module.exports.default);
</script>
