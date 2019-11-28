<template>
	<div :style="getStyle" class="v-artboard">
		<vc-artboard ref="artboard" />	
		<vc-button @click="handleClear">清除</vc-button>
		<vc-button @click="handleGetImg">生成图片</vc-button>
		<vc-button @click="handleRevocation">回退一步</vc-button>
		<vc-button @click="handleCancel">取消回退</vc-button>
		<img :src="src" alt="">
	</div>
</template>

<script>
import artboard from '../artboard.vue';
import button from '../../button';

export default {
	name: 'v-artboard',
	components: {
		'vc-artboard': artboard,
		'vc-button': button,
	},
	props: {
	},
	data() {
		return {
			src: '',
		};
	},
	created() {
	},
	methods: {
		handleRevocation() {
			this.$refs.artboard.revocation();
		},
		handleCancel() {
			this.$refs.artboard.cancel();
		},
		handleClear() {
			this.$refs.artboard.clear();
		},
		handleGetImg() {
			this.src = this.$refs.artboard.getImage({ type: this.type, encoderOptions: this.encoderOptions });
		},
	},
};
</script>

<style lang="scss">
.v-artboard {
	canvas {
		width: 200px;
		height: 200px;
	}
	img {
		width: 200px;
		height: 200px;
	}
}
</style>
