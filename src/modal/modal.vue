<template>
	<div class="vc-modal">
		<transition name="mask">
			<div 
				v-if="mask && value"
				class="__mask"
				@click="handleWrapperClose"
			/>
		</transition>
		<div 
			ref="wrap"
			:style="wrapperStyle"
			class="__wrapper"
			@click="handleWrapperClose"
		>
			<transition name="modal" @enter="handleEnter">
				<div 
					v-if="value"
					ref="modal" 
					:style="containerStyle"
					:class="{ '__drag': draggable, 'large' : size === 'large' || size === 'medium'}"
					class="__container"
				>
					<div ref="header" :class="{ '__confirm': mode }" class="__header" @mousedown="handleMouseDown">
						<vc-icon
							v-if="mode"
							:type="mode" 
							:class="`__${mode}`" 
							class="__icon"
						/>
						<!-- 用户可以自定义，但也有默认 -->
						<slot name="header">
							<p class="__title">{{ title }}</p>
							<div v-if="closable && !mode" class="__close" @click="handleClose">
								<vc-icon type="close"/>
							</div>
						</slot>
					</div>
					<div :class="{ '__confirm' : mode }" class="__content">
						<p 
							v-if="typeof content === 'string'"
						>{{ content }}</p>
						<vc-row 
							v-else-if="typeof content === 'function'" 
							:render="content" 
						/>

						<slot v-if="$slots.default" />
					</div>
					<div :class="{ '__confirm': mode }" class="__footer">
						<slot name="footer">
							<vc-button 
								style="margin-right: 8px;" 
								@click="handleCancel"
							>{{ cancelText }}</vc-button>
							<vc-button 
								type="primary" 
								@click="handleOk"
							>{{ okText }}</vc-button>
						</slot>
					</div>
				</div>
			</transition>
		</div>
		
	</div>
</template>
<script>
import Icon from '../icon';
import Button from '../button';
import CreateCustomer from "../create-customer/index";

