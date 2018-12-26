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
			:data="data" 
			:loading="loading"
			:columns="columns"
			:stripe="true"
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
import { getConstructUrl, getParseUrl, cloneDeep, cloneDeepEasier } from '../utils/utils';
import { VcInstance } from '../vc/index';

export default {
	name: "vc-paging",
	components: {
		'i-table': Table,
		'i-page': Page,
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
			default: () => (VcInstance.config.Paging.pageOpts || {
				showTotal: true,
				showSizer: true,
				showElevator: true,
				placement: 'top',
				pageSizeOpts: [10, 20, 30, 50, 100]
			})
		},
		// expand 不针对iview中columns中的 expand
		expandOpts: {
			type: Object,
			default: () => {
				return {
					all: false,
					key: 'id', 
					keys: [] 
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

		this.defaultPageSize = Number(pageSize || pageSizeOpts.pageSize || (pageSizeOpts && pageSizeOpts[0]) || 10);
		return {
			loading: false,
			currentPage: this.show ? Number(page) : 1,
			pageSize: this.defaultPageSize,

			// 内部不直接修改外部的值
			rebuildData: {}
		};
	},
	computed: {
		data() {
			let result = this.rebuildData[this.currentPage];
			return result || [];
		}
	},
	watch: {
		show(v) {
			if (v) {
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
		 * 先有total，才可以设置 currentPage，否则无效
		 */
		dataSource(v) {
			let page = this.reset === true 
				? this.currentPage // 当前页刷新
				: 1; // 首页刷新
			if (this.total === 0 && this.show) {
				this.currentPage = 0;
				this.handleChange(page);
			} else if (this.total === 0) {
				this.currentPage = 0;
			}

			// 页数不为0，赋值新的数据
			if (this.currentPage != 0) {
				this.rebuildData = this.makeRebuildData('dataSource');
			}
			
		},
		currentPage(v, old) {
			// 清空数据
			if (v === 0) {
				this.rebuildData = {};
			} else if (old === 0 && !this.rebuildData[v]) {
				// 老页数为0，代表清理数据了，新数据赋值，主要处理已加载数据后被清理，this.rebuildData需要重写
				this.rebuildData = this.makeRebuildData('currentPage');
			}

		},
		rebuildData: {
			deep: process.env.NODE_ENV !== 'production',
			handler() {
				// console.log('[vc-paging] - rebuild');
			}
		}
	},
	created() {
		let { query: { page = 1 } } = getParseUrl();
		this.show && this._loadData(page);

		// 有数据的情况下，初始化， todo: 是否需要判断其他分页
		if (this.dataSource[page]) {
			this.rebuildData = this.makeRebuildData('created');
		}
	},
	methods: {
		/**
		 * type: 判断是由谁触发的，用于优化性能
		 */
		makeRebuildData(type) {
			let data = {};

			if (type === 'created') { // 初始化的时候，可能会有默认数据
				for (let page in this.dataSource) {
					data[page] = this.makeRebuildDataWithPage(page);
				}	
			} else {
				data = {
					...this.rebuildData,
					[this.currentPage]: this.makeRebuildDataWithPage()
				};
			}
			return data;
		},
		/**
		 * 不影响外部的值 
		 */
		makeRebuildDataWithPage(page = this.currentPage) {
			if (!this.dataSource[page]) return;

			let data = cloneDeep(this.dataSource[page]);
			// 初始化结构数据
			if (this.show 
				&& this.total !== 0 
				&& data 
				&& data.__expand__ === undefined 
				&& data.some(item => item.children instanceof Array)
			) {
				data = this.makeRebuildDataForExpand(1, data);

				const { all, keys, key } = this.expandOpts; 
				if (all || keys.length > 0) {
					data = this.getLinearArray(data);
					this.emitExpand({ type: 'init', expandData: data });
				}

				data.__expand__ = true;
			}
			return data;
		},
		/**
		 * 设备默认值, todo: 浅拷贝是否提高性能
		 */
		makeRebuildDataForExpand(level, treeArray) {
			treeArray = cloneDeep(treeArray);
			const { all, key, keys = [] } = this.expandOpts;

			let fn = (item) => {
				item.__level__ = level;
				if (item.children && item.children.length > 0) {
					item.__expand__ = all || (keys.length !== 0 && keys.includes(item[key])); 
					item.children = this.makeRebuildDataForExpand(level + 1, item.children);
				}
				return item;
			};
			return treeArray.map(fn);
		},
		/**
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

			let result = treeArray.reduce(fn, []);

			return result;
		},
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


			// 给外部触发
			this.$emit('page-change', page);
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
		expand(opts = {}) {

			let targetArr = this.rebuildData[this.currentPage];

			let { e, index } = opts;
			const { children, __level__, __expand__ } = targetArr[index] || {};

			// 没有扩展功能
			if (!children || !__level__ || this.loadingExpand) return;

			if (children.length === 0 && this.loadExpandData) {
				const load = this.loadExpandData({ ...opts, row: targetArr[index] });
				
				if (!this.loadingExpand && load && load.then) {
					this.loadingExpand = true;
					load.then((children) => {
						if (children instanceof Array) {
							children = this.makeRebuildDataForExpand(__level__ + 1, children);

							// 同步到data中	
							targetArr[index].__expand__ = true;
							targetArr[index].children = children;
							targetArr.splice(index + 1, 0, ...this.getLinearArray(children));

							this.emitExpand(opts);
						}
						return children;
					}).catch((res) => {
						return Promise.reject(res);
					}).finally(() => {
						this.loadingExpand = false;
					});
				} else {
					console.error('[vc-paging] - loadExpandData need return a Promise');
				}

			} else if (children.length > 0) {

				const { data } = this;
				if (__expand__) {
					targetArr[index].__expand__ = false;
					// 计算要移除的元素数量
					let count = 0;
					for (let i = index + 1; i < data.length; i++) {
						if (__level__ == data[i].__level__ || __level__ > data[i].__level__) {
							break;
						}
						count++;
					}
					targetArr.splice(index + 1, count);
				} else {
					targetArr[index].__expand__ = true;
					targetArr.splice(index + 1, 0, ...this.getLinearArray(children));
				}
				this.emitExpand(opts);
			}
		},
		emitExpand(opts = {}) {
			const { index, type, expandData } = opts; 
			let targetArr = type === 'init' ? expandData : this.rebuildData[this.currentPage];
			// todo: 优化，目前是每次都计算
			let maxLevel = 0;

			targetArr.forEach((item) => {
				if (maxLevel < item.__level__) {
					maxLevel = item.__level__;
				}
			});

			this.$emit('expand', { 
				...opts, 
				row: cloneDeepEasier(targetArr[index] || []), 
				maxLevel,
				callback: (opts = {}) => {
					const { selected, all = false } = opts;
					// todo: 重新选择已选中的，设置_checked
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