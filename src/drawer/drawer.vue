<template>
	<div class="vc-drawer">
		<transition name="mask">
			<div 
				v-if="mask && visible"
				:style="maskStyle"
				class="__drawer-mask"
				@click="handleMaskClose"
			/>
		</transition>
		<transition :name="drawerAnimation">
			<div 
				v-if="visible" 
				:style="style"
				:class="drawerClass"
				class="__drawer"
			>
				<div ref="header" class="__drawer-header">
					<slot name="header">
						<p class="__header-inner">我是标题</p>
					</slot>
					<a class="__drawer-close" @click="handleClose">
						<vc-icon type="close"/>
					</a>
				</div>
				<slot/>
			</div>
		</transition>
	</div>
</template>
<script>
import Icon from '../icon';
import Button from '../button';

let drawerNumber = 0;
export default {
	name: "vc-drawer",
	components: {
		'vc-icon': Icon,
		'vc-button': Button
	},
	model: {
		prop: 'visible',
		event: 'visible-change'
	},
	props: {
		title: String,
		visible: {
			type: Boolean,
			default: false
		},
		width: {
			type: Number,
			default: 300
		},
		height: {
			type: Number,
			default: 300
		},
		mask: {
			type: Boolean,
			default: true
		},
		maskClosable: {
			type: Boolean,
			default: true
		},
		scrollable: {
			type: Boolean,
			default: false
		},
		placement: {
			type: String,
			default: 'right'
		},
		maskStyle: Object
	},
	data() {
		return {
			style: {},
			drawerClass: '',
			drawerIndex: 0,
			drawerAnimation: '',
		};
	},
	computed: {
	},
	watch: {
		visible(val) {
			if (!this.scrollable && val) {
				document.querySelector('body').style.overflow = 'hidden';
			} else {
				document.querySelector('body').style.overflow = 'auto';
			}
			switch (this.placement) {
				case 'top':
					this.drawerClass = '__drawer-top';
					this.drawerAnimation = 'drawer-top';
					break;
				case 'right':
					this.drawerClass = '__drawer-right';
					this.drawerAnimation = 'drawer-right';
					break;
				case 'bottom':
					this.drawerClass = '__drawer-bottom';
					this.drawerAnimation = 'drawer-bottom';
					break;
				case 'left':
					this.drawerClass = '__drawer-left';
					this.drawerAnimation = 'drawer-left';
					break;
				default:
					return;
			}
			if (this.placement === 'top' || this.placement === 'bottom') {
				this.style.height = `${this.height}px`;
			} else {
				this.style.width = `${this.width}px`;
			}
		}
	},
	methods: {
		handleClose() {
			this.$emit('close');
			this.$emit('visible-change', false);
		},
		handleMaskClose() {
			if (this.maskClosable) {
				this.handleClose();
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.vc-drawer{
	.__drawer-mask{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(55,55,55,.6);
		z-index: 1000;
	}
	.__drawer{
		position: fixed;
		z-index: 1000;
		background-color: #fff;
		box-shadow: 0 4px 12px rgba(0,0,0,.15);
		transition: transform .5s cubic-bezier(.075,.82,.165,1),
			opacity .5s cubic-bezier(.075,.82,.165,1);
		&-top{
			width: 100%;
			top: 0;
			left: 0;
		}
		&-right{
			height: 100%;
			top: 0;
			right: 0;
		}
		&-bottom{
			width: 100%;
			bottom: 0;
			left: 0;
		}
		&-left{
			height: 100%;
			top: 0;
			left: 0;
		}
		.__drawer-header{
			position: relative;
			border-bottom: 1px solid #e8eaec;
			padding: 14px 16px;
			line-height: 1;
			font-size: 14px;
			.__drawer-close{
				position: absolute;
				top: 12px;
				right: 16px;
				color: #999;
			}
		}
	}
	.mask-enter-active, 
	.mask-leave-active{
		transition: transform .5s cubic-bezier(.075,.82,.165,1),
			opacity .5s cubic-bezier(.075,.82,.165,1);
	}
	.drawer-top-enter,
	.drawer-top-leave-to{
		opacity: 0;
		transform: translateY(-100%);
	}
	.drawer-right-enter,
	.drawer-right-leave-to{
		opacity: 0;
		transform: translateX(100%);
	}
	.drawer-bottom-enter,
	.drawer-bottom-leave-to{
		opacity: 0;
		transform: translateY(100%);
	}
	.drawer-left-enter,
	.drawer-left-leave-to{
		opacity: 0;
		transform: translateX(-100%);
	}
	.mask-enter, 
	.mask-leave-to{
		opacity: 0;
	}
}
</style>