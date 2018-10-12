<template>
	<div>
		<i-table
			ref="vc-table" 
			:data="dataSource[curPage]" 
			:columns="columns" 
			:size="tableSize" 
			:width="width" 
			:height="height" 
			:stripe="stripe" 
			:border="border" 
			:show-header="showHeader" 
			:highlight-row="highlightRow" 
			:row-class-name="rowClassName" 
			:context="context" 
			:no-data-text="noDataText" 
			:no-filtered-data-text="noFilteredDataText" 
			:disabled-hover="disabledHover" 
			:loading="loading"
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
					ref="vc-page"  
					:total="total" 
					:current="curPage"
					:page-size="pageSize"
					:page-size-opts="pageSizeOpts" 
					:placement="placement" 
					:transfer="transfer" 
					:size="size" 
					:simple="simple" 
					:show-total="showTotal" 
					:show-elevator="showElevator" 
					:show-sizer="showSizer" 
					:class-name="className" 
					:styles="styles" 
					:prev-text="prevText" 
					:next-text="nextText" 
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
		tableSize: {
			type: String
		},
		width: {
			type: [Number, String]
		},
		height: {
			type: [Number, String]
		},
		stripe: {
			type: Boolean,
			default: false
		},
		border: {
			type: Boolean,
			default: false
		},
		showHeader: {
			type: Boolean,
			default: true
		},
		highlightRow: {
			type: Boolean,
			default: false
		},
		rowClassName: {
			type: Function,
			default() {
				return '';
			}
		},
		context: {
			type: Object
		},
		noDataText: {
			type: String
		},
		noFilteredDataText: {
			type: String
		},
		disabledHover: {
			type: Boolean
		},
		loading: {
			type: Boolean,
			default: false
		},
		// page 组件属性
		curPage: {
			type: Number,
			default: 1
		},
		total: {
			type: Number,
			default: 0
		},
		pageSize: {
			type: Number,
			default: 10
		},
		pageSizeOpts: {
			type: Array,
			default() {
				return [10, 20, 30, 40];
			}
		},
		placement: {
			type: String,
			default: 'bottom'
		},
		transfer: {
			type: Boolean,
		},
		size: {
			type: String
		},
		simple: {
			type: Boolean,
			default: false
		},
		showTotal: {
			type: Boolean,
			default: false
		},
		showElevator: {
			type: Boolean,
			default: false
		},
		showSizer: {
			type: Boolean,
			default: false
		},
		className: {
			type: String
		},
		styles: {
			type: Object
		},
		prevText: {
			type: String,
			default: ''
		},
		nextText: {
			type: String,
			default: ''
		},
		// 是否从url中获取page
		history: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	watch: {
		curPage(newVal, oldVal) {
			if (newVal !== oldVal) {
				this.handleChangePage(newVal);
			}
		},
		dataSource(newVal, oldVal) {
			let oldValData = oldVal[this.curPage] || [];
			let newValData = newVal[this.curPage] || [];
			if (oldValData.length > 0 && newValData.length === 0) {
				this.handleChangePage(this.curPage);
			}
		}
	},
	methods: {
		handleChangePage(page) {
			let { path, query } = getParseUrl();
			this.history && window.history.replaceState(null, null, getConstructUrl({
				path,
				query: {
					...query,
					page
				}
			}));
			this.$emit('page-change', page);
		},
	}
};
</script>
<style></style>