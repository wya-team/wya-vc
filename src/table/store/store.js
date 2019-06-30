import Vue from 'vue';
import { VcError } from '../../vc';
import BaseWatcher from './base-watcher';

class Store extends BaseWatcher {
	constructor(table, initialState = {}) {
		super();

		if (!table) {
			throw new VcError('table', 'table必传');
		}
		this.table = table;

		/**
		 * rowKey
		 * defaultExpandAll
		 * selectOnIndeterminate
		 * indent
		 * lazy
		 * lazyColumnIdentifier
		 * childrenColumnName
		 * expandSelectable
		 */
		Object.keys(initialState).forEach(key => {
			this.states[key] = initialState[key];
		});
	}

	mutations = {
		setData(states, data) {
			// 用户是否修改了数据
			const dataInstanceChanged = states._data !== data;
			// clone
			states._data = data;
			// reset
			states.data = data;
			/**
			 * 数据变化，更新部分数据。
			 * 没有使用 computed，而是手动更新部分数据 
			 * https://github.com/vuejs/vue/issues/6660#issuecomment-331417140
			 */
			this.updateCurrentRow();
			this.updateExpandRows();
			if (!states.reserveSelection) {
				if (dataInstanceChanged) {
					this.clearSelection();
				} else {
					this.cleanSelection();
				}
			} else {
				this.assertRowKey();
				this.updateSelectionByRowKey();
			}
			this.updateAllSelected();

			this.updateTableScrollY();
		},

		/**
		 * states
		 * 	-> _columns
		 * 	-> selectable
		 * 	-> reserveSelection
		 */
		insertColumn(states, column, index, parent) {
			let array = states._columns;
			if (parent) {
				array = parent.children || [];
			}

			if (typeof index !== 'undefined') {
				array.splice(index, 0, column);
			} else {
				array.push(column);
			}

			if (column.type === 'selection') {
				states.selectable = column.selectable;
				states.reserveSelection = column.reserveSelection;
			}

			if (this.table.$ready) {
				this.updateColumns(); // hack for dynamics insert column
				this.scheduleLayout();
			}
		},

		removeColumn(states, column, parent) {
			let array = states._columns;
			if (parent) {
				array = parent.children || [];
			}
			if (array) {
				array.splice(array.indexOf(column), 1);
			}

			if (this.table.$ready) {
				this.updateColumns(); // hack for dynamics remove column
				this.scheduleLayout();
			}
		},

		toggleAllSelection() {
			this.toggleAllSelection();
		},

		rowSelectedChanged(states, row) {
			this.toggleRowSelection(row);
			this.updateAllSelected();
		},

		setHoverRow(states, row) {
			states.hoverRow = row;
		},

		setCurrentRow(states, row) {
			const oldCurrentRow = states.currentRow;
			states.currentRow = row;

			if (oldCurrentRow !== row) {
				this.table.$emit('current-change', row, oldCurrentRow);
			}
		}
	}

	commit(name, ...args) {
		const mutations = this.mutations;
		if (mutations[name]) {
			mutations[name].apply(this, [this.states].concat(args));
		} else {
			throw new VcError('table', `mutation 未定义：${name}`);
		}
	}

	updateTableScrollY() {
		Vue.nextTick(this.table.updateScrollY);
	}
}

export default Store;
