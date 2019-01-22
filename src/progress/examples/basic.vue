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
