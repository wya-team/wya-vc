<template>
	<div :class="classes" class="vc-tabs">
		<div class="vc-tabs__extra">
			<slot name="extra" />
		</div>
		<div ref="wrapper" :style="{ padding: scrollable && '0 12px' }" class="vc-tabs__bar">

			<vc-icon v-if="scrollable" class="vc-tabs__icon is-left" type="left" @click="handlePrev"/>
			<vc-icon v-if="scrollable" class="vc-tabs__icon is-right" type="right" @click="handleNext"/>

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
						<vc-icon v-if="item.icon" :type="item.icon" />
						<span>{{ item.label }}</span>
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
import Emitter from '../extends/mixins/emitter';
import { Resize } from '../utils/index';
import Icon from '../icon';

export default {
	name: 'vc-tabs',
	components: {
		'vc-icon': Icon
	},
	mixins: [Emitter],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: {
			type: [String, Number]
		},
		type: {
			type: String,
			validator: v => /^(line|card)$/.test(v),
			default: 'line'
		},
		animated: {
			type: Boolean,
			default: false
		},
		closable: {
			type: Boolean,
			default: false
		},

		// TODO: 考虑tabs有且只有一个存在或者让用户自行处理
		alone: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			// tabs-children数据
			list: [],

			// tabs-nav-item底部宽度，偏移值
			afloatWidth: 0,
			afloatOffset: 0,

			// tabs-nav滚动偏移值
			scrollOffset: 0,

			// 当前的active
			currentName: undefined,

			// 可滚动
			scrollable: false
		};
	},
	computed: {
		isCard() {
			return this.type === 'card';
		},
		afloatStyle() {
			let style = {
				width: `${this.afloatWidth}px`
			};

			style.transform = `translate3d(${this.afloatOffset}px, 0px, 0px)`;

			return style;
		},
		contentStyle() {
			const index = this.getTabIndex(this.currentName);
			const precent = index === 0 ? '0%' : `-${index}00%`;

			let style = {};
			if (index > -1) {
				style.transform = `translate3d(${precent}, 0px, 0px)`;
			}
			return style;
		},
		scrollStyle() {
			let style = {};
			
			style.transform = `translate3d(${-this.scrollOffset}px, 0px, 0px)`;

			return style;
		},
		classes() {
			return { 
				'is-animated': this.animated, 
				[`is-${this.type}`]: true 
			};
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(v) {
				this.currentName = v;
			}
		},
		currentName(val) {
			this.refreshAfloat();
			this.scrollToActive();
		}
	},
	created() {
		// 正在切换
		this.timer = false;
	},
	mounted() {
		Resize.on(this.$refs.wrapper, this.handleResize);
	},
	destoryed() {
		Resize.off(this.$refs.wrapper, this.handleResize);
		clearTimeout(this.timer);
	},

	methods: {
		/**
		 * TODO: this.$children 可能会存在排序问题
		 */
		getTabs() {
			return this.$children.filter(item => item.$options.name === 'vc-tabs-pane');
		},

		getTabIndex(name) {
			return this.list.findIndex(nav => nav.name === name);
		},

		/**
		 * 下层值变化：刷新tabs
		 */
		refresh() {
			const tabs = this.getTabs();

			this.list = [];
			tabs.forEach((item, index) => {
				const data = {
					label: item.label,
					icon: item.icon || '',
					name: item.name || index,
					disabled: item.disabled,
					closable: item.closable
				};
				this.list.push(data);

				!item.currentName && (
					item.currentName = index
				);
				index === 0 && !this.currentName && (
					this.currentName = item.currentName || index
				);
			});

			this.refreshAfloat();
		},

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

				if (index > 0) {
					let offset = 0;
					const gutter = 16; // margin-right -> 16px
					for (let i = 0; i < index; i++) {
						offset += parseFloat(items[i].offsetWidth) + gutter;
					}

					this.afloatOffset = offset;
				} else {
					this.afloatOffset = 0;
				}

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


		handleChange(index) {
			if (this.timer) return;

			this.timer = setTimeout(() => this.timer = null, 300);

			const nav = this.list[index];
			if (nav.disabled) return;
			this.currentName = nav.name;
			this.$emit('change', nav.name);
			this.$emit('click', nav.name);
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

		handleResize() {
			if (this._isDestroyed) return;
			this.refreshScroll();
		}
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
		background-color: #2d8cf0;
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
		};
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
				color: #2d8cf0;
			}
		};
	}
	@include when(card) {
		@include element(item) {
			display: inline-block;
			height: 32px;
			line-height: 32px;
			padding: 0 16px;
			border-bottom: 0;
			transition: all .3s ease-in-out;
			background: #fff;
			border: 1px solid #dcdee2;
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
				color: #2d8cf0;
				border: 1px solid #2d8cf0;
				z-index: 2;
			}
		}
	}
}
</style>
