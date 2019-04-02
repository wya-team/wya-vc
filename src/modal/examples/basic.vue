<template>
	<div>
		<vc-button @click="handleModal">点击出现对话框</vc-button>
		<vc-button @click="handleModal2">点击出现对话框,点击遮罩不能关闭</vc-button>
		<vc-button @click="handleModal3">点击出现对话框3</vc-button>
		<vc-button type="primary" @click="handleModal4">Button</vc-button>
		<div style="width: 100%; height: 2000px"/>
		<vc-modal 
			v-model="visible"
			:loading="true"
			title="标题1"
			@close="handleClose"
			@cancel="handleCancel"
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
			@close="handleClose"
			@cancel="handleCancel"
			@ok="handleOk"
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
			@close="handleClose"
			@cancel="handleCancel"
			@ok="handleOk"
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
		handleModal(e) {
			this.visible = true;
		},
		handleModal2(e) {
			this.visible2 = true;
		},
		handleModal3(e) {
			this.visible3 = true;
		},
		handleModal4() {
			Modal.error({
				title: 'confirm',
				content: (h) => {
					return h('input', {
						type: 'textarea',
						style: {
							height: '500px'
						}
					});
				},
				okText: '啦啦啦啦',
				mask: true,
				closeWithCancel: true,
				onOk: () => {
					console.log('ok');
					return new Promise((resolve, reject) => {
						setTimeout(() => {
							resolve();
						}, 1000);
					});
				},
				onCancel: () => {
					console.log('cancel');
				}
			});
		},
		handleClose() {
			console.log('关闭后都会触发');
		},
		handleCancel() {
			console.log('点击取消这个按钮时回调');
		},
		handleOk(e) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					// this.visible = false;
					resolve();
				}, 1000);
			}).catch((res) => {
				console.log(res);
			});
		}
	}
};
</script>
