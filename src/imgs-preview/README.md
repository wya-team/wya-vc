## [Demo Basic](https://wya-team.github.io/wya-vc/dist/imgs-preview/basic.html)

## 功能
预览图片

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
dataSource | 源数据 | `array` | `[{ src, msrc, w, h ....}] | ["", ""]`
opts | photoSwipe参数 | `obj` | -
events | photoSwipe事件 | `obj` | -
id | 外层标识 | `str` | -

#### 方法
属性 | 说明 | 类型 | 默认值
---|---|---|---
getInstance | 获取photoSwipe实例 | `() => {}` | -
renderRow | 自定义组件 | `(h, params) => jsx` | -


#### 插槽

属性 | 说明 | 默认值
---|---|---
operate | 蒙层中的操作视图 | `{src, index}`


#### 自定义组件

```
renderRow(h, params) {
	const { src, index } = params; 
	return h('img', {
		attrs: {
			src,
			width: 100,
			height: 100,
		}
	});
},
```

## 基础用法

- 用法一：
```vue
<template>
	<div>
		<vc-imgs-preview :data-source="dataSource" />
	</div>
</template>
<script>
import ImgsPreview from '@wya/vc';

export default {
	name: "vc-imgs-preview-basic",
	components: {
		'vc-imgs-preview': ImgsPreview
	},
	data() {
		return {
			dataSource: []
		};
	}
};
</script>
```
- 用法二：

```
handleClick(e) {
	let pos = {};
	try {
		const target = e.target; // 先得到pos, 否则getThumbBoundsFn再计划，target已变化
		const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
		const rect = target.getBoundingClientRect();

		pos = { x: rect.left, y: rect.top + pageYScroll, w: rect.width };

	} catch (e) {
		console.log(e);
	}
	ImgsPreview.popup({
		visible: true,
		dataSource: this.dataSource,
		opts: {
			index: 2,
			history: false,
			getThumbBoundsFn: (index) => pos
		}
	}).then(() => {

	}).catch(() => {

	});
}
```