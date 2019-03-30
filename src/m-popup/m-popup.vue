<template>
	<div>
		<transition name="am-fade">
			<div
				v-show="mask && isActive && position !== 'top'"
				class="__mask"
				@click="handleClose(maskClosable)"
			/>
		</transition>
		<transition :name="position" @after-leave="handleRemove">
			<div
				v-show="isActive"
				:class="[{ '__dark': position === 'top' }, position]"
				:style="{position:fixed?'fixed':'absolute'}"
				class="__wrap"
			>
				<slot />
			</div>
		</transition>
	</div>
</template>
<script>
export default {
	name: "vcm-popup",
	model: {
		prop: 'visible',
		event: 'change'
	},
	props: {
		fixed: {
			type: Boolean,
			default: true
		},
		visible: {
			type: Boolean,
			default: false
		},
		position: {
			type: String,
			default: 'bottom'
		},
		mask: {
			type: Boolean,
			default: true
		},
		maskClosable: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			isActive: false
		};
	},
	computed: {},
	watch: {
		visible: {
			immediate: true,
			handler(v) {
				this.isActive = v;
				if (v && this.position == 'top') {
					this.clearTimer();
					this.timer = setTimeout(this.handleClose, 3000);
				}
			}
		}
	},
	destroyed() {
		this.clearTimer();
	},
	methods: {
		clearTimer() {
			this.timer && clearTimeout(this.timer);
		},
		/**
		 * 立即执行关闭操作，内部主动触发
		 */
		handleClose(maskClosable = true) {
			if (maskClosable || this.position == 'top') {
				this.isActive = false;
			}
		},
		/**
		 * 动画执行后关闭
		 * 同时close兼容portal设计
		 */
		handleRemove() {
			!this._isDestroyed && (
				this.$emit('close'),
				this.$emit('change', false),
				this.zIndex = -1
			);
		}
	},
};

</script>
<style lang="scss" scoped>
	.bottom {
		right: 0;
		bottom: 0;
		left: 0;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.top {
		top: 0;
		right: 0;
		left: 0;
		padding-top: env(safe-area-inset-bottom);
	}

	.__wrap {
		position: absolute;
		z-index: 1000;
		background-color: #fff;
		transition: transform .2s;
		width: 100%;
	}

	.__dark {
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, .3);
		color: #fff;
		height: 50px;
		font-size: 16px;
		min-height: 50px;
	}

	.__mask {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .4);
		height: 100%;
		z-index: 1000;
		transition: opacity 0.2s ease;
	}
	// 动画
	.top-enter,
	.top-leave-to {
		transform: translate(0, -100%);
	}

	.bottom-enter,
	.bottom-leave-to {
		transform: translate(0, 100%);
	}

	// fade存在bug, am-前缀处理，原因未知
	.am-fade-enter, .am-fade-leave-to {
		opacity: 0;
	}
</style>
