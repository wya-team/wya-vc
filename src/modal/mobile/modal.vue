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
						<div v-if="content || $slots.default" class="vcm-modal__content">
							<p 
								v-if="typeof content === 'string'"
								class="vcm-modal__html" 
								v-html="content"
							/>
							<vcm-customer 
								v-else-if="typeof content === 'function'" 
								:render="content" 
							/>
							<slot v-if="$slots.default" />
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
									@click="handleClickWithPromise($event, item.onPress)"
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
								:style="item.style"
								:key="index"
								class="vcm-modal__button"
								@click="handleClickWithPromise($event, item.onPress)"
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
import ScrollbarMixin from '../../extends/mixins/scrollbar';
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
	mixins: [ScrollbarMixin],
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
			default: 275
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
		title: String | Boolean, // false 不显示头部
		okText: {
			type: String | Boolean,
			default: '确定'
		},
		cancelText: {
			type: String | Boolean,
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
		/**
		 * Todo Promise
		 */
		handleClickWithPromise(e, fn) {
			this.isActive = false;

			fn && fn();
		},
		handleOk(e) {
			this.ok();
		},
		/**
		 * 用户点击取消按钮时为取消
		 */
		handleCancel() {
			this.cancel();
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
				this.isActive = false;
				// 用户主要取消与关闭事件关联
				this.closeWithCancel && this.cancel();
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
		 * 取消兼容
		 */
		ok() {
			const { onOk } = this;
			onOk ? onOk() : this.$emit('ok');
		},
		/**
		 * 取消兼容
		 */
		cancel() {
			const { onCancel } = this;
			onCancel ? onCancel() : this.$emit('cancel');
		},
	}
};
</script>
<style lang="scss">
@import '../../style/index.scss';

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
		z-index: $mask-zindex;
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
		padding: 21px 15px 15px 15px;
	}
	@include element(title) {
		margin: 0;
		font-size: 18px;
		line-height: 1;
		color: $c333;
		text-align: center;
		word-wrap: break-word;
		font-weight: 400;
	}

	@include element(content) { 
		overflow-y: auto;
		padding: 0 15px 15px 15px;
		
	}
	@include element(html) {
		font-size: 14px;
		color: #888;
		line-height: 1.5;
		text-align: center;
	}
	@include element(button) {
		position: relative;
		flex: 1;
		text-align: center;
		color: #108ee9;
		font-size: 18px;
		height: 50px;
		line-height: 50px;
		word-wrap: break-word;
		&:first-child {
			color: $c333;
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
					color: #108ee9;
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
				color: #108ee9;
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
		}
	}
}
</style>