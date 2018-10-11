<template>
	<i-form
		ref="form"
		:model="formValidate" 
		:rules="ruleValidate" 
	>
		<i-form-item prop="imgs">
			<vc-imgs-picker />
		</i-form-item>
		<div @click="handleSubmit">提交</div>
	</i-form >
</template>
<script>
import { Form, FormItem } from 'iview';
import ImgsPicker from '../imgs-picker';
import VcInstance from '../../vc-instance/index';

VcInstance.init({
	Upload: {
		URL_UPLOAD_IMG_POST: 'https://wyaoa-new.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=oa',
		URL_UPLOAD_FILE_POST: 'https://wyaoa-new.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=oa'
	}
});

export default {
	name: "vc-print-basic",
	components: {
		'vc-imgs-picker': ImgsPicker,
		'i-form': Form,
		'i-form-item': FormItem
	},
	data() {
		return {
			formValidate: {
				imgs: []
			},
			ruleValidate: {
				imgs: {
					required: true, 
					type: 'array',
					message: '请选择图片',
					trigger: 'change'
				}
			}
		};
	},
	computed: {
		
	},
	methods: {
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
