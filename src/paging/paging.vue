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

		<div class="__footer">
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
		reset: Boolean,
		// current: [Number, String], // .sync可以不声明；需要使用this.current, 必须声明
		type: [Number, String], // 待开发，tabs情况下
		mode: {
			type: String,
			validator(value) {
				return ['native', 'piece', 'table'].indexOf(value) !== -1;
			}
		},
		pieceClass: {
			type: String,
			default: ''
		}
	},
	data() {
		let { query: { page = 1, pageSize } } = getParseUrl();
		let { pageSizeOpts } = this.pageOpts;

		this.defaultPageSize = Number(pageSize || (pageSizeOpts && pageSizeOpts[0]) || 10);
		return {
			loading: false,
			currentPage: this.show ? Number(page) : 1,
			pageSize: this.defaultPageSize
		};
	},
	computed: {
		data() {
			return this.dataSource[this.currentPage];
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
		}
	},
	created() {
		let { query: { page = 1 } } = getParseUrl();
		this.show && this._loadData(page);
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