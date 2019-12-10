<template>
	<div style="padding: 200px">
		<vc-popconfirm
			v-model="visible"
			:trigger="trigger"
			title="Are you sure to delete this task?"
			type="info"
			@close="handleClose"
			@visible-change="handleChange"
			@cancel="handleCancel"
			@ok="handleOk"
		>
			<vc-button type="primary">点我</vc-button>
			<template #content>
				<div>222</div>
			</template>
		</vc-popconfirm>

		<vc-button @click="handleVisible">外部点击</vc-button>
		<vc-button @click="handleTrigger">{{ trigger }}</vc-button>
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
			visible: false,
			trigger: 'hover'
		};
	},
	computed: {
		
	},
	methods: {
		/**
		 * 事件冒泡上来了
		 */
		handleVisible() {
			/**
			 * click模式下，this.visible会一直拿到false
			 */
			if (!this.wait) {
				this.visible = !this.visible;
			}
		},
		handleClose() {
			console.log('关闭后都会触发');
			this.wait = 1;
			this.timer = setTimeout(() => {
				this.wait = 0;
			}, 200);
		},
		handleCancel() {
			console.log('点击取消这个按钮时回调');
		},
		handleOk(e, callback) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					reject();
					callback();
				}, 1000);
			}).catch((res) => {
				console.log(res);
			});
		},
		handleTrigger() {
			this.trigger = this.trigger === 'hover' ? 'click' : 'hover'; 
		},
		handleChange(v) {
			console.log('visible-change', v);
		}
	}
};
</script>
