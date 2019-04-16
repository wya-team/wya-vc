<template>
	<div>
		<vc-upload>简单版上传</vc-upload>
		<br>
		<vc-upload
			:size="2"
			:max="190000"
			:show-tips="true"
			:multiple="true"
			@error="handleError"
			@begin="handleBegin"
			@complete="handleComplete"
			@file-before="handleFileBefore"
			@file-start="handleFileStart"
			@file-error="handleFileError"
			@file-success="handleFileSuccess"
			@file-progress="handleFileProgress"
		>限制大小上传以及api</vc-upload>

		<div style="display: flex; flex-wrap: wrap">
			<div 
				v-for="(item, index) in list"  
				:key="index"
				:style="{ backgroundImage: `url(${item})` }"
				class="image"
			/>
		</div>
	</div>
</template>
<script>
import { ajax } from '@wya/http';
import Message from '../../message';
import Upload from '../index';
import { VcInstance } from '../../vc/index';

VcInstance.init({
	Upload: {
		URL_UPLOAD_IMG_POST: 'https://wyatest.oss-cn-hangzhou.aliyuncs.com',
		URL_UPLOAD_FILE_POST: 'https://wyatest.oss-cn-hangzhou.aliyuncs.com',
		onPostAfter: (response = {}, options = {}, xhr = {}) => { // eslint-disable-line
			console.log(response, options, xhr);
			if (xhr.status === 200) {
				return {
					status: 1,
					data: {
						url: `${options.url}/` + options.param.data.key.replace(/\$\{filename\}/, options.param.file.name),
						type: '.' + options.param.file.name.split('.').pop(),
						uid: options.param.file.uid,
						title: options.param.file.name,
						size: options.param.file.size
					}
				};
			}
			return response;
		},
		onPostBefore: (file = {}) => {
			if (/[@#￥%&+ ]/.test(file.name)) {
				return new Promise((resolve, reject) => {
					reject({ msg: '格式错误' }); // eslint-disable-line
				});
			}
			return ajax({
				url: 'https://oa2.ruishan666.com/_cms/api/image/get-oss-info.json',
				type: "POST",
				param: {},
				headers: {
					/* eslint-disable max-len */
					"-token": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0aW1lIjoxNTQzNjUwMTQ1LCJzdGFmZl9pZCI6MTJ9.F5TFc9dIFHiGLAZlwy09jk8RcsfMcChzOR0TaYEsO7E',
				}
			}).then(res => {
				return {
					...res.data,
					'success_action_status': '200',
					key: res.data.dir + "${filename}"   // eslint-disable-line
				};
			}).catch(error => {
				return {};
			});
		} // 必须返回对象或Promise对象
	}
});

export default {
	name: "vc-upload-basic",
	components: {
		'vc-upload': Upload
	},
	data() {
		return {
			list: []
		};
	},
	computed: {
		
	},
	methods: {
		handleError(error) {
			console.error(error.msg);
		},
		/**
		 * 总线
		 */
		handleBegin(files) {
			console.log(files);
			Message.loading({
				content: `上传中`
			});
		},
		handleComplete(info = {}) {
			console.log(`Error: ${info.error}, Success: ${info.success}, 总数：${info.total}`);
			console.log(info.imgs);
			Message.destroy();
		},
		/**
		 * 单个文件
		 */
		handleFileBefore(file, fileList) {
			console.log(`上传之前`);
			return new Promise((resolve, reject) => {
				resolve(file);
			});
		},
		handleFileStart(file) {
			console.log(`开始上传`);
		},
		handleFileSuccess(res, file) {
			console.log(`Success：${file.current}, 总数：${file.total}`);
			console.log(res);
			Message.destroy();
			Message.success({
				content: `上传成功`
			});

			this.list.push(res.data.url);
		},
		handleFileProgress(e, file) {
			console.log(`Progress: 当前：${file.current}, 总数：${file.total}`);
			console.log(e.percent);
		},
		handleFileError(res, file) {
			console.log(`Error: 当前：${file.current}, 总数：${file.total}`);
			console.log(res);
			Message.destroy();
			Message.error({
				content: res.msg || 'test'
			});
		},
	}
};
</script>
<style lang="scss" scoped>
	.image {
		background-size: cover;
		width: 120px;
		height: 120px;
		border-radius: 3px;
		margin: 3px;
	}
</style>
