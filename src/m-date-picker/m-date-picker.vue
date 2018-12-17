<template>
	<div class="container" @click="handleClick">
		<slot />
		<!-- 待开发（表单） -->
	</div>
</template>

<script>
import Core, { datePicker } from './core';

export default {
	name: "vcm-picker",
	components: {},
	props: {
		...Core.props,
	},
	popup: datePicker.popup,
	data() {
		return {};
	},
	methods: {
		handleClick() {
			let { type, minDate, maxDate, format, value } = this;
			datePicker.popup({
				type,
				minDate,
				maxDate,
				format,
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
