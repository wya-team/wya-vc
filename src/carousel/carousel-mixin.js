import { VcError } from '../vc/index';
import { Resize } from '../utils';

export default {
	props: {
		t: {
			type: Number,
			default: 3
		},
		card: Boolean,
		gutter: {
			type: Number,
			default: 0
		},
		height: [String, Number],
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
			type: [String, Boolean],
			default: 'bottom' // bottom/outside | false
		},
		arrow: {
			type: [String, Boolean],
			default: 'hover' // hover/always | false
		},
		loop: {
			type: Boolean,
			default: true
		},
		vertical: {
			type: Boolean,
			default: false
		},
		draggable: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			items: [],
			activeIndex: -1,
			timer: null,
			offset: 0,
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
			if (this.dots === 'outside' || this.card) {
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
			this.resetItems(oldV);
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
			this.startTimer();
		}
	},
	created() {
		// 主要给slide滑动时1和-1添加转场动画
		this.allowTransition = false;
	},
	mounted() {
		this.updateItems();
		this.$nextTick(() => {
			Resize.on(this.$el, this.resetItems);
			if (this.initialIndex < this.items.length && this.initialIndex >= 0) {
				this.activeIndex = this.initialIndex;
			}
			this.startTimer();
		});
	},
	beforeDestroy() {
		if (this.$el) Resize.off(this.$el, this.resetItems);
		this.pauseTimer();
		this.startTimer();
	},
	methods: {
		updateItems() {
			this.items = this.$children.filter(
				child => /^vcm?-carousel-item$/.test(child.$options.name)
			);
		},

		resetItems(oldIndex) {
			this.items.forEach((item, index) => {
				item.reset(index, this.activeIndex, oldIndex);
			});
		},

		playSlides() {
			this.allowTransition = true;
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
				throw new VcError('carousel', '索引必须是整数');
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
				this.resetItems(oldIndex);
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

		handleStart(e) {
			this.allowTransition = true;

			if (!this.draggable) return;
			this.pauseTimer();

			this.start = true;
			this.startX = e.screenX;
			this.startY = e.screenY;
		},

		handleMove(e) {
			if (!this.start || !this.draggable) return;
			this.offset = !this.vertical 
				? (e.screenX - this.startX) 
				: (e.screenY - this.startY);

			this.resetItems();
		},

		handleEnd() {
			if (!this.draggable) return;

			this.start = false;
			this.startTimer();
			const offset = Math.abs(this.offset);
			const direction = this.offset > 0;
			this.offset = 0;
			if (offset > 5) {
				direction && this.prev();
				!direction && this.next();
			} else {
				this.resetItems();
			}
		},
	},
};