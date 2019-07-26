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
		width: {
			type: [Number, String],
			default: '70%' // card大小
		},
		gutter: {
			type: Number,
			default: 0 // card之间间距
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
			return this.$parent.type === 'card';
		},
		isMove() {
			return this.$parent.offset !== 0;
		},
		itemStyle() {
			const translateType = this.isVertical ? 'translateY' : 'translateX';
			if (this.$parent.type === 'card') {
				return {
					[TRANSFORM]: `${translateType}(${this.translate}px) scale(${this.currentScale})`,
					width: this.width
				};
			} else {
				return {
					[TRANSFORM]: `${translateType}(${this.translate}px) scale(${this.currentScale})`
				};
			}
			
		}
	},
	created() {
		this.$parent && this.$parent.updateItems();
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
					value = parentW * (1 + widthNumber * this.scale) / 2 + this.gutter;
				} else {
					value = -(parentW * ((widthNumber * this.scale - 1) / 2 + widthNumber)) - this.gutter;
					console.log(value, 'value');
				}
			} else if (index < activeIndex) {
				value = parentW * (1 - widthNumber) / 2;
			} else {
				value = parentW * (1 - widthNumber) / 2;
			}
			return value;
		},
		calcTranslate(index, activeIndex) {
			const distance = this.$parent.$el[this.isVerticl ? 'offsetHeight' : 'offsetWidth'];
			return distance * (index - activeIndex) + this.$parent.offset;
		},
		reset(index, activeIndex, oldIndex) {
			const length = this.$parent.items.length;
			if (!this.isCard && oldIndex !== undefined) {
				this.isAnimating = index === activeIndex || index === oldIndex;
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