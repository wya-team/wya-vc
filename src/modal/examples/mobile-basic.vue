<template>
	<div style="padding: 100px">
		<vcm-modal 
			v-model="visible1"
			:mask-closable="true"
			title="标题1"
			content="啦啦啦啦"
			@close="handleClose"
			@cancel="handleCancel"
			@ok="handleOk"
		/>
		<vcm-modal 
			v-model="visible2"
			:mode="mode"
			:mask-closable="true"
			title="标题1"
			@close="handleClose"
			@cancel="handleCancel"
			@ok="handleOk"
		>
			啦啦啦啦
		</vcm-modal>
		<div @click="handleClick1">normal: 基本</div>		
		<div @click="handleClick2">normal: 自定义slot content</div>
		<div @click="handleClick3">portal: 确定，取消</div>
		<div @click="handleClick4">portal: 多个按钮</div>
		<div @click="handleClick5">portal: operation</div>
	</div>
</template>
<script>
import MModal from '../index.m';
import { VcInstance } from '../../vc/index';

window.vc = VcInstance;
export default {
	name: "vc-tpl-basic",
	components: {
		'vcm-modal': MModal,
	},
	data() {
		return {
			mode: 'alert',
			visible1: false,			
			visible2: false,
		};
	},
	computed: {
		
	},
	methods: {
		handleClick1() {
			this.visible1 = !this.visible1;
		},
		handleClick2() {
			this.visible2 = !this.visible2;
		},
		handleClose() {
			console.log('关闭后都会触发');
		},
		handleCancel() {
			console.log('点击取消这个按钮时回调');
		},
		handleOk() {
			console.log('点击确定这个按钮时回调');
		},
		handleClick3() {
			MModal.alert({
				title: '标题1',
				content: '啦啦',
				onOk: () => {
					console.log('点击确定这个按钮时回调');
				},
				onCancel: () => {
					console.log('点击确定这个按钮时回调');
				},
				onClose: () => {
					console.log('关闭后都会触发');
				}
			});
		},
		handleClick4() {
			MModal.alert({
				title: '标题1',
				content: '啦啦',
				actions: [
					{
						text: '1',
						onPress: () => console.log(`点击了第1个按钮`)
					},
					{
						text: '2',
						onPress: () => console.log(`点击了第2个按钮`)
					},
					{
						text: '3',
						onPress: () => console.log(`点击了第3个按钮`)
					}
				]
			});
		},
		handleClick5() {
			MModal.operation({
				actions: [
					{
						text: '1',
						onPress: () => console.log(`点击了第1个按钮`)
					},
					{
						text: '2',
						onPress: () => console.log(`点击了第2个按钮`)
					},
					{
						text: '3',
						onPress: () => console.log(`点击了第3个按钮`)
					}
				]
			});
		}
	}
};
</script>
