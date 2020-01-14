<template>
	<div>
		<span @click="handleToggle">
			更多搜索条件{{ visible ? `up` : `down` }}
		</span>
		<vc-icon :type="`triangle-${visible ? `up2` : `down2`}`" />
		<vc-expand 
			ref="expand"
			v-model="visible"
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
import Icon from '../../icon/index';

export default {
	name: 'vc-expand-basic',
	components: {
		'vc-expand': Expand,
		'vc-icon': Icon,
	},
	data() {
		return {
			visible: false
		};
	},
	methods: {
		handleToggle() {
			this.visible = !this.visible;
		}
	}
};

</script>

<style lang="scss">

</style>
