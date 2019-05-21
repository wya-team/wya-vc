<template>
	<div class="vc-quilleditor-view ql-snow">
		<div class="ql-editor" v-html="content"/>
	</div>
</template>

<script>
	
export default {
	name: 'vc-editor-view',
	props: {
		content: String
	},
	data() {
		return {
		};
	}
};
</script>

<style lang="scss">
.vc-quilleditor-view {
}
</style>
