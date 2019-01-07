<template>
	<div class="vc-message">
		<div 
			v-show="maskClosable"
			class="__bg"
		/>
		<transition name="move-up" @after-leave="handleRemove">
			<div 
				v-show="visible" 
				:style="{top: top + 'px'}" 
				class="_wrapper"
			>
				<div :class="classes">
					<vc-icon :type="mode" :class="mode === 'loading' ? 'circleAnimatioin' : ''" class="__message-icon"/>
					<p v-if="message || content">{{ message ? message : content }}</p>
					<vc-icon v-if="closable" class="__close" type="close" @click="handleClose"/>
					<vc-render-cell :render="renderFunc"/>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import Icon from "../icon";
import RenderCell from "./render";

const baseClass = '_message';

export default {
	name: 'vc-message',
	components: {
		'vc-icon': Icon,
		'vc-render-cell': RenderCell
	},
	props: {
		message: String,
		content: String,
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
		top: Number,
		closable: {
			type: Boolean,
			default: false,
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
			visible: false,
		};
	},
	computed: {
		classes() {
			return [
				`${baseClass}`,
				`${baseClass}-${this.mode}`
			];
		},
		renderFunc() {
			return this.render || function () {};
		}
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
			this.$emit('close');
		},
		handleClose(e) {
			this.visible = false;
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
	._wrapper{
		position: fixed;
		width: 100%;
		left: 0;
		text-align: center;
		z-index: 4000;
		._message{
			display: inline-block;
			padding: 8px 16px;
			background: #fff;
			box-shadow: $default-border-shadow;
			border-radius: 4px;
			.__message-icon,p{
				display: inline-block;
				vertical-align: middle;
				font-size: 14px;
			}
			.__message-icon{
				margin-right: 8px;
			}
			.__close{
				float: right;
				font-size: 12px;
				margin-top: 4px;
				margin-left: 20px;
			}
			&-success{
				.wyaicon{
					color: $success-color;
				}
			}
			&-error{
				.wyaicon{
					color: $error-color;
				}
			}
			&-warn{
				.wyaicon{
					color: $warning-color;
				}
			}
			&-loading{
				.circleAnimatioin{
					animation: vc-toast-circle 1s linear infinite;
				}
			}
		}
	}
	.move-up-enter, .move-up-leave-active{
		top: 0;
		opacity: 0;
	}
	@keyframes vc-toast-circle {
	to {
		transform: rotate(1turn);
	}
}
}

</style>