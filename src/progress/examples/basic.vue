<template>
	<div>
		<div>
			<vc-progress
				:stroke-width="7"
				:percent="50"
				status="active"
			/>
		</div>
		<div>
			<vc-progress
				:stroke-width="7"
				:percent="50"
				status="error"
			/>
		</div>
		<div>
			<vc-progress
				:stroke-width="7"
				:percent="100"
			/>
		</div>
		<vc-progress
			:stroke-width="5" 
			:percent="70"
			type="circle"
		/>
		<vc-progress
			:stroke-width="10" 
			:percent="50"
			stroke-color="#ed4014"
			type="circle"
		>
			<div>自定义的数据</div>
		</vc-progress>
	</div>
</template>
<script>
import Progress from '../progress';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-progress': Progress
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
