<template>
	<div class="container" @click="handleClick">
		<slot />
		<!-- 待开发（表单） -->
	</div>
</template>

<script>
import Core, { Picker } from './core';

export default {
	name: "vcm-picker",
	components: {},
	props: {
		...Core.props,
	},
	popup: Picker.popup,
	data() {
		return {};
	},
	methods: {
		handleClick() {
			let { dataSource, cols, cascade, itemStyle, title, cancelText, okText, showToolbar, value, show } = this;
			Picker.popup({
				dataSource,
				cols,
				cascade,
				itemStyle,
				title,
				cancelText,
				showToolbar,
				show,
				okText,
				value
			}).then(res => {
				console.log(res);
			}).catch(err => {
				console.log(err);
			});
		}
	},
	destoryed() {}
};

</script>

<style scoped lang='scss'>
	.container {
		width: 100px;
		height: 100px;
		background: red;
	}

</style>
