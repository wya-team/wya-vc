<template>
	<div>
		<div @click="handleClick('normal')">点击</div>
		<div @click="handleClick('loading')">点击加载中</div>
	</div>
</template>
<script>
import MToast from '../index';

export default {
	name: "vc-tpl-basic",
	components: {
	},
	data() {
		return {
		};
	},
	computed: {

	},
	mounted() {
		MToast.info('测试1', 3);
		MToast.info('测试2', 3);
		MToast.info('测试3', 3);
		setTimeout(MToast.hide, 1000);
	},
	methods: {
		handleClick(v) {
			if (v == 'normal') {
				MToast.info('测试', 15, () => {
					console.log('回调');
				});
			} else {
				MToast.loading('加载中', 1, () => {
					console.log('回调');
				});
			}
		}
	}
};
</script>
