<template>
	<i class="vc-icon" @click="$emit('click', $event)">
		<svg :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg">
			<path 
				v-for="(it, i) in path"
				:key="i" 
				:d="it.d" 
				:fill="it.fill"
			/>
		</svg>
	</i>
</template>
<script>
import IconManager from './manager';

export default {
	name: "vc-icon",
	props: {
		type: String,
	},
	data() {
		return {
			viewBox: '0 0 1024 1024',
			path: []
		};
	},
	created() {
		IconManager.icons[this.type] 
			? this.getConfig() 
			: IconManager.ready(::this.getConfig);
	},
	
	methods: {
		getConfig() {
			if (!IconManager.icons[this.type]) return;
			this.viewBox = IconManager.icons[this.type].viewBox;
			this.path = IconManager.icons[this.type].path;
		}
	}
};
</script>
<style>
.vc-icon {
	display: inline-block;
	line-height: 0;
}
.vc-icon svg {
	width: 1em;
	height: 1em;
	fill: currentColor;
	overflow: hidden;
}
</style>