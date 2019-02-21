<template>
	<i-cascader 
		:data="data"
		:value	="value	"
		:render-format="renderFormat"
		:disabled="disabled"
		:clearable="clearable"
		:placeholder="placeholder"
		:trigger="trigger"
		:change-on-select="changeOnSelect"
		:size="size"
		:load-data="loadData"
		:filterable="filterable"
		:not-found-text="notFoundText"
		:transfer="transfer"
		:element-id="elementId"
		@on-change="$emit('change', arguments[0])"
		@on-visible-change="$emit('visible-change', arguments[0])"
		@input="$emit('input', arguments[0])"
	/>
</template>
<script>
import Cascader from 'iview/src/components/cascader';

export default {
	name: "vc-cascader",
	components: {
		'i-cascader': Cascader
	},
	props: {
		...Cascader.props
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