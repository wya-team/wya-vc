import Vue from 'vue';
import { Utils, Dom } from '@wya/utils';
import Checkbox from '../checkbox';
import Layout from './layout/index';
import { mapStates } from './store';

const getAllColumns = (columns) => {
	const result = [];
	columns.forEach((column) => {
		if (column.children) {
			result.push(column);
			result.push(...getAllColumns(column.children));
		} else {
			result.push(column);
		}
	});
	return result;
};

const convertToRows = (originColumns) => {
	let maxLevel = 1;
	const traverse = (column, parent) => {
		if (parent) {
			column.level = parent.level + 1;
			if (maxLevel < column.level) {
				maxLevel = column.level;
			}
		}
		if (column.children) {
			let colSpan = 0;
			column.children.forEach((subColumn) => {
				traverse(subColumn, column);
				colSpan += subColumn.colSpan;
			});
			column.colSpan = colSpan;
		} else {
			column.colSpan = 1;
		}
	};

	originColumns.forEach((column) => {
		column.level = 1;
		traverse(column);
	});

	const rows = [];
	for (let i = 0; i < maxLevel; i++) {
		rows.push([]);
	}

	const allColumns = getAllColumns(originColumns);

	allColumns.forEach((column) => {
		if (!column.children) {
			column.rowSpan = maxLevel - column.level + 1;
		} else {
			column.rowSpan = 1;
		}
		rows[column.level - 1].push(column);
	});

	return rows;
};

