<template>
	<div style="margin: 100px;">
		<vc-upload-picker
			v-model="dataSource"
			:max="{ image: 1, video: 4 }"
			accept="image/gif,image/jpeg,image/jpg,image/png,video/mp4,.docx"
		>
			<!-- 限制大小上传以及api -->
		</vc-upload-picker>
	</div>
</template>
<script>
import { ajax } from '@wya/http';
import { random } from 'lodash';
import Message from '../../message';
import Upload from '../index';
import { VcInstance } from '../../vc/index';


VcInstance.init({
	Upload: {
		URL_UPLOAD_IMG_POST: 'https://api.github.com/users/wya-team',
		URL_UPLOAD_FILE_POST: 'https://api.github.com/users/wya-team',
		onPostBefore: ({ options }) => {

			return new Promise((resolve, reject) => {
				if (random(0, 10) > 6) {
					throw new Error('异常处理');
				}
				resolve({
					...options,
					param: {
						...options.param,
						timestamp: new Date()
					},
					type: 'GET',
					credentials: 'omit', //  cors下关闭
					headers: {

					}
				});
			});
		},
		onPostAfter: ({ response, options }) => { // eslint-disable-line
			const { file } = options.param;
			let url;
			if (/video\//.test(file.type)) {
				url = 'https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/172/20200106/1730931153/59秒的视屏.mp4';
			} else if (/image\//.test(file.type)) {
				url = 'https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/172/20191216/1127994016/13639685_123501617185_2.jpg!4-4';
			} else {
				url = 'https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/172/20191216/1127994016/13639685_123501617185_2.docs';
			}
			return new Promise((resolve) => {
				// 模拟强制返回
				resolve({
					status: 1,
					data: {
						// url: 'https://avatars2.githubusercontent.com/u/34465004?v=4',
						url,
						type: `.${file.name.split('.').pop()}`,
						uid: file.uid,
						title: file.name,
						size: file.size
					},
					...response
				});
			});
		},

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
		'vc-upload-picker': Upload.Picker
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
