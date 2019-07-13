import { autoprefixer } from '../utils';
import { VcError } from '../vc/index';

const CARD_SCALE = 0.83;
export default {
	name: 'vc-carousel-item',
	props: {
		name: String,
		label: {
			type: [String, Number],
			default: ''
		}
	},
	data() {
		return {
			translate: 0,
			scale: 1,
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
			const value = `${translateType}(${this.translate}px) scale(${this.scale})`;
			const style = {
				transform: value
			};
			return autoprefixer(style);
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
			const parentWidth = this.$parent.$el.offsetWidth;
			if (this.isInStage) {
				return parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1) / 4;
			} else if (index < activeIndex) {
				return -(1 + CARD_SCALE) * parentWidth / 4;
			} else {
				return (3 + CARD_SCALE) * parentWidth / 4;
			}
		},
		calcTranslate(index, activeIndex) {
			const distance = this.$parent.$el[this.isVertical ? 'offsetHeight' : 'offsetWidth'];
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
				this.scale = this.isActive ? 1 : CARD_SCALE;
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