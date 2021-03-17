<!-- 仅展示最基本的用法 -->
<template>
	<div style="padding: 20px">
		<vc-rate
			v-model="value"
			half
			clearable
			color="#ff0000"
			:tooltips="tooltips"
		/>
	</div>
</template>
<script>
import Rate from '..';

export default {
	name: "vc-rate-basic",
	components: {
		'vc-rate': Rate,
	},
	data() {
		return {
			value: 3.5,
			tooltips: ['极差', '差', '一般', '好', '极好']
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>
