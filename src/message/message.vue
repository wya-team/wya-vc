<template>
	<div class="vc-message">
		<div 
			v-if="mask"
			class="__bg"
			@click="handleClose" 
		/>
		<transition name="am-fade" @after-leave="handleRemove">
			<div 
				v-show="visible" 
				ref="target" 
				:style="style"
				class="__fixed"
			>
				<div class="__content">
					<!-- icon -->
					<img v-if="mode === 'loading'" src="../m-toast/spin.svg" class="loading">
					<vc-icon v-else :type="mode" :class="mode" style="font-size: 12px"/>
					<!-- content -->
					<p v-if="typeof content === 'string'">{{ content }}</p>
					<vc-row v-else :render="content" />
					<!-- close -->
					<vc-icon 
						v-if="closable" 
						type="close" 
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
			validator: (val) => ['info', 'loading', 'success', 'warn', 'error'].includes(val)
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

<style lang="scss" scoped>
@import '../style/index.scss';
//弹框类的颜色
$primary-color: #2d8cf0;
$primary-hover-color: #57a3f3;

$success-color: #19be6b;
$success-hover-color: #47cb89;

$error-color: #ed4014;
$error-hover-color: #f16643;

$warning-color: #e6a23c;
$warning-hover-color: #ebb563;

.vc-message {
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
		z-index: 4000;
		left: 50%;
		transform: translateX(-50%);
		transition: top .3s cubic-bezier(0.18, 0.89, 0.32, 1.28), 
			opacity .3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
	}
	.__content {
		@include commonFlex();
		align-items: center;
		padding: 8px 16px;
		background: #fff;
		box-shadow: $default-border-shadow;
		border-radius: 4px;
		p {
			font-size: 14px;
			padding: 0 8px;
		}
	}
	.success {
		color: $success-color;
	}
	.error {
		color: $error-color;
	}
	.warn {
		color: $warning-color;
	}
	.loading {
		width: 14px;
		height: 14px;
		animation: vc-message-circle 1s linear infinite;
	}
	.am-fade-enter, .am-fade-leave-active {
		top: 0;
		opacity: 0;
	}
}

@keyframes vc-message-circle {
	to {
		transform: rotate(1turn);
	}
}
</style>