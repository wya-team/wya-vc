## [Demo Basic](https://wya-team.github.io/wya-vc/dist/upload/basic.html)
## 功能
上传功能

- 多图上传为遍历单图提交，同时上传；

## 待开发

- 多图模式，队列上传；
- show-tips


## 关联组件清单

- ImgsPicker （图片上传）


## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
tag | 外层标签`span / div / **` | `str obj func` | span
prefix-cls | 外层标签prefixCls | `str` | c-upload
multiple | 多图上传 | `bool` | false
max | 一次性最多选择的文件数量 `multiple` 为 `true` 或者 `directory` 为 `true` 时才有效 | `number` | 1
disabled | 禁用，增加样式`${prefixCls}-disabled` | `str` | false
accept | 文件格式 | `str` | -
mode | 文件归类（images / file）,提前定位文件类型（内置图片压缩） | `str` | images
ajax | 请求函数 | `() -> Promise` | -
url | ajax:url -> 默认通过`RcInstance.init`注册 | `str` | -
async | 是否使用异步 | `str` | true
name | 上传给后端获取的key | `str` | `Filedata`(业务历史原因...)
size | 限制上传文件大小, 默认不限制（单位：mb） | `float` | `0`
extra | ajax需要传递的参数 | `obj` | {}
headers | ajax: headers | `obj` | {}
show-tips | 展示显示进度弹窗 | `bool` | `false`
directory | 是否选取文件夹 | `bool` | `false`


#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
`@file-before` | 单个文件上传前回调(进度) | `func` | -
`@file-start` | 单个文件上传开始回调 | `func` | -
`@file-progress` | 单个文件上传过程回调(e.percent, file.current, file.total等可用参数) | `(e, file) => void` | -
`@file-success` | 单个文件上传过程成功回调(res, file.current, file.total等可用参数) | `(res, file) => void` | -
`@file-error` | 单个文件上传过程失败回调(res, file.current, file.total等可用参数) | `(res, file) => void` | -
`@begin` | 一个周期上传前的回调(info: {}) | `(files) => void` | -
`@complete` | 一个周期上传后的回调(info: {}) | `(info) => void` | -
`@error` | 组件内部报错回调 | `(error) => void` | -
`@post-before` | 文件上传前回调（处理异步） | `func` | -
`@post-after` | 文件上传后回调 | `func` | -


## 基础用法
- 默认可配置入口文件，统一处理`url`参数
```js
// 只需要注册一次(项目中已注册无视)
VcInstance.init({
	Upload: {
		URL_UPLOAD_IMG_POST: 'https://wyaoa.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=xcx',
		URL_UPLOAD_FILE_POST: 'https://wyaoa.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=xcx',
		onPostBefore: () => ({})
	}
});
```
- 使用

```vue
<template>
	<div>
		<vc-upload>简单版上传</vc-upload>
		<br>
		<vc-upload
			:size="2"
			@begin="handleBegin"
			@complete="handleComplete"
			@file-before="handleFileBefore"
			@file-start="handleFileStart"
			@file-error="handleFileError"
			@file-success="handleFileSuccess"
			@file-progress="handleFileProgress"
		>限制大小上传以及api</vc-upload>
	</div>
</template>

<script>
import { Upload, Message } from '@wya/vc';

export default {
	name: "vc-upload-basic",
	components: {
		'vc-upload': Upload
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
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
				content: res.msg
			});
		},
	}
};
</script>

```