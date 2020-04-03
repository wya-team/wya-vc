## 图片预览（ImgsPreview）

### 何时使用

使用场景和使用方式

### 基础用法

:::RUNTIME
```html
<template>
	<div>
		<!-- 自定义 renderRow -->
		<vc-imgs-preview :data-source="dataSource" :render-row="renderRow" />
		
		<!-- 自定义 renderRow -->
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

			],
			opts: {
				closeOnScroll: false
			}
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

			],
			opts: {
				closeOnScroll: false
			}
		};
	},
};
</script>
```
:::

### 自定义预览
调用ImgsPreview的open方法

:::RUNTIME
```html
<template>
	<div>
		<span @click="handleClick">自定义预览</span>
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

#### 属性

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
dataSource | 源数据 | `Array<Object>, Array<String>` | - | -
opts | photoSwipe参数 | `Object` | - | -
events | photoSwipe事件 | `Object` | - | -
id | 外层标识 | `String` | - | -

#### 方法
属性 | 说明 | 类型 | 默认值
---|---|---|---
getInstance | 获取photoSwipe实例 | `() => {}` | -
renderRow | 自定义组件 | `(h, props, parent) => jsx` | -


#### 插槽

属性 | 说明 | 默认值
---|---|---
operate | 蒙层中的操作视图 | `{src, index, show}`
row | 同方法renderRow | `{src, index}`
