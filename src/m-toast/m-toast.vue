<template>
	<div class="vcm-toast">
		<div 
			class="vcm-toast__bg" 
			@click="handleClose" 
		/>
		<vc-transition-fade 
			:duration="{ enter: 0.3, leave: 0.15 }"
			@after-leave="handleRemove"
		>
			<div v-show="visible" class="vcm-toast__wrapper">
				<img v-if="mode === 'loading'" src="./spin.svg" class="vcm-toast__loading">
				<p v-if="content">{{ content }}</p>
				<vc-row v-else :render="content" />
			</div>
		</vc-transition-fade>
	</div>
</template>

<script>
import CreateCustomer from "../create-customer/index";
import Transition from "../transition/index";

const CustomerRow = CreateCustomer({});

export default {
	name: 'vcm-toast',
	components: {
		'vc-row': CustomerRow,
		'vc-transition-fade': Transition.Fade
	},
	props: {
		content: [String, Function],
		maskClosable: {
			type: Boolean,
			default: true
		},
		duration: {
			type: Number,
			default: 3
		},
		mode: {
			type: String,
			default: 'info',
			validator: (val) => ['info', 'loading', 'success', 'warn', 'error'].includes(val)
		},
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
				this.visible = false;
			}, this.duration * 1000 - 300); // 动画时间
		}
	},
	destroyed() {
		this.timer && clearTimeout(this.timer);
	},
	methods: {
		handleRemove() {
			this.$emit('close');
		},
		handleClose(e) {
			if (this.maskClosable) {
				this.visible = false;
			}
		}
	}
};
</script>

<style lang="scss">

@import '../style/index.scss';

@include block(vcm-toast) {
	@include element(bg) {
		position: fixed;
		// background: $mask-bg-color;
		z-index: 3999;
		height: 100%;
		width: 100%;
		left: 0;
		right: 0;
		margin: 0 auto;
		bottom: 0;
		opacity: 0;
	}
	@include element(wrapper) {
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
	}
	@include element(loading) {
		width: 30px;
		height: 30px;
		animation: vcm-toast-circle 1s linear infinite;
	}
}
@keyframes vcm-toast-circle {
	to {
		transform: rotate(1turn);
	}
}

</style>