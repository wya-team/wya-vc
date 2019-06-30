<template>
	<div 
		:class="classes" 
		class="vc-table"
		@mouseleave="handleMouseLeave" 
	>
		<!-- 依赖收集 -->
		<div ref="hiddenColumns" class="vc-table__hidden"><slot /></div>
		<div
			v-event:mousewheel="handleHeaderFooterMousewheel"
			v-if="showHeader"
			ref="headerWrapper"
			class="vc-table__header-wrapper"
		>
			<vc-table-header
				ref="tableHeader"
				:store="store"
				:border="border"
				:style="{
					width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
				}"
			/>
		</div>
		<div
			ref="bodyWrapper"
			:class="[layout.scrollX ? `is-scrolling-${scrollPosition}` : 'is-scrolling-none']"
			:style="[bodyHeight]"
			class="vc-table__body-wrapper"
			
		>
			<vc-table-body
				:context="context"
				:store="store"
				:stripe="stripe"
				:row-class-name="rowClassName"
				:row-style="rowStyle"
				:highlight="highlightCurrentRow"
				:style="{ width: bodyWidth }"
			/>
			<div
				v-if="!dataSource || dataSource.length === 0"
				ref="emptyBlock"
				:style="{ width: bodyWidth }"
				class="vc-table__empty-block"
			>
				<!-- TODO: vc-customer -->
				<span class="vc-table__empty-text">
					<slot name="empty">{{ emptyText || '暂无数据' }}</slot>
				</span>
			</div>
			<div
				v-if="$slots.append"
				ref="appendWrapper"
				class="vc-table__append-wrapper"
			>
				<slot name="append" />
			</div>
		</div>
		<div
			v-event:mousewheel="handleHeaderFooterMousewheel"
			v-if="showSummary"
			v-show="dataSource && dataSource.length > 0"
			ref="footerWrapper"
			class="vc-table__footer-wrapper"
		>
			<vc-table-footer
				:store="store"
				:border="border"
				:sum-text="sumText || '合计'"
				:get-summary="getSummary"
				:style="{ width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''}"
			/>
		</div>
		<div
			v-event:mousewheel="handleFixedMousewheel"
			v-if="fixedColumns.length > 0"
			ref="fixedWrapper"
			:style="[{ width: layout.fixedWidth ? layout.fixedWidth + 'px' : ''}, fixedHeight]"
			class="vc-table__fixed"
		>
			<div
				v-if="showHeader"
				ref="fixedHeaderWrapper" 
				class="vc-table__fixed-header-wrapper"
			>
				<vc-table-header
					ref="fixedTableHeader"
					:border="border"
					:store="store"
					:style="{ width: bodyWidth }" 
					fixed="left"
				/>
			</div>
			<div
				ref="fixedBodyWrapper"
				:style="[{ top: layout.headerHeight + 'px' }, fixedBodyHeight]"
				class="vc-table__fixed-body-wrapper"
			>
				<vc-table-body
					:store="store"
					:stripe="stripe"
					:highlight="highlightCurrentRow"
					:row-class-name="rowClassName"
					:row-style="rowStyle"
					:style="{ width: bodyWidth }"
					fixed="left"
				/>
				<div
					v-if="$slots.append"
					:style="{ height: layout.appendHeight + 'px' }" 
					class="vc-table__append-gutter"
				/>
			</div>
			<div
				v-if="showSummary"
				v-show="data && data.length > 0"
				ref="fixedFooterWrapper"
				class="vc-table__fixed-footer-wrapper"
			>
				<vc-table-footer
					:border="border"
					:sum-text="sumText || '合计'"
					:get-summary="getSummary"
					:store="store"
					:style="{ width: bodyWidth }" 
					fixed="left"
				/>
			</div>
		</div>
		<div
			v-event:mousewheel="handleFixedMousewheel"
			v-if="rightFixedColumns.length > 0"
			ref="rightFixedWrapper"
			:style="[
				{
					width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '',
					right: layout.scrollY ? (border ? layout.gutterWidth : (layout.gutterWidth || 0)) + 'px' : ''
				},
				fixedHeight
			]"
			class="vc-table__fixed-right"

		>
			<div 
				v-if="showHeader"
				ref="rightFixedHeaderWrapper"
				class="vc-table__fixed-header-wrapper"
			>
				
				<vc-table-header
					ref="rightFixedTableHeader"
					:border="border"
					:store="store"
					:style="{width: bodyWidth}"
					fixed="right"
				/>
			</div>
			<div
				ref="rightFixedBodyWrapper"
				
				:style="[
					{
						top: layout.headerHeight + 'px'
					},
					fixedBodyHeight
				]"
				class="vc-table__fixed-body-wrapper"
			>
				<vc-table-body
					:store="store"
					:stripe="stripe"
					:row-class-name="rowClassName"
					:row-style="rowStyle"
					:highlight="highlightCurrentRow"
					:style="{ width: bodyWidth }"
					fixed="right"
				/>
			</div>
			<div
				v-if="showSummary"
				v-show="dataSource && dataSource.length > 0"
				ref="rightFixedFooterWrapper"
				class="vc-table__fixed-footer-wrapper"
			>
				<vc-table-footer
					:border="border"
					:sum-text="sumText || '合计'"
					:get-summary="getSummary"
					:store="store"
					:style="{ width: bodyWidth }" 
					fixed="right"
				/>
			</div>
		</div>
		<div
			v-if="rightFixedColumns.length > 0"
			ref="rightFixedPatch"
			:style="{
				width: layout.scrollY ? layout.gutterWidth + 'px' : '0',
				height: layout.headerHeight + 'px'
			}"
			class="vc-table__fixed-right-patch"
		/>
		<div 
			v-show="resizeProxyVisible" 
			ref="resizeProxy" 
			class="vc-table__column-resize-proxy" 
		/>
	</div>
