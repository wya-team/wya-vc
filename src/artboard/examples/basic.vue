<template>
	<div class="v-artboard">
		<vc-artboard 
			ref="artboard" 
			:options="{ strokeStyle: 'red', shadowColor: 'red' }"
			:width="300"
			:height="200"
			:get-instance="getInstance"
			@change="handleChange" 
		/>	
		<div style="margin-top: 20px;">
			<vc-button @click="handleReset">重置画布</vc-button>
			<vc-button @click="handleGetImg">生成图片</vc-button>
			<vc-button @click="handleUndo">回退一步</vc-button>
			<vc-button @click="handleRedo">取消回退</vc-button>
		</div>
		<img :src="src" alt="">
	</div>
</template>

<script>
import Message from '../../message';
import button from '../../button';
import artboard from '../artboard.vue';

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
			instance: null
		};
	},
	created() {
	},
	methods: {
		getInstance(instance) {
			this.instance = instance;
		},
		handleUndo() {
			if (!this.undo) {
				Message.warning("已经没有回退的步骤了");
				return;
			}
			this.instance.undo();
		},
		handleRedo() {
			if (!this.redo) {
				Message.warning("已经没有撤销的步骤了");
				return;
			}
			this.instance.redo();
		},
		handleReset() {
			this.instance.reset();
		},
		handleGetImg() {
			this.src = this.instance.canvas.toDataURL({ type: this.type, encoderOptions: this.encoderOptions });
		},
		handleChange({ snapshots, current }) {
			console.log('snapshots :', snapshots);
			console.log('current :', current);
			if (current === 0) {
				this.undo = false;
			} else if (current === snapshots.length) {
				this.undo = true;
				this.redo = false;
			} else {
				this.undo = true;
				this.redo = true;
			}
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
