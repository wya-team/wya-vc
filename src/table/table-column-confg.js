import Checkbox from '../checkbox';
import Icon from '../icon';
import Spin from '../spin';
import { getPropByPath } from '../utils';

export const cellStarts = {
	default: {
		order: ''
	},
	selection: {
		width: 48,
		minWidth: 48,
		realWidth: 48,
		order: '',
		className: 'vc-table-column--selection'
	},
	expand: {
		width: 48,
		minWidth: 48,
		realWidth: 48,
		order: ''
	},
	index: {
		width: 48,
		minWidth: 48,
		realWidth: 48,
		order: ''
	}
};

// 这些选项不应该被覆盖
export const cellForced = {
	selection: {
		renderHeader(h, { store }) {
			return (
				<Checkbox
					value={this.isAllSelected} 
					disabled={store.states.data && store.states.data.length === 0}
					indeterminate={store.states.selection.length > 0 && !this.isAllSelected}
					nativeOnClick={this.toggleAllSelection}
				/>
			);
		},
		renderCell(h, { row, column, store, $index, level }) {
			return (
				<Checkbox
					v-show={store.states.expandSelectable || level === 0}
					value={store.isSelected(row)}
					disabled={
						column.selectable 
							? !column.selectable.call(null, row, $index) 
							: false 
					}
					onChange={() => store.commit('rowSelectedChanged', row) } 
					nativeOnClick={(event) => event.stopPropagation()}
				/>
			);
		},
		sortable: false,
		resizable: false
	},
	index: {
		renderHeader(h, { column }) {
			return column.label || '#';
		},
		renderCell(h, { $index, column }) {
			let i = $index + 1;
			const index = column.index;

			if (typeof index === 'number') {
				i = $index + index;
			} else if (typeof index === 'function') {
				i = index($index);
			}

			return (<div>{ i }</div>);
		},
		sortable: false
	},
	expand: {
		renderHeader(h, { column }) {
			return column.label || '';
		},
		renderCell(h, { row, store }) {
			const classes = ['vc-table__expand-icon'];
			if (store.states.expandRows.includes(row)) {
				classes.push('is-expand');
			}
			const handleClick = (e) => {
				e.stopPropagation();
				store.toggleRowExpansion(row);
			};
			return (
				<div class={ classes } onClick={handleClick}>
					<Icon type={'triangle-up'} />
				</div>
			);
		},
		sortable: false,
		resizable: false,
		className: 'vc-table__expand-column'
	}
};

/**
 * Cell默认渲染value 或 formatter
 */
export const defaultRenderCell = (h, { row, column = {}, $index }) => {
	const { prop, formatter } = column;

	let value;
	if (prop) {
		value = getPropByPath(row, prop).value;
	}

	if (formatter) {
		return column.formatter({ row, column, value, $index });
	}
	return value;
};

/**
 * Cell渲染前缀，如loading, expand
 */
export const treeCellPrefix = (h, { row, treeNode, store }) => {
	if (!treeNode) return null;
	const ele = [];
	const handleClick = (e) => {
		e.stopPropagation();
		store.loadOrToggle(row);
	};
	if (treeNode.indent) {
		ele.push(
			<span 
				class="vc-table__indent" 
				style={{ 
					'padding-left': treeNode.indent + 'px' 
				}} 
			/>
		);
	}
	if (typeof treeNode.expanded === 'boolean' && !treeNode.noLazyChildren) {
		const expandClasses = { 
			'vc-table__expand-icon': true, 
			'is-expand': treeNode.expanded 
		};
		
		ele.push(
			<span class={expandClasses} onClick={handleClick}>
				{ 
					treeNode.loading 
						? <Spin size={12} /> 
						: <Icon type={'triangle-up'} />
				}
			</span>
		);
	} else {
		ele.push(
			<span class="vc-table__placeholder" />
		);
	}
	return ele;
};
