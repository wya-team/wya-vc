## 图片上传（imgs-picker）
图片上传，预览
##### 备注
上传错误的文件数据不会传递给外层，切记传递给组件的是 `dataSource` 必须是字符串数组

### 基础用法

:::RUNTIME
```html
<template>
	<div class="v-imgs-picker-basic">
		<vc-imgs-picker 
			ref="target"
			v-model="imgs" 
			:max="5"
			:upload-opts="{multiple: true}"
			sortable
		/>
	</div>
</template>

<script>
import { ImgsPicker } from '@wya/vc';
export default {
	components: {
		'vc-imgs-picker': ImgsPicker,
	},
	data() {
		return {
			imgs: []
		}
	},
	mounted() {
		setTimeout(() => {
			this.imgs = [
				"https://wyatest.oss-cn-hangzhou.aliyuncs.com/oa2/20190117/1547696227226/222.jpg",
				"https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/172/20190812/112918/微信图片_20190624213255.jpg"
			];
		}, 0);
	},
	methods: {
	}
};
</script>
<style>
.v-imgs-picker-basic {
}
</style>
```
:::
### API

### 属性

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
tag | 容器标签 | `String` | - | div
dataSource | 上传的图片 | `Array` | - | []
max | 图片的最大数量 | `Number` | - |0（不限制）
disabled | 是否禁止上传和删除 | `Boolean` | - | false
upload | upload组件的属性 | `Object` | - | {}
accept | 可接受的文件类型 | `String` | `image/gif`, `image/jpeg`, `image/jpg`, `image/png` | -
format | 自定义返回数据格式 | `Function` | - | -
sortable | 是否开启拖拽排序 | `Boolean` | - | `false` 
gallery | true, false, () => {}效果不同 | `Boolean, Function` | - | `true` 


### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
change | `dataSource`值改变的回调 | `-` | -
error | 上传错误的回调的回调 | `-` | -
complete | 上传完成后的回调 | `-` | -


### 插槽

属性 | 说明 | 默认值
---|---|---
image | 上传后图片的插槽 | `{ it }`
upload | 上传按钮的插槽 | -
