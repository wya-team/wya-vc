import { VcError } from '../vc/index';
import { Resize } from '../utils';

export default {
	props: {
		t: {
			type: Number,
			default: 3
		},
		type: String,
		height: Number | String,
		initialIndex: {
			type: Number,
			default: 0
		},
		trigger: {
			type: String,
			default: 'hover'
		},
		autoplay: {
			type: Boolean,
			default: true
		},
		dots: {
			type: String | Boolean,
			default: 'bottom' // bottom/outside | false
		},
		arrow: {
			type: String | Boolean,
			default: 'hover' // hover/always | false
		},
		loop: {
			type: Boolean,
			default: true
		},
		vertical: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			items: [],
			activeIndex: -1,
			timer: null,
			isHover: false
		};
	},
	computed: {
		direction() {
			return this.vertical ? 'vertical' : 'horizontal';
		},

		hasLabel() {
			return this.items.some(item => item.label.toString().length > 0);
		},

		dotsClasses() {
			const classes = ['is-' + this.direction];
			if (this.hasLabel) {
				classes.push('is-labels');
			}
			if (this.dots === 'outside' || this.type === 'card') {
				classes.push('is-outside');
			}
			return classes;
		}
	},
	watch: {
		items(v) {
			if (v.length > 0) this.setActiveItem(this.initialIndex);
		},

		activeIndex(v, oldV) {
			this.resetItemPosition(oldV);
			this.$emit('change', v, oldV);
		},

		autoplay(v) {
			v ? this.startTimer() : this.pauseTimer();
		},

		loop() {
			this.setActiveItem(this.activeIndex);
		},
		t() {
			this.pauseTimer();
		}
	},
	
	mounted() {
		this.updateItems();
		this.$nextTick(() => {
			Resize.on(this.$el, this.resetItemPosition);
			if (this.initialIndex < this.items.length && this.initialIndex >= 0) {
				this.activeIndex = this.initialIndex;
			}
			this.startTimer();
		});
	},
	beforeDestroy() {
		if (this.$el) Resize.off(this.$el, this.resetItemPosition);
		this.pauseTimer();
		this.startTimer();
	},
	methods: {
		updateItems() {
			this.items = this.$children.filter(
				child => /^vcm?-carousel-item$/.test(child.$options.name)
			);
		},

		resetItemPosition(oldIndex) {
			this.items.forEach((item, index) => {
				item.translateItem(index, this.activeIndex, oldIndex);
			});
		},

		playSlides() {
			if (this.activeIndex < this.items.length - 1) {
				this.activeIndex++;
			} else if (this.loop) {
				this.activeIndex = 0;
			}
		},

		pauseTimer() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},

		startTimer() {
			if (this.t <= 0 || !this.autoplay || this.timer) return;
			this.timer = setInterval(this.playSlides, this.t * 1000);
		},

		setActiveItem(index) {
			if (typeof index === 'string') {
				const filteredItems = this.items.filter(item => item.name === index);
				if (filteredItems.length > 0) {
					index = this.items.indexOf(filteredItems[0]);
				}
			}
			index = Number(index);
			if (isNaN(index) || index !== Math.floor(index)) {
				throw new VcError('carousel', 'index must be an integer.');
			}
			let length = this.items.length;
			const oldIndex = this.activeIndex;
			if (index < 0) {
				this.activeIndex = this.loop ? length - 1 : 0;
			} else if (index >= length) {
				this.activeIndex = this.loop ? 0 : length - 1;
			} else {
				this.activeIndex = index;
			}
			if (oldIndex === this.activeIndex) {
				this.resetItemPosition(oldIndex);
			}
		},

		prev() {
			this.setActiveItem(this.activeIndex - 1);
		},

		next() {
			this.setActiveItem(this.activeIndex + 1);
		},

		handleDotClick(index) {
			this.activeIndex = index;
		},
	},
};