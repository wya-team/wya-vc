<template>
	<div class="v-artboard">
		<vc-artboard 
			ref="artboard" 
			:config="{ strokeStyle: 'red', shadowColor: 'red' }"
			@change="handleChange" />	
		<div style="margin-top: 20px;">
			<vc-button @click="handleClear">清除</vc-button>
			<vc-button @click="handleGetImg">生成图片</vc-button>
			<vc-button @click="handleUndo">回退一步</vc-button>
			<vc-button @click="handleRedo">取消回退</vc-button>
		</div>
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
		handleUndo() {
			this.$refs.artboard.undo();
		},
		handleRedo() {
			this.$refs.artboard.redo();
		},
		handleClear() {
			this.$refs.artboard.clear();
		},
		handleGetImg() {
			this.src = this.$refs.artboard.getImage({ type: this.type, encoderOptions: this.encoderOptions });
		},
		handleChange({ steps, index }) {
			console.log('steps :', steps);
			console.log('index :', index);
		}
	},
};
</script>

<style lang="scss">
.v-artboard {
	canvas {
		width: 100%;
		height: 100%;
	}
	img {
		width: 200px;
		height: 200px;
	}
}
</style>
