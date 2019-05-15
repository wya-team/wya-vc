<template>
	<i-page 
		:current="current"
		:page-size="pageSize"
		:page-size-opts="pageSizeOpts"
		:placement="placement"
		:size="size"
		:total="count || total"
		:simple="simple"
		:show-total="showCount || showTotal"
		:show-elevator="showElevator"
		:show-sizer="showSizer"
		:class-name="className"
		:styles="styles"
		:transfer="portal"
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
		...Page.props,
		count: {
			type: String | Number, // iview为total
			default: 0
		},
		showCount: {
			type: Boolean, // iview为show-total
			default: true
		},
		portal: {
			type: Boolean,
			default: true
		},
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