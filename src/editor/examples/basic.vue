<template>
	<vc-editor 
		ref="editor"
		:options="options"
		:disabled="disabled"
		value="我是富文本的内容，可以是text，也可以是html"
		@change="handleChange"
	/>
</template>
<script>
import Editor from '../editor';

export default {
	name: "vc-editor-basic",
	components: {
		"vc-editor": Editor
	},
	data() {
		return {
			options: {
				// modules: {
				// 	toolbar: [
				// 		['link', 'image', 'video']
				// 	],
				// },
			},
			disabled: false
		};
	},
	computed: {
		
	},
	mounted() {
		console.log(this.$refs.editor);
	},
	methods: {
		handleChange(arg) {
			console.log(arg);
		}
	}
};
</script>
