<template>
	<div>
		<i-table
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
		<div style="margin: 10px; overflow: hidden">
			<div style="float: right;">
				<i-page
					ref="pageTarget"  
					:total="total" 
					:current="currentPage"
					v-bind="pageOpts"
					@on-change="handleChangePage"
					@on-page-size-change="$emit('page-size-change', arguments[0])"
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
		pageOpts: Object,
		total: {
			type: Number,
			default: 0
		},
		// 是否从url中获取page
		history: {
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
		type: [Number, String], // 待开发，tabs情况下
	},
	data() {
		let { query: { page = 1 } } = getParseUrl();
		return {
			loading: false,
			currentPage: Number(page)
		};
	},
	computed: {
		data() {
			return this.dataSource[this.currentPage];
		}
	},
	watch: {
		dataSource(newVal, oldVal) {
			let page = this.reset === true 
				? this.currentPage // 当前页刷新
				: 1; // 首页刷新
			if (this.total === 0 && this.show) {
				this.currentPage = 0;
				this.handleChangePage(page);
			}
		},
		show(newVal, oldVal) {
			if (newVal) {
				this.handleChangePage(this.currentPage);
			}
		}
	},
	created() {
		let { query: { page = 1 } } = getParseUrl();
		this.show && this.loadDataForPage(page);
	},
	methods: {
		handleChangePage(page) {
			page = page || 1;
			let { path, query } = getParseUrl();

			this.history && window.history.replaceState(null, null, getConstructUrl({
				path,
				query: {
					...query,
					page
				}
			}));
			this.loadDataForPage(page);
		},
		loadDataForPage(page) {
			// set-page
			if (this.currentPage !== 0) {
				this.currentPage = page;
			}
			let arr = this.dataSource[page];
			if (!arr || arr.length === 0) {
				const load = this.loadData(page);
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
						if (this.currentPage === 0) {
							this.currentPage = page;
						}
						this.$emit('load-finish');
					});
				} else {
					console.error('[vc-paging]-loadData need return a Promise');
				}
			}
		}
	}
};
</script>
<style></style>