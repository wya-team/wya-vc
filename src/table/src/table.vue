<template>
	<div 
		:class="[{
			'el-table--fit': fit,
			'el-table--striped': stripe,
			'el-table--border': border || isGroup,
			'el-table--hidden': isHidden,
			'el-table--group': isGroup,
			'el-table--fluid-height': maxHeight,
			'el-table--scrollable-x': layout.scrollX,
			'el-table--scrollable-y': layout.scrollY,
			'el-table--enable-row-hover': !store.states.isComplex,
			'el-table--enable-row-transition': (store.states.data || []).length !== 0 && (store.states.data || []).length < 100
		}, tableSize ? `el-table--${ tableSize }` : '']"
		class="el-table"
		@mouseleave="handleMouseLeave($event)">
		<div ref="hiddenColumns" class="hidden-columns"><slot/></div>
		<div
			v-mousewheel="handleHeaderFooterMousewheel"
			v-if="showHeader"
			ref="headerWrapper"
			class="el-table__header-wrapper">
			<table-header
				ref="tableHeader"
				:store="store"
				:border="border"
				:default-sort="defaultSort"
				:style="{
					width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
			}"/>
		</div>
		<div
			ref="bodyWrapper"
			:class="[layout.scrollX ? `is-scrolling-${scrollPosition}` : 'is-scrolling-none']"
			:style="[bodyHeight]"
			class="el-table__body-wrapper">
			<table-body
				:context="context"
				:store="store"
				:stripe="stripe"
				:row-class-name="rowClassName"
				:row-style="rowStyle"
				:highlight="highlightCurrentRow"
				:style="{
					width: bodyWidth
			}"/>
			<div
				v-if="!dataSource || dataSource.length === 0"
				ref="emptyBlock"
				:style="{
					width: bodyWidth
				}"
				class="el-table__empty-block">
				<span class="el-table__empty-text">
					<slot name="empty">{{ emptyText || t('el.table.emptyText') }}</slot>
				</span>
			</div>
			<div
				v-if="$slots.append"
				ref="appendWrapper"
				class="el-table__append-wrapper">
				<slot name="append"/>
			</div>
		</div>
		<div
			v-mousewheel="handleHeaderFooterMousewheel"
			v-if="showSummary"
			v-show="dataSource && dataSource.length > 0"
			ref="footerWrapper"
			class="el-table__footer-wrapper">
			<table-footer
				:store="store"
				:border="border"
				:sum-text="sumText || t('el.table.sumText')"
				:summary-method="summaryMethod"
				:default-sort="defaultSort"
				:style="{
					width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
			}"/>
		</div>
		<div
			v-mousewheel="handleFixedMousewheel"
			v-if="fixedColumns.length > 0"
			ref="fixedWrapper"
			:style="[{
					width: layout.fixedWidth ? layout.fixedWidth + 'px' : ''
				},
				fixedHeight]"
			class="el-table__fixed">
			<div
				v-if="showHeader"
				ref="fixedHeaderWrapper"
				class="el-table__fixed-header-wrapper" >
				<table-header
					ref="fixedTableHeader"
					:border="border"
					:store="store"
					:style="{
						width: bodyWidth
					}"
					fixed="left"/>
			</div>
			<div
				ref="fixedBodyWrapper"
				:style="[{
						top: layout.headerHeight + 'px'
					},
					fixedBodyHeight]"
				class="el-table__fixed-body-wrapper">
				<table-body
					:store="store"
					:stripe="stripe"
					:highlight="highlightCurrentRow"
					:row-class-name="rowClassName"
					:row-style="rowStyle"
					:style="{
						width: bodyWidth
					}"
					fixed="left"/>
				<div
					v-if="$slots.append"
					:style="{
						height: layout.appendHeight + 'px'
					}"
					class="el-table__append-gutter"/>
			</div>
			<div
				v-if="showSummary"
				v-show="dataSource && dataSource.length > 0"
				ref="fixedFooterWrapper"
				class="el-table__fixed-footer-wrapper">
				<table-footer
					:border="border"
					:sum-text="sumText || t('el.table.sumText')"
					:summary-method="summaryMethod"
					:store="store"
					:style="{
						width: bodyWidth
					}"
					fixed="left"/>
			</div>
		</div>
		<div
			v-mousewheel="handleFixedMousewheel"
			v-if="rightFixedColumns.length > 0"
			ref="rightFixedWrapper"
			:style="[{
					width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '',
					right: layout.scrollY ? (border ? layout.gutterWidth : (layout.gutterWidth || 0)) + 'px' : ''
				},
				fixedHeight]"
			class="el-table__fixed-right">
			<div 
				v-if="showHeader"
				ref="rightFixedHeaderWrapper"
				class="el-table__fixed-header-wrapper">
				<table-header
					ref="rightFixedTableHeader"
					:border="border"
					:store="store"
					:style="{
						width: bodyWidth
					}"
					fixed="right"/>
			</div>
			<div
				ref="rightFixedBodyWrapper"
				:style="[{
						top: layout.headerHeight + 'px'
					},
					fixedBodyHeight]"
				class="el-table__fixed-body-wrapper">
				<table-body
					:store="store"
					:stripe="stripe"
					:row-class-name="rowClassName"
					:row-style="rowStyle"
					:highlight="highlightCurrentRow"
					:style="{
						width: bodyWidth
					}"
					fixed="right"/>
			</div>
			<div
				v-if="showSummary"
				v-show="dataSource && dataSource.length > 0"
				ref="rightFixedFooterWrapper"
				class="el-table__fixed-footer-wrapper">
				<table-footer
					:border="border"
					:sum-text="sumText || t('el.table.sumText')"
					:summary-method="summaryMethod"
					:store="store"
					:style="{
						width: bodyWidth
					}"
					fixed="right"/>
			</div>
		</div>
		<div
			v-if="rightFixedColumns.length > 0"
			ref="rightFixedPatch"
			:style="{
				width: layout.scrollY ? layout.gutterWidth + 'px' : '0',
				height: layout.headerHeight + 'px'
			}"
			class="el-table__fixed-right-patch"/>
		<div v-show="resizeProxyVisible" ref="resizeProxy" class="el-table__column-resize-proxy"/>
	</div>
