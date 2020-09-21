<!-- 仅展示最基本的用法 -->
<template>
	<div style="padding: 20px">
		<div>
			<span>1</span>
			<vc-divider vertical />
			<span>2</span>
			<vc-divider vertical />
			<span>3</span>
		</div>
		<div>
			<vc-divider />
			<span>1</span>
			<vc-divider placement="left">
				2
			</vc-divider>
			<span>3</span>
			<vc-divider>4</vc-divider>
			<span>5</span>
			<vc-divider placement="right">
				6
			</vc-divider>
		</div>
	</div>
</template>
<script>
import Divider from '..';

export default {
	name: "vc-divider-basic",
	components: {
		'vc-divider': Divider,
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
