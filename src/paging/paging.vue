<template>
	<div class="vc-paging">
		<!-- 原生table -->
		<table v-if="mode === 'native'" class="_native-table">
			<thead>
				<th v-for="item in columns" :key="item">
					{{ item }}
				</th>
			</thead>
			<slot :data="data" />
		</table>

		<!-- 没有头部栏的header -->
		<template v-for="item in data" v-else-if="mode === 'piece'">
			<slot v-bind="item" />
		</template>
		
		<i-table
			v-else
			ref="tableTarget" 
			:data="dataCombo" 
			:loading="loading"
			:columns="columnsCombo"
			v-bind="tableOpts"
			@on-current-change="$emit('current-change', arguments[0], arguments[1])"
			@on-select="$emit('select', arguments[0], arguments[1])"
			@on-select-cancel="$emit('select-cancel', arguments[0])"
			@on-select-all="$emit('select-all', arguments[0])"
			@on-select-all-cancel="$emit('select-all-cancel', arguments[0])"
			@on-selection-change="$emit('selection-change', arguments[0])"
			@on-sort-change="$emit('sort-change', arguments[0])"
			@on-filter-change="$emit('filter-change', arguments[0])"
			@on-row-click="$emit('row-click', arguments[0], arguments[1])"
			@on-row-dblclick="$emit('row-dblclick', arguments[0], arguments[1])"
			@on-expand="$emit('expand', arguments[0], arguments[1])"
		>
			<slot name="header" />
			<slot name="footer" />
			<slot name="loading" />
		</i-table>
		
		<div v-if="footer" class="__footer">
			<div>
				<slot name="extra" />
			</div>
			<div>
				<slot 
					v-if="$slots.page || $scopedSlots.page"
					:total="total"
					:current="currentPage" 
					name="page"
				/>
				<i-page
					v-else
					ref="pageTarget"  
					:total="total" 
					:current="currentPage"
					:page-size="pageSize"
					v-bind="pageOpts"
					@on-change="handleChange"
					@on-page-size-change="handleChangePageSize"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { Table, Page } from 'iview';
import { cloneDeep } from 'lodash';
import { getConstructUrl, getParseUrl } from '../utils/utils';

