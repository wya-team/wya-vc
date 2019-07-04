import { merge } from 'lodash';
import { compose, getUid } from '../utils/index';
import { cellStarts, cellForced, defaultRenderCell, treeCellPrefix } from './table-column-confg';
import { parseWidth, parseMinWidth } from './utils';

export default {
	name: 'vc-table-column',
	props: {
		type: {
			type: String,
			default: 'default'
		},
		label: String,
		className: String,
		labelClassName: String,
		prop: String,
		width: {},
		minWidth: {},
		renderHeader: Function,
		resizable: {
			type: Boolean,
			default: true
		},
		columnKey: String,
		align: String,
		headerAlign: String,
		showPopover: Boolean,
		fixed: [Boolean, String],
		formatter: Function,
		selectable: Function,
		reserveSelection: Boolean,
		index: [Number, Function],
	},
	data() {
		return {
			isSubColumn: false
		};
	},
	computed: {
		owner() {
			let parent = this.$parent;
			while (parent && !parent.tableId) {
				parent = parent.$parent;
			}
			return parent;
		},

		columnOrTableParent() {
			let parent = this.$parent;
			while (parent && !parent.tableId && !parent.columnId) {
				parent = parent.$parent;
			}
			return parent;
		},

		realWidth() {
			return parseWidth(this.width);
		},

		realMinWidth() {
			return parseMinWidth(this.minWidth);
		},

		realAlign() {
			return this.align 
				? 'is-' + this.align 
				: null;
		},

		realHeaderAlign() {
			return this.headerAlign 
				? 'is-' + this.headerAlign 
				: this.realAlign;
		}
	},
	created() {
		const parent = this.columnOrTableParent;

		const { type = 'default' } = this;

		this.isSubColumn = this.owner !== parent;
		this.columnId = (parent.tableId || parent.columnId) + getUid('column', { prefix: '' });

		const defaults = {
			...cellStarts[type],
			type,
			id: this.columnId,
			prop: this.prop,
			align: this.realAlign,
			headerAlign: this.realHeaderAlign,
			showPopover: this.showPopover,
			// index 列
			index: this.index
		};

		const basicProps = ['columnKey', 'label', 'className', 'labelClassName', 'type', 'renderHeader', 'resizable', 'formatter', 'fixed', 'resizable']; // eslint-disable-line
		const selectProps = ['selectable', 'reserveSelection'];

		let column = this.getPropsData(basicProps, selectProps);

		column = merge(defaults, column);

		// 注意 compose 中函数执行的顺序是从右到左
		column = compose(
			this.setColumnRenders, 
			this.setColumnWidth, 
			this.setColumnForcedProps
		)(column);

		this.columnConfig = column;

		// 注册 watcher
		this.registerNormalWatchers();
		this.registerComplexWatchers();
	},
	mounted() {
		const owner = this.owner;
		const parent = this.columnOrTableParent;
		let children = this.isSubColumn 
			? parent.$el.children 
			: parent.$refs.hiddenColumns.children;
		
		if (!this.isSubColumn 
			&& children.length === 1 
			&& /vc-table-item/.test(children[0].className)
		) {
			children = children[0].children;
		}
		// DOM上
		let columnIndex = [...children].indexOf(this.$el);

		owner.store.commit(
			'insertColumn', 
			this.columnConfig, 
			columnIndex, 
			this.isSubColumn && parent.columnConfig
		);
	},
	destroyed() {
		if (!this.$parent) return;
		const parent = this.$parent;
		this.owner.store.commit(
			'removeColumn', 
			this.columnConfig, 
			this.isSubColumn && parent.columnConfig
		);
	},
	methods: {
		/**
		 * 获取当前值情况，this[key]
		 */
		getPropsData(...props) {
			let result = props.reduce((prev, cur) => {
				if (Array.isArray(cur)) {
					cur.forEach((key) => {
						prev[key] = this[key];
					});
				}
				return prev;
			}, {});

			return result;
		},

		/**
		 * compose 1
		 * 对于特定类型的 column，某些属性不允许设置
		 * 如 type: selection | index | expand
		 */
		setColumnForcedProps(column) {
			const type = column.type;
			const source = cellForced[type] || {};
			Object.keys(source).forEach(prop => {
				let value = source[prop];
				if (value !== undefined) {
					column[prop] = prop === 'className' 
						? `${column[prop]} ${value}` 
						: value;
				}
			});
			return column;
		},

		/**
		 * compose 2
		 * column
		 * 	 -> width
		 * 	 -> minWidth
		 */
		setColumnWidth(column) {
			if (this.realWidth) {
				column.width = this.realWidth;
			}
			if (this.realMinWidth) {
				column.minWidth = this.realMinWidth;
			}
			if (!column.minWidth) {
				column.minWidth = 80;
			}
			column.realWidth = column.width === undefined 
				? column.minWidth 
				: column.width;
			return column;
		},

		/**
		 * compose 3
		 * column
		 *   -> renderHeader: 渲染头部
		 *   -> renderCell: 渲染单元格
		 * owner
		 * 	 -> renderExpanded: 展开
		 */
		setColumnRenders(column) {
			const specialTypes = Object.keys(cellForced);
			// renderHeader 属性不推荐使用。
			if (this.renderHeader) {
				column.renderHeader = this.renderHeader;
			} else if (specialTypes.indexOf(column.type) === -1) {
				column.renderHeader = (h, scope) => {
					const renderHeader = this.$scopedSlots.header;
					return renderHeader 
						? renderHeader(scope) 
						: column.label;
				};
			}

			let originRenderCell = column.renderCell;
			// TODO: 这里的实现调整
			if (column.type === 'expand') {
				// 对于展开行，renderCell 不允许配置的。在上一步中已经设置过，这里需要简单封装一下。
				column.renderCell = (h, data) => (
					<div class="vc-table__cell">
						{ originRenderCell(h, data) }
					</div>
				);
				this.owner.renderExpanded = (h, data) => {
					return this.$scopedSlots.default
						? this.$scopedSlots.default(data)
						: this.$slots.default;
				};
			} else {
				originRenderCell = originRenderCell || defaultRenderCell;
				// 对 renderCell 进行包装
				column.renderCell = (h, data) => {
					let children = null;
					if (this.$scopedSlots.default) {
						children = this.$scopedSlots.default(data);
					} else {
						children = originRenderCell(h, data);
					}
					const prefix = treeCellPrefix(h, data);
					const props = {
						class: 'vc-table__cell',
						style: {}
					};
					if (column.showPopover) {
						props.class += ' vc-popover';
						props.style = { 
							width: (data.column.realWidth || data.column.width) - 1 + 'px' 
						};
					}
					return (
						<div {...props}>
							{prefix}
							{children}
						</div>
					);
				};
			}
			return column;
		},

		registerNormalWatchers() {
			const props = ['label', 'index', 'formatter', 'className', 'labelClassName'];
			// 一些属性具有别名
			const aliases = {
				prop: 'prop',
				realAlign: 'align',
				realHeaderAlign: 'headerAlign',
				realWidth: 'width'
			};
			const allAliases = props.reduce((prev, cur) => {
				prev[cur] = cur;
				return prev;
			}, aliases);

			Object.keys(allAliases).forEach(key => {
				const columnKey = aliases[key];

				this.$watch(key, (v) => {
					this.columnConfig[columnKey] = v;
				});
			});
		},

		registerComplexWatchers() {
			const props = ['fixed'];
			const aliases = {
				realWidth: 'width',
				realMinWidth: 'minWidth'
			};
			const allAliases = props.reduce((prev, cur) => {
				prev[cur] = cur;
				return prev;
			}, aliases);

			Object.keys(allAliases).forEach(key => {
				const columnKey = aliases[key];

				this.$watch(key, (v) => {
					this.columnConfig[columnKey] = v;
					this.owner.store.scheduleLayout(columnKey === 'fixed');
				});
			});
		}
	},

	/**
	 * slots 也要渲染，需要计算合并表头
	 */
	render(h) {
		return h('div', this.$slots.default);
	}
};
