<template>
	<vc-form
		ref="form"
		:model="formValidate" 
		:rules="ruleValidate" 
		@click.native.prevent
	>
		<vc-form-item prop="files">
			<vc-files-picker 
				v-model="formValidate.files"
				:max="10"
				:upload="{multiple: true, max: 10}"
				class="v-files-picker"
				@error="handleError"
			>
				<!-- <template #file="{ it }">
					<div v-for="(item, index) in it" :key="index">
						{{ item }}
					</div>
				</template> -->
				<template #upload>
					<vc-button>
						上传
					</vc-button>
				</template>
			</vc-files-picker>
		</vc-form-item>
		<vc-form-item>
			<vc-button type="primary" @click="handleSubmit">
				提交
			</vc-button>
		</vc-form-item>
	</vc-form>
</template>
<script>
import Form from '../../form';
import Input from '../../input';
import Button from '../../button';
import Message from '../../message';
import FilesPicker from '../files-picker';
import { VcInstance } from '../../vc/index';

VcInstance.init({
	Upload: {
		URL_UPLOAD_IMG_POST: 'https://wyaoa-new.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=oa',
		URL_UPLOAD_FILE_POST: 'https://wyaoa-new.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=oa',
		FORM_NAME: 'Filedata'
	}
});

export default {
	name: "vc-files-picker-basic",
	components: {
		"vc-files-picker": FilesPicker,
		'vc-form': Form,
		'vc-form-item': Form.Item,
		'vc-button': Button,
	},
	data() {
		return {
			formValidate: {
				files: [],
			},
			ruleValidate: {
				files: [
					{ required: true, type: 'array', message: '请选择图片', trigger: 'change' }
				],
			}
		};
	},
	computed: {
	},
	mounted() {
		setTimeout(() => {
			this.formValidate.files = [{ 
				url: "https://wyatest.oss-cn-hangzhou.aliyuncs.com/oa2/20190117/1547696227226/222.jpg",
				title: 'xxxz',
			}];
		}, 0);
	},
	methods: {
		async handleSubmit(name) {
			await this.$refs.form.validate();
			Message.success('Success!');
		},
		handleError(error) {
			Message.warning(error.msg);
		}
	}
};
</script>

