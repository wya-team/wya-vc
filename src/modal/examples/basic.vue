<template>
	<div>
		<vc-button @click="showModal">点击出现对话框</vc-button>
		<vc-modal v-model="visible">
			啦啦啦啦
		</vc-modal>
	</div>
</template>
<script>
import Modal from '../modal';
import Button from '../../button';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-modal': Modal,
		'vc-button': Button
	},
	data() {
		return {
			visible: false,
			event: {},
		};
	},
	computed: {
		
	},
	methods: {
		showModal(e) {
			this.visible = true;
			console.log(e);
		}
	}
};
</script>
