import { walkTreeNode, getRowIdentity } from '../utils';
import { VcError } from '../../vc';

export default {
	data() {
		return {
			states: {
				indent: 16,
				// defaultExpandAll 存在于 expand.js 中，这里不重复添加
				// TODO: 拆分为独立的 TreeTable，在 expand 中，展开行的记录是放在 expandRows 中，统一用法
				expandRowKeys: [],
				expandSelectable: true,
				treeData: {}, // item的状态，比如loading, loaded
				lazy: false,
				lazyTreeNodeMap: {}, // 源数据
				lazyTreeData: [], // 源数据展开
				lazyColumnIdentifier: 'hasChildren',
				childrenColumnName: 'children'
			}
		};
	},

	computed: {
		/**
		 * 解决问题嵌入型的数据，watch 无法是检测到变化
		 * TODO: 是否会造成性能问题？同base-watcher flattenData
		 * @return { id: { level, children } }
		 */
		normalizedData() {
			if (!this.states.rowKey) return {};
			const data = this.states.data || [];
			return this.normalize(data);
		},
		/**
		 * 针对懒加载的情形，不处理嵌套数据
		 * @return { id: { children } }
		 */
		normalizedLazyNode() {
			const { rowKey, lazyTreeNodeMap, lazyColumnIdentifier, childrenColumnName } = this.states;
			const keys = Object.keys(lazyTreeNodeMap);
			const res = {};
			if (!keys.length) return res;
			keys.forEach(key => {
				if (lazyTreeNodeMap[key].length) {
					const item = { children: [] };
					lazyTreeNodeMap[key].forEach(row => {
						const currentRowKey = getRowIdentity(row, rowKey);
						item.children.push(currentRowKey);

						let hasChildren = row[lazyColumnIdentifier] || (row[childrenColumnName] && row[childrenColumnName].length === 0);
						if (hasChildren && !res[currentRowKey]) {
							res[currentRowKey] = { children: [] };
						}
					});
					res[key] = item;
				}
			});
			return res;
		}
	},

	watch: {
		normalizedData: 'updateTreeData',
		// expandRowKeys 在 TreeTable 中也有使用
		expandRowKeys: 'updateTreeData',
		normalizedLazyNode: 'updateTreeData'
	},

	methods: {
		normalize(data) {
			const { childrenColumnName, lazyColumnIdentifier, rowKey, lazy } = this.states;
			const res = {};
			walkTreeNode(data, (parent, children, level) => {
				const parentId = getRowIdentity(parent, rowKey);
				if (Array.isArray(children)) {
					res[parentId] = {
						children: children.map(row => getRowIdentity(row, rowKey)),
						level
					};
				} else if (lazy) {
					// 当 children 不存在且 lazy 为 true，该节点即为懒加载的节点
					res[parentId] = {
						children: [],
						lazy: true,
						level
					};
				}
			}, childrenColumnName, lazyColumnIdentifier);
			return res;
		},

		/**
		 * 获取当前展开最大的level
		 */
		getMaxLevel() {
			let level = 0;
			Object.keys(this.states.treeData).forEach((item) => {
				let target = this.states.treeData[item];
				if (target.expanded && target.level >= level) {
					level = target.level + 1;
				}
			});

			return level;
		},

		updateTreeData() {
			const nested = this.normalizedData;
			const normalizedLazyNode = this.normalizedLazyNode;
			const keys = Object.keys(nested);
			if (!keys.length) return;
			const { treeData: oldTreeData, defaultExpandAll, expandRowKeys, lazy } = this.states;
			const newTreeData = {};
			const rootLazyRowKeys = [];
			const getExpanded = (oldValue, key) => {
				const included = defaultExpandAll || (expandRowKeys && expandRowKeys.indexOf(key) !== -1);
				return !!((oldValue && oldValue.expanded) || included);
			};
			// 合并 expanded 与 display，确保数据刷新后，状态不变
			keys.forEach(key => {
				const oldValue = oldTreeData[key];
				const newValue = { ...nested[key] };
				newValue.expanded = getExpanded(oldValue, key);
				if (newValue.lazy) {
					const { loaded = false, loading = false } = oldValue || {};
					newValue.loaded = !!loaded;
					newValue.loading = !!loading;
					rootLazyRowKeys.push(key);
				}
				newTreeData[key] = newValue;
			});
			// 根据懒加载数据更新 treeData
			const lazyKeys = Object.keys(normalizedLazyNode);
			if (lazy && lazyKeys.length && rootLazyRowKeys.length) {
				lazyKeys.forEach(key => {
					const oldValue = oldTreeData[key];
					const lazyNodeChildren = normalizedLazyNode[key].children;
					if (rootLazyRowKeys.includes(key)) {
						// 懒加载的 root 节点，更新一下原有的数据，原来的 children 一定是空数组
						if (newTreeData[key].children.length !== 0) {
							throw new VcError('table', 'children需要为空数组');
						}
						newTreeData[key].children = lazyNodeChildren;
					} else {
						const { loaded = false, loading = false } = oldValue || {};
						newTreeData[key] = {
							lazy: true,
							loaded: !!loaded,
							loading: !!loading,
							expanded: getExpanded(oldValue, key),
							children: lazyNodeChildren,
							level: ''
						};
					}
				});
			}
			this.states.treeData = newTreeData;
			this.updateTableScrollY();
		},

		updateTreeExpandKeys(value) {
			// 仅仅在包含嵌套数据时才去更新
			if (Object.keys(this.normalizedData).length) {
				this.states.expandRowKeys = value;
				this.updateTreeData();
			}
		},

		toggleTreeExpansion(row, expanded) {
			this.assertRowKey();

			const { rowKey, treeData } = this.states;
			const id = getRowIdentity(row, rowKey);
			const data = id && treeData[id];
			const oldExpanded = treeData[id].expanded;
			if (id && data && ('expanded' in data)) {
				expanded = typeof expanded === 'undefined' ? !data.expanded : expanded;
				treeData[id].expanded = expanded;
				if (oldExpanded !== expanded) {
					this.table.$emit('expand-change', row, expanded, this.getMaxLevel());
				}
				this.updateTableScrollY();
			}
		},

		loadOrToggle(row) {
			this.assertRowKey();
			const { lazy, treeData, rowKey } = this.states;
			const id = getRowIdentity(row, rowKey);
			const data = treeData[id];
			if (lazy && data && ('loaded' in data) && !data.loaded) {
				this.loadData(row, id, data);
			} else {
				this.toggleTreeExpansion(row);
			}
		},

		loadData(row, key, treeNode) {
			const { lazyTreeNodeMap, treeData } = this.states;
			if (this.table.loadExpand && !treeData[key].loaded) {
				
				treeData[key].loading = true;
				let promise = this.table.loadExpand(row, treeNode);

				let fn = (data) => {
					if (!Array.isArray(data)) {
						throw new VcError('table', 'data必须是数组');
					}
					treeData[key].loading = false;
					treeData[key].loaded = true;
					treeData[key].expanded = true;
					if (data.length) {
						this.$set(lazyTreeNodeMap, key, data);

						// 用新的lazyTreeNodeMap计算lazyTreeData
						if (this.states.expandSelectable) {
							this.states.lazyTreeData = Object.keys(lazyTreeNodeMap).reduce((pre, cur) => {
								return pre.concat(lazyTreeNodeMap[cur]);
							}, []);
						}
					}
					this.table.$emit('expand-change', row, true, this.getMaxLevel());

					// 对异步过来的数据进行选择
					if (this.isSelected(row)) {
						data.forEach((i) => {
							this.toggleRowSelection(i);	
						});
					}
					this.updateAllSelected();
				};

				if (promise && promise.then) {
					promise.then((data) => fn(data)).catch(e => {
						throw new VcError('table', e);
					});
				} else if (Array.isArray(data)) {
					fn(data);
				}
				
			}
		},
	}
};