</template>

<script>
import { debounce, throttle } from 'lodash';

import Extends from '../extends';
import { Resize, getUid } from '../utils/index';
import { parseHeight } from './utils';

import { Store, mapStates } from './store';
import Layout from './layout/index';

// Table
import TableBody from './table-body';
import TableHeader from './table-header';
import TableFooter from './table-footer';
import Customer from '../customer';

export default {
	name: 'vc-table',
	components: {
		'vc-table-header': TableHeader,
		'vc-table-footer': TableFooter,
		'vc-table-body': TableBody,
		'vc-customer': Customer,
	},
	directives: {
		...Extends.directives('event')
	},
	props: {
		dataSource: {
			type: Array,
			default: () => ([]),
		},
		width: String | Number,
		height: String | Number,
		maxHeight: String | Number,
		// 列的宽度是否自撑开
		fit: {
			type: Boolean,
			default: true
		},
		// 是否为斑马纹 table
		stripe: Boolean,
		// 是否带有纵向边框
		border: Boolean,
		rowKey: String | Function,
		context: {
			type: Object,
			default: () => ({})
		},
		// 是否显示表头
		showHeader: {
			type: Boolean,
			default: true
		},
		showSummary: Boolean,
		sumText: String,
		getSummary: Function,
		rowClassName: String | Function,
		rowStyle: Object | Function,
		cellClassName: String | Function,
		cellStyle: Object | Function,
		headerRowClassName: String | Function,
		headerRowStyle: Object | Function,
		headerCellClassName: String | Function,
		headerCellStyle: Object | Function,
		highlightCurrentRow: Boolean,
		currentRowKey: String | Number,
		emptyText: String | Function,
		expandRowKeys: Array,
		defaultExpandAll: Boolean,
		/**
		 * 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。
		 * 若为 true，则选中所有行；若为 false，则取消选择所有行
		 */
		selectOnIndeterminate: {
			type: Boolean,
			default: true
		},
		lazy: Boolean,
		// 展示树形数据时，树节点的缩进
		indent: {
			type: Number,
			default: 16
		},
		treeProps: {
			type: Object,
			default: () => {
				return {
					hasChildren: 'hasChildren',
					children: 'children'
				};
			}
		},
		// 树形表格子集是否需要显示选择按钮
		expandSelectable: {
			type: Boolean,
			default: true
		},
		loadExpand: Function,
		getSpan: Function
	},

	data() {
		const { hasChildren = 'hasChildren', children = 'children' } = this.treeProps;
		this.store = new Store(this, {
			rowKey: this.rowKey,
			defaultExpandAll: this.defaultExpandAll,
			selectOnIndeterminate: this.selectOnIndeterminate,
			// TreeTable 的相关配置
			indent: this.indent,
			lazy: this.lazy,
			lazyColumnIdentifier: hasChildren,
			childrenColumnName: children,
			expandSelectable: this.expandSelectable
		});
		const layout = new Layout({
			store: this.store,
			table: this,
			fit: this.fit,
			showHeader: this.showHeader
		});
		return {
			layout,
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
		classes() {
			return {
				'vc-table--fit': this.fit,
				'vc-table--striped': this.stripe,
				'vc-table--border': this.border || this.isGroup,
				'vc-table--hidden': this.isHidden,
				'vc-table--group': this.isGroup,
				'vc-table--fluid-height': this.maxHeight,
				'vc-table--scrollable-x': this.layout.scrollX,
				'vc-table--scrollable-y': this.layout.scrollY,
				'vc-table--enable-row-hover': !this.store.states.isComplex,
				'vc-table--enable-row-transition': (this.store.states.data || []).length !== 0 && (this.store.states.data || []).length < 100
			};
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

		bodyWidth() {
			const { bodyWidth, scrollY, gutterWidth } = this.layout;
			return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) + 'px' : '';
		},

		bodyHeight() {
			const { headerHeight = 0, bodyHeight, footerHeight = 0 } = this.layout;
			if (this.height) {
				return {
					height: bodyHeight ? bodyHeight + 'px' : ''
				};
			} else if (this.maxHeight) {
				const maxHeight = parseHeight(this.maxHeight);
				if (maxHeight) {
					return {
						'max-height': (maxHeight - footerHeight - (this.showHeader ? headerHeight : 0)) + 'px'
					};
				}
			}
			return {};
		},

		fixedBodyHeight() {
			if (this.height) {
				return {
					height: this.layout.fixedBodyHeight ? this.layout.fixedBodyHeight + 'px' : ''
				};
			} else if (this.maxHeight) {
				let maxHeight = parseHeight(this.maxHeight);
				if (maxHeight) {
					maxHeight = this.layout.scrollX ? maxHeight - this.layout.gutterWidth : maxHeight;
					if (this.showHeader) {
						maxHeight -= this.layout.headerHeight;
					}
					maxHeight -= this.layout.footerHeight;
					return {
						'max-height': maxHeight + 'px'
					};
				}
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
		},

		...mapStates({
			selection: 'selection',
			columns: 'columns',
			tableData: 'data',
			fixedColumns: 'fixedColumns',
			rightFixedColumns: 'rightFixedColumns'
		})
	},
	watch: {
		height: {
			immediate: true,
			handler(v) {
				this.layout.setHeight(v);
			}
		},

		maxHeight: {
			immediate: true,
			handler(v) {
				this.layout.setMaxHeight(v);
			}
		},

		currentRowKey: {
			immediate: true,
			handler(v) {
				if (!this.rowKey) return;
				this.store.setCurrentRowKey(v);
			}
		},

		dataSource: {
			immediate: true,
			handler(v) {
				this.store.commit('setData', v);
				if (this.$ready) {
					this.$nextTick(() => {
						this.refreshLayout();
					});
				}
			}
		},

		expandRowKeys: {
			immediate: true,
			handler(v) {
				if (v) {
					this.store.setExpandRowKeysAdapter(v);
				}
			}
		}
	},

	created() {
		this.tableId = getUid('table');
		this.debouncedUpdateLayout = debounce(() => this.refreshLayout(), 50);
	},

	mounted() {
		this.bindEvents();
		this.store.updateColumns();
		this.refreshLayout();

		this.resizeState = {
			width: this.$el.offsetWidth,
			height: this.$el.offsetHeight
		};

		this.$ready = true;
	},

	destroyed() {
		this.unbindEvents();
	},

	methods: {
		bindEvents() {
			this.bodyWrapper.addEventListener('scroll', this.handleSyncPosition, { passive: true });
			if (this.fit) {
				Resize.on(this.$el, this.handleResize);
			}
		},

		unbindEvents() {
			this.bodyWrapper.removeEventListener('scroll', this.handleSyncPosition, { passive: true });
			if (this.fit) {
				Resize.off(this.$el, this.handleResize);
			}
		},

		// TODO 性能优化
		handleSyncPosition: throttle(function () {
			const { scrollLeft, scrollTop, offsetWidth, scrollWidth } = this.bodyWrapper;
			const { headerWrapper, footerWrapper, fixedBodyWrapper, rightFixedBodyWrapper } = this.$refs;
			if (headerWrapper) headerWrapper.scrollLeft = scrollLeft;
			if (footerWrapper) footerWrapper.scrollLeft = scrollLeft;
			if (fixedBodyWrapper) fixedBodyWrapper.scrollTop = scrollTop;
			if (rightFixedBodyWrapper) rightFixedBodyWrapper.scrollTop = scrollTop;
			const maxScrollLeftPosition = scrollWidth - offsetWidth - 1;
			if (scrollLeft >= maxScrollLeftPosition) {
				this.scrollPosition = 'right';
			} else if (scrollLeft === 0) {
				this.scrollPosition = 'left';
			} else {
				this.scrollPosition = 'middle';
			}
		}, 20),

		handleResize() {
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
				this.refreshLayout();
			}
		},

		handleMouseLeave() {
			this.store.commit('setHoverRow', null);
			if (this.hoverState) this.hoverState = null;
		},

		handleFixedMousewheel(event, data) {
			const el = this.bodyWrapper;
			if (Math.abs(data.spinY) > 0) {
				const currentScrollTop = el.scrollTop;
				if (data.pixelY < 0 && currentScrollTop !== 0) {
					event.preventDefault();
				}
				if (data.pixelY > 0 && el.scrollHeight - el.clientHeight > currentScrollTop) {
					event.preventDefault();
				}
				el.scrollTop += Math.ceil(data.pixelY / 5);
			} else {
				el.scrollLeft += Math.ceil(data.pixelX / 5);
			}
		},

		handleHeaderFooterMousewheel(event, data) {
			const { pixelX, pixelY } = data;
			if (Math.abs(pixelX) >= Math.abs(pixelY)) {
				this.bodyWrapper.scrollLeft += data.pixelX / 5;
			}
		},

		updateScrollY() {
			this.layout.updateScrollY();
			this.layout.updateColumnsWidth();
		},

		/**
		 * 对 Table 进行重新布局。
		 * 当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法
		 */
		refreshLayout() {
			this.layout.updateColumnsWidth();
			if (this.shouldUpdateHeight) {
				this.layout.updateElsHeight();
			}
		},

		/**
		 * 用于多选表格，切换所有行的选中状态
		 */
		toggleAllSelection() {
			this.store.commit('toggleAllSelection');
		},

		/**
		 * 用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态。
		 */
		setCurrentRow(row) {
			this.store.commit('setCurrentRow', row);
		},

		/**
		 * 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
		 */
		toggleRowSelection(row, selected, emitChange) {
			this.store.toggleRowSelection(row, selected, emitChange);
			this.store.updateAllSelected();
		},

		/**
		 * 用于可展开表格与树形表格，切换某一行的展开状态
		 * 如果使用了第二个参数，则是设置这一行展开与否（expanded 为 true 则展开）
		 */
		toggleRowExpansion(row, expanded) {
			this.store.toggleRowExpansionAdapter(row, expanded);
		},

		/**
		 * 用于多选表格，清空用户的选择
		 */
		clearSelection() {
			this.store.clearSelection();
		},
	},
};
</script>
