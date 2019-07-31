<template>
	<div class="vc-modal">
		<vc-transition-fade :delay=".05">
			<div 
				v-show="mask && isActive"
				class="vc-modal__mask"
				@click="handleClose($event, maskClosable)"
			/>
		</vc-transition-fade>
		<div 
			ref="wrapper"
			:style="[styles, draggable && { top: 0 }]"
			class="vc-modal__wrapper"
		>
			<vc-transition-scale 
				mode="part" 
				@enter="handleEnter" 
				@after-leave="handleRemove"
			>
				<div 
					v-show="isActive"
					ref="container" 
					:class="{ 'is-drag': draggable, 'is-large' : size === 'large' || size === 'medium'}"
					:style="[basicStyle, draggableStyle]"
					class="vc-modal__container"
				>
					<div 
						ref="header" 
						:class="[{ 'is-confirm': mode }]" 
						class="vc-modal__header" 
						@mousedown="handleMouseDown"
					>
						<vc-icon
							v-if="mode"
							:type="mode" 
							:class="`is-${mode}`" 
							class="vc-modal__icon"
						/>
						<!-- 用户可以自定义，但也有默认 -->
						<slot name="header">
							<p class="vc-modal__title" v-html="title" />
							<div 
								v-if="closable && !mode" 
								class="vc-modal__close" 
								@click="handleClose($event, true)">
								<vc-icon type="close"/>
							</div>
						</slot>
					</div>
					<div :class="[{ 'is-confirm' : mode}, portalClassName]" class="vc-modal__content">
						<p v-if="typeof content === 'string'" v-html="content" />
						<vc-customer 
							v-else-if="typeof content === 'function'" 
							:render="content" 
						/>

						<slot v-if="$slots.default" />
					</div>
					<div v-if="footer" :class="{ 'is-confirm': mode }" class="vc-modal__footer">
						<slot name="footer">
							<vc-button
								v-if="cancelText"
								style="margin-right: 8px;"
								@click="handleBefore($event, handleCancel)"
							>{{ cancelText }}</vc-button>
							<vc-button 
								v-if="okText"
								type="primary"
								@click="handleBefore($event, handleOk)"
							>{{ okText }}</vc-button>
						</slot>
					</div>
				</div>
			</vc-transition-scale>
		</div>
		
	</div>
</template>
<script>
import { debounce } from 'lodash';
import Extends from '../extends';
import Icon from '../icon';
import Button from '../button';
import Transition from '../transition';
import Customer from "../customer/index";
import { VcInstance } from "../vc/index";
import { Resize, getUid } from '../utils/index';


