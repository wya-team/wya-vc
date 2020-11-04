<template>
	<div :class="classes" class="vcm-tabs">
		<div
			v-if="showWrapper"
			ref="wrapper"
			:style="[barStyle, fixedStyle]"
			:class="{ 'is-fixed': isFixed }"
			class="vcm-tabs__bar"
		>
			<slot name="prepend" />
			<div v-if="showStep && scrollable" class="vcm-tabs__step is-left" @click="handleStep(1)">
				<vcm-icon type="left" />
			</div>
			<div 
				ref="scroll"
				class="vcm-tabs__scroll"
			>
				<div ref="nav" :style="scrollStyle" class="vcm-tabs__nav">
					<div 
						v-if="showAfloat" 
						:style="afloatStyle" 
						class="vcm-tabs__afloat"
					/>
					<div
						v-for="(item, index) in list"
						:key="index"
						:data-id="item.name"
						:class="[{ 'is-active': item.name == currentName, 'is-average': average }]"
						class="vcm-tabs__item"
						@click="handleChange(index)"
					>
						<slot :it="item" :index="index" name="label">
							<span v-if="typeof item.label === 'string'" v-html="item.label" />
							<vc-customer
								v-else-if="typeof item.label === 'function'"
								:render="item.label"
								:it="item"
								:index="index"
							/>
						</slot>
					</div>
				</div>
			</div>
			<div v-if="showStep && scrollable" class="vcm-tabs__step is-right" @click="handleStep(-1)">
				<vcm-icon type="right" />
			</div>
			<slot name="append" />
		</div>
		<div v-if="isFixed" :style="{ height: `${placeholderH}px` }" class="vcm-tabs__placeholder" />
		<div ref="content" :style="contentStyle" class="vcm-tabs__content">
			<slot />
		</div>
	</div>
</template>
<script>
import { throttle, debounce } from 'lodash';
import TabsMixin from '../tabs-mixin';
import { Resize } from '../../utils/index';
import MIcon from '../../icon/index.m';
import Customer from '../../customer';