export default {
	name: "vc-paging",
	components: {
		'i-table': Table,
		'i-page': Page
	},
	props: {
		// table组件属性
		tableOpts: {
			type: Object,
			default: () => ({})
		},
		dataSource: {
			type: Object,
			default() {
				return {};
			}
		},
		columns: {
			type: Array,
			default() {
				return [];
			}
		},
		// page 组件属性
		pageOpts: {
			type: Object,
			default: () => ({
				showTotal: true,
				showSizer: true,
				showElevator: true,
				// transfer: true,
				placement: 'top',
				pageSizeOpts: [10, 20, 30, 50, 100]
			})
		},
		// expand 不针对iview中columns中的 expand
		expandOpts: {
			type: Object,
			default: (test) => {
				return {
					all: false,
					key: 'id', 
					keys: [], 
					index: 0, 
					width: 60,
					indentSize: 20, 
					render: undefined, 
				};
			}
		},
		total: {
			type: Number,
			default: 0
		},
		// 是否从url中获取page
		history: {
			type: Boolean,
			default: false
		},
		sync: {
			type: Boolean,
			default: false
		},
		show: {
			type: Boolean,
			default: true
		},
		// 数据加载
		loadData: {
			type: Function,
			required: true
		},
		loadExpandData: Function,
		reset: Boolean,
		// current: [Number, String], // .sync可以不声明；需要使用this.current, 必须声明
		type: [Number, String], // 待开发，tabs情况下
		mode: {
			type: String,
			validator(value) {
				return ['native', 'piece', 'table'].indexOf(value) !== -1;
			},
			default: 'table'
		},
		pieceClass: {
			type: String,
			default: ''
		},
		footer: {
			type: Boolean,
			default: true
		} 
	},
	data() {
		let { query: { page = 1, pageSize } } = getParseUrl();
		let { pageSizeOpts } = this.pageOpts;

		this.defaultPageSize = Number(pageSize || (pageSizeOpts && pageSizeOpts[0]) || 10);
		return {
			loading: false,
			currentPage: this.show ? Number(page) : 1,
			pageSize: this.defaultPageSize,
			// 用于expand
			dataCombo: []
		};
	},
	computed: {
		data() {
			let result = this.dataSource[this.currentPage];
			if (result && result.__expand__ === undefined && result.some(item => item.children instanceof Array)) {

				result.__expand__ = true; // 避免被设置后再次递归一次
				result.map(this.setDefaultExpand(1));
			}
			return result || [];
		},
		columnsCombo() {
			let result = this.columns;
			let hasChild = this.data.some(item => item.children instanceof Array);
			const { index } = this.expandOpts;
			// 已经注入的不会再注入
			if (this.mode === 'table' && hasChild && !result[index].tag) {
				// 重新组合，避免tabs下共享实例
				result = this.columns.slice(0); // 避免副作用
				result.splice(index, 0, this.getExpandOpts.call(this));
			}
			return result;
		}
	},
	watch: {
		/**
		 * 先有total，才可以设置 currentPage，否则无效
		 */
		dataSource(newVal, oldVal) {
			let page = this.reset === true 
				? this.currentPage // 当前页刷新
				: 1; // 首页刷新
			if (this.total === 0 && this.show) {
				this.currentPage = 0;
				this.handleChange(page);
			} else if (this.total === 0) {
				this.currentPage = 0;
			}
		},
		show(newVal, oldVal) {
			if (newVal) {
				// tabs切换时保持pageSize不变
				let { query: { pageSize } } = getParseUrl();
				if (this.pageSize != pageSize) {
					this.pageSize = Number(pageSize || this.defaultPageSize);
				}
				
				// 触发
				this.handleChange(this.currentPage);
			}
		},
		/**
		 * 当前表格的数据计算是否扩展
		 * dataCombo
		 * 尽量保证修改副本，不直接修改this.data
		 */
		data(newVal, oldVal) {
			if (newVal.some(item => item.children instanceof Array)) {
				this.dataCombo = this.getLinearArray(newVal);
			} else {
				this.dataCombo = newVal;
			}
		}
	},
	created() {
		let { query: { page = 1 } } = getParseUrl();
		this.show && this._loadData(page);

		// 初始化数据
		this.dataCombo = this.data;
	},
	methods: {
		handleChangePageSize(pageSize) {
			this.$emit('page-size-change', pageSize); // 清理数据
			this.pageSize = pageSize;

			this.handleChange(1, pageSize);
		},
		handleChange(page, pageSize = this.pageSize) {
			// this.$emit('page-change', page);
			page = page || 1;
			let { path, query } = getParseUrl();
			if (this.history) {
				let config = getConstructUrl({
					path,
					query: {
						...query,
						page,
						pageSize
					}
				});
				// 同步vue-router，this.$route
				(this.$router && this.sync)
					? this.$router.replace(config)
					: window.history.replaceState(null, null, config);
			}
			this._loadData(page, pageSize);
		},
		_loadData(page, pageSize = this.pageSize) {
			// set-page
			this.currentPage !== 0 && this.setCurrentPage(page);

			// 是否已有数据
			let arr = this.dataSource[page];
			if (arr && typeof arr.length === 'number') return;

			// 请求
			const load = this.loadData(page, this.pageSize);
			if (load && load.then) {
				this.loading = true;
				this.$emit('load-pending');
				load.then((res) => {
					this.$emit('load-success', res);
					return res;
				}).catch((res) => {
					this.$emit('load-fail', res);
					return Promise.reject(res);
				}).finally(() => {
					this.loading = false;
					this.currentPage === 0 && this.setCurrentPage(page);
					this.$emit('load-finish');
				});
			} else {
				console.error('[vc-paging]-loadData need return a Promise');
			}
		},
		/**
		 * 内部使用
		 */
		setCurrentPage(page) {
			this.currentPage = page;
			this.$emit('update:current', page);
		},
		/**
		 * 外部调用
		 */
		go(page) {
			this.handleChange(page);
		},

		/**
		 * 扩展功能
		 */
		getExpandOpts() {
			const { key, render, width, indentSize } = this.expandOpts;
			return {
				tag: true,
				title: '　',
				key: 'id',
				width,
				align: 'center',
				render: (h, params) => {
					const { row: { __level__, __expand__ }, index } = params;
					const { dataCombo } = this;
					
					let { children } = dataCombo[index] || {}; // 不拿row中children; row会被深度拷贝
					// 点击展开事件
					const handleClick = (e) => this.handleExpand({ e, index });

					if (render) {
						return render(h, { ...params, row: dataCombo[index] }, handleClick);
					} else {
						return h('div', {
							style: {
								marginLeft: `${(__level__ - 1) * indentSize}px`,
								width: `20px`,
								boxSizing: `content-box`
							},
							on: {
								click: handleClick 
							}
						}, `${children ? !__expand__ ? '+' : '-' : ''}`);
					}
					
				}
			};
		},
		/**
		 * 扩展功能
		 * 设备默认值
		 */
		setDefaultExpand(level) {
			const { all, key, keys = [] } = this.expandOpts;

			return (item) => {
				item.__level__ = level; // 不重新返回，直接赋值
				item.__expand__ = all || (keys.length !== 0 && keys.includes(item[key])); 
				if (item.children) {
					item.children.map(this.setDefaultExpand(level + 1));
				}
				return item;
			};
		},
		/**
		 * 扩展功能
		 * 根据需要获取线性的数组
		 */
		getLinearArray(treeArray) {
			let fn = (pre, cur) => {
				pre = [...pre, cur];
				if (cur.children && cur.__expand__ === true) {
					pre = [...pre, ...cur.children.reduce(fn, [])];
				}
				return pre;
			};
			return treeArray.reduce(fn, []);
		},
		/**
		 * 扩展功能
		 */
		handleExpand(opts = {}) {
			const { e, index } = opts;
			const { children, __level__, __expand__ } = this.dataCombo[index] || {};
			// 没有扩展功能
			if (!children || !__level__) return;

			if (children.length === 0 && this.loadExpandData) {
				const load = this.loadExpandData(opts);

				if (load && load.then) {
					this.loading = true;
					load.then((children) => {
						if (children instanceof Array) {
							children.map(this.setDefaultExpand(__level__ + 1));

							// 同步到data中
							this.dataCombo[index].__expand__ = true;
							this.dataCombo[index].children = children;
							this.dataCombo.splice(index + 1, 0, ...this.getLinearArray(children));

							this.emitExpand(opts);
						}
						return children;
					}).catch((res) => {
						return Promise.reject(res);
					}).finally(() => {
						this.loading = false;
					});
				} else {
					console.error('[vc-paging]-loadExpandData need return a Promise');
				}

			} else if (children.length > 0) {

				const { dataCombo } = this;
				if (__expand__) {
					this.dataCombo[index].__expand__ = false;

					// 计算要移除的元素数量
					let count = 0;
					for (let i = index + 1; i < dataCombo.length; i++) {
						if (__level__ == dataCombo[i].__level__ || __level__ > dataCombo[i].__level__) {
							break;
						}
						count++;
					}
					this.dataCombo.splice(index + 1, count);
				} else {
					this.dataCombo[index].__expand__ = true;
					this.dataCombo.splice(index + 1, 0, ...this.getLinearArray(children));
				}
				this.emitExpand(opts);
			}
		},
		emitExpand(opts = {}) {
			const { index } = opts; 
			this.$emit('expand', { 
				...opts, 
				row: this.dataCombo[index], 
				callback: (opts = {}) => {
					const { selected, all = false } = opts;
					// 待开发， 重新选择已选中的，设置_checked
				} 
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.vc-paging {
	._native-table {
		border-collapse:collapse;
	}
	.__footer {
		display: flex; 
		justify-content: space-between; 
		align-items: center; 
		padding: 10px; 
		width: 100%;
	}
}
</style>