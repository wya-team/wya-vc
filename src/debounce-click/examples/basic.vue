<template>
	<vc-debounce-click tag="div" type="primary" @click="handleClick">
		点击
	</vc-debounce-click>
</template>
<script>
import DebounceClick from '../debounce-click';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-debounce-click': DebounceClick,
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	beforeCreate() {
		
	},
	methods: {
		handleClick(e) {
			console.log(e, new Date());
		}
	}
};
</script>
