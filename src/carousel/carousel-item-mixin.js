import { TRANSFORM } from '../utils';
import { VcError } from '../vc/index';

export default {
	name: 'vc-carousel-item',
	props: {
		name: String,
		label: {
			type: [String, Number],
			default: ''
		},

		// card大小
		width: {
			type: [Number, String],
			default: '70%'
		},

		// card之间间距, 或者滑动时候的间距
		gutter: {
			type: Number,
			default: 0
		},
		scale: {
			type: Number,
			default: 0.83
		} // card缩放
	},
	data() {
		return {
			translate: 0,
			currentScale: 1,
			isHover: false,
			isActive: false,
			isReady: false,
			isInStage: false,
			isAnimating: false
		};
	},
	computed: {
		isVertical() {
			return this.$parent.vertical;
		},
		isCard() {
			return this.$parent.card;
		},
		isMove() {
			return this.$parent.offset !== 0;
		},
		itemGutter() {
			return this.gutter || this.$parent.gutter || 0;
		},

		itemStyle() {
			const translateType = this.isVertical ? 'translateY' : 'translateX';
			if (this.$parent.card) {
				return {
					[TRANSFORM]: `${translateType}(${this.translate}px) scale(${this.currentScale})`,
					width: this.width
				};
			} else {
				// 只有当设置了gutter, width才能生效
				return {
					[TRANSFORM]: `${translateType}(${this.translate}px) scale(${this.currentScale})`,
					width: this.itemGutter ? this.width : '100%'
				};
			}
			
		}
	},
	created() {
		this.$parent && this.$parent.updateItems();

		// 检查语法
		if (
			!this.isCard 
			&& this.itemGutter 
			&& this.$parent.loop
		) {
			throw new VcError('carousel', 'slide模式下loop不能为true');
		}

	},
	destroyed() {
		this.$parent && this.$parent.updateItems();
	},
	methods: {
		processIndex(index, activeIndex, length) {
			if (activeIndex === 0 && index === length - 1) {
				return -1;
			} else if (activeIndex === length - 1 && index === 0) {
				return length;
			} else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
				return length + 1;
			} else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
				return -2;
			}
			return index;
		},
		calcCardTranslate(index, activeIndex) {
			let value;
			let widthNumber = parseFloat(this.width) / 100;
			const parentW = this.$parent.$el.offsetWidth;
			// 修改了计算公式
			if (this.isInStage) {
				if (index === activeIndex) {
					value = parentW * (1 - widthNumber) / 2;
				} else if (index > activeIndex) {
					value = parentW * (1 + widthNumber * this.scale) / 2 + this.itemGutter;
				} else {
					value = -(parentW * ((widthNumber * this.scale - 1) / 2 + widthNumber)) - this.itemGutter;
				}
			} else if (index < activeIndex) {
				value = parentW * (1 - widthNumber) / 2;
			} else {
				value = parentW * (1 - widthNumber) / 2;
			}
			return value;
		},

		calcSlideOffset(index, activeIndex, wrapperWidth) {
			const { length } = this.$parent.items;
			const offset = wrapperWidth - this.$el.offsetWidth;
			const gutter = this.itemGutter; 

			if (!gutter || this.isVertical) return 0;
			
			let slideOffset = 0;
			// 头
			if (activeIndex == 0) {
				if (index - activeIndex === 0) {
					slideOffset = gutter;
				} else if (index - activeIndex === 1) {
					slideOffset = -offset + gutter * 2;
				}
			}

			// 中
			if (activeIndex !== 0 && activeIndex != length - 1) {
				if (index - activeIndex === 0) {
					slideOffset = offset / 2;
				} else if (index - activeIndex === 1) {
					slideOffset = -(offset / 2 - gutter);
				} else if (index - activeIndex === -1) {
					slideOffset = offset + (offset / 2) - gutter;
				}
			}

			// 尾
			if (activeIndex == length - 1) {
				if (index - activeIndex === 0) {
					slideOffset = offset - gutter;
				} else if (index - activeIndex === -1) {
					slideOffset = offset * 2 - gutter * 2;
				}
			}

			return slideOffset;
		},

		calcTranslate(index, activeIndex) {
			const distance = this.$parent.$el[this.isVerticl ? 'offsetHeight' : 'offsetWidth'];
			const slideOffset = this.calcSlideOffset(index, activeIndex, distance);

			return distance * (index - activeIndex) + this.$parent.offset + slideOffset;
		},

		reset(index, activeIndex, oldIndex) {
			const { length } = this.$parent.items;
			if (
				this.$parent.allowTransition 
				&& !this.isCard 
				&& oldIndex !== undefined
			) {
				this.isAnimating = index === activeIndex || index === oldIndex;
				// 如果有边距且没有设置动画，前后需要添加动画
				if (!this.isVertical
					&& !this.isAnimating 
					&& this.itemGutter
					&& (index - activeIndex === 1 || index - activeIndex === -1)
				) {
					this.isAnimating = true;
				}
			}
			if (index !== activeIndex && length > 2 && this.$parent.loop) {
				index = this.processIndex(index, activeIndex, length);
			}
			if (this.isCard) {
				if (this.isVertical) {
					throw new VcError('carousel', '卡片模式不支持垂直方向');
				}
				this.isInStage = Math.round(Math.abs(index - activeIndex)) <= 1;
				this.isActive = index === activeIndex;
				this.translate = this.calcCardTranslate(index, activeIndex);
				this.currentScale = this.isActive ? 1 : this.scale;
			} else {
				this.isActive = index === activeIndex;
				this.translate = this.calcTranslate(index, activeIndex);
			}
			this.isReady = true;
		},
		handleItemClick() {
			if (this.$parent && this.isCard) {
				const index = this.$parent.items.indexOf(this);
				this.$parent.setActiveItem(index);
			}
		}
	},
};