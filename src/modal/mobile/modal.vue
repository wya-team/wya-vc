<template>
	<div class="vcm-modal">
		<vcm-transition-fade :duration="0.2">
			<div 
				v-show="mask && isActive"
				class="vcm-modal__mask"
				@click="handleClose($event, maskClosable)"
			/>
		</vcm-transition-fade>
		<div 
			ref="wrapper"
			:style="[styles]"
			class="vcm-modal__wrapper"
		>
			<vcm-transition-zoom :duration="0.2" mode="center" @after-leave="handleRemove">
				<div v-show="isActive" :style="[basicStyle]" class="vcm-modal__container">
					<template v-if="mode === 'alert'">
						<div v-if="title || $slots.header" class="vcm-modal__header">
							<slot name="header">
								<p class="vcm-modal__title" v-html="title" />
							</slot>
						</div>
						<div 
							v-if="content || $slots.default" 
							:class="{ 'vcm-modal__no-title': !title }"
							class="vcm-modal__content"
						>
							<div 
								v-if="$slots.default || typeof content === 'string'"
								class="vcm-modal__html" 
							>	
								<p v-if="typeof content === 'string'" v-html="content" />
								<slot />
							</div>
							
							<vcm-customer 
								v-else-if="typeof content === 'function'" 
								:render="content" 
							/>
						</div>

						<!-- confirm -->
						<div 
							v-if="footer || $slots.footer" 
							:class="footerClasses" 
							class="vcm-modal__footer"
						>
							<slot name="footer">
								<div 
									v-for="(item, index) in curentActions"
									v-if="item.text"
									:key="index"
									:style="item.style"
									class="vcm-modal__button"
									@click="handleBefore($event, item.onPress)"
									v-html="item.text"
								/>
							</slot>
						</div>
					</template>
					<template v-else-if="mode === 'operation'">
						<div class="vcm-modal__operation">
							<div 
								v-for="(item, index) in curentActions"
								v-if="item.text"
								:key="index"
								:style="item.style"
								class="vcm-modal__button"
								@click="handleBefore($event, item.onPress)"
								v-html="item.text"
							/>
						</div>
					</template>
				</div>
			</vcm-transition-zoom>
		</div>
	</div>
</template>
<script>
import { debounce } from 'lodash';
import Extends from '../../extends';
import MTransition from '../../transition/index.m';
import Customer from "../../customer/index";
import { VcInstance } from "../../vc/index";

let zIndexNumber = 1002;
export default {
	name: "vcm-modal",
	components: {
		'vcm-customer': Customer,
		'vcm-transition-fade': MTransition.Fade,
		'vcm-transition-zoom': MTransition.Zoom,
	},
	mixins: [...Extends.mixins(['scrollbar'])],
	model: {
		prop: 'visible',
		event: 'visible-change'
	},
	props: {
		/**
		 * TODO
		 */
		mode: {
			type: String,
			validator: v => /(alert|operation)/.test(v),
			default: 'alert'
		},
		content: [String, Function, Boolean], // false 不显示头部
		width: {
			type: Number,
			default: 270
		},
		visible: {
			type: Boolean,
			default: false
		},
		mask: {
			type: Boolean,
			default: true,
		},
		maskClosable: {
			type: Boolean,
			default: true
		},
		closeWithCancel: {
			type: Boolean,
			default: true // 如果关闭, cancel只能是取消的按钮
		},
		title: [String, Boolean], // false 不显示头部
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
		actions: Array,
		onOk: {
			type: Function
		},
		onCancel: {
			type: Function
		}
	},
	data() {
		return {
			isActive: false
		};
	},
	computed: {
		basicStyle() {
			return {
				width: `${this.width}px`,
				maxHeight: `${window.innerHeight - 20}px`,
			};
		},
		curentActions() {
			return this.actions || [
				{
					text: this.cancelText,
					onPress: this.handleCancel
				},
				{
					text: this.okText,
					onPress: this.handleOk
				}
			];
		},
		footerClasses() {
			let len = this.curentActions.filter(i => i.text).length;
			return { 
				'is-column': len >= 3,	
				'is-alone': len === 1,
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
	methods: {
		handleBefore(e, hook) {
			if (!this.isActive) return;
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
					&& e.target.classList.contains('vcm-modal__wrapper')
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
		}
	}
};
</script>
<style lang="scss">
@import '../../style/vars.scss';

@include block(vcm-modal) {
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
		border-radius: 7px;
		display: flex;
		flex-direction: column;
	}

	@include element(header) {
		padding: 24px 15px 12px;
	}
	@include element(title) {
		margin: 0;
		font-size: 17px;
		line-height: 1;
		color: #000;
		text-align: center;
		word-wrap: break-word;
		font-weight: bold;
	}

	@include element(content) { 
		overflow-y: auto;
		padding: 0 24px 25px;
		position: relative;
	}
	@include element(no-title) {
		padding-top: 32px;
		padding-bottom: 32px;
		.vcm-modal__html {
			color: #000;
		}
	}
	@include element(html) {
		font-size: 15px;
		color: #666;
		line-height: 1.5;
		text-align: center;
		word-break: break-all;
		word-wrap: break-word;
	}
	@include element(button) {
		position: relative;
		flex: 1;
		text-align: center;
		color: #108DE7;
		font-size: 17px;
		height: 50px;
		line-height: 50px;
		word-wrap: break-word;
		z-index: 1; // android不添加时可能不显示1px描边
		&:first-child {
			color: #000;
			@include commonBorder1PX(right, #ddd);
		}
	}
	@include element(footer) {
		position: relative;
		display: flex;
		@include commonBorder1PX(top, #ddd);
		@include when(column) {
			flex-direction: column;
			@include element(button) { 
				&:first-child {
					color: #108DE7;
					&:before, &:after {
						border: none;
					}
				}
				&:not(:first-child) {
					@include commonBorder1PX(top, #ddd);
				}
			}
		}
		@include when(alone) {
			@include element(button) { 
				color: #108DE7;
				&:first-child {
					&:before, &:after {
						border: none;
					}
				}
			}
		}
	}
	@include element(operation) {
		position: relative;
		display: flex;
		flex-direction: column;
		@include element(button, false) {
			color: $c333;
			text-align: left;
			padding-left: 15px;
			&:not(:first-child) {
				@include commonBorder1PX(top, #ddd);
			}
			&:first-child {
				&:before, &:after {
					border: none;
				}
			}
		}
	}
}
</style>