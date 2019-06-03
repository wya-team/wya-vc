import { debounce } from 'lodash';
import { Dom } from '@wya/utils';
import Popover from '../popover';
import { getCell, getColumnByCell, getRowIdentity } from './utils';

import { mapStates } from './store/helper';
import Layout from './layout/index';

export default {
	name: 'vc-table-body',
	mixins: [Layout.Observer],
	components: {
	},
	props: {
		store: {
			required: true
		},
		stripe: Boolean,
		context: {},
		rowClassName: [String, Function],
		rowStyle: [Object, Function],
		fixed: String,
		highlight: Boolean
	},
	computed: {
		table() {
			return this.$parent;
		},

		...mapStates({
			data: 'data',
			columns: 'columns',
			treeIndent: 'indent',
			leftFixedLeafCount: 'fixedLeafColumnsLength',
			rightFixedLeafCount: 'rightFixedLeafColumnsLength',
			columnsCount: states => states.columns.length,
			leftFixedCount: states => states.fixedColumns.length,
			rightFixedCount: states => states.rightFixedColumns.length,
			hasExpandColumn: states => states.columns.some(({ type }) => type === 'expand')
		}),

		firstDefaultColumnIndex() {
			return this.columns.findIndex(({ type }) => type === 'default');
		}
	},

	watch: {
		// don't trigger getter of currentRow in getCellClass. see https://jsfiddle.net/oe2b4hqt/
		// update DOM manually. see https://github.com/ElemeFE/element/pull/13954/files#diff-9b450c00d0a9dec0ffad5a3176972e40
		'store.states.hoverRow': function (newVal, oldVal) {
			if (!this.store.states.isComplex || this.$isServer) return;
			let raf = window.requestAnimationFrame;
			if (!raf) {
				raf = (fn) => setTimeout(fn, 16);
			}
			raf(() => {
				const rows = this.$el.querySelectorAll('.vc-table__row');
				const oldRow = rows[oldVal];
				const newRow = rows[newVal];
				if (oldRow) {
					Dom.removeClass(oldRow, 'hover-row');
				}
				if (newRow) {
					Dom.addClass(newRow, 'hover-row');
				}
			});
		}
	},

	data() {
		return {
		};
	},

	created() {
		this.timer = null;
	},

	methods: {
		getKeyOfRow(row, index) {
			const rowKey = this.table.rowKey;
			if (rowKey) {
				return getRowIdentity(row, rowKey);
			}
			return index;
		},

		isColumnHidden(index) {
			if (this.fixed === true || this.fixed === 'left') {
				return index >= this.leftFixedLeafCount;
			} else if (this.fixed === 'right') {
				return index < this.columnsCount - this.rightFixedLeafCount;
			} else {
				return (index < this.leftFixedLeafCount) || (index >= this.columnsCount - this.rightFixedLeafCount);
			}
		},

		getSpan(row, column, rowIndex, columnIndex) {
			let rowspan = 1;
			let colspan = 1;
			const fn = this.table.getSpan;
			if (typeof fn === 'function') {
				const result = fn({
					row,
					column,
					rowIndex,
					columnIndex
				});
				if (Array.isArray(result)) {
					rowspan = result[0];
					colspan = result[1];
				} else if (typeof result === 'object') {
					rowspan = result.rowspan;
					colspan = result.colspan;
				}
			}
			return { rowspan, colspan };
		},

		getRowStyle(row, rowIndex) {
			const rowStyle = this.table.rowStyle;
			if (typeof rowStyle === 'function') {
				return rowStyle.call(null, {
					row,
					rowIndex
				});
			}
			return rowStyle || null;
		},

		getRowClass(row, rowIndex) {
			const classes = ['vc-table__row'];
			if (this.table.highlightCurrentRow && row === this.store.states.currentRow) {
				classes.push('current-row');
			}

			if (this.stripe && rowIndex % 2 === 1) {
				classes.push('vc-table__row--striped');
			}
			const rowClassName = this.table.rowClassName;
			if (typeof rowClassName === 'string') {
				classes.push(rowClassName);
			} else if (typeof rowClassName === 'function') {
				classes.push(rowClassName.call(null, {
					row,
					rowIndex
				}));
			}

			if (this.store.states.expandRows.indexOf(row) > -1) {
				classes.push('expanded');
			}

			return classes;
		},

		getCellStyle(rowIndex, columnIndex, row, column) {
			const cellStyle = this.table.cellStyle;
			if (typeof cellStyle === 'function') {
				return cellStyle.call(null, {
					rowIndex,
					columnIndex,
					row,
					column
				});
			}
			return cellStyle;
		},

		getCellClass(rowIndex, columnIndex, row, column) {
			const classes = [column.id, column.align, column.className];

			if (this.isColumnHidden(columnIndex)) {
				classes.push('is-hidden');
			}

			const cellClassName = this.table.cellClassName;
			if (typeof cellClassName === 'string') {
				classes.push(cellClassName);
			} else if (typeof cellClassName === 'function') {
				classes.push(cellClassName.call(null, {
					rowIndex,
					columnIndex,
					row,
					column
				}));
			}

			return classes.join(' ');
		},

		getColspanRealWidth(columns, colspan, index) {
			if (colspan < 1) {
				return columns[index].realWidth;
			}
			const widthArr = columns.map(({ realWidth }) => realWidth).slice(index, index + colspan);
			return widthArr.reduce((acc, width) => acc + width, -1);
		},

		handleCellMouseEnter(event, row) {
			const table = this.table;
			const cell = getCell(event);

			if (cell) {
				const column = getColumnByCell(table, cell);
				const hoverState = { cell, column, row };
				table.hoverState = hoverState;

				table.$emit('cell-mouse-enter', hoverState.row, hoverState.column, hoverState.cell, event);
			}

			// 判断是否text-overflow, 如果是就显示tooltip
			const cellChild = event.target.querySelector('.cell');
			if (!(Dom.hasClass(cellChild, 'vc-popover') && cellChild.childNodes.length)) {
				return;
			}
			// 使用范围宽度而不是滚动宽度来确定文本是否溢出，以解决潜在的FireFox bug
			// https://bugzilla.mozilla.org/show_bug.cgi?id=1074543#c3
			const range = document.createRange();
			range.setStart(cellChild, 0);
			range.setEnd(cellChild, cellChild.childNodes.length);
			const rangeWidth = range.getBoundingClientRect().width;
			const padding = (parseInt(cellChild.style.paddingLeft, 10) || 0) + (parseInt(cellChild.style.paddingRight, 10) || 0);
			if ((rangeWidth + padding > cellChild.offsetWidth || cellChild.scrollWidth > cellChild.offsetWidth)) {
				this.timer && clearTimeout(this.timer);
				this.popperInstance = null;
				this.popperInstance = Popover.open({
					el: document.body,
					cName: 'vc-table-popover',
					triggerEl: cell,
					hover: true,
					theme: 'dark',
					placement: "top",
					content: cell.innerText || cell.textContent,
					onChange: (e, isActive) => {
						this.timer && clearTimeout(this.timer);
						this.popperInstance.isActive = isActive;
					}
				});
			}
		},

		handleCellMouseLeave(event) {
			this.timer = setTimeout(() => {
				this.popperInstance && (this.popperInstance.isActive = false, this.popperInstance = null);
			}, 300);

			const cell = getCell(event);
			if (!cell) return;

			const oldHoverState = this.table.hoverState || {};
			this.table.$emit('cell-mouse-leave', oldHoverState.row, oldHoverState.column, oldHoverState.cell, event);
		},

		handleMouseEnter: debounce(function (index) {
			this.store.commit('setHoverRow', index);
		}, 30),

		handleMouseLeave: debounce(function () {
			this.store.commit('setHoverRow', null);
		}, 30),

		handleContextMenu(event, row) {
			this.handleEvent(event, row, 'contextmenu');
		},

		handleDoubleClick(event, row) {
			this.handleEvent(event, row, 'dblclick');
		},

		handleClick(event, row) {
			this.store.commit('setCurrentRow', row);
			this.handleEvent(event, row, 'click');
		},

		handleEvent(event, row, name) {
			const table = this.table;
			const cell = getCell(event);
			let column;
			if (cell) {
				column = getColumnByCell(table, cell);
				if (column) {
					table.$emit(`cell-${name}`, row, column, cell, event);
				}
			}
			table.$emit(`row-${name}`, row, column, event);
		},

		renderRow(row, $index, treeRowData) {
			const { treeIndent, columns, firstDefaultColumnIndex } = this;
			const columnsHidden = columns.map((column, index) => this.isColumnHidden(index));
			const rowClasses = this.getRowClass(row, $index);
			let display = true;
			if (treeRowData) {
				rowClasses.push('vc-table__row--levvc-' + treeRowData.level);
				display = treeRowData.display;
			}
			return (<tr
				v-show={display}
				style={ this.getRowStyle(row, $index) }
				class={ rowClasses }
				key={ this.getKeyOfRow(row, $index) }
				on-dblclick={ ($event) => this.handleDoubleClick($event, row) }
				on-click={ ($event) => this.handleClick($event, row) }
				on-contextmenu={ ($event) => this.handleContextMenu($event, row) }
				on-mouseenter={ _ => this.handleMouseEnter($index) }
				on-mouseleave={ this.handleMouseLeave }>
				{
					columns.map((column, cellIndex) => {
						const { rowspan, colspan } = this.getSpan(row, column, $index, cellIndex);
						if (!rowspan || !colspan) {
							return null;
						}
						const columnData = { ...column };
						columnData.realWidth = this.getColspanRealWidth(columns, colspan, cellIndex);
						const data = {
							store: this.store,
							_self: this.context || this.table.$vnode.context,
							column: columnData,
							row,
							$index
						};
						if (cellIndex === firstDefaultColumnIndex && treeRowData) {
							data.treeNode = {
								indent: treeRowData.level * treeIndent,
								level: treeRowData.level
							};
							// TODO: 优化这里的逻辑
							if (typeof treeRowData.expanded === 'boolean') {
								data.treeNode.expanded = treeRowData.expanded;
								// 表明是懒加载
								if ('loading' in treeRowData) {
									data.treeNode.loading = treeRowData.loading;
								}
								if ('noLazyChildren' in treeRowData) {
									data.treeNode.noLazyChildren = treeRowData.noLazyChildren;
								}
							}
						}
						return (
							<td
								style={ this.getCellStyle($index, cellIndex, row, column) }
								class={ this.getCellClass($index, cellIndex, row, column) }
								rowspan={ rowspan }
								colspan={ colspan }
								on-mouseenter={ ($event) => this.handleCellMouseEnter($event, row) }
								on-mouseleave={ this.handleCellMouseLeave }>
								{
									column.renderCell.call(
										this._renderProxy,
										this.$createElement,
										data,
										columnsHidden[cellIndex]
									)
								}
							</td>
						);
					})
				}
			</tr>);
		},

		renderRowWrapper(row, $index) {
			const store = this.store;
			const { isRowExpanded, assertRowKey } = store;
			const { treeData, lazyTreeNodeMap, childrenColumnName, rowKey } = store.states;
			if (this.hasExpandColumn && isRowExpanded(row)) {
				const renderExpanded = this.table.renderExpanded;
				const tr = this.renderRow(row, $index);
				if (!renderExpanded) {
					console.error('[Element Error]renderExpanded is required.');
					return tr;
				}
				// 使用二维数组，避免修改 $index
				return [[
					tr,
					<tr key={'expanded-row__' + tr.key}>
						<td colspan={ this.columnsCount } class="vc-table__expanded-cell">
							{ renderExpanded(this.$createElement, { row, $index, store: this.store }) }
						</td>
					</tr>]];
			} else if (Object.keys(treeData).length) {
				assertRowKey();
				// TreeTable 时，rowKey 必须由用户设定，不使用 getKeyOfRow 计算
				// 在调用 renderRow 函数时，仍然会计算 rowKey，不太好的操作
				const key = getRowIdentity(row, rowKey);
				let cur = treeData[key];
				let treeRowData = null;
				if (cur) {
					treeRowData = {
						expanded: cur.expanded,
						level: cur.level,
						display: true
					};
					if (typeof cur.loaded === 'boolean' && cur.loaded) {
						treeRowData.noLazyChildren = !(cur.children && cur.children.length);
					}
					if (typeof cur.loading === 'boolean') {
						treeRowData.loading = cur.loading;
					}
				}
				const tmp = [this.renderRow(row, $index, treeRowData)];
				// 渲染嵌套数据
				if (cur) {
					// currentRow 记录的是 index，所以还需主动增加 TreeTable 的 index
					let i = 0;
					const traverse = (children, parent) => {
						if (!(children && children.length && parent)) return;
						children.forEach(node => {
							// 父节点的 display 状态影响子节点的显示状态
							const innerTreeRowData = {
								display: parent.display && parent.expanded,
								level: parent.level + 1
							};
							const childKey = getRowIdentity(node, rowKey);
							if (childKey === undefined || childKey === null) {
								throw new Error('for nested data item, row-key is required.');
							}
							cur = { ...treeData[childKey] };
							// 对于当前节点，分成有无子节点两种情况。
							// 如果包含子节点的，设置 expanded 属性。
							// 对于它子节点的 display 属性由它本身的 expanded 与 display 共同决定。
							if (cur) {
								innerTreeRowData.expanded = cur.expanded;
								// 懒加载的某些节点，level 未知
								cur.level = cur.level || innerTreeRowData.level;
								cur.display = !!(cur.expanded && innerTreeRowData.display);
								if (typeof cur.loaded === 'boolean' && cur.loaded) {
									innerTreeRowData.noLazyChildren = !(cur.children && cur.children.length);
								}
								if (typeof cur.lazy === 'boolean') {
									innerTreeRowData.loading = cur.loading;
								}
							}
							i++;
							tmp.push(this.renderRow(node, $index + i, innerTreeRowData));
							if (cur) {
								const nodes = lazyTreeNodeMap[childKey] || node[childrenColumnName];
								traverse(nodes, cur);
							}
						});
					};
					// 对于 root 节点，display 一定为 true
					cur.display = true;
					const nodes = lazyTreeNodeMap[key] || row[childrenColumnName];
					traverse(nodes, cur);
				}
				return tmp;
			} else {
				return this.renderRow(row, $index);
			}
		}
	},
	render(h) {
		const data = this.data || [];
		return (
			<table
				class="vc-table__body"
				cellspacing="0"
				cellpadding="0"
				border="0"
			>
				<colgroup>
					{
						this.columns.map(column => <col name={ column.id } key={column.id} />)
					}
				</colgroup>
				<tbody>
					{
						data.reduce((acc, row) => {
							return acc.concat(this.renderRowWrapper(row, acc.length));
						}, [])
					}
				</tbody>
			</table>
		);
	},
};
