<template>
	<div v-show="show">
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
					:current="current"
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
		reset: Number
	},
	data() {
		let { query: { page = 1 } } = getParseUrl();
		return {
			loading: false,
			current: page
		};
	},
	computed: {
		data() {
			return this.dataSource[this.current];
		}
	},
	watch: {
		dataSource(newVal, oldVal) {
			let arr = this.dataSource[this.reset];
			if (!arr || arr.length === 0) {
				this.current = 0;
				this.handleChangePage(this.reset || 1);
			}
		},
		show(newVal, oldVal) {
			// Table显示时，去发起请求
			// if (newVal) {
			// 	this.handleChangePage(1);
			// }
		}
	},
	created() {
		let { query: { page = 1 } } = getParseUrl();
		this.show && this.loadDataForPage(page);
	},
	methods: {
		handleChangePage(page = 1) {
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
			this.current && (this.current = page);

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
						!this.current && (this.current = page);
						this.$emit('load-finish');
					});
				} else {
					console.log();
				}
			}
		}
	}
};
</script>
<style></style>