<template>
	<div style="padding: 100px">
		<vc-transition>
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
		</vc-transition>
		<h3 @click="handleClick">{{ visible }}</h3>
	</div>
</template>
<script>
import Transtion from '..';

export default {
	name: "vc-transtion-basic",
	components: {
		'vc-transition': Transtion
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
