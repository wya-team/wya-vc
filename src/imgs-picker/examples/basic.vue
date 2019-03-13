<template>
	<vc-form
		ref="form"
		:model="formValidate" 
		:rules="ruleValidate" 
	>
		<vc-form-item prop="imgs" @on-form-change="handleChange">
			<vc-imgs-picker 
				v-model="formValidate.imgs" 
				:max="3"
				:upload="{multiple: true, max: 3}"
				@error="handleError"
			/>
		</vc-form-item>
		<div @click="handleSubmit">提交</div>
	</vc-form >
</template>
<script>
import Form from '../../form';
import Input from '../../input';
import Message from '../../message';

import ImgsPicker from '../imgs-picker';
import { VcInstance } from '../../vc/index';

VcInstance.init({
	Upload: {
		URL_UPLOAD_IMG_POST: 'https://wyaoa-new.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=oa',
		URL_UPLOAD_FILE_POST: 'https://wyaoa-new.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=oa',
		FORM_NAME: 'Filedata'
	}
});

export default {
	name: "vc-print-basic",
	components: {
		'vc-imgs-picker': ImgsPicker,
		'vc-form': Form,
		'vc-form-item': Form.Item,
		'vc-input': Input,
	},
	data() {
		return {
			formValidate: {
				imgs: [],
			},
			ruleValidate: {
				imgs: [
					{ required: true, type: 'array', message: '请选择图片', trigger: 'change' }
				],
			}
		};
	},
	computed: {
		
	},
	mounted() {
		setTimeout(() => {
			this.formValidate.imgs = ["https://wyatest.oss-cn-hangzhou.aliyuncs.com/oa2/20190117/1547696227226/222.jpg"];
		}, 0);
	},
	methods: {
		handleChange(value) {
			console.log(value, 'change');
		},
		handleSubmit(name) {
			this.$refs.form.validate((valid) => {
				if (valid) {
					Message.success('Success!');
				} else {
					Message.error('Fail!');
				}
			});
		},
		handleError(error) {
			Message.warn(error.msg);
		}
	}
};
</script>
