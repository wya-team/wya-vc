<!-- 仅展示最基本的用法 -->
<template>
	<div style="padding: 20px">
		<vc-steps-bar 
			v-model="current"
			:data-source="dataSource"
			@change="handleChange"
		/>
	</div>
</template>
<script>
import Steps from '..';

export default {
	name: "vc-steps-basic",
	components: {
		'vc-steps-bar': Steps.Bar,
	},
	data() {
		return {
			current: "1",
			dataSource: [
				{ 
					step: "1",
					label: '第1步'
				},
				{ 
					step: "2",
					label: '第2步'
				},
				{ 
					step: "3",
					label: '第3步'
				}
			]
		};
	},
	methods: {
		handleChange(e) {
			console.log(e);
		}
	}
};
</script>
