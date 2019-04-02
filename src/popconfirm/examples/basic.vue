<template>
	<div style="padding: 200px">
		<vc-popconfirm
			v-model="visible"
			title="Are you sure to delete this task?"
			type="info"
			@close="handleClose"
			@cancel="handleCancel"
			@ok="handleOk"
		>
			<vc-button type="primary">点我</vc-button>
		</vc-popconfirm>

		<vc-button @click="handleClick">外部点击</vc-button>
	</div>
</template>
<script>
import Popconfirm from '..';
import Button from '../../button/index';

export default {
	name: "vc-popconfirm-baisc",
	components: {
		'vc-popconfirm': Popconfirm,
		'vc-button': Button
	},
	data() {
		return {
			visible: false
		};
	},
	computed: {
		
	},
	methods: {
		handleClick() {
			this.visible = !this.visible;
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
					reject();
				}, 1000);
			}).catch((res) => {
				console.log(res);
			});
		}
	}
};
</script>
