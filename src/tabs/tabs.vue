<template>
	<i-tabs 
		:value="value"
		:type="type"
		:size="size"
		:closable="closable"
		:animated="animated"
		:capture-focus="captureFocus"
		:before-remove="beforeRemove"
		@on-click="$emit('click', arguments[0])"
		@on-tab-remove="$emit('tab-remove', arguments[0])"
	>
		<slot slot="extra" name="extra" />
		<slot />
	</i-tabs>
</template>
<script>
import Tabs from 'iview/src/components/tabs';

export default {
	name: "vc-tabs",
	components: {
		'i-tabs': Tabs
	},
	props: {
		...Tabs.props
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