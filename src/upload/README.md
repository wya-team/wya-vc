## 上传（Upload）

上传功能

### 何时使用

选择图片或选择文件上传时。

### 基础用法

点击上传一个文件

:::RUNTIME
```vue
<template>
	<div>
		<vc-upload
			@file-error="handleFileError"
			@file-success="handleFileSuccess"
		>
			<vc-button
				style="margin-bottom: 21px"
			>上传</vc-button>
		</vc-upload>
		{{file_name}}
	</div>
</template>

<script>
import { Upload, Message, Button, VcInstance } from '@wya/vc';
// 只需要注册一次(项目中已注册无视)
VcInstance.hasInit = false;
VcInstance.init({
	Upload: {
		URL_UPLOAD_IMG_POST: 'https://api.github.com/users/wya-team',
		URL_UPLOAD_FILE_POST: 'https://api.github.com/users/wya-team',
		onPostBefore: ({ options }) => {
			return new Promise((resolve, reject) => {
				if (Math.random(0, 10) > 10) {
					throw new Error('上传失败');
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
					},
					...response
				});
			});
		}
	}
});
export default {
	name: "vc-upload-basic",
	components: {
		'vc-upload': Upload,
		'vc-button': Button
	},
	data() {
		return {
			file_name: ''
		};
	},
	computed: {

	},
	methods: {
		handleFileSuccess(res, file) {
			console.log(`Success：${file.current}, 总数：${file.total}`);
			console.log(res);
			Message.destroy();
			Message.success({
				content: `上传成功`
			});
			this.file_name = res.avatar_url
		},
		handleFileError(res, file) {
			console.log(`Error: 当前：${file.current}, 总数：${file.total}`);
			console.log(res);
			Message.destroy();
			Message.error({
				content: res.msg
			});
			this.file_name = res.avatar_url
		},
	}
};
</script>
```
:::

### 自定义上传文件类型及其他限制

- 设置`max`属性控制一次性上传文件个数，如果想要多选必须设置`multiple`为`true`或者 `directory` 为 `true`。
- 设置`size`属性控制上传文件的大小，单位`Mb`。
- 设置`accept`属性控制文件上传的类型。

:::RUNTIME
```vue
<template>
	<div class="v-upload-basic">
		<vc-upload
			:size="100"
			:max="5"
			:multiple="true"
			accept="image/*"
			@error="handleError"
			@begin="handleBegin"
			@complete="handleComplete"
			@file-before="handleFileBefore"
			@file-start="handleFileStart"
			@file-error="handleFileError"
			@file-success="handleFileSuccess"
			@file-progress="handleFileProgress"
		>
			<vc-button style="margin-bottom: 21px;">
				上传多个文件
			</button>
		</vc-upload>
		<div style="display: flex; flex-wrap: wrap">
			<div
				v-for="(item, index) in list"
				:key="index"
				:style="{ backgroundImage: `url(${item})` }"
				class="_image"
			/>
		</div>
	</div>
</template>

<script>
import { Upload, Message, Button, VcInstance } from '@wya/vc';
// 只需要注册一次(项目中已注册无视)
VcInstance.hasInit = false;
VcInstance.init({
	Upload: {
		URL_UPLOAD_IMG_POST: 'https://api.github.com/users/wya-team',
		URL_UPLOAD_FILE_POST: 'https://api.github.com/users/wya-team',
		onPostBefore: ({ options }) => {
			return new Promise((resolve, reject) => {
				if (Math.random(0, 10) > 10) {
					throw new Error('上传失败');
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
					},
					...response
				});
			});
		}
	}
});
export default {
	name: "vc-upload-basic",
	components: {
		'vc-upload': Upload,
		'vc-button': Button
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
		}
	}
};
</script>
<style lang="scss">
.v-upload-basic{
	._image {
		background-size: cover;
		width: 64px;
		height: 64px;
		border-radius: 3px;
		margin-right: 12px;
		border: 1px solid #f2f2f2;
	}
}
</style>
```
:::

### API

### 属性

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---
tag | 外层标签 | `String`、 `Object`、`() => String` |`span / div / **`| `span`
multiple | 多图上传 | `Boolean` | - | `false`
max | 一次性最多选择的文件数量 `multiple` 为 `true` 或者 `directory` 为 `true` 时才有效 | `Number` | - | 1
disabled | 禁用 | `Boolean` | - | `false`
accept | 文件格式 | `String` | - | -
mode | 文件归类（images / file）,提前定位文件类型（内置图片压缩） | `String` | - | `images`
ajax | 请求函数 | `() => Promise`| - | -
url | ajax:url -> 默认通过`VcInstance.init`注册 | `String` | - |-
async | 是否使用异步 | `Boolean` | - | `true`
name | 上传给后端获取的key | `String` | - | -
size | 限制上传文件大小, 默认不限制（单位：mb） | `Number` | - | `0`
extra | ajax需要传递的参数 | `Object` | - | {}
headers | ajax: headers | `Object` | - | {}
show-tips | 展示显示进度弹窗 | `Boolean` | - | `false`
directory | 是否选取文件夹 | `Boolean` | - | `false`
parallel | 是否并发执行 | `Boolean` | - | `true`


### 事件/方法

事件名 | 说明 | 类型 | 参数
---|---|---|---
file-before | 单个文件上传前回调(进度) | - | -
file-start | 单个文件上传开始回调 | - | -
file-progress | 单个文件上传过程回调(e.percent, file.current, file.total等可用参数) | `(e, file) => void` | -
file-success | 单个文件上传过程成功回调(res, file.current, file.total等可用参数) | `(res, file) => void` | -
file-error | 单个文件上传过程失败回调(res, file.current, file.total等可用参数) | `(res, file) => void` | -
begin | 一个周期上传前的回调(info: {}) | `(files) => void` | -
complete | 一个周期上传后的回调(info: {}) | `(info) => void` | -
error | 组件内部报错回调 | `(error) => void` | -
post-before | 文件上传前回调（处理异步） | - | -
post-after | 文件上传后回调 | - | -

### Slot

属性 | 说明
---|---
default | 触发器
