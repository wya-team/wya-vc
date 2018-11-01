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
import { VcInstance } from '../../vc/index';

VcInstance.init({
	Upload: {
		URL_UPLOAD_IMG_POST: 'https://wyaoa-new.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=oa',
		URL_UPLOAD_FILE_POST: 'https://wyaoa-new.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=oa'
	}
});

export default {
	name: "vc-editor-basic",
	components: {
		"vc-editor": Editor
	},
	data() {
		return {
			options: {
				modules: {
					toolbar: '#toolbar',
				},
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
