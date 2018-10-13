<template>
	<div @click="handleClick">点击</div>
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
	methods: {
		handleClick() {
			MToast.info('测试', 1.5, () => {
				console.log('回调');
			});
		}
	}
};
</script>
