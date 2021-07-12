<template>
	<vc-transition-fade>
		<div
			v-show="thumbSize && (always || isVisible)"
			ref="track"
			:style="trackStyle"
			:class="[trackClassName, 'is-' + barOptions.key]"
			class="vc-scroller-bar__track"
			@mousedown="handleClickTrack"
		>
			<div
				ref="thumb"
				:class="thumbClassName"
				:style="[thumbStyle, thumbCalcStyle]"
				class="vc-scroller-bar__thumb"
				@mousedown="handleClickThumb"
			/>
		</div>
	</vc-transition-fade>
</template>

<script>
import { $ } from '@wya/utils';
import { TRANSFORM } from '../utils';
import Transition from '../transition';

const BAR_MAP = {
	vertical: {
		scroll: 'scrollTop',
		size: 'height',
		key: 'vertical',
		axis: 'Y',
		client: 'clientY',
		direction: 'top',
	},
	horizontal: {
		scroll: 'scrollLeft',
		size: 'width',
		key: 'horizontal',
		axis: 'X',
		client: 'clientX',
		direction: 'left',
	}
};

export default {
	name: 'vc-scroller-bar',
	components: {
		'vc-transition-fade': Transition.Fade
	},
	props: {
		vertical: Boolean,
		wrapperSize: Number,
		contentSize: Number,
		scrollOffset: Number, // content的滚动距离
		always: {
			type: Boolean,
			default: false,
		},
		// 最小的thumb值
		thumbMinSize: {
			type: Number,
			default: 30
		},
		thumbStyle: [Object, String, Array],
		thumbClassName: [Object, String, Array],
		trackStyle: [Object, String, Array],
		trackClassName: [Object, String, Array]
	},
	data() {
		return {
			cursorDown: null,
			cursorLeave: null,
			isVisible: false,
		};
	},
	computed: {
		owner() {
			let parent = this.$parent;
			while (parent && !parent.scrollerId) {
				parent = parent.$parent;
			}
			return parent;
		},
		barOptions() {
			return BAR_MAP[this.vertical ? 'vertical' : 'horizontal'];
		},
		// thumb的大小
		thumbSize() {
			const size = this.wrapperSize * (this.wrapperSize / this.contentSize);
			return size && size < this.wrapperSize ? size : 0;
		},

		thumbFitSize() {
			return Math.max(this.thumbSize, this.thumbMinSize);
		},

		// 最大可移动的距离
		maxMove() {
			return this.wrapperSize - this.thumbSize;
		},

		// 滚动时均摊Size
		averageSize() {
			return Math.max(this.thumbMinSize - this.thumbSize, 0) / this.maxMove;
		},

		// thumb偏移值
		thumbMove() {
			// thumb应该在当前bar上的偏移值
			const currentMove = (this.scrollOffset / this.wrapperSize) * this.thumbSize;
			// 当前你滚动的距离
			const thumbFitMove = currentMove * (1 - this.averageSize); 

			return thumbFitMove > this.maxMove ? this.maxMove : thumbFitMove;
		},

		// thumb样式
		thumbCalcStyle() {
			const { size, axis } = this.barOptions;
			return {
				[size]: this.thumbFitSize + 'px',
				[TRANSFORM]: `translate${axis}(${this.thumbMove}px)`
			};
		},
	},

	created() {
		this.originalOnselectstart = null;
		this.startMove = 0;
		this.startThumbMove = 0;
	},

	mounted() {
		const el = this.owner.$refs.wrapper;
		if (!el) return;
		$(el).on('mousemove', this.handleMouseMoveWrapper);
		$(el).on('mouseleave', this.handleLeaveWrapper);
	},

	destroyed() {
		const el = this.owner.$refs.wrapper;
		if (!el) return;
		$(document).off('mousemove', this.handleMouseMoveDocument);
		$(document).off('mouseup', this.handleMouseUpDocument);
		$(el).off('mousemove', this.handleMouseMoveWrapper);
		$(el).off('mouseleave', this.handleLeaveWrapper);
	},

	methods: {
		setScroll(thumbFitMove) {
			const { scroll } = this.barOptions;
			const scrollOffset = ((thumbFitMove / (1 - this.averageSize)) / this.thumbSize) * this.wrapperSize;

			this.owner.$refs.wrapper[scroll] = scrollOffset;
			this.owner.refreshScroll();
		},

		handleMouseMoveDocument(e) {
			if (this.cursorDown === false) return;
			if (!this.startMove) return;

			const { axis, direction, client, scroll } = this.barOptions;

			const thumbFitMove = Math.min(
				Math.max(0, this.startThumbMove + e[client] - this.startMove),
				this.maxMove
			);

			this.setScroll(thumbFitMove);
		},

		handleMouseUpDocument() {
			this.cursorDown = false;
			this.startMove = 0;

			$(document).off('mousemove', this.handleMouseMoveDocument);
			$(document).off('mouseup', this.handleMouseUpDocument);

			document.onselectstart = this.originalOnselectstart;
			if (this.cursorLeave) {
				this.isVisible = false;
			}
		},

		startDrag(e) {
			e.stopImmediatePropagation();
			this.cursorDown = true;

			$(document).on('mousemove', this.handleMouseMoveDocument);
			$(document).on('mouseup', this.handleMouseUpDocument);

			this.originalOnselectstart = document.onselectstart;
			document.onselectstart = () => false;
		},

		/**
		 * 拖动
		 */
		handleClickThumb(e) {
			// 防止中右键点击事件
			e.stopPropagation();
			if (e.ctrlKey || [1, 2].includes(e.button)) {
				return;
			}

			window.getSelection().removeAllRanges();

			this.startDrag(e);

			const { client, direction, axis } = this.barOptions;
			
			this.startMove = e[client];
			this.startThumbMove = this.thumbMove;
		},

		/**
		 * 点击滚动轴
		 */
		handleClickTrack(e) {
			const { client, direction, scroll } = this.barOptions;
			const thumbFitMove = e[client] - e.target.getBoundingClientRect()[direction] - this.thumbFitSize / 2;

			this.setScroll(thumbFitMove);
		},

		handleMouseMoveWrapper() {
			this.cursorLeave = false;
			this.isVisible = !!this.thumbSize;
		},

		handleLeaveWrapper() {
			this.cursorLeave = true;
			this.isVisible = this.cursorDown;
		},
	}
};

</script>


<style lang="scss">
@import '../style/vars.scss';

@include block(vc-scroller-bar) {
	@include element(track) {
		position: absolute;
		z-index: 1;
		border-radius: 4px;
		@include when(vertical) {
			width: 6px;
			top: 0;
			right: 0;
			bottom: 0;

			> div {
				width: 100%;
			}
		}

		@include when(horizontal) {
			height: 6px;
			left: 0;
			right: 0;
			bottom: 0;

			> div {
				height: 100%;
			}
		}
	}

	@include element(thumb) {
		position: relative;
		display: block;
		width: 0;
		height: 0;
		cursor: pointer;
		border-radius: inherit;
		background-color: rgba(37, 36, 36, 0.57);
		transition: .3s background-color;

		&:hover {
			background-color: rgba(37, 36, 36, 0.7);
		}
	}
}
</style>
