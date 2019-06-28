import Vue from 'vue';
import { debounce } from 'lodash';
import { Utils } from '@wya/utils';
import { getKeysMap, getRowIdentity, getColumnById, getColumnByKey, toggleRowStatus } from '../utils';
import { flattenData } from '../../utils';
import ExpandMixin from './expand-mixin';
import CurrentMixin from './current-mixin';
import TreeMixin from './tree-mixin';

export default Vue.extend({
	mixins: [ExpandMixin, CurrentMixin, TreeMixin],
	data() {
		return {
			states: {
				// 3.0 版本后要求必须设置该属性
				rowKey: null,

				// 渲染的数据来源，是对 table 中的 data 过滤排序后的结果
				data: [],

				// 是否包含固定列
				isComplex: false,

				// 列
				_columns: [], // 不可响应的
				originColumns: [],
				columns: [],
				fixedColumns: [],
				rightFixedColumns: [],
				leafColumns: [],
				fixedLeafColumns: [],
				rightFixedLeafColumns: [],
				leafColumnsLength: 0,
				fixedLeafColumnsLength: 0,
				rightFixedLeafColumnsLength: 0,

				// 选择
				isAllSelected: false,
				selection: [],
				reserveSelection: false,
				selectOnIndeterminate: false,
				selectable: null,

				hoverRow: null,
				currentRow: null
			}
		};
	},

	methods: {
		// 检查 rowKey 是否存在
		assertRowKey() {
			const rowKey = this.states.rowKey;
			if (!rowKey) throw new Error('[vc-table] prop row-key is required');
		},

		// 更新列
		updateColumns() {
			const states = this.states;
			const _columns = states._columns || [];
			states.fixedColumns = _columns.filter((column) => column.fixed === true || column.fixed === 'left');
			states.rightFixedColumns = _columns.filter((column) => column.fixed === 'right');

			if (states.fixedColumns.length > 0 && _columns[0] && _columns[0].type === 'selection' && !_columns[0].fixed) {
				_columns[0].fixed = true;
				states.fixedColumns.unshift(_columns[0]);
			}

			const notFixedColumns = _columns.filter(column => !column.fixed);
			states.originColumns = [].concat(states.fixedColumns).concat(notFixedColumns).concat(states.rightFixedColumns);

			/**
			 * 多级表头，嵌套
			 */
			const leafColumns = flattenData(notFixedColumns);
			const fixedLeafColumns = flattenData(states.fixedColumns);
			const rightFixedLeafColumns = flattenData(states.rightFixedColumns);

			states.leafColumnsLength = leafColumns.length;
			states.fixedLeafColumnsLength = fixedLeafColumns.length;
			states.rightFixedLeafColumnsLength = rightFixedLeafColumns.length;

			states.columns = [].concat(fixedLeafColumns).concat(leafColumns).concat(rightFixedLeafColumns);

			states.isComplex = states.fixedColumns.length > 0 || states.rightFixedColumns.length > 0;
		},

		// 更新 DOM
		scheduleLayout(needUpdateColumns) {
			if (needUpdateColumns) {
				this.updateColumns();
			}
			this.table.debouncedUpdateLayout();
		},

		// 选择
		isSelected(row) {
			const { selection = [] } = this.states;
			return selection.indexOf(row) > -1;
		},

		/**
		 * 清除选择
		 */
		clearSelection() {
			this.states.isAllSelected = false;
			const oldSelection = this.states.selection;

			if (this.states.selection.length) {
				this.states.selection = [];
			}
			if (oldSelection.length > 0) {
				this.table.$emit('selection-change', []);
			}
		},

		/**
		 * 清理选择
		 */
		cleanSelection() {
			const selection = this.states.selection || [];
			const data = this.states.data;
			const rowKey = this.states.rowKey;
			let deleted;
			if (rowKey) {
				deleted = [];
				const selectedMap = getKeysMap(selection, rowKey);
				const dataMap = getKeysMap(data, rowKey);
				for (let key in selectedMap) {
					if (Utils.hasOwn(selectedMap, key) && !dataMap[key]) {
						deleted.push(selectedMap[key].row);
					}
				}
			} else {
				deleted = selection.filter((item) => {
					return data.indexOf(item) === -1;
				});
			}

			deleted.forEach((deletedItem) => {
				selection.splice(selection.indexOf(deletedItem), 1);
			});

			if (deleted.length) {
				this.table.$emit('selection-change', selection ? selection.slice() : []);
			}
		},

		toggleRowSelection(row, selected) {
			const changed = toggleRowStatus(this.states.selection, row, selected);
			if (changed) {
				const newSelection = this.states.selection ? this.states.selection.slice() : [];
				this.table.$emit('select', newSelection, row);
				this.table.$emit('selection-change', newSelection);
			}
		},

		toggleAllSelection: debounce(function () {
			const states = this.states;
			const { data = [], selection } = states;
			// when only some rows are selected (but not all), select or deselect all of them
			// depending on the value of selectOnIndeterminate
			const value = states.selectOnIndeterminate
				? !states.isAllSelected
				: !(states.isAllSelected || selection.length);
			states.isAllSelected = value;

			let selectionChanged = false;
			data.forEach((row, index) => {
				if (states.selectable) {
					if (states.selectable.call(null, row, index) && toggleRowStatus(selection, row, value)) {
						selectionChanged = true;
					}
				} else if (toggleRowStatus(selection, row, value)) {
					selectionChanged = true;
				}
			});

			if (selectionChanged) {
				this.table.$emit('selection-change', selection ? selection.slice() : []);
			}
			this.table.$emit('select-all', selection);
		}, 10),

		updateSelectionByRowKey() {
			const states = this.states;
			const { selection, rowKey, data = [] } = states;
			const selectedMap = getKeysMap(selection, rowKey);
			// TODO：这里的代码可以优化
			states.selection = data.reduce((prev, row) => {
				const rowId = getRowIdentity(row, rowKey);
				const rowInfo = selectedMap[rowId];
				if (rowInfo) {
					prev.push(row);
				}
				return prev;
			}, []);
		},

		updateAllSelected() {
			const { selection, rowKey, selectable, data = [] } = this.states;

			if (data.length === 0) {
				this.states.isAllSelected = false;
				return;
			}

			let selectedMap;
			if (rowKey) {
				selectedMap = getKeysMap(selection, rowKey); // -> object
			}
			const isSelected = function (row) {
				if (selectedMap) {
					return !!selectedMap[getRowIdentity(row, rowKey)];
				} else {
					return selection.includes(row);
				}
			};
			let isAllSelected = true;
			let selectedCount = 0;
			for (let i = 0, j = data.length; i < j; i++) {
				const item = data[i];
				const isRowSelectable = selectable && selectable.call(null, item, i);
				if (!isSelected(item)) {
					if (!selectable || isRowSelectable) {
						isAllSelected = false;
						break;
					}
				} else {
					selectedCount++;
				}
			}

			if (selectedCount === 0) isAllSelected = false;
			this.states.isAllSelected = isAllSelected;
		},

		// 适配层，expand-row-keys 在 Expand 与 TreeTable 中都有使用
		setExpandRowKeysAdapter(val) {
			// 这里会触发额外的计算，但为了兼容性，暂时这么做
			this.setExpandRowKeys(val);
			this.updateTreeExpandKeys(val);
		},

		// 展开行与 TreeTable 都要使用
		toggleRowExpansionAdapter(row, expanded) {
			const hasExpandColumn = this.states.columns.some(({ type }) => type === 'expand');
			if (hasExpandColumn) {
				this.toggleRowExpansion(row, expanded);
			} else {
				this.toggleTreeExpansion(row, expanded);
			}
		}
	}
});