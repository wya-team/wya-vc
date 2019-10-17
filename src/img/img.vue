<template>
	<div class="vc-img">
		<slot v-if="loading" name="placeholder">
			<div class="vc-img__placeholder" />
		</slot>
		<slot v-else-if="error" name="error">
			<div class="vc-img__error">加载失败</div>
		</slot>
		<img
			v-else
			v-bind="$attrs"
			:src="src"
			:style="imageStyle"
			:class="{ 'vc-img__inner--center': alignCenter }"
			class="vc-img__inner"
			v-on="$listeners"
		>
	</div>
</template>

<script>
import { DOM } from '@wya/utils';
import { throttle } from 'lodash';

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
			loading: true,
			error: false,
			show: !this.lazy,
			imageWidth: 0,
			imageHeight: 0
		};
	},

	computed: {
		imageStyle() {
			return this.fit 
				? isSupportObjectFit
					? { 'object-fit': this.fit }
					: this.getImageStyle(this.fit)
				: {};
		},
		alignCenter() {
			return !isSupportObjectFit && this.fit !== ObjectFit.FILL;
		}
	},

	watch: {
		src(val) {
			this.show && this.loadImage();
		},
		show(val) {
			val && this.loadImage();
		}
	},

	mounted() {
		if (this.lazy) {
			this.addLazyLoadListener();
		} else {
			this.loadImage();
		}
	},

	beforeDestroy() {
		this.lazy && this.removeLazyLoadListener();
	},

	methods: {
		loadImage() {
			if (this.$isServer) return;

			// reset status
			this.loading = true;
			this.error = false;

			const img = new Image();
			img.onload = e => this.handleLoad(e, img);
			img.onerror = this.handleError.bind(this);

			// bind html attrs
			// so it can behave consistently
			Object.keys(this.$attrs)
				.forEach((key) => {
					const value = this.$attrs[key];
					img.setAttribute(key, value);
				});
			img.src = this.src;
		},
		handleLoad(e, img) {
			this.imageWidth = img.width;
			this.imageHeight = img.height;
			this.loading = false;
		},
		handleError(e) {
			this.loading = false;
			this.error = true;
			this.$emit('error', e);
		},
		handleLazyLoad() {
			if (DOM.contains(this.$el, this._wrapper)) {
				this.show = true;
				this.removeLazyLoadListener();
			}
		},
		addLazyLoadListener() {
			if (this.$isServer) return;

			const { wrapper } = this;
			let _wrapper = null;

			if (typeof wrapper === 'object') {
				_wrapper = wrapper;
			} else if (typeof wrapper === 'string') {
				_wrapper = document.querySelector(wrapper);
			} else {
				_wrapper = DOM.getScroller(this.$el);
			}

			if (_wrapper) {
				this._wrapper = _wrapper;
				this._lazyLoadHandler = throttle(this.handleLazyLoad, 200);
				_wrapper.addEventListener('scroll', this._lazyLoadHandler);
				this.handleLazyLoad();
			}
		},
		removeLazyLoadListener() {
			const { _wrapper, _lazyLoadHandler } = this;

			if (this.$isServer || !_wrapper || !_lazyLoadHandler) return;

			_wrapper.removeEventListener('scroll', _lazyLoadHandler);
			this._wrapper = null;
			this._lazyLoadHandler = null;
		},
		/**
		 * simulate object-fit behavior to compatible with IE11 and other browsers which not support object-fit
		 */
		getImageStyle(fit) {
			const { imageWidth, imageHeight } = this;
			const {
				clientWidth: containerWidth,
				clientHeight: containerHeight
			} = this.$el;

			if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) return {};

			const vertical = imageWidth / imageHeight < 1;

			if (fit === ObjectFit.SCALE_DOWN) {
				const isSmaller = imageWidth < containerWidth && imageHeight < containerHeight;
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
@import '../style/index.scss';

%size {
	width: 100%;
	height: 100%;
}

@include block(vc-img) {
	position: relative;
	display: inline-block;
	overflow: hidden;

	@include element(inner) {
		// @extend %size;
		vertical-align: top;

		@include modifier(center) {
			position: relative;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			display: block;
		}
	}

	@include element(placeholder) {
		@extend %size;
		background: #f5f7fa;
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
}
</style>