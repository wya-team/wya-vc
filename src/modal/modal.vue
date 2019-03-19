<template>
	<div class="vc-modal">
		<transition name="mask">
			<div 
				v-if="mask && value"
				class="_modal-mask"
				@click="handleWrapClose"
			/>
		</transition>
		<div 
			v-if="confirm"
			ref="wrap"
			:style="wrapStyle"
			class="_wrap"
			@click="handleWrapClose"
		>
			<transition name="modal" @enter="enter">
				<div 
					v-if="value"
					ref="modal" 
					:style="modalStyle"
					:class="draggable ? '_modal-drag' : ''"
					class="_modal-wrap"
				>
					<div class="__confirm-top">
						<vc-icon :type="mode" :class="mode" class="__confirm-icon"/>
						<div class="__right">
							<div ref="header" class="_confirm-header" @mousedown="mouseDown">
								<span class="__title">{{ title }}</span>
							</div>
							<div class="_confirm-content">
								<p v-if="typeof content === 'string'">{{ content }}</p>
								<vc-row v-else :render="content" />
							</div>
						</div>
					</div>
					<div class="_confirm-footer">
						<slot name="footer">
							<vc-button v-if="showCancel" style="margin-right: 8px;" @click="cancel">{{ cancelText }}</vc-button>
							<vc-button type="primary" @click="ok">{{ okText }}2222</vc-button>
						</slot>
					</div>
				</div>
			</transition>
		</div>
		<div 
			v-else
			ref="wrap"
			:style="wrapStyle"
			class="_wrap"
			@click="handleWrapClose"
		>
			<transition name="modal" @enter="enter">
				<div 
					v-if="value"
					ref="modal" 
					:style="modalStyle"
					:class="draggable ? '_modal-drag' : ''"
					class="_modal-wrap"
				>
					<div ref="header" class="_modal-header" @mousedown="mouseDown">
						<slot name="header">
							<p class="_header-inner">{{ title }}</p>
							<a class="__modal-close" @click="handleClose">
								<vc-icon type="close"/>
							</a>
						</slot>
					</div>
					<div ref="slot" class="_modal-content"><slot/></div>
					<div class="_modal-footer">
						<slot name="footer">
							<vc-button style="margin-right: 8px;" @click="cancel">{{ cancelText }}</vc-button>
							<vc-button type="primary" @click="ok">{{ okText }}</vc-button>
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
		confirm: {
			type: Boolean,
			default: false
		},
		content: [String, Function],
		render: {
			type: Function
		},
		showCancel: {
			type: Boolean,
			default: true
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
		e: {
			type: Object
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
			}
		};
	},
	computed: {
		wrapStyle() {
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
		modalStyle() {
			let style = {};
			let minHeight = {};
			let newWidth = 0;
			let height = 0;
			if (this.width) {
				newWidth = this.width;
			} else {
				switch (this.size) {
					case 'small':
						if (this.confirm) {
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
						
						if (this.confirm) {
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
					left: this.dragData.x ? this.dragData.x + 'px' : `calc(50% - ${newWidth / 2}px)`,
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
		let that = this; // 传递this
		if (!this.e) {
			document.documentElement.addEventListener('click', this.handleCoord);
		} else {
			this.coord = this.e;
		}
		document.documentElement.addEventListener('keydown', this.escClose);
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
			// 销毁事件
			document.documentElement.removeEventListener('click', this.handleCoord);
			document.documentElement.removeEventListener('keydown', this.escClose);
			document.removeEventListener("mousemove", this.mouseMove);
			document.removeEventListener("mouseup", this.mouseUp);
		},
		handleWrapClose(el) {
			let className = el.target.getAttribute('class');
			if (className && this.maskClosable) {
				if (className.indexOf('_wrap') > -1 || className.indexOf('_modal-mask') > -1) {
					this.handleClose();
				}
			}
		}, // 点击遮罩层关闭
		escClose(e) {
			if (e.keyCode === 27 && this.escClosable && this.value) {
				this.handleClose();
			}
		}, // esc关闭
		cancel() {
			this.handleClose();
		},
		ok() {
			this.$emit('input', false);
			this.$emit('ok');
		},
		mouseDown(event) {
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
			document.addEventListener("mousemove", this.mouseMove);
			document.addEventListener("mouseup", this.mouseUp);
		},
		mouseMove(event) {
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
		mouseUp() {
			document.removeEventListener("mousemove", this.mouseMove);
			document.removeEventListener("mouseup", this.mouseUp);
		}, // 松开鼠标时清除move和up事件
		enter(el) {
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
.vc-modal{
	._modal-mask{
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
	._wrap{
		position: fixed;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
		width: 100%;
		z-index: 1001;
		._modal-wrap{
			position: relative;
			background: #fff;
			box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
			margin: auto;
			border-radius: 4px;
			padding-bottom: 63px;
			&._modal-drag{
				position: absolute;
			}
			._modal-header{
				position: relative;
				border-bottom: 1px solid #e8e8e8;
				padding: 14px 24px;
				line-height: 1;
				font-size: 14px;
				font-weight: 400;
				._header-inner{
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
				.__modal-close{
					position: absolute;
					top: 17px;
					right: 16px;
					color: #999;
				}
			}
			._modal-content{
				height: calc(100% - 114px);
			}
			._modal-footer{
				position: absolute;
				bottom: 0;
				width: 100%;
				border-top: 1px solid #e8e8e8;
				padding: 17px 24px;
				text-align: right;
			}
			// confirm
			.__confirm-top {
				display: flex;
				padding: 14px 16px;
				.success {
					color: #52C41A;
				}
				.error {
					color: #F5222D;
				}
				.warning {
					color: #FAAD14;
				}
				.info {
					color: #1890FF;
				}
				.__confirm-icon {
					margin-right: 8px;
					font-size: 28px;
				}
				.__right {
					._confirm-header {
						position: relative;
						margin-bottom: 16px;
						line-height: 1;
						font-weight: 400;
						font-size: 0;
						.__title {
							display: inline-block;
							vertical-align: middle;
							margin-top: 6px;
							font-size: 14px;
							color: #333;
							font-weight: 400;
						}
					}
				}
			}
			._confirm-footer {
				position: absolute;
				bottom: 0;
				width: 100%;
				padding: 17px 24px;
				text-align: right;
			}
		}
	}
	.mask-enter-active, 
	.modal-enter-active,{
		will-change: transform;
		transition: transform .5s cubic-bezier(.08, .82, .17, 1),
			opacity .5s cubic-bezier(.08, .82, .17, 1);
	}
	.mask-leave-active,
	.modal-leave-active{
		will-change: transform;
		transition: transform .5s cubic-bezier(.08, .82, .17, 1),
			opacity .5s cubic-bezier(.08, .82, .17, 1);
	}
	.mask-enter, 
	.mask-leave-to{
		opacity: 0;
	}
	.modal-enter, 
	.modal-leave-to{
		transform: scale(0);
		opacity: 0;
	}

}
</style>