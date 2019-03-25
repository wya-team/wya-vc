<template>
	<div style="padding: 200px">
		<vc-popconfirm
			title="Are you sure to delete this task?"
		>
			触发
		</vc-popconfirm>
	</div>
</template>
<script>
import Popconfirm from '../popconfirm';

export default {
	name: "vc-popconfirm-baisc",
	components: {
		'vc-popconfirm': Popconfirm
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
