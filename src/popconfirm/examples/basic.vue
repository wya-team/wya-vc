<template>
	<div style="padding: 200px">
		<vc-popconfirm
			title="Are you sure to delete this task?"
			type="info"
		>
			<vc-button type="primary">Button</vc-button>
		</vc-popconfirm>
	</div>
</template>
<script>
import Popconfirm from '../popconfirm';
import Button from '../../button/index';

export default {
	name: "vc-popconfirm-baisc",
	components: {
		'vc-popconfirm': Popconfirm,
		'vc-button': Button
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
