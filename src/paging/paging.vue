<template>
	<div>
		<i-table 
			:data="data" 
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
	name: "vc-tpl",
	components: {
		'i-table': Table,
		'i-page': Page
	},
	props: {
		data: {
			type: Array,
			default() {
				return [];
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
			console.log(newVal, oldVal, this.data);
			if (newVal !== oldVal) {
				this.handleChangePage(newVal);
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