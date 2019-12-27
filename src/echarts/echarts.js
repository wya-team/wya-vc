import { debounce } from 'lodash';
import { addListener, removeListener } from 'resize-detector';
import { EVENTS } from './constants';

export default {
	name: "vc-echarts",
	props: {
		styles: {
			type: Object,
			required: false,
			default: () => ({
				width: '100%',
				height: '100%'
			})
		},
		options: Object,
		theme: [String, Object],
		initOptions: Object,
		group: String,
		autoResize: Boolean,
		watchShallow: Boolean,
		manualUpdate: Boolean
	},
	data() {
		return {
			lastArea: 0
		};
	},
	watch: {
		group(group) {
			this.chart.group = group;
		}
	},
	created() {
		if (!this.manualUpdate) {
			this.$watch('options', (val, oldVal) => {
				if (!this.chart && val) {
					this.init();
				} else {
					// mutating `options` will lead to merging
					// replacing it with new reference will lead to not merging
					// eg.
					// `this.options = Object.assign({}, this.options, { ... })`
					// will trigger `this.chart.setOption(val, true)
					// `this.options.title.text = 'Trends'`
					// will trigger `this.chart.setOption(val, false)`
					this.chart.setOption(val, val !== oldVal);
				}
			}, { deep: !this.watchShallow });
		}
		let watched = ['theme', 'initOptions', 'autoResize', 'manualUpdate', 'watchShallow'];
		watched.forEach(prop => {
			this.$watch(prop, () => {
				this.refresh();
			}, { deep: true });
		});
	},
	async mounted() {
		// auto init if `options` is already provided
		if (this.options) {
			let echarts = await import('echarts');
			// 兼容webpack 3.0/4.0 写法
			this.echartsInstance = echarts.default ? echarts.default : echarts;

			this.init();
		}
	},
	activated() {
		if (this.autoResize) {
			this.chart && this.chart.resize();
		}
	},
	beforeDestroy() {
		if (!this.chart) {
			return;
		}
		this.destroy();
	},
	connect(group) {
		if (typeof group !== 'string') {
			group = group.map(chart => chart.chart);
		}
		this.echartsInstance.connect(group);
	},
	disconnect(group) {
		this.echartsInstance.disConnect(group);
	},
	registerMap(mapName, geoJSON, specialAreas) {
		this.echartsInstance.registerMap(mapName, geoJSON, specialAreas);
	},
	registerTheme(name, theme) {
		this.echartsInstance.registerTheme(name, theme);
	},
	methods: {
		// provide a explicit merge option method
		mergeOptions(options, notMerge, lazyUpdate) {
			if (this.manualUpdate) {
				this.manualOptions = options;
			}
			if (!this.chart) {
				this.init();
			} else {
				this.delegateMethod('setOption', options, notMerge, lazyUpdate);
			}
		},
		// just delegates ECharts methods to Vue component
		// use explicit params to reduce transpiled size for now
		appendData(params) {
			this.delegateMethod('appendData', params);
		},
		resize(options) {
			this.delegateMethod('resize', options);
		},
		dispatchAction(payload) {
			this.delegateMethod('dispatchAction', payload);
		},
		convertToPixel(finder, value) {
			return this.delegateMethod('convertToPixel', finder, value);
		},
		convertFromPixel(finder, value) {
			return this.delegateMethod('convertFromPixel', finder, value);
		},
		containPixel(finder, value) {
			return this.delegateMethod('containPixel', finder, value);
		},
		showLoading(type, options) {
			this.delegateMethod('showLoading', type, options);
		},
		hideLoading() {
			this.delegateMethod('hideLoading');
		},
		getDataURL(options) {
			return this.delegateMethod('getDataURL', options);
		},
		getConnectedDataURL(options) {
			return this.delegateMethod('getConnectedDataURL', options);
		},
		clear() {
			this.delegateMethod('clear');
		},
		dispose() {
			this.delegateMethod('dispose');
		},
		delegateMethod(name, ...args) {
			if (!this.chart) {
				this.init();
			}
			return this.chart[name](...args);
		},
		delegateGet(name, method) {
			if (!this.chart) {
				this.init();
			}
			return this.chart[method]();
		},
		getArea() {
			return this.$el.offsetWidth * this.$el.offsetHeight;
		},
		init() {
			if (this.chart || !this.echartsInstance) {
				return;
			}
			// this.echartsInstance = await import("echarts");
			// console.log(this.echartsInstance);
			let chart = this.echartsInstance.init(this.$el, this.theme, this.initOptions);
			if (this.group) {
				chart.group = this.group;
			}
			chart.setOption(this.manualOptions || this.options || {}, true);
			// expose ECharts events as custom events
			EVENTS.forEach(event => {
				chart.on(event, params => {
					this.$emit(event, params);
				});
			});
			if (this.autoResize) {
				this.lastArea = this.getArea();
				this.__resizeHandler = debounce(() => {
					if (this.lastArea === 0) {
						// emulate initial render for initially hidden charts
						this.mergeOptions({}, true);
						this.resize();
						this.mergeOptions(this.options || this.manualOptions || {}, true);
					} else {
						this.resize();
					}
					this.lastArea = this.getArea();
				}, 100, { leading: true });
				addListener(this.$el, this.__resizeHandler);
			}
			Object.defineProperties(this, {
				// Only recalculated when accessed from JavaScript.
				// Won't update DOM on value change because getters
				// don't depend on reactive values
				width: {
					configurable: true,
					get: () => {
						return this.delegateGet('width', 'getWidth');
					}
				},
				height: {
					configurable: true,
					get: () => {
						return this.delegateGet('height', 'getHeight');
					}
				},
				isDisposed: {
					configurable: true,
					get: () => {
						return !!this.delegateGet('isDisposed', 'isDisposed');
					}
				},
				computedOptions: {
					configurable: true,
					get: () => {
						return this.delegateGet('computedOptions', 'getOption');
					}
				}
			});
			this.chart = chart;
		},
		destroy() {
			if (this.autoResize) {
				removeListener(this.$el, this.__resizeHandler);
			}
			this.dispose();
			this.chart = null;
		},
		refresh() {
			if (this.chart) {
				this.destroy();
				this.init();
			}
		}
	},
	
	render(h) {
		let { styles } = this;
		return h('div', {
			class: 'vc-echarts',
			style: styles
		}, this.$slots.default);
	},
};