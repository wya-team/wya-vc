<template>
	<div :class="classes" class="vc-drawer">
		<vc-transition-fade :delay=".05">
			<div 
				v-show="mask && isActive"
				:style="maskStyle"
				class="vc-drawer__mask"
				@click="handleClose($event, maskClosable)"
			/>
		</vc-transition-fade>
		<vc-transition-slide :mode="mode" @after-leave="handleRemove">
			<div 
				v-show="isActive" 
				:class="wrapperClassName"
				:style="[style, wrapperStyle]"
				class="vc-drawer__wrapper"
			>
				<div ref="header" class="vc-drawer__header">
					<slot name="header">
						<p class="vc-drawer__title" v-html="title || '我是标题' " />
					</slot>
					<a class="vc-drawer__close" @click="handleClose($event, true)">
						<vc-icon type="close"/>
					</a>
				</div>
				<slot/>
			</div>
		</vc-transition-slide>
	</div>
</template>
<script>
import Icon from '../icon';
import Button from '../button';
import Transition from '../transition';
import { placement2mode } from '../utils';
import Extends from '../extends';

let drawerNumber = 0;
export default {
	name: "vc-drawer",
	components: {
		'vc-icon': Icon,
		'vc-button': Button,
		'vc-transition-fade': Transition.Fade,
		'vc-transition-slide': Transition.Slide,
	},
	mixins: [...Extends.mixins(['scrollbar'])],
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
			default: 'right' // top/right/left/bottom
		},
		maskStyle: Object,
		wrapperClassName: Object | Array | String,
		wrapperStyle: Object | Array | String
	},
	data() {
		return {
			isActive: false,
		};
	},
	computed: {
		classes() {
			return {
				[`is-${this.placement}`]: true,
			};
		},
		style() {
			return this.placement === 'top' || this.placement === 'bottom'
				? { height: `${this.height}px` }
				: { width: `${this.width}px` };
		},
		mode() {
			return placement2mode[this.placement];
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
		 * 关闭事件
		 */
		handleClose(e, closable) {
			if (closable 
				|| (
					this.maskClosable 
					&& e.target.classList.contains('vc-drawer__wrapper')
				)
			) {
				this.isActive = false;
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
	}
};
</script>
<style lang="scss">
@import '../style/index.scss';
$block: vc-drawer;

@include block($block) {
	@include element(mask){
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .4);
		height: 100%;
		z-index: 1000;
	}
	@include element(wrapper) {
		position: fixed;
		z-index: 1000;
		background-color: #fff;
		box-shadow: 0 4px 12px rgba(0,0,0,.15);
	}
	@include when(bottom) {
		@include element(wrapper) {
			right: 0;
			left: 0;
			bottom: 0;
			// padding-bottom: env(safe-area-inset-bottom);
		}
	}

	@include when(top) {
		@include element(wrapper) {
			right: 0;
			left: 0;
			top: 0;
			// padding-top: env(safe-area-inset-bottom);
		}
	}
	@include when(left) {
		@include element(wrapper) {
			top: 0;
			bottom: 0;
			left: 0;
		}
	}

	@include when(right) {
		@include element(wrapper) {
			top: 0;
			bottom: 0;
			right: 0;
		}
	}
	@include element(header) {
		position: relative;
		border-bottom: 1px solid #e8eaec;
		padding: 14px 16px;
		line-height: 1;
		font-size: 14px;
	}
	@include element(close) {
		position: absolute;
		top: 12px;
		right: 16px;
		color: #999;
	}	
}
</style>