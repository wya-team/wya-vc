<template>
	<i-page 
		:current="current"
		:page-size="pageSize"
		:page-size-opts="pageSizeOpts"
		:placement="placement"
		:size="size"
		:total="total"
		:simple="simple"
		:show-total="showTotal"
		:show-elevator="showElevator"
		:show-sizer="showSizer"
		:class-name="className"
		:styles="styles"
		:transfer="transfer"
		:prev-text="prevText"
		:next-text="nextText"
		@on-change="$emit('change', arguments[0])"
		@on-page-size-change="$emit('page-size-change', arguments[0])"
		@update:current="$emit('update:current', arguments[0])"
	>
		<slot />
	</i-page>
</template>
<script>
import Page from 'iview/src/components/page';

export default {
	name: "vc-page",
	components: {
		'i-page': Page
	},
	props: {
		...Page.props
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