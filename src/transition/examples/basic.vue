<template>
	<div style="padding: 100px">
		<vc-transition-fade>
			<div v-show="visible">
				<p>test</p>
				<p>test</p>
				<p>test</p>
				<p>test</p>
				<p>test</p>
				<p>test</p>
				<p>test</p>
				<p>test</p>
				<p>test</p>
			</div>
		</vc-transition-fade>
		<h3 @click="handleClick">{{ visible }}</h3>
	</div>
</template>
<script>
import Transtion from '..';

export default {
	name: "vc-transtion-basic",
	components: {
		'vc-transition-fade': Transtion.Fade
	},
	data() {
		return {
			visible: false
		};
	},
	computed: {
		
	},
	methods: {
		handleClick() {
			this.visible = !this.visible;
		}
	}
};
</script>
