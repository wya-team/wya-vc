export default {
	inheritAttrs: false,
	props: {
		/**
		 * 进入/离开持续时间
		 * {enter: 300, leave: 300}
		 */
		duration: {
			type: [Number, Object],
			default: 300
		},
		/**
		 * 进入/离开延迟时间
		 */
		delay: {
			type: [Number, Object],
			default: 0
		},
		/**
		 * `transition-group` component.
		 */
		group: Boolean,
		/**
		 * `transition-group` tag
		 */
		tag: {
			type: String,
			default: 'span'
		},
		/**
		 *  变换的初始位置, 可以用style代替, 更短~~
		 */
		origin: {
			type: String,
			default: ''
		},
		/**
		 * 在转换期间应用的元素样式。这些样式应用于@beforeEnter和@beforeLeave钩子
		 */
		styles: {
			type: Object,
			default: () => {
				return {
					animationFillMode: 'both',
					animationTimingFunction: 'ease-out'
				};
			}
		}
	},
	computed: {
		componentType() {
			return this.group ? 'transition-group' : 'transition';
		},
		hooks() {
			return {
				...this.$listeners,
				beforeEnter: this.handleBeforeEnter,
				afterEnter: this.handleAfterEnter,
				beforeLeave: this.handleBeforeLeave,
				leave: this.handleLeave,
				afterLeave: this.handleAfterLeave,
			};
		}
	},
	methods: {
		/**
		 * hooks
		 */
		handleBeforeEnter(el) {
			let duration = this.duration.enter || this.duration;
			el.style.animationDuration = `${duration}ms`;

			let delay = this.delay.enter || this.delay;
			el.style.animationDelay = `${delay}ms`;

			this.resetStyles(el);
			this.$emit('before-enter', el);
		},
		handleAfterEnter(el) {
			this.clearStyles(el);
			this.$emit('after-enter', el);
		},
		handleBeforeLeave(el) {
			let duration = this.duration.leave || this.duration;
			el.style.animationDuration = `${duration}ms`;

			let delay = this.delay.leave || this.delay;
			el.style.animationDelay = `${delay}ms`;

			this.resetStyles(el);
			this.$emit('before-leave', el);
		},
		handleLeave(el, done) {
			this.resetAbsolute(el);
			this.$emit('leave', el, done);
		},
		handleAfterLeave(el) {
			this.clearStyles(el);
			this.$emit('after-leave', el);
		},
		clearStyles(el) {
			Object.keys(this.styles).forEach(key => {
				const v = this.styles[key];
				v && el.style.removeProperty(
					key.replace(/([A-Z])/g, "-$1").toLowerCase()
				);
			});
			
			el.style.removeProperty("animation-duration");
			el.style.removeProperty("animation-delay");
		},
		resetStyles(el) {
			this.resetOrigin(el);

			Object.keys(this.styles).forEach(key => {
				const v = this.styles[key];
				v && (el.style[key] = v);
			});
		},
		resetAbsolute(el) {
			this.group && (el.style.position = 'absolute');

			return this;
		},
		resetOrigin(el) {
			this.origin && (el.style.transformOrigin = this.origin);

			return this;
		}
	}
};