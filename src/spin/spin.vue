<template>
	<i-spin 
		:size="size"
		:fix="fix"
	>
		<slot />
	</i-spin>
</template>
<script>
import Spin from 'iview/src/components/spin';

export default {
	name: "vc-spin",
	components: {
		'i-spin': Spin
	},
	props: {
		...Spin.props
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>
<style></style>