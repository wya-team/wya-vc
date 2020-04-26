## 文件选择（FilesPicker）
通过点击或者拖拽上传文件

### 何时使用
上传是将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。
- 当需要上传一个或一些文件时。
- 当需要展现上传的进度时。
- 当需要使用拖拽交互时。

### 基础用法
最基本用法，点击上传，一次选择一个文件。

:::RUNTIME
```html
<template>
	<div>
		<vc-files-picker 
			v-model="files"
		>
			<template #upload>
				<vc-button>
					上传
				</vc-button>
			</template>
		</vc-files-picker>
	</div>
</template>

<script>
import { FilesPicker, Button } from '@wya/vc';

export default {
	components: {
		"vc-files-picker": FilesPicker,
		"vc-button": Button
	},
	data() {
		return {
			files: [],
        }
    },
};
</script>
```
:::

### 限制上传文件数量
通过`max`属性限制上传文件数量。

:::RUNTIME
```html
<template>
	<div>
		<vc-files-picker 
			v-model="files"
			:max="2"
		>
			<template #upload>
				<vc-button>
					上传
				</vc-button>
			</template>
		</vc-files-picker>
	</div>
</template>
<script>
import { FilesPicker, Button } from '@wya/vc';

export default {
	components: {
		"vc-files-picker": FilesPicker,
		"vc-button": Button
	},
	data() {
		return {
			files: [],
        }
    },
};
</script>
```
:::

#### 备注
上传错误的文件数据不会传递给外层

## API

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---|---
dataSource | 上传的文件 | `Array` | - | `[]`
max | 文件的最大数量 | `Number` | - | `0`: 不限制
disabled | 是否禁止上传 | `Boolean` | - | `false`
upload | upload组件的属性 | `Object` | - | {}
accept | 文件接收类型 | `String` | - | -
urlKey | 文件的线上地址字段 | `String` | - | `url`
formatter | 自定义返回数据格式 | `Function` | - | -

### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---
change | `files`值改变的回调 | `(files: Array) => void 0` | `files`: 上传成功的文件列表
error | 上传错误的回调的回调 | `(err: Object) => void 0` | `err`: 错误信息
complete | 上传完成后的回调 | `(file: Object) => void 0` | `file`: 当前上传成功的文件

### Slot
属性 | 说明 
---|---|---
file | 上传后文件的插槽
upload | 上传按钮的插槽 
