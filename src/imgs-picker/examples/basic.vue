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
				:max="3"
				:upload="{multiple: true}"
				sortable
				@error="handleError"
			/>
		</vc-form-item>
		<div @click="handleSubmit">提交</div>
	</vc-form >
</template>
<script>
import { ajax } from '@wya/http';
import Form from '../../form';
import Input from '../../input';
import Message from '../../message';

import ImgsPicker from '../imgs-picker';
import { VcInstance } from '../../vc/index';

const IMAGE_LEGAL_REGEX = /[@#￥%&+ ]/;
const FILE_LEGAL_REGEX = /[@#￥%&+]/;
VcInstance.init({
	Upload: {
		URL_UPLOAD_IMG_POST: 'https://wyatest.oss-cn-hangzhou.aliyuncs.com',
		URL_UPLOAD_FILE_POST: 'https://wyatest.oss-cn-hangzhou.aliyuncs.com',
		onPostBefore: (file = {}) => {
			let regex = /image/.test(file.type) ? IMAGE_LEGAL_REGEX : FILE_LEGAL_REGEX;

			if (regex.test(file.name)) {
				throw { msg: '文件名称不合法, 不能包含@#￥%&+和空格' } /* eslint-disable-line */;
			}

			if (/image/.test(file.type) && file.size > 20971520) {
					
				throw { msg: '图片大小不能超过20M' } /* eslint-disable-line */;
			}
			/**
			 * @param  {[type]} res [description]
			 * @return {[type]}     [description]
			 */
			return ajax({
				url: 'https://gateway.wyawds.com/base/upload/get-sign.json',
				type: "POST",
				param: {},

			}).then(res => {
				return {
					bucket: res.data.bucket,
					policy: res.data.policy,
					OSSAccessKeyId: res.data.OSSAccessKeyId,
					signature: res.data.signature,
					success_action_status: 200,
					key: `${res.data.key}${file.name}`
				};
			}).catch(error => {
				console.error("[vc-upload: onPostBefore]" + error.msg);
				return {};
			});
		},
		onPostAfter: ({ response, options }) => {

			let fileInfo = {
				type: `.${options.param.file.name.split('.').pop()}`,
				uid: options.param.file.uid,
				title: options.param.file.name,
				size: options.param.file.size
			};
			return {
				status: 1,
				data: {
					url: `https://wya-oa.oss-cn-hangzhou.aliyuncs.com/common/file-download.png?v=${new Date().getTime()}`,
					...fileInfo
				}
			};
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
