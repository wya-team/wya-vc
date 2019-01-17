<template>
	<i-form
		ref="form"
		:model="formValidate" 
		:rules="ruleValidate" 
	>
		<i-form-item prop="files">
			<vc-files-picker 
				v-model="formValidate.files"
				:max="10"
				:upload="{multiple: true, max: 10}"
				class="v-files-picker "
				@error="handleError"
			>
				<!-- <template slot-scope="slotProps">
						<div v-for="(item, index) in slotProps.files" :key="index">
							{{ item }}
						</div>
					</template> -->
				<div slot="trigger" class="_upload">
					上传
				</div>
			</vc-files-picker>
		</i-form-item>
		<div @click="handleSubmit">提交</div>
	</i-form>
</template>
<script>
import { Form, FormItem, Message } from 'iview';
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
		'i-form': Form,
		'i-form-item': FormItem,
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
			Message.warning(error.msg);
		}
	}
};
</script>

<style lang="scss">
.v-files-picker {
	._upload {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 88px;
		height: 40px;
		font-size: 14px;
		border: 1px solid #d4d4d4;
		border-radius: 6px;
		background: #ffffff;
		margin-bottom: 12px;
		cursor: pointer;
		&:hover {
			border: 1px solid #0085ff;
			color: #0085ff;
		}
	}
}
</style>

