<template>
	<div class="vc-spin">
		<span :style="{ fontSize: `${size}px` }">
			<slot name="loading">
				<svg 
					xmlns="http://www.w3.org/2000/svg" 
					version="1.1" 
					viewBox="0 0 32 32" 
					width="100%" 
					height="100%"
				>
					<path 
						:stroke="foreground"
						d="M 16 2 A 14 14 0 1 0 30 15" 
						fill="none" 
						stroke-width="2" 
						stroke-linecap="round"
					/>
					<path 
						:stroke="background"
						d="M 16 2 A 14 14 0 0 1 30 15" 
						fill="none" 
						stroke-width="2" 
						stroke-linecap="round"
					/>
				</svg>
			</slot>
		</span>
		<slot />
	</div>
</template>
<script>

export default {
	name: "vc-spin",
	components: {
	},
	props: {
		size: {
			type: Number,
			default: 28
		},
		foreground: {
			type: String,
			default: '#ccc'
		},
		background: {
			type: String,
			default: '#108ee9'
		},
		/**
		 * 带开发
		 */
		fixed: {
			type: Boolean,
			default: false
		},
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
<style>

.vc-spin {
	display: inline-block;
	vertical-align: middle;
	line-height: 0;
}
.vc-spin svg {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em; // 居中
	fill: currentColor;
	overflow: hidden;
	animation: vc-spin-circle 1s linear infinite;
}
@keyframes vc-spin-circle {
	to {
		transform: rotate(1turn);
	}
}

</style>