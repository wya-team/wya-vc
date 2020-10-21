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
			<div ref="scroll" class="vcm-tabs__scroll">
				<div ref="nav" class="vcm-tabs__nav">
					<div 
						v-if="showAfloat" 
						:style="afloatStyle" 
						class="vcm-tabs__afloat"
					/>
					<div
						v-for="(item, index) in list"
						:key="index"
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
			default: 39
		}
	},
	data() {
		return {
			isFixed: false,
			placeholderH: 53
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
		}
	},
	watch: {
		theme() {
			this.refreshAfloat();
		},
		average() {
			this.refreshAfloat();
		}
	},
	created() {
		this.top = 0;
	},
	mounted() {
		this.refreshTop();
		this.operateDOMEvents('add');
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
		}, 50),

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
		 * 刷新是否需要滚动条
		 * TODO
		 */
		refreshScroll() {

		},

		/**
		 * TODO
		 */
		scrollToActive() {

		},
	},
};
</script>

<style lang="scss">
@import '../../style/vars.scss';

@include block(vcm-tabs) {
	width: 100%;
	overflow: hidden;
	@include element(bar) {
		margin-bottom: 8px;
		display: flex;
		align-items: center;
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
		overflow: auto;
		// -webkit-overflow-scrolling: touch;
		width: 100%;
	}
	@include element(nav) {
		position: relative;
		transition: transform .5s ease-in-out;
		display: flex;
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
	}
}
</style>
