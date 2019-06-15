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
			<div @click="handleClick4">portal: 确定，取消</div>
			<vcm-input v-model="value"/>
		</vcm-modal>
		<vcm-modal 
			v-model="visible3"
			:mode="mode"
			:mask-closable="true"
			:cancel-text="false"
			title="标题1"
			content="啦啦啦啦"
			@close="handleClose"
			@cancel="handleCancel"
			@ok="handleOk"
		/>
		<div @click="handleClick1">normal: 基本</div>		
		<div @click="handleClick2">normal: 自定义slot content</div>
		<div @click="handleClick3">normal: 1个按钮</div>
		<div @click="handleClick4">portal: 确定，取消</div>
		<div @click="handleClick5">portal: 多个按钮</div>
		<div @click="handleClick6">portal: operation</div>
	</div>
</template>
<script>
import MModal from '../index.m';
import { VcInstance } from '../../vc/index';
import MInput from '../../input/index.m';

window.vc = VcInstance;
export default {
	name: "vc-tpl-basic",
	components: {
		'vcm-modal': MModal,
		'vcm-input': MInput,
	},
	data() {
		return {
			value: "222",
			mode: 'alert',
			visible1: false,			
			visible2: false,
			visible3: false,
		};
	},
	computed: {
		
	},
	methods: {
		handleClose() {
			console.log('关闭后都会触发');
		},
		handleCancel() {
			console.log('点击取消这个按钮时回调');
		},
		handleOk(e, done) {
			console.log('点击确定这个按钮时回调');
			return new Promise((resolve, reject) => {
				setTimeout(done, 3000);
			});
			// setTimeout(done, 3000);
			// return true;
		},
		handleClick1() {
			this.visible1 = !this.visible1;
		},
		handleClick2() {
			this.visible2 = !this.visible2;
		},
		handleClick3() {
			this.visible3 = !this.visible3;
		},
		handleClick4() {
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
		handleClick5() {
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
		handleClick6() {
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
