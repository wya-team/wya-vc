<template>
	<div class="vc-paging">
		<!-- 原生table -->
		<table v-if="mode === 'native'" class="vc-paging__native">
			<thead>
				<slot v-bind="columns" name="header">
					<th v-for="item in columns" :key="item">
						{{ item }}
					</th>
				</slot>
			</thead>
			<slot :data-source="data" />
		</table>

		<!-- 没有头部栏的header -->
		<!-- 项目中统一使用it, key由slot决定 -->
		<template v-for="(item, index) in data" v-else-if="mode === 'piece'">
			<slot :it="item" :index="index" />
		</template>
		
		<vc-table
			v-else
			ref="table" 
			:data-source="data" 
			v-bind="tableOpts"
			v-on="tableHooks"
		>
			<template #default>
				<slot />
			</template>
			<template #append>
				<slot name="append" />
			</template>
			<template #empty>
				<slot name="empty" />
			</template>
		</vc-table>
		
		<div v-if="footer" class="vc-paging__footer">
			<div>
				<slot name="extra" />
			</div>
			<div>
				<slot 
					v-if="$slots.page || $scopedSlots.page"
					:total="total"
					:count="count"
					:current="currentPage" 
					name="page"
				/>
				<vc-page
					v-else
					ref="page"  
					:count="Number(count)" 
					:current="currentPage"
					:page-size="pageSize"
					v-bind="pageOpts"
					@change="handleChange"
					@page-size-change="handleChangePageSize"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { URL, Storage } from '@wya/utils';
import { cloneDeep } from 'lodash';

import Page from '../page/index';
import Table from '../table';
import { VcInstance } from '../vc/index';

let localPageSize = 0;
let localPageSizeKey = '@wya/vc.paging.localPageSize';

Storage.get(localPageSizeKey);

export default {
	name: "vc-paging",
	components: {
		'vc-table': Table,
		'vc-page': Page,
	},
	// 不考虑使用
	// inheritAttrs: false,
	props: {
		// ---- table 组件属性 start, 其他属性使用$attrs
		dataSource: {
			type: Object,
			default() {
				return {};
			}
		},
		tableOpts: {
			type: Object,
			default: () => (VcInstance.config.Paging.pageOpts || {
				showCount: true,
				showSizer: true,
				showElevator: true,
				placement: 'top',
				pageSizeOpts: [10, 20, 30, 50, 100]
			})
		},
		// ---- end
		// ---- page 组件属性 start
		pageOpts: {
			type: Object,
			default: () => (VcInstance.config.Paging.pageOpts || {
				showCount: true,
				showSizer: true,
				showElevator: true,
				placement: 'top',
				pageSizeOpts: [10, 20, 30, 50, 100]
			})
		},
		// ---- end
		// 是否从url中获取page
		history: {
			type: Boolean,
			default: false
		},
		sync: {
			type: Boolean,
			default: false
		},
		// current: [Number, String], // .sync可以不声明；需要使用this.current, 必须声明
		mode: {
			type: String,
			validator(value) {
				return ['native', 'piece', 'table'].indexOf(value) !== -1;
			},
			default: 'table'
		},
		show: {
			type: Boolean,
			default: true
		},
		reset: Boolean,
		total: {
			type: Number,
			default: 0
		},
		count: {
			type: String | Number,
			default: 0
		},
		// 数据加载
		loadData: {
			type: Function,
			required: true
		},
		footer: {
			type: Boolean,
			default: true
		},
		auth: {
			type: Object,
			default: () => ({
				pageSize: true
			})
		}
	},
	data() {
		let { query: { page = 1, pageSize } } = URL.parse();
		let { pageSizeOpts } = this.pageOpts;
		this.defaultPageSize = Number(
			pageSize
			|| (this.auth.pageSize && localPageSize)
			|| (pageSizeOpts && pageSizeOpts[0]) 
			|| 10
		);
		return {
			loading: false,
			currentPage: this.show ? Number(page) : 1,
			pageSize: this.defaultPageSize,
		};
	},
	computed: {
		data() {
			let result = this.dataSource[this.currentPage];
			return result || [];
		},
		tableHooks() {
			return {
				...this.$listeners,
				change: () => {},
				pageSizeChange: () => {}
			};
		}
	},
	watch: {
		show(v) {
			if (v) {
				// tabs切换时保持pageSize不变
				let { query: { pageSize } } = URL.parse();
				if (this.pageSize != pageSize) {
					this.pageSize = Number(
						pageSize 
						|| (this.auth.pageSize && localPageSize) 
						|| this.defaultPageSize
					);
				}
				
				// 触发
				this.handleChange(this.currentPage);
			}
		},
		/**
		 * 先有count，才可以设置 currentPage，否则无效
		 */
		dataSource(v) {
			let page = this.reset === true 
				? this.currentPage // 当前页刷新
				: 1; // 首页刷新
			if (this.count === 0 && this.show) {
				this.currentPage = 0;
				this.handleChange(page);
			} else if (this.count === 0) {
				this.currentPage = 0;
			}
		}
	},
	created() {
		let { query: { page = 1 } } = URL.parse();
		this.show && this._loadData(page);
	},
	mounted() {
		if (this.mode === 'table') {
			// 方法映射
			this.clearSelection = this.$refs.table.clearSelection;
			this.toggleRowSelection = this.$refs.table.toggleRowSelection;
			this.toggleAllSelection = this.$refs.table.toggleAllSelection;
			this.toggleRowExpansion = this.$refs.table.toggleRowExpansion;
			this.setCurrentRow = this.$refs.table.setCurrentRow;
			this.doLayout = this.$refs.table.doLayout;
		}
	},
	methods: {
		handleChangePageSize(pageSize) {
			this.$emit('page-size-change', pageSize); // 清理数据
			this.pageSize = pageSize;

			localPageSize = pageSize;

			Storage.set(localPageSizeKey, pageSize);

			this.handleChange(1, pageSize);
		},
		handleChange(page, pageSize = this.pageSize) {
			// this.$emit('page-change', page);
			page = page || 1;
			if (this.history) {
				let { path, query } = URL.parse();
				let config = URL.merge({
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
		}
	}
};
</script>
<style lang="scss">
@import '../style/index.scss';

@include block(vc-paging) {
	@include element(native) {
		border-collapse: collapse;
	}
	@include element(footer) {
		display: flex; 
		justify-content: space-between; 
		align-items: center; 
		padding: 32px 0 0 0; 
		width: 100%;
	}
}
</style>