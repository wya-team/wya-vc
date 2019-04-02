<template>
	<div class="vc-message">
		<div 
			v-if="mask"
			class="vc-message__mask"
			@click="handleClose" 
		/>
		<transition :duration="{ enter: 300, leave: 300 }" name="am-fade" @after-leave="handleRemove">
			<div 
				v-show="visible" 
				ref="target" 
				:style="style"
				class="vc-message__wrapper"
			>
				<div class="vc-message__container">
					<!-- icon -->
					<img v-if="mode === 'loading'" src="../m-toast/spin.svg" class="vc-message__loading">
					<vc-icon v-else :type="mode" :class="`is-${mode}`" class="vc-message__icon"/>
					<!-- content -->
					<p 
						v-if="typeof content === 'string'"
						class="vc-message__content"
					>{{ content }}</p>
					<vc-row v-else :render="content" />
					<!-- close -->
					<vc-icon 
						v-if="closable" 
						type="close"
						style="font-size: 12px"
						@click="handleClose" 
					/>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import Icon from "../icon";
import CreateCustomer from "../create-customer/index";

const CustomerRow = CreateCustomer({});

export default {
	name: 'vc-message',
	components: {
		'vc-icon': Icon,
		'vc-row': CustomerRow
	},
	props: {
		content: [String, Function],
		mask: {
			type: Boolean,
			default: true
		},
		maskClosable: {
			type: Boolean,
			default: true
		},
		duration: {
			type: Number,
			default: 1.5
		},
		render: {
			type: Function
		},
		top: {
			type: Number,
			default: 0,
		},
		closable: {
			type: Boolean,
			default: false,
		},
		mode: {
			type: String,
			default: 'info',
			validator: v => /(info|loading|success|error|warning)/.test(v)
		}
	},
	data() {
		return {
			// 先要隐藏在显示，才有transition
			visible: false,
		};
	},
	computed: {
		style() {
			return this.visible ? { top: `${this.top}px` } : {};
		}
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

@include block(vc-message) {
	@include element(mask) {
		position: fixed;
		background: $mask-bg-color;
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
		z-index: 4000;
		width: 100%;
		display: flex;
		justify-content: center;
		transition: transform $popup-duration $ease-out-circ,
			opacity $popup-duration $ease-out-circ;
	}
	@include element(container) {
		display: flex;
		align-items: center;
		padding: 8px 16px;
		background: $white;
		box-shadow: $border-shadow;
		border-radius: 4px;
		font-size: 14px;
		@include element(icon) {
			padding-right: 5px;
			@include when(success) {
				color: $success;
			}
			@include when(error) {
				color: $error;
			}
			@include when(warn) {
				color: $warning;
			}
		}
	}
	@include element(loading) {
		margin-right: 5px;
		width: 14px;
		height: 14px;
		animation: vc-message-circle 1s linear infinite;
	}
	.am-fade-enter, .am-fade-leave-active {
		transform: translateY(-100%);
		opacity: 0;
	}
}

@keyframes vc-message-circle {
	to {
		transform: rotate(1turn);
	}
}
</style>