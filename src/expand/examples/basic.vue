<template>
	<div>
		<span @click="handleToggle">
			更多搜索条件{{ show ? `up` : `down` }}
		</span>
		<vc-expand 
			ref="expand"
			v-model="show"
		>
			<div>
				<div>1</div>
				<div>2</div>
				<div>3</div>
				<div>4</div>
				<div>5</div>
				<div>6</div>
				<div>7</div>
				<div>8</div>
			</div>
		</vc-expand>
	</div>
</template>

<script>
import Expand from '../index';

export default {
	name: 'vc-expand-basic',
	components: {
		'vc-expand': Expand
	},
	data() {
		return {
			show: false
		};
	},
	methods: {
		handleToggle() {
			this.$refs.expand.toggle();
		}
	}
};

</script>

<style lang="scss" scoped>

</style>
