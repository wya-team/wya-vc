<template>
	<div :style="{ position: fixed ? 'fixed' : 'absolute' }" class="vcm-popup">
		<transition name="fade">
			<div v-if="mask && isActive && position !== 'top'" class="__mask" @click="handleClose(maskClosable)" />
		</transition>
		<transition :name="position">
			<div v-if="isActive" :class="[{ '__dark': position === 'top' }, position]" class="__fixed">
				<slot />
			</div>
		</transition>
	</div>
</template>
<script>
export default {
	name: "vcm-popup",
	model: {
		prop: 'show',
		event: 'change'
	},
	props: {
		fixed: {
			type: Boolean,
			default: false
		},
		show: {
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
		},
	},
	data() {
		return {
			isActive: this.show
		};
	},
	watch: {
		show(v) {
			this.isActive = v;
			if (v && this.position == 'top') {
				setTimeout(() => {
					this.hide();
				}, 3000);
			}
		}
	},
	mounted() {},
	methods: {
		hide() {
			this.isActive = false;
			this.$emit('change', this.isActive);
		},
		handleClose(maskClosable = true) {
			if (maskClosable) {
				this.hide();
			}
		},
	},
};

</script>
<style lang="scss" scoped>
.top-enter,
.top-leave-to {
	transform: translate(0, -100%);
}

.bottom-enter,
.bottom-leave-to {
	transform: translate(0, 100%);
}

.fade-enter-active {
	transition: opacity .3s ease;
}

.fade-leave-active {
	transition: opacity .3s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
.vcm-popup {
	width: 100%;
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

	.__fixed {
		background-color: #fff;
		position: fixed;
		transition: transform .2s;
	}

	.__dark {
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, 0.3);
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
	}

	.__wrap {
		position: fixed;
	}
}

</style>
