<template>
	<i-tag 
		:closable="closable"
		:checkable="checkable"
		:checked="checked"
		:type="type"
		:color="color"
		:name="name"
		:fade="fade"
		@on-close="$emit('close', arguments[0], arguments[1])"
	>
		<slot slot="title" name="title" />
		<slot />
	</i-tag>
</template>
<script>
import Tag from 'iview/src/components/tag';

export default {
	name: "vc-tag",
	components: {
		'i-tag': Tag
	},
	props: {
		...Tag.props
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