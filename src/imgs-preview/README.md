## 图片预览（ImgsPreview）
点击预览大图

### 何时使用
随时能在页面内展示完整的图片。

### 基础用法

:::RUNTIME
```html
<template>
	<div>
		<vc-imgs-preview :data-source="dataSource" />
	</div>
</template>
<script>
import { ImgsPreview } from '@wya/vc';

export default {
	name: "vc-imgs-preview-basic",
	components: {
		'vc-imgs-preview': ImgsPreview
	},
	data() {
		return {
			dataSource: [
				{
					src: 'https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png',
					title: 'Image 1',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180313/942990884682/10053600,2880,1800.jpg',
					title: 'Image 2',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180313/942990767112/10049533,2880,1800.jpg',
					title: 'Image 2',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180228/803943510611/衣服-01.png',
					title: 'Image 2',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180313/942996157518/10053669,2880,1800.jpg',
					title: 'Image 2',
					w: 1200,
					h: 900
				}

			]
		};
	}
};
</script>
```
:::

### 自定义 renderRow
可以自定义展示图片，设置图片的样式。

:::RUNTIME
```html
<template>
	<div>
		<!-- 自定义 renderRow -->
		<p>通过renderRow自定义</p>	
		<vc-imgs-preview :data-source="dataSource" :render-row="renderRow" />
		
		<!-- 自定义 renderRow -->
		<p>通过slot自定义</p>	
		<vc-imgs-preview :data-source="dataSource">
			<template #row="it">
				<img 
					:key="it.index" 
					:src="it.src" 
					:style="{ width: '100px', height: '100px', borderRadius: '20px' }"
				>
			</template>
		</vc-imgs-preview>
	</div>
</template>
<script>
import { ImgsPreview } from '@wya/vc';

export default {
	name: "vc-imgs-preview-basic",
	components: {
		'vc-imgs-preview': ImgsPreview
	},
	data() {
		return {
			dataSource: [
				{
					src: 'https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png',
					title: 'Image 1',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180313/942990884682/10053600,2880,1800.jpg',
					title: 'Image 2',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180313/942990767112/10049533,2880,1800.jpg',
					title: 'Image 2',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180228/803943510611/衣服-01.png',
					title: 'Image 2',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180313/942996157518/10053669,2880,1800.jpg',
					title: 'Image 2',
					w: 1200,
					h: 900
				}

			]
		};
	},
	methods: {
		renderRow(h, props, parent) {
			const { src, index } = props; 
			return (
				<img 
					src={src} 
					key={index} 
					style={{ width: '100px', height: '100px', borderRadius: '50px' }} 
				/>
			);
		},
	}
};
</script>
```
:::

### 自定义operate
通过`slot`：operate插入预览触发内容。

:::RUNTIME
```html
<template>
	<div>
		<!-- 自定义 operate -->
		<vc-imgs-preview :data-source="dataSource">
			<template #operate="it">
				<div @click="it.show($event, it.index)">
					{{ it.index }}
				</div>
			</template>
		</vc-imgs-preview>
	</div>
</template>
<script>
import { ImgsPreview } from '@wya/vc';

export default {
	name: "vc-imgs-preview-basic",
	components: {
		'vc-imgs-preview': ImgsPreview
	},
	data() {
		return {
			dataSource: [
				{
					src: 'https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png',
					title: 'Image 1',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180313/942990884682/10053600,2880,1800.jpg',
					title: 'Image 2',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180313/942990767112/10049533,2880,1800.jpg',
					title: 'Image 2',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180228/803943510611/衣服-01.png',
					title: 'Image 2',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180313/942996157518/10053669,2880,1800.jpg',
					title: 'Image 2',
					w: 1200,
					h: 900
				}

			]
		};
	},
};
</script>
```
:::

### 自定义预览
调用ImgsPreview的open方法预览大图。

:::RUNTIME
```html
<template>
	<div>
		<span style="cursor: pointer;" @click="handleClick">自定义预览</span>
	</div>
</template>
<script>
import { ImgsPreview } from '@wya/vc';

export default {
	name: "vc-imgs-preview-basic",
	components: {
		'vc-imgs-preview': ImgsPreview
	},
	data() {
		return {
			dataSource: [
				{
					src: 'https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png',
					title: 'Image 1',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180313/942990884682/10053600,2880,1800.jpg',
					title: 'Image 2',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180313/942990767112/10049533,2880,1800.jpg',
					title: 'Image 2',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180228/803943510611/衣服-01.png',
					title: 'Image 2',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180313/942996157518/10053669,2880,1800.jpg',
					title: 'Image 2',
					w: 1200,
					h: 900
				}

			],
			opts: {
				closeOnScroll: false
			}
		};
	},
	methods: {
		handleClick(e) {
			let pos = {};
			try {
				const target = e.target; // 先得到pos, 否则getThumbBoundsFn再计划，target已变化（比如弹窗transition的影响）
				const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
				const rect = target.getBoundingClientRect();

				pos = { x: rect.left, y: rect.top + pageYScroll, w: rect.width };

			} catch (e) {
				console.log(e);
			}
			ImgsPreview.open({
				visible: true,
				dataSource: this.dataSource,
				opts: {
					index: 2,
					history: false,
					getThumbBoundsFn: (index) => pos
				}
			});
		}
	}
};
</script>
```
:::

## API

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
dataSource | 源数据 | `Array<Object>`; `Array<String>` | - | -
opts | photoSwipe参数 | `Object` | - | -
events | photoSwipe事件 | `Object` | - | -
actionBar | 工具栏扩展 | `Array` | - | -
getInstance | 获取组件实例对象 | `Function` | - | -
enhancer | 增强方法 | `Function` | - | -
itemClassName | item的className | `String` | - | -
renderRow | 自定义渲染内容 | `(h, props, parent) => jsx` | -
id | 外层标识 | `String` | - | -

### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---|---
open | 打开预览 | - | -
close | 关闭预览 | - | -

### 插槽
属性 | 说明
---|---
operate | 蒙层中的操作视图
row | 同方法renderRow 