export default {
	name: 'vcm-tabs',
	components: {
		'vcm-icon': MIcon,
		'vc-customer': Customer,
	},
	mixins: [TabsMixin],
	props: {
		theme: {
			type: String,
			default: 'light',
			validator: v => /(light|dark)/.test(v)
		},
		barStyle: {
			type: [Object, Array],
			default: () => ({}),
		},
		autoAfloatWidth: {
			type: Boolean,
			default: true,
		},
		average: {
			type: Boolean,
			default: true
		},
		showWrapper: {
			type: Boolean,
			default: true
		},
		sticky: {
			type: Boolean,
			default: false
		},
		offsetTop: {
			type: Number,
			default: 0
		},
		showStep: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			isFixed: false,
			placeholderH: 53,

			isTouching: false,
			scrollViewW: 0, // 滚动容器宽度
			scrollContentW: 0, // 滚动内容宽度
			baseX: 0
		};
	},
	computed: {
		isDark() {
			return this.theme === 'dark';
		},
		fixedStyle() {
			return this.isFixed 
				? { top: `${this.offsetTop}px` }
				: {};
		},
		scrollStyle() {
			return {
				transition: this.isTouching ? '' : 'transform 300ms ease-in-out',
				transform: `translate3d(${this.scrollOffset}px, 0, 0)`
			};
		}
	},
	watch: {
		theme() {
			this.refreshAfloat();
		},
		average() {
			this.refreshAfloat();
		},
		showStep() {
			this.$nextTick(this.refreshScroll);
		}
	},
	created() {
		this.top = 0;
	},
	mounted() {
		this.refreshTop();
		this.operateDOMEvents('add');
		this.$nextTick(this.refreshScroll);
	},
	updated() {
		this.refreshTop();
	},
	destroyed() { 
		this.operateDOMEvents('remove');
	},
	methods: {
		/**
		 * TODO: 在height: 100%容器内滚动，让其带有粘性
		 */
		operateDOMEvents(type) {
			if (!this.sticky) return;
			let fn = type === 'add' ? window.addEventListener : window.removeEventListener;
			fn('scroll', this.handleScroll);
		},

		handleScroll: throttle(function () {
			this.isFixed = document.scrollingElement.scrollTop + this.offsetTop > this.top;
		}, 100),

		/**
		 * 使用Resize时, 切换页面失效，换种方案
		 */
		refreshTop: debounce(function () {
			if (this.sticky) {
				this.top = this.$refs.content.offsetTop - this.placeholderH;
				this.isFixed = document.scrollingElement.scrollTop + this.offsetTop > this.top;
			}
		}, 250, { leading: true, trailing: true }),

		/**
		 * 刷新当前标签底下的滑块位置
		 */
		refreshAfloat() {
			if (!this.showWrapper) return;

			this.$nextTick(() => {
				const index = this.getTabIndex(this.currentName);
				if (this._isDestroyed) return;
				const items = this.$refs.nav.querySelectorAll(`.vcm-tabs__item`);

				const $ = items[index];

				// 暂时写死42
				this.afloatWidth = $
					? this.isDark
						? 20
						: this.autoAfloatWidth
							? $.querySelector('span').offsetWidth
							: $.offsetWidth
					: 0;

				let offset = 0;
				let basicOffset = $ ? ($.offsetWidth - this.afloatWidth) / 2 : 0;

				if (index > 0) {
					for (let i = 0; i < index; i++) {
						offset += parseFloat(items[i].offsetWidth);
					}

				}

				this.afloatOffset = offset + basicOffset;
				this.refreshScroll();
			});
		},

		/**
		 * 处理是否需要滚动
		 */
		refreshScroll() {
			const viewEl = this.$refs.scroll;
			this.scrollViewW = viewEl.offsetWidth;
			this.scrollContentW = this.$refs.nav.offsetWidth;
			if (this.scrollContentW > this.scrollViewW) {
				viewEl.addEventListener('touchstart', this.handleTouchstart, false);
				viewEl.addEventListener('touchmove', this.handleTouchmove, false);
				viewEl.addEventListener('touchend', this.handleTouchend, false);
				this.scrollable = true;
			} else if (this.scrollable) {
				viewEl.removeEventListener('touchstart', this.handleTouchstart, false);
				viewEl.removeEventListener('touchmove', this.handleTouchmove, false);
				viewEl.removeEventListener('touchend', this.handleTouchend, false);
				this.scrollable = false;
			}
			// 当一开始showSetp为true时，右边滚到顶，此时切换showStep为false，需要更新位置
			const maxOffsetX = this.scrollContentW - this.scrollViewW;
			if (this.scrollOffset < -maxOffsetX) {
				this.scrollOffset = -maxOffsetX;
			}
		},

		handleTouchstart(event) {
			this.isTouching = true;
			this.startX = event.touches[0].pageX;
			this.baseX = this.scrollOffset;
		},
		handleTouchmove: throttle(function (event) {
			const touchPageX = event.touches[0].pageX;
			// 与touchstart时触点位置的距离偏移值，大于0时为触点向右移，反之向左
			const changedX = touchPageX - this.startX;
			if (changedX > 0) {
				if (this.scrollOffset >= 0) {
					this.scrollOffset = 0;
					return;
				}
			} else if (Math.abs(this.scrollOffset) + this.scrollViewW >= this.scrollContentW) {
				this.scrollOffset = -(this.scrollContentW - this.scrollViewW);
				return;
			}
			this.scrollOffset = this.baseX + touchPageX - this.startX;
		}, 17),
		handleTouchend() {
			this.isTouching = false;
			// TODO: 惯性滚动、回弹 （体验优化）
		},
		handleStep(flag) {
			if (!this.scrollable) return;
			const moveX = flag * this.scrollViewW;
			let offsetX = this.scrollOffset + moveX;
			if (offsetX < -(this.scrollContentW - this.scrollViewW) || offsetX > 0) {
				offsetX = flag === -1 ? -(this.scrollContentW - this.scrollViewW) : 0;
			}
			this.scrollOffset = offsetX;
		},

		/**
		 * 将选中的item滚动至可视区（尽量往中间靠）
		 */
		scrollToActive() {
			if (!this.scrollable) return;
			const activeEl = this.$el.querySelector(`.vcm-tabs__item[data-id="${this.currentName}"]`);

			if (!activeEl) return;
			const contentEl = this.$refs.nav;

			const activeRect = activeEl.getBoundingClientRect();
			const viewRect = this.$refs.scroll.getBoundingClientRect();
			const contentRect = contentEl.getBoundingClientRect();
			
			let offset = 0;

			if (activeRect.width < viewRect.width) {
				// targetOffset为最理想的情况下，可以滚动到正中间，此时activeEl距scrollView的左右边距
				const targetOffset = (viewRect.width - activeRect.width) / 2;
				// offsetLeft其实等价于activeEl.offsetLeft，
				// 但是调试时发现这两个值在小数位会有差距，offsetLeft一直是整数，所以还是决定用下面这种方式计算offsetLeft
				const offsetLeft = activeRect.left - contentRect.left;
				if (offsetLeft - viewRect.left <= targetOffset) { // 左边距离不足以到正中间的情况
					offset = 0;
				} else if (contentRect.right - activeRect.right <= targetOffset) { // 右边距离不足以到正中间的情况
					offset = viewRect.width - contentRect.width; // 负值
				} else {
					offset = targetOffset - offsetLeft; // 可以滚动到正中间的理想情况
				}
			}
			this.scrollOffset = offset;
		},
	},
};
</script>

