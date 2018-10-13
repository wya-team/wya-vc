<template>
	<div class="vcm-toast">
		<div 
			v-show="showClose"
			class="__bg" 
			@click="handleClose" 
		/>
		<transition name="fade" @after-leave="handleRemove">
			<div v-show="visible" class="__fixed">{{ message }}</div>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'vc-m-toast',
	props: {
		message: String,
		// onClose: Function,
		// onCallback: Function,
		showClose: Boolean,
		duration: Number,
	},

	data() {
		return {
			// 先要隐藏在显示，才有transition
			visible: false
		};
	},
	mounted() {
		this.visible = true;
		if (this.duration !== 0) {
			this.timer = setTimeout(() => {
				// 主线程
				this.handleClose();
			}, this.duration * 1000 - 300); // 动画时间
		}
	},
	destroyed() {
		this.timer && clearTimeout(this.timer);
	},
	methods: {
		handleRemove() {
			this.$emit('callback');
			this.$emit('close');
		},
		handleClose(e) {
			this.visible = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.vcm-toast {
	.__bg {
		position: fixed;
		background: rgba(0, 0, 0, 0.4);
		z-index: 3999;
		height: 100%;
		width: 100%;
		left: 0;
		right: 0;
		margin: 0 auto;
		bottom: 0;
		opacity: 0;
	}
	.__fixed {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 4001;
		max-width: 50%;
		height: auto;
		background: rgba(58, 58, 58, 0.9);
		padding: 9px 15px;
		border-radius: 3px;
		line-height: 1.5;
		color: #fff;
		text-align: center;
		transition: opacity .3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
	}
}
.fade-enter, .fade-leave-active {
	opacity: 0;
}
</style>