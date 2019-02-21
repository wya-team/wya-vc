<template>
	<div>
		<vc-spin size="small"/>
		<vc-spin/>
		<vc-spin size="large"/>
	</div>
</template>
<script>
import Spin from '..';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-spin': Spin
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