<style lang="scss">
@import '../../style/vars.scss';

@include block(vcm-tabs) {
	width: 100%;
	overflow: hidden;
	@include element(step) {
		width: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		@include when(left) {
			box-shadow: 1px 0 5px 1px #eee;
		}
		@include when(right) {
			box-shadow: -1px 0 5px 1px #eee;
		}
	}
	@include element(bar) {
		overflow: hidden;
		margin-bottom: 8px;
		display: flex;
		align-items: stretch;
		position: relative;
		@include when(fixed) {
			position: fixed;
			width: 100%;
			z-index: 999;
			// box-shadow: 0px -5px 5px 5px #999;
		}
	}
	/**
	 * 这里的设计，存在问题，要做到少时自动撑开，多是滚动
	 * TODO: 用js方式实现;
	 */
	@include element(scroll) {
		white-space: nowrap;
		overflow: hidden;
		// -webkit-overflow-scrolling: touch;
		width: 100%;
	}
	@include element(nav) {
		position: relative;
		display: flex;
		width: fit-content;
	}
	@include element(item) {
		position: relative;
		text-align: center;
		transition: color .3s ease-in-out;
		font-size: 15px;
		line-height: 1;
		padding: 15px 10px;
		@include when(average) {
			flex: 1;
		}
	}

	@include element(afloat) {
		height: 2px;
		box-sizing: border-box;
		position: absolute;
		left: 0;
		z-index: 1;

	}
	@include element(content) {
		display: flex;
		flex-direction: row;
	}
	@include when(animated) {
		@include element(afloat) {
			transition: transform .3s ease-in-out;
			transform-origin: 0 0;
		}
		@include element(content) {
			will-change: transform;
			transition: transform .3s cubic-bezier(.35, 0, .25, 1);
		}
	}

	@include when(light) {
		@include element(bar) {
			background: white;
		}
		@include element(item) {
			color: #666;
			@include when(active) {
				color: #000;
			}
		}
		@include element(afloat) {
			background-color: #000;
			bottom: 0;
		}
	}

	@include when(dark) {
		@include element(bar) {
			background: #333;
		}
		@include element(item) {
			color: #E7C083;
			@include when(active) {
				color: #E7C083;
			}
		}
		@include element(afloat) {
			background-color: #E7C083;
			bottom: 6px;
			border-radius: 2px;
		}
		@include element(step) {
			color: #E7C083;
			@include when(left) {
				box-shadow: 1px 0 5px 1px #242421;
			}
			@include when(right) {
				box-shadow: -1px 0 5px 1px #242421;
			}
		}
	}
}
</style>
