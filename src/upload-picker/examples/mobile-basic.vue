<template>
	<div style="margin: 100px;">
		<vc-upload-picker
			v-model="dataSource"
			:max="5"
			:picker="['video', 'image', 'file']"
		>
			<!-- 限制大小上传以及api -->
		</vc-upload-picker>
	</div>
</template>
<script>
import { ajax } from '@wya/http';
import { random } from 'lodash';
import Message from '../../message';
import Upload from '../../upload/index';
import UploadPicker from '../index.m';
import { VcInstance } from '../../vc/index';

VcInstance.init({
	Upload: {
		URL_UPLOAD_IMG_POST: 'https://gateway-mobile.wyawds.com/base/upload/file.json',
		URL_UPLOAD_FILE_POST: 'https://gateway-mobile.wyawds.com/base/upload/file.json',
		onPostBefore: ({ options }) => {
			let { file } = options.param;
			let headers = {
				token: localStorage.getItem('@wya/utils/1.1:token'),
				...options.headers,
			};
				// 正常流程
			if (!file.media_id) {
				// let msg = vaildFile(file);

				// if (msg) {
				// 	throw new Error(msg);
				// }
				return {
					...options,
					headers
				};
			} else { // 使用微信服务器流程
				return {
					...options,
					type: 'POST',
					url: `https://gateway-mobile.wyawds.com/base/upload/media.json`,
					param: {
						media_id: file.media_id,
					},
					headers
				};
			}
		},
		onPostAfter: ({ response, options }) => { // eslint-disable-line
			let { file } = options.param;

			// if (env === 'development') {
			// 	return {
			// 		status: 1,
			// 		data: {
			// 			url: `https://wya-oa.oss-cn-hangzhou.aliyuncs.com/common/file-download.png?v=${new Date().getTime()}`,
			// 			...parseFile(file)
			// 		}
			// 	};
			// }

			// 如果已经存在
			if (response.status === 1) {
				return response;
			}

			return response.httpStatus === 200
				? {
					status: 1,
					data: {
						url: `https://wyatest.oss-cn-hangzhou.aliyuncs.com/${options.param.key}`,
						...parseFile(file)
					}
				}
				: {
					status: 0,
					msg: `${response.msg || `上传失败 ${response.httpStatus || ''}`}`
				};
		},
	},
	UploadPicker: {
		/**
		 * 全局的上传文件类型识别器
		 * 返回 image | video | file 
		 */
		recognizer: (url, defaultRecognizer) => {
			if (/\.(jpe?g|png|gif|bmp|webp)/g.test(url)) {
				return 'image';
			} else {
				return defaultRecognizer(url);
			}
		}
	}
});

export default {
	name: "vc-upload-basic",
	components: {
		'vc-upload': Upload,
		'vc-upload-picker': UploadPicker
	},
	data() {
		return {
			list: [],
			dataSource: [
				'https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/172/20191226/2007790743/test_video.mp4', 
				'https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/172/20200306/0936814587/O1CN01STX58I1HIDIUHqYwP_!!2885750734.jpg!4-4'
			]
		};
	},
};
</script>
<style lang="scss">
	.image {
		background-size: cover;
		width: 120px;
		height: 120px;
		border-radius: 3px;
		margin: 3px;
	}
</style>
