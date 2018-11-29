<template>
	<i-form
		ref="form"
		:model="formValidate" 
		:rules="ruleValidate" 
		@submit.native.prevent
	>
		<i-form-item prop="value" @on-form-change="handleChange">
			<vc-editor 
				ref="editor"
				v-model="formValidate.value"
				:options="options"
				:disabled="disabled"
				:upload="{name: 'Filedata'}"
			/>
		</i-form-item>
		<i-button @click="handleSubmit">提交</i-button>
	</i-form >
</template>
<script>
import { Form, FormItem, Input, Button } from 'iview';
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
		"vc-editor": Editor,
		'i-button': Button,
		'i-form': Form,
		'i-form-item': FormItem,
	},
	data() {
		return {
			options: {
				modules: {
					toolbar: '#toolbar',
				},
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
