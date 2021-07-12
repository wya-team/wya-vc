<template>
	<div class="vc-scroller">
		<div 
			ref="wrapper" 
			:style="[wrapperStyle, wrapperCalcStyle]" 
			:class="[
				wrapperClassName,
				native ? 'is-native' : 'is-hidden',
			]"
			class="vc-scroller__wrapper"
			@scroll="handleScroll"
		>
			<component
				:is="tag"
				ref="content"
				class="vc-scroller__content"
				:style="[contentStyle]"
			>
				<slot />
			</component>
		</div>
		<template v-if="!native">
			<vc-scroller-bar 
				v-bind="barBinds"
				:scroll-offset="scrollX" 
				:wrapper-size="wrapperW" 
				:content-size="contentW" 
			/>
			<vc-scroller-bar
				v-bind="barBinds"
				:scroll-offset="scrollY"
				:wrapper-size="wrapperH" 
				:content-size="contentH" 
				vertical
			/>
		</template>
		<!-- 通常是用于absolute的元素 TODO: 还需额外定API  -->
		<!-- <slot name="extra" /> -->
	</div>
</template>
<script lang="js">
import { Device } from '@wya/utils';
import { pick } from 'lodash';
import { Resize, getUid } from '../utils';
import ScrollerBar from './bar';

export default {
	name: 'vc-scroller',
	components: {
		'vc-scroller-bar': ScrollerBar
	},
	props: {
		height: {
			type: [String, Number],
			default: '',
		},
		maxHeight: {
			type: [String, Number],
			default: '',
		},
		native: {
			type: Boolean,
			default: false,
		},

		wrapperStyle: {
			type: [String, Array, Object],
			default: '',
		},
		wrapperClassName: {
			type: [String, Array, Object],
			default: '',
		},

		contentStyle: {
			type: [String, Array, Object],
			default: '',
		},
		contentClassName: {
			type: [String, Array, Object],
			default: '',
		},
		autoResize: {
			type: Boolean,
			default: true
		},
		tag: {
			type: String,
			default: 'div',
		},
		...pick(ScrollerBar.props, [
			'always',
			'thumbMinSize',
			'thumbStyle',
			'thumbClassName',
			'trackStyle',
			'trackClassName'
		])
	},
	data() {
		return {
			wrapperW: 0,
			wrapperH: 0,

			contentH: 0,
			contentW: 0,

			scrollX: 0,
			scrollY: 0,
		};
	},
	computed: {
		wrapperCalcStyle() {
			let style = {};

			style.height = typeof this.height !== 'number' ? this.height : `${this.height}px`;
			style.maxHeight = typeof this.maxHeight !== 'number' ? this.maxHeight : `${props.maxHeight}px`;
			
			return style;
		},
		barBinds() {
			return {
				always: this.always,
				thumbMinSize: this.thumbMinSize,
				thumbStyle: this.thumbStyle,
				trackStyle: this.trackStyle,
			};
		}
	},
	created() {
		this.scrollerId = getUid('scroller');
	},
	mounted() {
		if (!this.native) {
			this.$nextTick(this.refresh);
		}
		if (this.autoResize) {
			Resize.on(this.$refs.wrapper, this.refresh);
		}
	},
	destroyed() {
		if (this.autoResize) {
			Resize.off(this.$refs.wrapper, this.refresh);
		}
	},
	methods: {
		// 记录当前容器(wrapper)和内容(content)宽高
		refreshSize() {
			const el = this.$refs.wrapper;
			if (!el) return;

			this.wrapperW = el.clientWidth;
			this.wrapperH = el.clientHeight;

			this.contentH = el.scrollHeight;
			this.contentW = el.scrollWidth;
		},

		// 记录当前容器(wrapper)滚动的位移
		refreshScroll() {
			const el = this.$refs.wrapper;
			if (!el) return;

			this.scrollY = el.scrollTop;
			this.scrollX = el.scrollLeft;
		},

		refresh() {
			this.refreshSize();
			this.refreshScroll();
		},

		/**
		 * 用scroll导致bar的抖动，后期可以考虑多嵌套一层
		 */
		handleScroll(e, data) {
			this.refreshScroll();
			this.$emit('scroll', e, data);
		},

		setScrollTop(value) {
			const el = this.$refs.wrapper;
			el.scrollTop = value;
			this.scrollY = value;
		},

		setScrollLeft(value) {
			const el = this.$refs.wrapper;
			el.scrollLeft = value;
			this.scrollX = value;
		}
	}
};
</script>

<style lang="scss">
@import '../style/vars.scss';

@include block(vc-scroller) {
	position: relative;
	@include element(wrapper) {
		overflow: auto;

		@include when(hidden) {
			scrollbar-width: none;
			&::-webkit-scrollbar {
				display: none;
			}
		}
	}
}
</style>
