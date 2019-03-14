<template>
	<vc-page
		:current.sync="current"
		:count="100" 
		:total="100" 
		show-count 
		show-elevator 
		show-sizer 
	/>
</template>
<script>
import Page from '..';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-page': Page
	},
	data() {
		return {
			current: 3,
		};
	},
	computed: {
		
	},
	updated() {
		console.log(this.current);
	},
	methods: {
	}
};
</script>
