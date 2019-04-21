<template>
	<i class="vc-icon" @click="handleClick">
		<svg :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg">
			<path 
				v-for="(it, i) in path"
				:key="i" 
				:d="it.d" 
				:fill="inherit && it.fill"
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
		inherit: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			viewBox: '0 0 1024 1024',
			path: []
		};
	},
	watch: {
		type: {
			immediate: true,
			handler(v, old) {
				IconManager.icons[v] 
					? this.getConfig() 
					: (
						IconManager
							.off(old, this.callback)
							.on(v, this.callback)
					);
			}
		}
	},
	created() {
		this.callback = ::this.getConfig;
	},
	methods: {
		getConfig() {
			this.viewBox = IconManager.icons[this.type].viewBox;
			this.path = IconManager.icons[this.type].path;
		},
		handleClick(e) {
			this.$emit('click', e);
		}
	}
};
</script>
<style lang="scss">
.vc-icon {
	display: inline-block;
	vertical-align: middle;
	line-height: 0;
}
.vc-icon svg {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em; // 居中
	// padding: 0.05em;
	fill: currentColor;
	overflow: hidden;
}
</style>