let zIndexNumber = 1002;
export default {
	name: "vc-modal",
	components: {
		'vc-icon': Icon,
		'vc-button': Button,
		'vc-customer': Customer,
		'vc-transition-fade': Transition.Fade,
		'vc-transition-scale': Transition.Scale,
	},
	mixins: [...Extends.mixins(['scrollbar'])],
	model: {
		prop: 'visible',
		event: 'visible-change'
	},
	props: {
		mode: {
			type: String,
			validator: v => /(info|success|error|warning)/.test(v),
		},
		content: {
			type: [String, Function],
			default: ''
		},
		size: {
			type: String,
			validator: v => /(small|medium|large)/.test(v),
			default: 'small'
		},
		portalClassName: [Object, String],
		width: {
			type: Number
		},
		visible: {
			type: Boolean,
			default: false
		},
		mask: {
			type: Boolean,
			default: true,
		},
		closable: {
			type: Boolean,
			default: true,
		},
		maskClosable: {
			type: Boolean,
			default: true
		},
		escClosable: {
			type: Boolean,
			default: true
		},
		closeWithCancel: {
			type: Boolean,
			default: true // 如果关闭, cancel只能是取消的按钮
		},
		title: String,
		scrollable: {
			type: Boolean,
			default: false
		},
		draggable: {
			type: Boolean,
			default: false
		},
		okText: {
			type: [String, Boolean],
			default: '确定'
		},
		cancelText: {
			type: [String, Boolean],
			default: '取消'
		},
		styles: {
			type: Object
		},
		footer: {
			type: Boolean,
			default: true
		},

		/**
		 * 兼容portal设计, 实现Promise方式
		 */
		onOk: {
			type: Function
		},
		onCancel: {
			type: Function
		}
	},
	data() {
		return {
			x: 0,
			y: 0,
			isActive: false
		};
	},
	computed: {
		defaultSize() {
			let width;
			let height;
			switch (this.size) {
				case 'small':
					width = this.mode ? 340 : 480;
					height = this.mode ? 154 : 296;
					break;
				case 'medium':
					width = 640;
					height = 502;
					break;
				case 'large': 
					width = this.mode ? 390 : 864;
					height = this.mode ? 198 : 662;
					break;
				default:
					break;
			}
			return {
				width: this.width || width,
				height
			};
		},
		basicStyle() {
			return {
				width: `${this.defaultSize.width}px`,
				minHeight: `${this.defaultSize.height}px`,
				maxHeight: `${window.innerHeight - 20}px`,
			};
		},	
		draggableStyle() {
			if (!this.draggable) return;

			let left = this.x || window.innerWidth / 2 - this.defaultSize.width / 2;
			let top = this.y || window.innerHeight / 2 - this.defaultSize.height / 2;

			return {
				left: `${left}px`,
				top: `${top}px`,
			};
		}
	},
	watch: {
		visible: {
			immediate: true,
			handler(v) {
				this.isActive = v;
			}
		}
	},
	created() {
		this.startX = 0;
		this.startY = 0;
		this.originX = VcInstance.globalEvent.x;
		this.originY = VcInstance.globalEvent.y;
	},
	mounted() {
		document.addEventListener('keydown', this.handleEscClose);
		document.addEventListener('click', this.handleClick, true);
		Resize.on(this.$refs.container, this.handleResize);
	},
	updated() {
		/**
		 * 非拖动状态下, 外部,会触发设置初始值
		 */
		!this.draggable && this.isActive && this.resetOrigin();
	},
	beforeDestroy() {
		Resize.off(this.$refs.container, this.handleResize);
	},
	destroyed() {
		document.removeEventListener('click', this.handleClick, true);
		document.removeEventListener('keydown', this.handleEscClose);
		document.removeEventListener("mousemove", this.handleMouseMove);
		document.removeEventListener("mouseup", this.handleMouseUp);
	},
	methods: {
		handleResize() {
			if (!this.mode) {
				const $container = this.$refs.container;
				let containerHeight = $container.offsetHeight;
				if (containerHeight % 2 !== 0) {
					$container.style.height = `${containerHeight - 1}px`;
				}	
			}
					
		},
		handleClick(e) {
			// this.isActive click先触发,后设置后
			if (this.draggable && this.isActive && this.originX) return;
			this.originX = e.x;
			this.originY = e.y;
		},
		handleMouseDown(e) {
			if (!this.draggable) {
				return;
			}
			const $container = this.$refs.container;
			const $wrapper = this.$refs.wrapper;
			const $header = this.$refs.header;
			const rect = $container.getBoundingClientRect();
			$header.style.cursor = 'move';
			zIndexNumber += 1;
			$wrapper.style.zIndex = zIndexNumber;
			this.x = rect.x || rect.left;
			this.y = rect.y || rect.top;

			this.startX = e.clientX;
			this.startY = e.clientY;

			document.addEventListener("mousemove", this.handleMouseMove);
			document.addEventListener("mouseup", this.handleMouseUp);
		},
		handleMouseMove(e) {
			let x = 0;
			let y = 0;
			this.x += e.clientX - this.startX;
			this.y += e.clientY - this.startY;
			this.startX = e.clientX;
			this.startY = e.clientY;
		},
		/**
		 * 松开鼠标时清除move和up事件
		 */
		handleMouseUp() {
			/**
			 * 放手后重新设置原点
			 */
			this.resetOrigin();

			document.removeEventListener("mousemove", this.handleMouseMove);
			document.removeEventListener("mouseup", this.handleMouseUp);
		},
		handleEnter(e) {
			this.resetOrigin();
		},
		handleEscClose(e) {
			if (e.keyCode === 27 && this.escClosable && this.isActive) {
				this.handleClose(e, true);
			}
		},

		handleBefore(e, hook) {
			let callback = () => {
				this.isActive = false;
			};

			let fn = hook && hook(e, callback);

			if (fn && fn.then) {
				return fn.then((res) => {
					return res;
				}).catch((res) => {
					return Promise.reject(res);
				});
			} else if (!fn) {
				callback();
			}
		},

		/**
		 * 用户点击确定的回调
		 * 同时sure兼容portal设计
		 */
		handleOk(...rest) {
			let { $listeners: { ok }, onOk } = this;
			ok = ok || onOk || (() => {}); // 兼容portal

			return ok(...rest);
		},

		/**
		 * 用户点击取消按钮时为取消
		 */
		handleCancel(...rest) {
			let { $listeners: { cancel }, onCancel } = this;
			cancel = cancel || onCancel || (() => {}); // 兼容portal

			return cancel(...rest);
		},

		/**
		 * 关闭事件
		 */
		handleClose(e, closable) {
			if (closable 
				|| (
					this.maskClosable 
					&& e.target.classList.contains('vc-modal__wrapper')
				)
			) {
				// 用户主要取消与关闭事件关联
				if (this.closeWithCancel) {
					this.handleBefore(e, this.handleCancel);
				} else {
					this.isActive = false;
				}
			}
		},

		/**
		 * 动画执行后关闭, 关闭事件都会被执行
		 * visible-change 由移除之后触发
		 * 同时close兼容portal设计
		 */
		handleRemove() {
			!this._isDestroyed && (
				this.$emit('close'),
				this.$emit('visible-change', false)
			);
		},

		/**
		 * 设置原始坐标
		 */
		resetOrigin: debounce(function () {
			let el = this.$refs.container;
			let x = 0;
			let y = 0;
			/**
			 * 拖拽使用this.x, this.y
			 * 其他正常的布局
			 */
			let modalX = this.x || el.offsetLeft;
			let modalY = this.y || el.offsetTop || (window.screen.height - el.clientHeight) / 2;

			x = this.originX - modalX;
			y = this.originY - modalY;

			el.style.transformOrigin = `${x}px ${y}px 0`;
		}, 250, { leading: true })
	}
};
</script>
<style lang="scss">
@import '../style/index.scss';

