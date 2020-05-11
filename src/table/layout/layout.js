import Vue from 'vue';
import { Utils } from '@wya/utils';
import { parseHeight } from '../utils';
import { IS_SERVER } from '../../utils/constant';
import { VcError } from '../../vc';

let scrollBarWidth;
/**
 * TODO: 抽离
 */
const getScrollBarWidth = () => {
	// 注: 服务端渲染为0, 在客服端激活前，展示端存在问题【高度不定】
	if (IS_SERVER) return 0;
	if (scrollBarWidth !== undefined) return scrollBarWidth;

	const outer = document.createElement('div');
	outer.className = 'vc-scrollbar__wrap';
	outer.style.visibility = 'hidden';
	outer.style.width = '100px';
	outer.style.position = 'absolute';
	outer.style.top = '-9999px';
	document.body.appendChild(outer);

	const widthNoScroll = outer.offsetWidth;
	outer.style.overflow = 'scroll';

	const inner = document.createElement('div');
	inner.style.width = '100%';
	outer.appendChild(inner);

	const widthWithScroll = inner.offsetWidth;
	outer.parentNode.removeChild(outer);
	scrollBarWidth = widthNoScroll - widthWithScroll;

	return scrollBarWidth;
};

class TableLayout {
	constructor(options) {
		this.observers = [];
		this.table = null;
		this.store = null;
		this.columns = null;
		this.fit = true;
		this.showHeader = true;

		this.height = null;
		this.scrollX = false;
		this.scrollY = false;
		this.bodyWidth = null;
		this.fixedWidth = null;
		this.rightFixedWidth = null;
		this.tableHeight = null;
		this.headerHeight = 44; // Table Header Height
		this.appendHeight = 0; // Append Slot Height
		this.footerHeight = 44; // Table Footer Height
		this.viewportHeight = null; // Table Height - Scroll Bar Height
		this.bodyHeight = null; // Table Height - Table Header Height
		this.fixedBodyHeight = null; // Table Height - Table Header Height - Scroll Bar Height
		this.gutterWidth = getScrollBarWidth();

		for (let name in options) {
			if (Utils.hasOwn(options, name)) {
				this[name] = options[name];
			}
		}

		if (!this.table) {
			throw new VcError('table', 'Table Layout 必须包含table实例');
		}
		if (!this.store) {
			throw new VcError('table', 'Table Layout 必须包含store实例');
		}
	}

	updateScrollY() {
		const height = this.height;
		if (height === null) return;
		const bodyWrapper = this.table.bodyWrapper;
		if (this.table.$el && bodyWrapper) {
			const body = bodyWrapper.querySelector('.vc-table__body');
			this.scrollY = body.offsetHeight > this.bodyHeight;
		}
	}

	setHeight(value, prop = 'height') {
		if (Vue.prototype.$isServer) return;
		const el = this.table.$el;
		value = parseHeight(value);
		this.height = value;

		if (!el && (value || value === 0)) return Vue.nextTick(() => this.setHeight(value, prop));

		if (value) {
			el.style[prop] = `${value}px`;
			this.updateElsHeight();
		}
	}

	setMaxHeight(value) {
		this.setHeight(value, 'max-height');
	}

	getFlattenColumns() {
		const flattenColumns = [];
		const columns = this.table.columns;
		columns.forEach((column) => {
			if (column.isColumnGroup) {
				flattenColumns.push(...column.columns);
			} else {
				flattenColumns.push(column);
			}
		});

		return flattenColumns;
	}

	updateElsHeight() {
		if (!this.table.$ready) return Vue.nextTick(() => this.updateElsHeight());
		const { headerWrapper, appendWrapper, footerWrapper } = this.table.$refs;
		this.appendHeight = appendWrapper ? appendWrapper.offsetHeight : 0;

		if (this.showHeader && !headerWrapper) return;
		const headerHeight = !this.showHeader ? 0 : headerWrapper.offsetHeight;
		this.headerHeight = headerHeight;
		if (this.showHeader && headerWrapper.offsetWidth > 0 && (this.table.columns || []).length > 0 && headerHeight < 2) {
			return Vue.nextTick(() => this.updateElsHeight());
		}

		const tableHeight = this.table.$el.clientHeight;
		this.tableHeight = tableHeight;
		const footerHeight = footerWrapper ? footerWrapper.offsetHeight : 0;
		this.footerHeight = footerHeight;

		if (this.height !== null) {
			this.bodyHeight = tableHeight - headerHeight - footerHeight + (footerWrapper ? 1 : 0);
		}
		this.fixedBodyHeight = this.scrollX ? (this.bodyHeight - this.gutterWidth) : this.bodyHeight;

		const noData = !this.table.data || this.table.data.length === 0;
		this.viewportHeight = this.scrollX ? tableHeight - (noData ? 0 : this.gutterWidth) : tableHeight;

		this.updateScrollY();
		this.notifyObservers('scrollable');
	}

