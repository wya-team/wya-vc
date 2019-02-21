<template>
	<i-table 
		:data="data"
		:columns="columns"
		:shadow="shadow"
		:stripe="stripe"
		:border="border"
		:show-header="showHeader"
		:width="width"
		:height="height"
		:loading="loading"
		:disabled-hover="disabledHover"
		:highlight-row="highlightRow"
		:row-class-name="rowClassName"
		:size="size"
		:no-data-text="noDataText"
		:no-filtered-data-text="noFilteredDataText"
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
		<slot slot="header" name="header" />
		<slot slot="footer" name="footer" />
		<slot slot="loading" name="loading" />
	</i-table>
</template>
<script>
import Table from 'iview/src/components/table';

export default {
	name: "vc-table",
	components: {
		'i-table': Table
	},
	props: {
		...Table.props
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>
<style></style>