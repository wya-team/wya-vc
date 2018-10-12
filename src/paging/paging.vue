<template>
	<div>
		<i-table 
			:data="data[curPage]" 
			:columns="columns" 
			stripe
		/>
		<div style="margin: 10px; overflow: hidden">
			<div style="float: right;">
				<i-page 
					:total="total" 
					:current="curPage" 
					@on-change="handleChangePage"
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
		data: {
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
		total: {
			type: Number,
			default: 0
		},
		curPage: {
			type: Number,
			default: 1
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
		data(newVal, oldVal) {
			let oldValData = oldVal[this.curPage] || [];
			let newValData = newVal[this.curPage];
			if (oldValData.length > 0 && newValData.length === 0) {
				this.handleChangePage(this.curPage);
			}
		}
	},
	methods: {
		handleChangePage(page) {
			let { path, query } = getParseUrl();
			window.history.replaceState(null, null, getConstructUrl({
				path,
				query: {
					...query,
					page
				}
			}));
			this.$emit('load-data', page);
		},
	}
};
</script>
<style></style>