<template>
	<div>
		<vc-print ref="pageTarget">
			打印的内容
			打印的内容
			打印的内容
			打印的内容
			打印的内容
		</vc-print>
		<div @click="handleClick">
			点我打印
		</div>
	</div>
</template>
<script>
import Print from '../print';

export default {
	name: "vc-print-basic",
	components: {
		'vc-print': Print
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
		handleClick() {
			console.log(this.$refs.pageTarget.print());
		}
	}
};
</script>
