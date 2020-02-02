<template>
	<div class="vc-img">
		<slot v-if="isLoading" name="placeholder">
			<div :class="{ 'is-auto': isAuto }" :style="pStyle" class="vc-img__placeholder" />
		</slot>
		<slot v-else-if="isError" name="error">
			<div class="vc-img__error">
				加载失败
			</div>
		</slot>
		<img
			v-else
			v-bind="$attrs"
			:src="src"
			:style="style"
			:class="{ 'is-center': alignCenter }"
			class="vc-img__inner"
			v-on="$listeners"
		>
	</div>
</template>

<script>
import { DOM, $ } from '@wya/utils';
import { throttle } from 'lodash';
import IMGStore from './store';

const isSupportObjectFit = document.documentElement.style.objectFit !== undefined;

const ObjectFit = {
	NONE: 'none',
	CONTAIN: 'contain',
	COVER: 'cover',
	FILL: 'fill',
	SCALE_DOWN: 'scale-down'
};

export default {
	name: 'vc-img',
	inheritAttrs: false,
	props: {
		src: String,
		fit: String,
		lazy: Boolean,
		wrapper: [Object, String],
	},

	data() {
		return {
			isLoading: true,
			isError: false,
			isActive: !this.lazy,
			isAuto: false,
			originW: 0,
			originH: 0,
			pStyle: {}
		};
	},

	computed: {
		style() {
			if (!this.fit) return;
			return isSupportObjectFit
				? { 'object-fit': this.fit }
				: this.hackFit(this.fit);
		},
		alignCenter() {
			return !isSupportObjectFit && this.fit !== ObjectFit.FILL;
		}
	},

	watch: {
		src(v) {
			this.isActive && this.loadImage();
		},
		isActive(v) {
			v && this.loadImage();
		}
	},

	created() {
		this.scroller = null;
	},

	mounted() {
		this.setScroller();
		this.initPlaceholder();
		this.lazy
			? this.addLazyLoadListener()
			: this.loadImage();
	},

	beforeDestroy() {
		this.lazy && this.removeLazyLoadListener();
	},

	methods: {
		setScroller() {
			const { wrapper } = this;

			if (typeof wrapper === 'object') {
				this.scroller = wrapper;
			} else if (typeof wrapper === 'string') {
				this.scroller = document.querySelector(wrapper);
			} else {
				this.scroller = $(this.$el).getScroller();
			}
		},

		initPlaceholder() {
			this.isAuto = this.$el.clientHeight === 1 || this.$el.clientWidth === 1;

			// el上是否有width和height
			let { width, height } = this.$el.style;

			if (width && height) return;

			let { w, h } = IMGStore.getSize(this.src, { 
				clientW: this.$el.clientWidth,
				clientH: this.$el.clientHeight,
				style: {
					width,
					height
				},
				wrapperW: this.scroller && this.scroller.clientWidth,
				// TODO
				wrapperH: this.scroller && this.scroller.clientHeight,
			});

			if (w && h) {
				this.pStyle = {
					width: `${w}px`,
					height: `${h}px`,
				};
			}
		},

		loadImage() {
			// reset status
			this.isLoading = true;
			this.isError = false;

			const img = new Image();
			img.onload = e => this.handleLoad(e, img);
			img.onerror = e => this.handleError(e, img);

			// bind html attrs
			Object.keys(this.$attrs)
				.forEach(key => img.setAttribute(key, this.$attrs[key]));

			img.src = this.src;
		},

		handleLoad(e, img) {
			this.originW = img.naturalWidth || img.width;
			this.originH = img.naturalHeight || img.height;

			this.isLoading = false;

			this.$emit('load', e, img, this);

			IMGStore.add(this.src, {
				originW: this.originW,
				originH: this.originH,
			});
		},

		handleError(e, img) {
			this.isLoading = false;
			this.isError = true;
			this.$emit('error', e, img, this);
		},

		handleLazyLoad() {
			if ($(this.scroller).contains(this.$el)) {
				this.isActive = true;
				this.removeLazyLoadListener();
			}
		},
		addLazyLoadListener() {
			if (this.scroller) {
				this.handleLazyLoad = throttle(this.handleLazyLoad, 200);
				this.scroller.addEventListener('scroll', this.handleLazyLoad);
				this.handleLazyLoad();
			}
		},
		removeLazyLoadListener() {
			if (!this.scroller || !this.handleLazyLoad) return;
			this.scroller.removeEventListener('scroll', this.handleLazyLoad);

			this.scroller = null;
			this.handleLazyLoad = null;
		},
		
		hackFit(fit) {
			const { originW, originH } = this;
			const {
				clientWidth: elW,
				clientHeight: elH
			} = this.$el;

			if (!originW || !originH || !elW || !elH) return {};

			const vertical = originW / originH < 1;

			if (fit === ObjectFit.SCALE_DOWN) {
				const isSmaller = originW < elW && originH < elH;
				fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN;
			}

			switch (fit) {
				case ObjectFit.NONE:
					return { width: 'auto', height: 'auto' };
				case ObjectFit.CONTAIN:
					return vertical ? { width: 'auto' } : { height: 'auto' };
				case ObjectFit.COVER:
					return vertical ? { height: 'auto' } : { width: 'auto' };
				default:
					return {};
			}
		}
	}
};
</script>

<style lang="scss">
@import '../style/vars.scss';

%size {
	width: 100%;
	height: 100%;
}

@include block(vc-img) {
	position: relative;
	display: inline-block;
	overflow: hidden;
	vertical-align: top;
	
	@include element(placeholder) {
		@extend %size;
		background: #f5f7fa;
		min-height: inherit;
		max-height: inherit;
		@include when(auto) {
			background: inherit;
		}
		&:after {
			content: "-"; // eslint-disable-line
			display: block;
			opacity: 0; 
			height: 1px;
			width: 1px;  
		}
	}

	@include element(error) {
		@extend %size;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		color: #c0c4cc;
		vertical-align: middle;
	}

	@include element(inner) {
		@extend %size;
		display: block;

		@include when(center) {
			position: relative;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			display: block;
		}
	}
}
</style>