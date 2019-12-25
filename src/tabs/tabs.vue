<template>
	<div :class="classes" class="vc-tabs">
		<div class="vc-tabs__extra">
			<slot name="extra" />
		</div>
		<div ref="wrapper" :style="{ padding: scrollable && '0 24px' }" class="vc-tabs__bar">
			<vc-icon v-if="scrollable" class="vc-tabs__icon is-left" type="left" @click="handlePrev" />
			<vc-icon v-if="scrollable" class="vc-tabs__icon is-right" type="right" @click="handleNext" />

			<div ref="scroll" class="vc-tabs__scroll">
				<div ref="nav" :style="scrollStyle" class="vc-tabs__nav">
					<div 
						v-if="!isCard" 
						:style="afloatStyle" 
						class="vc-tabs__afloat"
					/>
					<div 
						v-for="(item, index) in list"
						:key="index"
						:class="[{ 'is-active': item.name == currentName }]"
						class="vc-tabs__item"
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
						<!-- TODO -->
						<vc-icon v-if="closable && item.closable" type="close" />
					</div>
				</div>
			</div>
		</div>
		<div :style="contentStyle" class="vc-tabs__content">
			<slot />
		</div>
	</div>
</template>
<script>
import TabsMixin from './tabs-mixin';
import Icon from '../icon';
import Customer from '../customer';

export default {
	name: 'vc-tabs',
	components: {
		'vc-icon': Icon,
		'vc-customer': Customer,
	},
	mixins: [TabsMixin],
	props: {
		type: {
			type: String,
			validator: v => /^(line|card)$/.test(v),
			default: 'line'
		},
		closable: {
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
		};
	},
	computed: {
		isCard() {
			return this.type === 'card';
		},
		scrollStyle() {
			let style = {};
			
			style.transform = `translate3d(${-this.scrollOffset}px, 0px, 0px)`;

			return style;
		}
	},

	methods: {
		/**
		 * 刷新当前标签底下的滑块位置
		 */
		refreshAfloat() {
			this.$nextTick(() => {
				const index = this.getTabIndex(this.currentName);
				if (this._isDestroyed) return;
				const items = this.$refs.nav.querySelectorAll(`.vc-tabs__item`);
				
				const $ = items[index];

				this.afloatWidth = $ ? parseFloat($.offsetWidth) : 0;

				let offset = 0;
				if (index > 0) {
					const gutter = 16; // margin-right -> 16px
					for (let i = 0; i < index; i++) {
						offset += parseFloat(items[i].offsetWidth) + gutter;
					}
				}

				this.afloatOffset = offset;
				this.refreshScroll();
			});
		},

		/**
		 * 刷新是否需要滚动条
		 */
		refreshScroll() {
			// 容器
			const boxWidth = this.$refs.scroll.offsetWidth;
			// 总长度
			const totalWidth = this.$refs.nav.offsetWidth;

			if (boxWidth < totalWidth) {
				this.scrollable = true;
				(totalWidth - this.scrollOffset < boxWidth) && (
					this.scrollOffset = totalWidth - boxWidth
				);
			} else {
				this.scrollable = false;
				this.scrollOffset > 0 && (this.scrollOffset = 0);
			}
		},

		scrollToActive() {
			if (!this.scrollable) return;
			const nav = this.$refs.nav;
			const scroll = this.$refs.scroll;
			// 这里不直接选择is-active,存在延迟
			const $ = this.$el.querySelector(`.vc-tabs__item[name="${this.currentName}"]`);

			if (!$) return;

			const itemBounding = $.getBoundingClientRect();
			const scrollBounding = this.$refs.scroll.getBoundingClientRect();
			const navBounding = nav.getBoundingClientRect();

			let offset;

			if (navBounding.right < scrollBounding.right) {
				offset = nav.offsetWidth - scrollBounding.width;
			}

			if (itemBounding.left < scrollBounding.left) {
				offset = this.scrollOffset - (scrollBounding.left - itemBounding.left);
			} else if (itemBounding.right > scrollBounding.right) {
				offset = this.scrollOffset + itemBounding.right - scrollBounding.right;
			}

			if (this.scrollOffset !== offset) {
				this.scrollOffset = offset;
			}
		},
		/**
		 * 上一个
		 */
		handlePrev() {
			const boxWidth = this.$refs.scroll.offsetWidth;

			if (!this.scrollOffset) return;

			this.scrollOffset = this.scrollOffset > boxWidth
				? this.scrollOffset - boxWidth
				: 0;
		},

		/**
		 * 下一个
		 */
		handleNext() {
			const boxWidth = this.$refs.scroll.offsetWidth;
			const totalWidth = this.$refs.nav.offsetWidth;

			if (totalWidth - this.scrollOffset <= boxWidth) return;

			this.scrollOffset = totalWidth - this.scrollOffset > boxWidth * 2
				? this.scrollOffset + boxWidth
				: (totalWidth - boxWidth);
		},
	},
};
</script>

<style lang="scss">
@import '../style/index.scss';

@include block(vc-tabs) {
	@include element(bar) {
		margin-bottom: 16px;
		display: flex;
		align-items: center;
		position: relative;
		// 不用添加背景色
	}
	@include element(extra) {
		float: right;
		line-height: 34px;
	}
	@include element(scroll) {
		overflow: hidden;
		white-space: nowrap;
	}
	@include element(nav) {
		position: relative;
		display: inline-block;
		transition: transform .5s ease-in-out;
	}
	
	@include element(afloat) {
		height: 2px;
		box-sizing: border-box;
		background-color: #5495f6;
		position: absolute;
		left: 0;
		bottom: 0;
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
	@include element(icon) {
		position: absolute;
		line-height: 28px;
		cursor: pointer;
		@include when(left) {
			left: 0;
		}
		@include when(right) {
			right: 0;
		}
	}

	@include when(line) {
		@include element(bar){
			@include commonBorder1PX(bottom);
		}
		@include element(item) {
			display: inline-block;
			padding: 8px 16px;
			margin-right: 16px;
			box-sizing: border-box;
			cursor: pointer;
			text-decoration: none;
			position: relative;
			transition: color .3s ease-in-out;
			@include when(active) {
				color: #5495f6;
			}
			&:hover {
				color: #5495f6;
			};
		};
	}
	@include when(card) {
		@include element(item) {
			display: inline-block;
			cursor: pointer;
			height: 32px;
			line-height: 32px;
			padding: 0 16px;
			border-bottom: 0;
			transition: all .3s ease-in-out;
			background: #fff;
			border: 1px solid #d9d9d9;
			margin-right: -1px; 
			position: relative;
			z-index: 1;
			&:first-child {
				border-radius: 4px 0 0 4px;
			}
			&:last-child {
				border-radius: 0 4px 4px 0;
				margin-right: 0; 
			}
			@include when(active) {
				color: #5495f6;
				border: 1px solid #5495f6;
				z-index: 2;
			}
			&:hover {
				color: #5495f6;
			}
		}
	}
}
</style>
