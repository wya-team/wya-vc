> 请移步使用`UploadPicker`组件

## 图片上传（ImgsPicker）
图片上传，预览

### 何时使用
- 需要将图片保存到远程服务器时。
- 上传错误的文件数据不会传递给外层，切记传递给组件的是 `dataSource` 必须是字符串数组。

### 基础用法
通过 `v-model` 绑定图片数组。

:::RUNTIME
```html
<template>
	<div>
		<vc-imgs-picker 
			ref="target"
			v-model="imgs" 
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
	}
};
</script>
```
:::

### 限制最大上传数量
通过 `max` 限制图片上传的最大数量。

:::RUNTIME
```html
<template>
	<div>
		<vc-imgs-picker 
			ref="target"
			v-model="imgs" 
			:max="3"
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
			];
		}, 0);
	}
};
</script>
```
:::

### 上传多选
通过 `upload-opts` 开启多选上传功能。

:::RUNTIME
```html
<template>
	<div>
		<vc-imgs-picker 
			ref="target"
			v-model="imgs" 
			:upload-opts="{multiple: true}"
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
	}
};
</script>
```
:::

### 拖拽排序
- 通过 `sortable` 开启拖拽排序，只能拖拽已经上传好的图片。
- 在设置 `sortable` 后可设置 `mask` 开启图片遮罩层。

:::RUNTIME
```html
<template>
	<div>
		<vc-imgs-picker 
			ref="target"
			v-model="imgs" 
			sortable
			mask
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
				"https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/172/20190812/112918/微信图片_20190624213255.jpg",
				"https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png"
			];
		}, 0);
	}
};
</script>
```
:::

## API

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
tag | 容器标签 | `String` | - | div
dataSource | 上传的图片 | `Array` | - | []
max | 图片的最大数量 | `Number` | - |0（不限制）
disabled | 是否禁止上传和删除 | `Boolean` | - | false
uploadOpts | upload组件的属性 | `Object` | - | {}
accept | 可接受的文件类型 | `String` | `image/gif`, `image/jpeg`, `image/jpg`, `image/png` | -
format | 自定义返回数据格式 | `Function` | - | -
gallery | true, false, () => {}效果不同 | `Boolean, Function` | - | `true` 
thumbnail | 是否显示缩略图 | `Boolean` | - | `true` 
sortable | 是否开启拖拽排序 | `Boolean` | - | `false` 
mask | 是否显示图片遮罩层（必须先使用`sortable`才有效） | `Boolean` | - | `false` 
formatter | 上传成功后对数据的格式化 | `Function` | - | -
boxClassName | 盒子的className | `String` | - | -
imgClassName | 图片item的className | `String` | - | -
uploadClassName | 上传盒子的className | `String` | - | -
imgsPreviewOpts | 图片预览选项参数 | `Object` | - | -

### 事件
事件名 | 说明 | 类型 | 参数
---|---|---|---
change | `dataSource`值改变的回调 | `(dataSource: Array) => void 0` | `dataSource`：上传的图片数组
error | 上传错误的回调的回调 | `(err: Object) => void 0` | `err`：错误回调
complete | 上传完成后的回调 | `(res: Object) => void 0` | `res`：上传数据

### 方法
方法名 | 说明 | 参数
---|---|---
delete | 删除图片 | `index`：要删除的图片对应的索引
add | 增加图片 | `imgs`：要增加的图片数组
reset | 重置显示的图片 | `imgs`：要重置的图片数组

### 插槽
属性 | 说明 
---|---
image | 上传后图片的插槽
upload | 上传按钮的插槽