@include block(vc-modal) {
	@include element(mask) {
		opacity: 1;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: $mask-bg-color;
		height: 100%;
		z-index: $popup-zindex; // 与wrapper相同，两个modal同时出现时可以盖上去
	}
	@include element(wrapper) {
		position: fixed;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
		width: 100%;
		z-index: $popup-zindex;
	}
	@include element(container) {
		position: relative;
		background: $white;
		box-shadow: $border-shadow;
		margin: auto;
		border-radius: 4px;
		padding-bottom: 63px;
		display: flex;
		flex-direction: column;
		@include when(drag) {
			position: absolute;
		}
		@include when(large) {
			@media screen and (max-height: 768px) {
				min-height: 400px !important;
			}
		}
	}

	@include element(header) {
		position: relative;
		border-bottom: 1px solid $border-line-color;
		padding: 14px 24px;
		line-height: 1;
		font-size: 14px;
		font-weight: 400;
		display: flex;
		@include when(confirm) {
			border-bottom: none;
			padding: 24px 16px 16px 16px;
		}
	}
	@include element(content) { 
		overflow-y: auto;
		padding: 16px 24px;
		flex: 1;
		// modal下分页器距离table  16px
		.vc-paging__footer {
			padding: 16px 0 0 0;
		}
		@include when(confirm) {
			padding: 0;
			padding-left: 46px;
		}
		@include when(padding-none) {
			padding: 0;
			padding-left: 0;
		}
	}
	@include element(footer) {
		position: absolute;
		bottom: 0;
		width: 100%;
		border-top: 1px solid $border-line-color;
		padding: 17px 24px;
		text-align: right;
		@include when(confirm) {
			border-top: none;
			padding: 14px 16px;
			button {
				display: inline-block;
				vertical-align: middle;
			}
		}
	}
	@include element(title) {
		width: 100%;
		line-height: 20px;
		font-size: 14px;
		color: $c333;
		font-weight: 400;
		word-wrap: break-word;
	}
	@include element(close) {
		position: absolute;
		top: 17px;
		right: 16px;
		color: $c999;
		cursor: pointer;
	}
	@include element(icon) {
		margin-right: 8px;
		font-size: 20px;
		@include when(success) {
			color: $success;
		}
		@include when(error) {
			color: $error;
		}
		@include when(warning) {
			color: $warning;
		}
		@include when(info) {
			color: $info;
		}
	}
}
</style>