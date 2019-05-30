import { Resize } from '../utils/index';

export default {
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: {
			type: [String, Number]
		},
		animated: {
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
			// tabs-children数据
			list: [],

			// tabs-nav-item底部宽度，偏移值
			afloatWidth: 0,
			afloatOffset: 0,

			// 当前的active
			currentName: undefined,

			// tabs-nav滚动偏移值
			scrollOffset: 0,
			// 可滚动
			scrollable: false
		};
	},
	computed: {
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
		classes() {
			return { 
				'is-animated': this.animated, 
				[`is-${this.type}`]: !!this.type,
				[`is-${this.theme}`]: !!this.theme,
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
			this.refreshAfloat && this.refreshAfloat();
			this.scrollToActive && this.scrollToActive();
		}
	},
	created() {
		// 正在切换
		this.timer = null;
	},
	mounted() {
		Resize.on(this.$refs.wrapper, this.handleResize);
		this.scrollToActive && this.scrollToActive();
	},
	destoryed() {
		Resize.off(this.$refs.wrapper, this.handleResize);
		this.timer && clearTimeout(this.timer);
	},
	methods: {
		/**
		 * TODO: this.$children 可能会存在排序问题
		 */
		getTabs() {
			return this.$children.filter(item => /^vcm?-tabs-pane$/.test(item.$options.name));
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

			this.refreshAfloat && this.refreshAfloat();
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

		handleResize() {
			if (this._isDestroyed) return;
			this.refreshScroll && this.refreshScroll();
			this.refreshAfloat && this.refreshAfloat();
		}
	},
};

