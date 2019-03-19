<template>
	<div>
		<vc-button @click="showModal">点击出现对话框</vc-button>
		<vc-button @click="showModal2">点击出现对话框,点击遮罩不能关闭</vc-button>
		<vc-button @click="showModal3">点击出现对话框3</vc-button>
		<vc-button type="primary" @click="handleModal">Button</vc-button>
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
			:scrollable="true"
			:draggable="true"
			title="标题2"
			ok-text="保存"
			cancel-text="关闭"
		>
			啦啦啦啦
		</vc-modal>
		<vc-modal 
			v-model="visible3"
			:mask="false"
			:mask-closable="false"
			:esc-closable="false"
			:scrollable="true"
			:draggable="true"
			title="标题2"
			ok-text="保存"
			cancel-text="关闭"
		>
			啦啦啦啦
		</vc-modal>
	</div>
</template>
<script>
import Button from '../../button';
import Modal from '../index';

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
			visible3: false,
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
		showModal3(e) {
			this.visible3 = true;
		},
		handleModal() {
			Modal.error({
				title: 'confirm',
				content: '啦啦啦啦啦啦啦啦啦啦啦',
				showCancel: false,
				okText: '啦啦啦啦',
				mask: false
			});
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