</template>

<script type="text/babel">
import { debounce } from 'lodash';
import ElCheckbox from './ui/checkbox';
import { addResizeListener, removeResizeListener } from './utils/resize-event';
import Mousewheel from './directives/mousewheel';
import Locale from './mixins/locale';
import Migrating from './mixins/migrating';
import TableStore from './table-store';
import TableLayout from './table-layout';
import TableBody from './table-body';
import TableHeader from './table-header';
import TableFooter from './table-footer';
/* eslint-disable */
let tableIdSeed = 1;
export default {
	name: 'el-table',
	directives: {
		Mousewheel
	},
	components: {
		TableHeader,
		TableFooter,
		TableBody,
		ElCheckbox
	},
	mixins: [Locale, Migrating],
	props: {
		dataSource: {
			type: Array,
			default() {
				return [];
			}
		},
		size: String,
		width: [String, Number],
		height: [String, Number],
		maxHeight: [String, Number],
		fit: {
			type: Boolean,
			default: true
		},
		stripe: Boolean,
		border: Boolean,
		rowKey: [String, Function],
		context: {},
		showHeader: {
			type: Boolean,
			default: true
		},
		showSummary: Boolean,
		sumText: String,
		summaryMethod: Function,
		rowClassName: [String, Function],
		rowStyle: [Object, Function],
		cellClassName: [String, Function],
		cellStyle: [Object, Function],
		headerRowClassName: [String, Function],
		headerRowStyle: [Object, Function],
		headerCellClassName: [String, Function],
		headerCellStyle: [Object, Function],
		highlightCurrentRow: Boolean,
		currentRowKey: [String, Number],
		emptyText: String,
		expandRowKeys: Array,
		defaultExpandAll: Boolean,
		defaultSort: Object,
		tooltipEffect: String,
		spanMethod: Function,
		selectOnIndeterminate: {
			type: Boolean,
			default: true
		}
	},
	data() {
		const store = new TableStore(this, {
			rowKey: this.rowKey,
			defaultExpandAll: this.defaultExpandAll,
			selectOnIndeterminate: this.selectOnIndeterminate
		});
		const layout = new TableLayout({
			store,
			table: this,
			fit: this.fit,
			showHeader: this.showHeader
		});
		return {
			layout,
			store,
			isHidden: false,
			renderExpanded: null,
			resizeProxyVisible: false,
			resizeState: {
				width: null,
				height: null
			},
			// 是否拥有多级表头
			isGroup: false,
			scrollPosition: 'left'
		};
	},
	computed: {
		tableSize() {
			return this.size || (this.$ELEMENT || {}).size;
		},
		bodyWrapper() {
			return this.$refs.bodyWrapper;
		},
		shouldUpdateHeight() {
			return this.height
          || this.maxHeight
          || this.fixedColumns.length > 0
          || this.rightFixedColumns.length > 0;
		},
		selection() {
			return this.store.states.selection;
		},
		columns() {
			return this.store.states.columns;
		},
		tableData() {
			return this.store.states.data;
		},
		fixedColumns() {
			return this.store.states.fixedColumns;
		},
		rightFixedColumns() {
			return this.store.states.rightFixedColumns;
		},
		bodyWidth() {
			const { bodyWidth, scrollY, gutterWidth } = this.layout;
			return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) + 'px' : '';
		},
		bodyHeight() {
			if (this.height) {
				return {
					height: this.layout.bodyHeight ? this.layout.bodyHeight + 'px' : ''
				};
			} else if (this.maxHeight) {
				return {
					'max-height': (this.showHeader
						? this.maxHeight - this.layout.headerHeight - this.layout.footerHeight
						: this.maxHeight - this.layout.footerHeight) + 'px'
				};
			}
			return {};
		},
		fixedBodyHeight() {
			if (this.height) {
				return {
					height: this.layout.fixedBodyHeight ? this.layout.fixedBodyHeight + 'px' : ''
				};
			} else if (this.maxHeight) {
				let maxHeight = this.layout.scrollX ? this.maxHeight - this.layout.gutterWidth : this.maxHeight;
				if (this.showHeader) {
					maxHeight -= this.layout.headerHeight;
				}
				maxHeight -= this.layout.footerHeight;
				return {
					'max-height': maxHeight + 'px'
				};
			}
			return {};
		},
		fixedHeight() {
			if (this.maxHeight) {
				if (this.showSummary) {
					return {
						bottom: 0
					};
				}
				return {
					bottom: (this.layout.scrollX && this.dataSource.length) ? this.layout.gutterWidth + 'px' : ''
				};
			} else {
				if (this.showSummary) {
					return {
						height: this.layout.tableHeight ? this.layout.tableHeight + 'px' : ''
					};
				}
				return {
					height: this.layout.viewportHeight ? this.layout.viewportHeight + 'px' : ''
				};
			}
		}
	},
	watch: {
		height: {
			immediate: true,
			handler(value) {
				this.layout.setHeight(value);
			}
		},
		maxHeight: {
			immediate: true,
			handler(value) {
				this.layout.setMaxHeight(value);
			}
		},
		currentRowKey(newVal) {
			this.store.setCurrentRowKey(newVal);
		},
		dataSource: {
			immediate: true,
			handler(value) {
				this.store.commit('setData', value);
				if (this.$ready) {
					this.$nextTick(() => {
						this.doLayout();
					});
				}
			}
		},
		expandRowKeys: {
			immediate: true,
			handler(newVal) {
				if (newVal) {
					this.store.setExpandRowKeys(newVal);
				}
			}
		}
	},
	created() {
		this.tableId = 'el-table_' + tableIdSeed++;
		this.debouncedUpdateLayout = debounce(() => this.doLayout(), 50);
	},
	destroyed() {
		if (this.resizeListener) removeResizeListener(this.$el, this.resizeListener);
	},
	mounted() {
		this.bindEvents();
		this.store.updateColumns();
		this.doLayout();
		this.resizeState = {
			width: this.$el.offsetWidth,
			height: this.$el.offsetHeight
		};
		// init filters
		this.store.states.columns.forEach(column => {
			if (column.filteredValue && column.filteredValue.length) {
				this.store.commit('filterChange', {
					column,
					values: column.filteredValue,
					silent: true
				});
			}
		});
		this.$ready = true;
	},
	methods: {
		getMigratingConfig() {
			return {
				events: {
					expand: 'expand is renamed to expand-change'
				}
			};
		},
		setCurrentRow(row) {
			this.store.commit('setCurrentRow', row);
		},
		toggleRowSelection(row, selected) {
			this.store.toggleRowSelection(row, selected);
			this.store.updateAllSelected();
		},
		toggleRowExpansion(row, expanded) {
			this.store.toggleRowExpansion(row, expanded);
		},
		clearSelection() {
			this.store.clearSelection();
		},
		clearFilter(columnKeys) {
			this.store.clearFilter(columnKeys);
		},
		clearSort() {
			this.store.clearSort();
		},
		handleMouseLeave() {
			this.store.commit('setHoverRow', null);
			if (this.hoverState) this.hoverState = null;
		},
		updateScrollY() {
			this.layout.updateScrollY();
			this.layout.updateColumnsWidth();
		},
		handleFixedMousewheel(event, data) {
			const bodyWrapper = this.bodyWrapper;
			if (Math.abs(data.spinY) > 0) {
				const currentScrollTop = bodyWrapper.scrollTop;
				if (data.pixelY < 0 && currentScrollTop !== 0) {
					event.preventDefault();
				}
				if (data.pixelY > 0 && bodyWrapper.scrollHeight - bodyWrapper.clientHeight > currentScrollTop) {
					event.preventDefault();
				}
				bodyWrapper.scrollTop += Math.ceil(data.pixelY / 5);
			} else {
				bodyWrapper.scrollLeft += Math.ceil(data.pixelX / 5);
			}
		},
		handleHeaderFooterMousewheel(event, data) {
			const { pixelX, pixelY } = data;
			if (Math.abs(pixelX) >= Math.abs(pixelY)) {
				event.preventDefault();
				this.bodyWrapper.scrollLeft += data.pixelX / 5;
			}
		},
		bindEvents() {
			const { headerWrapper, footerWrapper } = this.$refs;
			const refs = this.$refs;
			let self = this;
			this.bodyWrapper.addEventListener('scroll', function () {
				if (headerWrapper) headerWrapper.scrollLeft = this.scrollLeft;
				if (footerWrapper) footerWrapper.scrollLeft = this.scrollLeft;
				if (refs.fixedBodyWrapper) refs.fixedBodyWrapper.scrollTop = this.scrollTop;
				if (refs.rightFixedBodyWrapper) refs.rightFixedBodyWrapper.scrollTop = this.scrollTop;
				const maxScrollLeftPosition = this.scrollWidth - this.offsetWidth - 1;
				const scrollLeft = this.scrollLeft;
				if (scrollLeft >= maxScrollLeftPosition) {
					self.scrollPosition = 'right';
				} else if (scrollLeft === 0) {
					self.scrollPosition = 'left';
				} else {
					self.scrollPosition = 'middle';
				}
			});
			if (this.fit) {
				addResizeListener(this.$el, this.resizeListener);
			}
		},
		resizeListener() {
			if (!this.$ready) return;
			let shouldUpdateLayout = false;
			const el = this.$el;
			const { width: oldWidth, height: oldHeight } = this.resizeState;
			const width = el.offsetWidth;
			if (oldWidth !== width) {
				shouldUpdateLayout = true;
			}
			const height = el.offsetHeight;
			if ((this.height || this.shouldUpdateHeight) && oldHeight !== height) {
				shouldUpdateLayout = true;
			}
			if (shouldUpdateLayout) {
				this.resizeState.width = width;
				this.resizeState.height = height;
				this.doLayout();
			}
		},
		doLayout() {
			this.layout.updateColumnsWidth();
			if (this.shouldUpdateHeight) {
				this.layout.updateElsHeight();
			}
		},
		sort(prop, order) {
			this.store.commit('sort', { prop, order });
		},
		toggleAllSelection() {
			this.store.commit('toggleAllSelection');
		}
	},
};
</script>