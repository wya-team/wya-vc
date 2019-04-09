<template>
	<i-select
		ref="select"
		:value="value"
		:multiple="multiple"
		:disabled="disabled"
		:clearable="clearable"
		:filterable="filterable"
		:remote-method="remoteMethod"
		:loading="loading"
		:loading-text="loadingText"
		:label="label"
		:size="size"
		:placeholder="placeholder"
		:not-found-text="notFoundText"
		:label-in-value="labelInValue"
		:placement="placement"
		:transfer="transfer"
		:element-id="elementId"
		@on-change="$emit('change', arguments[0])"
		@on-query-change="$emit('query-change', arguments[0])"
		@on-clear="$emit('clear', arguments[0])"
		@on-open-change="$emit('open-change', arguments[0])"
		@input="handleChange"
	>
		<slot/>
	</i-select>
</template>
<script>
import Select from 'iview/src/components/select';
import formHack from '../extends/mixins/form-hack';

export default {
	// name: 'vc-select',
	components: {
		'i-select': Select
	},
	mixins: [formHack],
	props: {
		...Select.props
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	mounted() {
		this.setQuery = this.$refs.select.setQuery;
		this.clearSingleSelect = this.$refs.select.clearSingleSelect;
	},
	methods: {
		handleChange() {
			this.$emit('input', arguments[0]);
		}
	}
};
</script>
<style></style>