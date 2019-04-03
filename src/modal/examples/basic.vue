<template>
	<div style="padding: 100px">
		<vc-button @click="handleModal">点击出现对话框</vc-button>
		<vc-button @click="handleModal2">点击出现对话框,点击遮罩不能关闭</vc-button>
		<vc-button @click="handleModal3">create-portal</vc-button>
		<vc-button type="primary" @click="handleModal4">Modal.methods</vc-button>
		<div style="width: 100%; height: 2000px"/>
		<vc-modal 
			v-model="visible1"
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
			scrollable
			draggable
			title="标题2"
			ok-text="保存"
			cancel-text="关闭"
			@close="handleClose"
			@cancel="handleCancel"
			@ok="handleOk"
		>
			可以拖拽
		</vc-modal>
	</div>
</template>
<script>
import Button from '../../button';
import Modal from '../index';
import { Portal } from './basic/portal';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-modal': Modal,
		'vc-button': Button
	},
	data() {
		return {
			visible1: true,
			visible2: false,
			visible3: false,
			event: {},
		};
	},
	computed: {
		
	},
	methods: {
		handleModal(e) {
			this.visible1 = !this.visible1;
		},
		handleModal2(e) {
			this.visible2 = !this.visible2;
		},
		handleModal3(e) {
			Portal.popup({

			}).then(() => {

			}).catch(() => {

			});
		},
		handleModal4() {
			Modal.warning({
				title: 'warning',
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
				onOk: (e, callback) => {
					console.log('ok');
					return new Promise((resolve, reject) => {
						setTimeout(() => {
							callback();
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
		handleOk(e, callback) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					callback();
					resolve();
				}, 1000);
			}).catch((res) => {
				console.log(res);
			});
		}
	}
};
</script>
