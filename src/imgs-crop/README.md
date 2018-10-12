## [Demo Basic](https://wya-team.github.io/wya-vc/dist/web/imgs-crop/basic.html)
## 功能
图片裁剪

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
src | 图片地址 | `any` | -
scale | 缩放值 | `number` | 1
rotate | 旋转角度 | `number` | 0
cross-origin | CORS - `'', 'anonymous', 'use-credentials'` | `string` | `anonymous`
...

#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
`@drop-file` | 拖入图片回掉 | - | -
`@load-failure` | 图片加载失败 | - | -
`@load-success` | 图片加载成功 | - | -
`@image-ready` | 图片加载成功，展示后执行 | - | -
`@image-change` | 图片信息变化 | - | -
`@mouse-up` | 抬起 | - | -
`@mouse-move` | 移动 | - | -
`@position-change` | 位置变化 | - | -


## 基础用法

```vue
<template>
	<vc-imgs-crop :src="src" />
</template>
<script>
import { ImgsCrop } from 'wya-vc';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-imgs-crop': ImgsCrop,
	},
	data() {
		return {
			src: 'https://oss.ruishan666.com/image/xcx/180313/942996157518/10053669,2880,1800.jpg',
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>

```