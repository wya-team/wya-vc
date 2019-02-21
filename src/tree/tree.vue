<template>
	<i-tree
		ref="tree"
		:data="data"
		:multiple="multiple"
		:show-checkbox="showCheckbox"
		:empty-text="emptyText"
		:load-data="loadData"
		:render="render"
		:children-key="childrenKey"
		:check-strictly="checkStrictly"
		@on-select-change="$emit('select-change', arguments[0])"
		@on-check-change="$emit('check-change', arguments[0])"
		@on-toggle-expand="$emit('toggle-expand', arguments[0])"
	>
		<slot slot="title" name="title" />
		<slot />
	</i-tree>
</template>
<script>
import Tree from 'iview/src/components/tree';

export default {
	name: "vc-tree",
	components: {
		'i-tree': Tree
	},
	props: {
		...Tree.props
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	mounted() {
		this.getCheckedNodes = this.$refs.tree.getCheckedNodes;
		this.getSelectedNodes = this.$refs.tree.getSelectedNodes;
		this.getCheckedAndIndeterminateNodes = this.$refs.tree.getCheckedAndIndeterminateNodes;
	},
	methods: {
	}
};
</script>
<style></style>