let zIndexNumber = 1001;
const CustomerRow = CreateCustomer({});
export default {
	name: "vc-modal",
	components: {
		'vc-icon': Icon,
		'vc-button': Button,
		'vc-row': CustomerRow
	},
	props: {
		mode: String,
		loading: {
			type: Boolean,
			default: false,
		},
		content: [String, Function],
		render: {
			type: Function
		},
		size: {
			type: String,
			default: 'small'
		},
		width: {
			type: Number
		},
		value: {
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
			type: String,
			default: '确定'
		},
		cancelText: {
			type: String,
			default: '取消'
		},
		styles: {
			type: Object
		}
	},
	data() {
		return {
			newCoord: {
				x: 0,
				y: 0
			},
			coord: {
				x: 0,
				y: 0
			},
			dragData: {
				x: null,
				y: null,
				dragX: null,
				dragY: null,
				dragging: false
			},
			buttonLoading: false
		};
	},
	computed: {
		isConfirm() {
			return this.okText || this.cancelText;
		},
		wrapperStyle() {
			let style = {};
			if (this.draggable) {
				style = {
					...this.styles,
					top: 0
				};
			} else {
				style = {
					...this.styles
				};
			}
			return style;
		},
		containerStyle() {
			let style = {};
			let minHeight = {};
			let newWidth = 0;
			let height = 0;
			if (this.width) {
				newWidth = this.width;
			} else {
				switch (this.size) {
					case 'small':
						if (this.mode) {
							newWidth = 340;
							height = '154px';
						} else {
							newWidth = 480;
							height = '296px';
						}
						break;
					case 'medium':
						newWidth = 640;
						height = '502px';
						break;
					case 'large': 
						
						if (this.mode) {
							newWidth = 390;
							height = '198px';
						} else {
							newWidth = 864;
							height = '662px';
						}
						break;
					default:
						return;
				}
			}
			if (this.draggable) {
				style = {
					left: this.dragData.x ? this.dragData.x + 'px' : `${document.body.clientWidth / 2 - newWidth / 2}px`,
					top: this.dragData.y ? this.dragData.y + 'px' : '100px',
					zIndex: 4000,
					width: newWidth + 'px',
					transformOrigin: '0 0 0',
					minHeight: height
				};
			} else {
				style = {
					width: newWidth + 'px',
					transformOrigin: '0 0 0',
					minHeight: height
				};
			}
			return style;
		}
	},
	watch: {
		value(val) {
			if (!this.scrollable && val) {
				document.querySelector('body').style.overflow = 'hidden';
			} else {
				document.querySelector('body').style.overflow = 'auto';
			}
		}
	},
	mounted() {
		document.addEventListener('click', this.handleCoord);
		document.addEventListener('keydown', this.handleEscClose);
	},
	destroyed() {
		document.removeEventListener('click', this.handleCoord);
		document.removeEventListener('keydown', this.handleEscClose);
		document.removeEventListener("mousemove", this.handleMouseMove);
		document.removeEventListener("mouseup", this.handleMouseUp);
	},
	methods: {
		handleCoord(e) {
			this.coord = {
				x: e.x,
				y: e.y
			};
		},
		handleClose() {
			this.$emit('cancel');
			this.$emit('input', false);
		},
		handleWrapperClose(el) {
			let className = el.target.getAttribute('class');
			if (className && this.maskClosable) {
				if (className.includes('__wrapper') || className.includes('__mask')) {
					this.handleClose();
				}
			}
		}, // 点击遮罩层关闭
		handleEscClose(e) {
			if (e.keyCode === 27 && this.escClosable && this.value) {
				this.handleClose();
			}
		}, // esc关闭
		handleCancel() {
			this.handleClose();
		},
		handleOk() {
			this.$emit('ok');
			if (this.loading) {
				this.buttonLoading = true;
			} else {
				this.$emit('input', false);
			}
		},
		handleMouseDown(event) {
			if (!this.draggable) {
				return;
			}
			const $modal = this.$refs.modal;
			const $wrap = this.$refs.wrap;
			const $header = this.$refs.header;
			const rect = $modal.getBoundingClientRect();
			$header.style.cursor = 'move';
			zIndexNumber += 1;
			$wrap.style.zIndex = zIndexNumber;
			this.dragData.x = rect.x || rect.left;
			this.dragData.y = rect.y || rect.top;
			const distance = {
				x: event.clientX,
				y: event.clientY
			};
			this.dragData.dragX = distance.x;
			this.dragData.dragY = distance.y;
			document.addEventListener("mousemove", this.handleMouseMove);
			document.addEventListener("mouseup", this.handleMouseUp);
		},
		handleMouseMove(event) {
			const distance = {
				x: event.clientX,
				y: event.clientY
			};
			const diffDistance = {
				x: distance.x - this.dragData.dragX,
				y: distance.y - this.dragData.dragY
			};
			this.dragData.x += diffDistance.x;
			this.dragData.y += diffDistance.y;
			this.dragData.dragX = distance.x;
			this.dragData.dragY = distance.y;
		},
		handleMouseUp() {
			document.removeEventListener("mousemove", this.handleMouseMove);
			document.removeEventListener("mouseup", this.handleMouseUp);
		}, // 松开鼠标时清除move和up事件
		handleEnter(el) {
			this.newCoord = {
				x: 0,
				y: 0
			};
			let modalX = el.offsetLeft;
			let modalY = 0;
			if (el.offsetTop) {
				modalY = el.offsetTop;
			} else {
				modalY = (window.screen.height - el.clientHeight) / 2;
			}
			if (modalX > this.coord.x) {
				this.newCoord.x = -(modalX - this.coord.x);
			} else {
				this.newCoord.x = this.coord.x - modalX;
			}
			if (modalY > this.coord.y) {
				this.newCoord.y = -(modalY - this.coord.y);
			} else {
				this.newCoord.y = this.coord.y - modalY;
			}
			el.style.transformOrigin = this.newCoord.x + 'px ' + this.newCoord.y + 'px 0';
		}
	}
};
</script>
<style lang="scss">
.vc-modal {
	.__mask {
		opacity: 1;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0,0,0,.65);
		height: 100%;
		z-index: 1000;
	}
	.__wrapper {
		position: fixed;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
		width: 100%;
		z-index: 1001;
	}
	.__container {
		position: relative;
		background: #fff;
		box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
		margin: auto;
		border-radius: 4px;
		padding-bottom: 63px;
		&.__drag {
			position: absolute;
		}
		&.large, &.medium{
			@media screen and (max-height: 768px) {
				min-height: 400px !important;
			}
		}
	}

	.__header {
		position: relative;
		border-bottom: 1px solid #e8e8e8;
		padding: 14px 24px;
		line-height: 1;
		font-size: 14px;
		font-weight: 400;
		display: flex;
		align-items: center;
		// padding: 14px 16px;
		&.__confirm {
			border-bottom: none;
		}
	}
	.__content { 
		overflow-y: auto;
		padding: 16px 24px;
		&.__confirm{
			padding: 0;
		}
	}
	.__footer {
		position: absolute;
		bottom: 0;
		width: 100%;
		border-top: 1px solid #e8e8e8;
		padding: 17px 24px;
		text-align: right;
		&.__confirm {
			border-top: none;
		}
	}
	.__title {
		display: inline-block;
		width: 100%;
		height: 20px;
		line-height: 20px;
		font-size: 14px;
		color: #333;
		font-weight: 400;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.__close {
		position: absolute;
		top: 17px;
		right: 16px;
		color: #999;
	}
	.__icon {
		margin-right: 8px;
		font-size: 28px;
		&.__success {
			color: #52C41A;
		}
		&.__error {
			color: #F5222D;
		}
		&.__warning {
			color: #FAAD14;
		}
		&.__info {
			color: #1890FF;
		}
	}
	.mask-enter-active, 
	.modal-enter-active, {
		will-change: transform;
		transition: transform .5s cubic-bezier(.08, .82, .17, 1),
			opacity .5s cubic-bezier(.08, .82, .17, 1);
	}
	.mask-leave-active,
	.modal-leave-active {
		will-change: transform;
		transition: transform .5s cubic-bezier(.08, .82, .17, 1),
			opacity .5s cubic-bezier(.08, .82, .17, 1);
	}
	.mask-enter, 
	.mask-leave-to {
		opacity: 0;
	}
	.modal-enter, 
	.modal-leave-to {
		transform: scale(0);
		opacity: 0;
	}

}
</style>