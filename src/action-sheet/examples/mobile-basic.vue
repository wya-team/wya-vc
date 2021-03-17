<!-- 开发使用的版本，如各种操作改变属性值 -->
<template>
	<div style="padding: 20px; display: flex; flex-direction: column-reverse;">
		<div @click="handleClick">
			唤起ActionSheet
		</div>
	</div>
</template>
<script>
import MActionSheet from '..';

export default {
	name: "vc-tpl-basic",
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
		handleClick() {
			MActionSheet.popup({
				title: '我是标题',
				description: '我是描述我是描述我是描述我是描述',
				cancelText: '取消',
				actions: [
					{
						name: '选项一',
						subName: '我是第二级标题',
						onClick: this.handlePress
					},
					{
						name: '选项二',
						disabled: true,
						onClick: this.handlePress
					},
					{ 
						name: 'DELETE', 
						className: 'test',
						style: `color: #ff0000`, 
						onClick: this.handlePress 
					}
				]
			}).then((res) => {
				console.log('sure', res);
			}).catch(() => {
				console.log('close');
			});
		},
		handlePress(action, cb) {
			return new Promise((r, j) => {
				setTimeout(() => {
					r();
				}, 2000);
			});
		}
	}
};
</script>
