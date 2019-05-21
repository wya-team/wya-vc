<template>
	<vc-form
		ref="form"
		:model="formValidate" 
		:rules="ruleValidate" 
		@submit.native.prevent
	>
		<vc-form-item prop="value" @on-form-change="handleChange">
			<!-- :options="options" -->
			<vc-editor 
				ref="editor"
				v-model="formValidate.value"
				:disabled="disabled"
			/>
		</vc-form-item>
		<vc-editor-view :content="formValidate.value" />
		<vc-button @click="handleSubmit">提交</vc-button>
	</vc-form >
</template>
<script>
import Form from '../../form';
import Input from '../../input';
import Button from '../../button';
import Editor from '../index';
import Toolbar from '../toolbar';
import { VcInstance } from '../../vc/index';

VcInstance.init({
	Upload: {
		URL_UPLOAD_IMG_POST: 'https://wyaoa-new.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=oa',
		URL_UPLOAD_FILE_POST: 'https://wyaoa-new.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=oa',
		FORM_NAME: 'Filedata'
	}
});

export default {
	name: "vc-editor-basic",
	components: {
		"toolbar": Toolbar,
		"vc-editor": Editor,
		"vc-editor-view": Editor.View,
		'vc-button': Button,
		'vc-form': Form,
		'vc-form-item': Form.Item,
	},
	
	data() {
		return {
			options: {
				modules: {
					toolbar: {
						container: [
							['bold', 'italic', 'underline', 'strike'],
							[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
							['link'],
							[{ 'color': [] }, { 'background': [] }],
							[{ 'align': [] }]
						],
					},
				}
			},
			disabled: false,
			formValidate: {
				value: ''
			},
			ruleValidate: {
				value: [
					{ required: true, message: '请输入内容' }
				],
			}
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
		},
		handleSubmit(name) {
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.$Message.success('Success!');
				} else {
					this.$Message.error('Fail!');
				}
			});
		},
	}
};
</script>
