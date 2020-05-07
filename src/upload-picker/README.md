## 文件上传(UploadPicker)
图片、视频、文件上传，预览仅支持图片和视频

### 何时使用
上传文件后先进行预览，可取消上传，需要统一提交给表单时使用。
- 上传错误的文件数据不会s传递给外层，切记传递给组件的是 `dataSource` 必须是字符串数组。

### 基础用法

:::RUNTIME
```html
<template>
    <div style="v-upload-picker-basic">
        <vc-upload-picker
            v-model="dataSource"
            :max="{image: 2, video: 2}"
            :picker="['image', 'video']"
            :upload-opts="uploadOpts"
        >
        </vc-upload-picker>
    </div>
</template>
<script>
import { UploadPicker } from '@wya/vc';
export default {
    name: 'v-upload-picker-basic',
	components: {
		'vc-upload-picker': UploadPicker
	},
	data() {
		return {
			dataSource: [
				'https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/172/20191226/2007790743/test_video.mp4', 
				'https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/172/20200306/0936814587/O1CN01STX58I1HIDIUHqYwP_!!2885750734.jpg!4-4'
            ],
            uploadOpts: {
                image: {},
                video: {},
                file: {}
            }
		};
	},
};
</script>
<style>
.v-upload-picker-basic {}
</style>
```
:::

## API

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
picker | upload的类型 | `Arary` | `image`, `video`, `file` | `['image']`
sortable | 可否拖拽排序 | `Boolean` | - | `false`
mask | `sortable`为`true`时，是否显示遮罩 | `Boolean` | - | `false`
uploadOpts | `upload`的属性 | `Object` | - | `{}`
dataSource | 数据源 | `Array` | - | `[]`
max | 上传数量的最大值 | `Number`、`Object` | - | ` Number.MAX_SAFE_INTEGER`
disabled | 是否禁用 | `Boolean` | - | `false`
formatter | 对上传成功后的数据格式化 | `Function` | - | - |
boxClassName | 上传控件的样式 | `String` | - | - |
imgsPreviewOpts | 图片预览的配置 | `Object` | - | - |
imgClassName | 图片item的样式 | `String` | - | - |
videoClassName | 视频item的样式 | `String` | - | - |
fileClassName | 文件item的样式 | `String` | - | - |
urlKey | 上传成功后那远程地址的key | `String` | - |`url` |
gallery | 图片上传调用商品橱窗,仅在PC组件内有效 | `Function`、`Boolean` | - | `true`

### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---
file-before | 单个文件上传前回调(进度) | `(file: File, fileList: Array, type: String) => void 0` | `file`：当前上传的文件；`fileList`：上传的文件数组；`type`：在`image`、`video`、`file`中取值
file-start | 单个文件上传开始回调 | `(file: File, type: String) => void 0` | `file`：当前上传的文件；`type`：在`image`、`video`、`file`中取值
success | 单个文件上传过程成功回调 | `(res: Object, file: File, info: Object, type: String) => void 0` | `res`：上传结果；`file`：上传的文件；`info`：上传信息对象；`type`：在`image`、`video`、`file`中取值
error | 组件内部报错回调 | `(error: Object, type: String, file: File) => void 0` | `error`：错误信息；`type`：在`image`、`video`、`file`中取值；`file`：上传的文件
complete | 一个周期上传后的回调 | `(info: Object, type: String) => void 0` | `info`：上传信息对象；`type`：在`image`、`video`、`file`中取值
change | `dataSource`值改变的回调 | `(data) => void 0` | `data`：改变后绑定的数组

### 插槽
属性 | 说明 
---|---
image-upload | 图片的上传按钮
video-upload | 视频的上传按钮
file-upload | 文件的上传按钮
image | 图片展示的Item
video | 视频展示的Item
file | 文件展示的Item