export default {
	name: 'vc-table-header',
	mixins: [Layout.Mixin],
	props: {
		fixed: String,
		store: {
			required: true
		},
		border: Boolean
	},
	data() {
		return {
			draggingColumn: null,
			dragging: false,
			dragState: {}
		};
	},

	computed: {
		table() {
			return this.$parent;
		},

		hasGutter() {
			return !!(!this.fixed && this.tableLayout.gutterWidth);
		},

		...mapStates({
			columns: 'columns',
			isAllSelected: 'isAllSelected',
			leftFixedLeafCount: 'fixedLeafColumnsLength',
			rightFixedLeafCount: 'rightFixedLeafColumnsLength',
			columnsCount: states => states.columns.length,
			leftFixedCount: states => states.fixedColumns.length,
			rightFixedCount: states => states.rightFixedColumns.length
		})
	},

	created() {
	},

	mounted() {
	},

	beforeDestroy() {
	},

	methods: {
		isCellHidden(index, columns) {
			let start = 0;
			for (let i = 0; i < index; i++) {
				start += columns[i].colSpan;
			}
			const after = start + columns[index].colSpan - 1;
			if (this.fixed === true || this.fixed === 'left') {
				return after >= this.leftFixedLeafCount;
			} else if (this.fixed === 'right') {
				return start < this.columnsCount - this.rightFixedLeafCount;
			} else {
				return (after < this.leftFixedLeafCount) || (start >= this.columnsCount - this.rightFixedLeafCount);
			}
		},

		getHeaderRowStyle(rowIndex) {
			const { headerRowStyle } = this.table;
			if (typeof headerRowStyle === 'function') {
				return headerRowStyle.call(null, { rowIndex });
			}
			return headerRowStyle;
		},

		getHeaderRowClass(rowIndex) {
			const classes = [];
			const { headerRowClassName } = this.table;

			if (typeof headerRowClassName === 'string') {
				classes.push(headerRowClassName);
			} else if (typeof headerRowClassName === 'function') {
				classes.push(headerRowClassName.call(null, { rowIndex }));
			}

			return classes.join(' ');
		},

		getHeaderCellStyle(rowIndex, columnIndex, row, column) {
			const { headerCellStyle } = this.table;
			if (typeof headerCellStyle === 'function') {
				return headerCellStyle.call(null, {
					rowIndex,
					columnIndex,
					row,
					column
				});
			}
			return headerCellStyle;
		},

		getHeaderCellClass(rowIndex, columnIndex, row, column) {
			const classes = [column.id, column.order, column.headerAlign, column.className, column.labelClassName];

			if (rowIndex === 0 && this.isCellHidden(columnIndex, row)) {
				classes.push('is-hidden');
			}

			if (!column.children) {
				classes.push('is-leaf');
			}

			const { headerCellClassName } = this.table;
			if (typeof headerCellClassName === 'string') {
				classes.push(headerCellClassName);
			} else if (typeof headerCellClassName === 'function') {
				classes.push(headerCellClassName.call(null, {
					rowIndex,
					columnIndex,
					row,
					column
				}));
			}

			return classes.join(' ');
		},

		toggleAllSelection(event) {
			event.stopPropagation();
			this.store.commit('toggleAllSelection');
		},

		handleHeaderClick(event, column) {
			this.$parent.$emit('header-click', column, event);
		},

		handleHeaderContextMenu(event, column) {
			this.$parent.$emit('header-contextmenu', column, event);
		},

		handleMouseDown(event, column) {
			if (this.$isServer) return;
			if (column.children && column.children.length > 0) return;
			/* istanbul ignore if */
			if (this.draggingColumn && this.border) {
				this.dragging = true;

				this.$parent.resizeProxyVisible = true;

				const table = this.$parent;
				const tableEl = table.$el;
				const tableLeft = tableEl.getBoundingClientRect().left;
				const columnEl = this.$el.querySelector(`th.${column.id}`);
				const columnRect = columnEl.getBoundingClientRect();
				const minLeft = columnRect.left - tableLeft + 30;

				Dom.addClass(columnEl, 'noclick');

				this.dragState = {
					startMouseLeft: event.clientX,
					startLeft: columnRect.right - tableLeft,
					startColumnLeft: columnRect.left - tableLeft,
					tableLeft
				};

				const resizeProxy = table.$refs.resizeProxy;
				resizeProxy.style.left = this.dragState.startLeft + 'px';

				document.onselectstart = () => false;
				document.ondragstart = () => false;

				const handleMouseMove = (event) => {
					const deltaLeft = event.clientX - this.dragState.startMouseLeft;
					const proxyLeft = this.dragState.startLeft + deltaLeft;

					resizeProxy.style.left = Math.max(minLeft, proxyLeft) + 'px';
				};

				const handleMouseUp = () => {
					if (this.dragging) {
						const {
							startColumnLeft,
							startLeft
						} = this.dragState;
						const finalLeft = parseInt(resizeProxy.style.left, 10);
						const columnWidth = finalLeft - startColumnLeft;
						column.width = columnWidth;
						column.realWidth = column.width;
						table.$emit('header-dragend', column.width, startLeft - startColumnLeft, column, event);

						this.store.scheduleLayout();

						document.body.style.cursor = '';
						this.dragging = false;
						this.draggingColumn = null;
						this.dragState = {};

						table.resizeProxyVisible = false;
					}

					document.removeEventListener('mousemove', handleMouseMove);
					document.removeEventListener('mouseup', handleMouseUp);
					document.onselectstart = null;
					document.ondragstart = null;

					setTimeout(function () {
						Dom.removeClass(columnEl, 'noclick');
					}, 0);
				};

				document.addEventListener('mousemove', handleMouseMove);
				document.addEventListener('mouseup', handleMouseUp);
			}
		},

		handleMouseMove(event, column) {
			if (column.children && column.children.length > 0) return;
			let target = event.target;
			while (target && target.tagName !== 'TH') {
				target = target.parentNode;
			}

			if (!column || !column.resizable) return;

			if (!this.dragging && this.border) {
				let rect = target.getBoundingClientRect();

				const bodyStyle = document.body.style;
				if (rect.width > 12 && rect.right - event.pageX < 8) {
					bodyStyle.cursor = 'col-resize';
					if (Dom.hasClass(target, 'is-sortable')) {
						target.style.cursor = 'col-resize';
					}
					this.draggingColumn = column;
				} else if (!this.dragging) {
					bodyStyle.cursor = '';
					if (Dom.hasClass(target, 'is-sortable')) {
						target.style.cursor = 'pointer';
					}
					this.draggingColumn = null;
				}
			}
		},

		handleMouseOut() {
			if (this.$isServer) return;
			document.body.style.cursor = '';
		},
	},
	render(h) {
		const { originColumns } = this.store.states;
		const columnRows = convertToRows(originColumns, this.columns);
		// 是否拥有多级表头
		const isGroup = columnRows.length > 1;
		if (isGroup) this.$parent.isGroup = true;
		return (
			<table
				class="vc-table__header"
				cellspacing="0"
				cellpadding="0"
				border="0"
			>
				<colgroup>
					{
						this.columns.map(column => <col name={ column.id } key={column.id} />)
					}
					{
						this.hasGutter ? <col name="gutter" /> : null
					}
				</colgroup>
				<thead class={ [{ 'is-group': isGroup, 'has-gutter': this.hasGutter }] }>
					{
						// renderList
						this._l(columnRows, (columns, rowIndex) => (
							<tr
								style={this.getHeaderRowStyle(rowIndex)}
								class={this.getHeaderRowClass(rowIndex)}
							>
								{
									columns.map((column, cellIndex) => (
										<th
											colspan={column.colSpan}
											rowspan={column.rowSpan}
											onMousemove={($event) => this.handleMouseMove($event, column)}
											onMouseout={this.handleMouseOut}
											onMousedown={($event) => this.handleMouseDown($event, column)}
											onClick={($event) => this.handleHeaderClick($event, column)}
											onContextmenu={($event) => this.handleHeaderContextMenu($event, column)}
											style={this.getHeaderCellStyle(rowIndex, cellIndex, columns, column)}
											class={this.getHeaderCellClass(rowIndex, cellIndex, columns, column)}
											key={column.id}
										>
											<div 
												class={[
													'vc-table__cell', 
													{
														"highlight": column.filteredValue && column.filteredValue.length > 0 
													},
													column.labelClassName
												]}
											>
												{
													column.renderHeader
														? column.renderHeader.call(
															this._renderProxy, 
															h, 
															{ 
																column, 
																$index: cellIndex, 
																// index: cellIndex, 
																store: this.store, 
																_self: this.$parent.$vnode.context 
															}
														)
														: column.label
												}
											</div>
										</th>
									))
								}
								{
									this.hasGutter ? <th class="vc-table__gutter" /> : null
								}
							</tr>
						))
					}
				</thead>
			</table>
		);
	},
};
