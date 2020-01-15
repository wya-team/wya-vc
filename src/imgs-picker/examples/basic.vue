<template>
	<vc-form
		ref="form"
		:model="formValidate" 
		:rules="ruleValidate" 
		style="padding: 20px"
	>
		<vc-form-item prop="imgs" @on-form-change="handleChange">
			<vc-imgs-picker 
				ref="target"
				v-model="formValidate.imgs" 
				:max="1"
				:upload-opts="{multiple: true}"
				sortable
				@error="handleError"
			/>
		</vc-form-item>
		<div @click="handleSubmit">
			提交
		</div>
	</vc-form>
</template>
<script>
import { ajax } from '@wya/http';
import Form from '../../form';
import Input from '../../input';
import Message from '../../message';

import ImgsPicker from '../imgs-picker';
import { VcInstance } from '../../vc/index';

VcInstance.init({
	Upload: {
		URL_UPLOAD_IMG_POST: 'https://api.github.com/users/wya-team',
		URL_UPLOAD_FILE_POST: 'https://api.github.com/users/wya-team',
		onPostBefore: ({ options }) => {

			return new Promise((resolve, reject) => {
				if (random(0, 10) > 10) {
					throw new Error('异常处理');
				}
				resolve({
					...options,
					type: 'GET',
					credentials: 'omit', //  cors下关闭
					headers: {

					}
				});
			});
		},
		onPostAfter: ({ response, options }) => { // eslint-disable-line
			const { file } = options.param;
			return new Promise((resolve) => {
				// 模拟强制返回
				resolve({
					status: 1,
					data: {
						url: 'https://avatars2.githubusercontent.com/u/34465004?v=4',
						type: `.${file.name.split('.').pop()}`,
						uid: file.uid,
						title: file.name,
						size: file.size
					}
				});
			});
		}
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
		setTimeout(() => {
			console.log(111);
			this.formValidate.imgs = [
				...this.formValidate.imgs,
				`https://wya-oa.oss-cn-hangzhou.aliyuncs.com/common/file-download.png?v=${new Date().getTime()}`
			];
		}, 5000);

		window.ImgsPicker = this.$refs.target;
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
			console.log(error);
			Message.warning(error.msg);
		}
	}
};
</script>
