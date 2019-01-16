<template>
	<div>
		<vc-button @click="showModal">点击出现对话框</vc-button>
		<vc-button @click="showModal2">点击出现对话框,点击遮罩不能关闭</vc-button>
		<div style="width: 100%; height: 2000px"/>
		<vc-modal 
			v-model="visible"
			title="标题1"
			@cancel="handleCandel"
			@ok="handleOk"
		>
			啦啦啦啦
		</vc-modal>
		<vc-modal 
			v-model="visible2"
			:mask="false"
			:mask-closable="false"
			:esc-closable="false"
			:scrollable="false"
			:draggable="true"
			title="标题2"
		>
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
			visible2: false,
			event: {},
		};
	},
	computed: {
		
	},
	methods: {
		showModal(e) {
			this.visible = true;
		},
		showModal2(e) {
			this.visible2 = true;
		},
		handleCandel() {
			console.log('取消时回调');
		},
		handleOk() {
			console.log('确定时回调');
		}
	}
};
</script>