	updateColumnsWidth() {
		if (Vue.prototype.$isServer) return;
		const fit = this.fit;
		const bodyWidth = this.table.$el.clientWidth;
		let bodyMinWidth = 0;

		const flattenColumns = this.getFlattenColumns();
		let flexColumns = flattenColumns.filter((column) => typeof column.width !== 'number');

		flattenColumns.forEach((column) => { // Clean those columns whose width changed from flex to unflex
			if (typeof column.width === 'number' && column.realWidth) column.realWidth = null;
		});

		if (flexColumns.length > 0 && fit) {
			flattenColumns.forEach((column) => {
				bodyMinWidth += column.width || column.minWidth || 80;
			});

			const scrollYWidth = this.scrollY ? this.gutterWidth : 0;

			if (bodyMinWidth <= bodyWidth - scrollYWidth) { // DON'T HAVE SCROLL BAR
				this.scrollX = false;

				const totalFlexWidth = bodyWidth - scrollYWidth - bodyMinWidth;

				if (flexColumns.length === 1) {
					flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + totalFlexWidth;
				} else {
					const allColumnsWidth = flexColumns.reduce((prev, column) => prev + (column.minWidth || 80), 0);
					const flexWidthPerPixel = totalFlexWidth / allColumnsWidth;
					let noneFirstWidth = 0;

					flexColumns.forEach((column, index) => {
						if (index === 0) return;
						const flexWidth = Math.floor((column.minWidth || 80) * flexWidthPerPixel);
						noneFirstWidth += flexWidth;
						column.realWidth = (column.minWidth || 80) + flexWidth;
					});

					flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + totalFlexWidth - noneFirstWidth;
				}
			} else { // HAVE HORIZONTAL SCROLL BAR
				this.scrollX = true;
				flexColumns.forEach(function (column) {
					column.realWidth = column.minWidth;
				});
			}

			this.bodyWidth = Math.max(bodyMinWidth, bodyWidth);
			this.table.resizeState.width = this.bodyWidth;
		} else {
			flattenColumns.forEach((column) => {
				if (!column.width && !column.minWidth) {
					column.realWidth = 80;
				} else {
					column.realWidth = column.width || column.minWidth;
				}

				bodyMinWidth += column.realWidth;
			});
			this.scrollX = bodyMinWidth > bodyWidth;

			this.bodyWidth = bodyMinWidth;
		}

		const fixedColumns = this.store.states.fixedColumns;

		if (fixedColumns.length > 0) {
			let fixedWidth = 0;
			fixedColumns.forEach(function (column) {
				fixedWidth += column.realWidth || column.width;
			});

			this.fixedWidth = fixedWidth;
		}

		const rightFixedColumns = this.store.states.rightFixedColumns;
		if (rightFixedColumns.length > 0) {
			let rightFixedWidth = 0;
			rightFixedColumns.forEach(function (column) {
				rightFixedWidth += column.realWidth || column.width;
			});

			this.rightFixedWidth = rightFixedWidth;
		}

		this.notifyObservers('columns');
	}

	addObserver(observer) {
		this.observers.push(observer);
	}

	removeObserver(observer) {
		const index = this.observers.indexOf(observer);
		if (index !== -1) {
			this.observers.splice(index, 1);
		}
	}

	notifyObservers(event) {
		const observers = this.observers;
		observers.forEach((observer) => {
			switch (event) {
				case 'columns':
					observer.onColumnsChange(this);
					break;
				case 'scrollable':
					observer.onScrollableChange(this);
					break;
				default:
					throw new VcError('table', `Layout 不包含事件 ${event}.`);
			}
		});
	}
}

export default TableLayout;
