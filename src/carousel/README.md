## 走马灯（Carousel）
在有限空间内，循环播放同一类型的图片、文字等内容

### 何时使用
- 当有一组平级的内容。
- 当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。
- 常用于一组图片或卡片轮播。

### 基础用法
默认是自动播放，并且`hover`切换

:::RUNTIME
```html
<template>
	<div class="v-carousel-basic">
		<p>自动切换，默认Hover切换</p>
		<vc-carousel :height="150">
			<vc-carousel-item v-for="item in 4" :key="item">
				<h3>{{ item }}</h3>
			</vc-carousel-item>
		</vc-carousel>
		<p style="margin-top: 10px">不自动切换，Click指示器切换</p>
		<vc-carousel 
			:autoplay="false" 
			trigger="click" 
			:height="150"
		>
			<vc-carousel-item v-for="item in 4" :key="item">
				<h3>{{ item }}</h3>
			</vc-carousel-item>
		</vc-carousel>
	</div>
</template>
<script>
import { Carousel } from '@wya/vc'
export default {
	components: {
		'vc-carousel': Carousel,
		'vc-carousel-item': Carousel.Item,
	},
}
</script>
<style>
.v-carousel-basic .vc-carousel-item h3{
	color: #475669;
	font-size: 14px;
	opacity: 0.75; 
	line-height: 150px;
	margin: 0;
	text-align: center;
}
.v-carousel-basic .vc-carousel-item:nth-child(2n) {
	background-color: #99a9bf;
}
.v-carousel-basic .vc-carousel-item:nth-child(2n+1) {
	background-color: #d3dce6;
}
</style>
```
:::

### 指示器
通过`dots`控制指示器

:::RUNTIME
```html
<template>
	<div class="v-carousel-basic">
		<p>隐藏指示器</p>
		<vc-carousel :dots="false" :height="150">
			<vc-carousel-item v-for="item in 4" :key="item">
				<h3>{{ item }}</h3>
			</vc-carousel-item>
		</vc-carousel>
		<p style="margin-top: 10px">指示器在容器外显示</p>
		<vc-carousel dots="outside" :height="150">
			<vc-carousel-item v-for="item in 4" :key="item">
				<h3>{{ item }}</h3>
			</vc-carousel-item>
		</vc-carousel>
	</div>
</template>
<script>
import { Carousel } from '@wya/vc'
export default {
	components: {
		'vc-carousel': Carousel,
		'vc-carousel-item': Carousel.Item,
	},
}
</script>
<style>
.v-carousel-basic li{
	margin-top: 0 !important; 
	list-style: none;
}
.v-carousel-basic .vc-carousel-item h3{
	color: #475669;
	font-size: 14px;
	opacity: 0.75; 
	line-height: 150px;
	margin: 0;
	text-align: center;
}
.v-carousel-basic .vc-carousel-item:nth-child(2n) {
	background-color: #99a9bf;
}

.v-carousel-basic .vc-carousel-item:nth-child(2n+1) {
	background-color: #d3dce6;
}
</style>
```
:::

### 切换箭头
`arrow`属性定义了切换箭头的显示时机。默认情况下，切换箭头只有在鼠标`hover`到走马灯上时才会显示；若将`arrow`设置为`always`，则会一直显示；设置为`false`，则会一直隐藏。（注意：设置为`false`时需要使用v-bind）

:::RUNTIME
```html
<template>
	<div class="v-carousel-basic">
		<p>隐藏切换箭头</p>
		<vc-carousel :arrow="false" :height="150">
			<vc-carousel-item v-for="item in 4" :key="item">
				<h3>{{ item }}</h3>
			</vc-carousel-item>
		</vc-carousel>
		<p style="margin-top: 10px">箭头一直显示</p>
		<vc-carousel arrow="always" :height="150">
			<vc-carousel-item v-for="item in 4" :key="item">
				<h3>{{ item }}</h3>
			</vc-carousel-item>
		</vc-carousel>
	</div>
</template>
<script>
import { Carousel } from '@wya/vc'
export default {
	components: {
		'vc-carousel': Carousel,
		'vc-carousel-item': Carousel.Item,
	},
}
</script>
```
:::

### 垂直方向的走马灯
通过设置`vertical`来让走马灯在垂直方向上显示。

:::RUNTIME
```html
<template>
	<div class="v-carousel-basic">
		<vc-carousel vertical :height="150">
			<vc-carousel-item v-for="item in 4" :key="item">
				<h3>{{ item }}</h3>
			</vc-carousel-item>
		</vc-carousel>
	</div>
</template>
<script>
import { Carousel } from '@wya/vc'
export default {
	components: {
		'vc-carousel': Carousel,
		'vc-carousel-item': Carousel.Item,
	},
}
</script>
<style>
</style>
```
:::

### 卡片化
当页面宽度方向空间空余，但高度方向空间匮乏时，可使用卡片风格。

:::RUNTIME
```html
<template>
	<div class="v-carousel-basic">
		<vc-carousel card :height="150">
			<vc-carousel-item v-for="item in 4" :key="item">
				<h3>{{ item }}</h3>
			</vc-carousel-item>
		</vc-carousel>
	</div>
</template>
<script>
import { Carousel } from '@wya/vc'
export default {
	components: {
		'vc-carousel': Carousel,
		'vc-carousel-item': Carousel.Item,
	},
}
</script>
<style>
</style>
```
:::

### H5基础用法

:::RUNTIME
```html
<template>
	<div class="v-carousel-basic">
		<vcm-carousel :height="150" :autoplay="true" dots="bottom">
			<vcm-carousel-item v-for="item in 4" :key="item">
				<h3>{{ item }}</h3>
			</vcm-carousel-item>
		</vcm-carousel>
	</div>
</template>
<script>
import { MCarousel } from '@wya/vc'
export default {
	components: {
		'vcm-carousel': MCarousel,
		'vcm-carousel-item': MCarousel.Item,
	},
}
</script>
<style>
.v-carousel-basic .vcm-carousel-item h3{
	color: #475669;
	font-size: 14px;
	opacity: 0.75; 
	line-height: 150px;
	margin: 0;
	text-align: center;
}

.v-carousel-basic .vcm-carousel-item:nth-child(2n) {
	background-color: #99a9bf;
}

.v-carousel-basic .vcm-carousel-item:nth-child(2n+1) {
	background-color: #d3dce6;
}
</style>
```
:::

### H5卡片

:::RUNTIME
```html
<template>
	<div class="v-carousel-basic">
		<vcm-carousel :t="4" :height="200" card>
			<vcm-carousel-item v-for="item in 6" :key="item">
				<h3 class="medium">
					{{ item }}
				</h3>
			</vcm-carousel-item>
		</vcm-carousel>
	</div>
</template>
<script>
import { MCarousel } from '@wya/vc'
export default {
	components: {
		'vcm-carousel': MCarousel,
		'vcm-carousel-item': MCarousel.Item,
	},
}
</script>
```
:::

### H5垂直走马灯

:::RUNTIME
```html
<template>
	<div class="v-carousel-basic">
		<vcm-carousel :autoplay="false" :height="200" vertical dots="bottom">
			<vcm-carousel-item v-for="item in 3" :key="item">
				<h3 class="medium">
					{{ item }}
				</h3>
			</vcm-carousel-item>
		</vcm-carousel>
	</div>
</template>
<script>
import { MCarousel } from '@wya/vc'
export default {
	components: {
		'vcm-carousel': MCarousel,
		'vcm-carousel-item': MCarousel.Item,
	},
}
</script>
<style>
</style>
```
:::

## API

### 基础属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
t | 幻灯片切换的时间间隔 | `Number` | - | 3
height | - | `String`、`Number` | - | -
initialIndex | 初始状态激活的幻灯片的索引，从 0 开始 | `Number` | - | 0
trigger | - | `String` | `hover`、`click` | `hover`
autoplay | 是否自动切换 | `Boolean` | - | `true`
dots | 是否展示指示器、是否在显示在容器外部 | `String`、`Boolean` | `outside`、`bottom`、`false` | true
arrow | - | `String`、`Boolean` | `hover`、`always`、`false` | `hover`
loop | 是否循环显示 | `Boolean` | - | `true`
vertical | 是否垂直 | `Boolean` | - | `false`
draggable | 是否可以拖拽切换 | `Boolean` | - | `true`

### Carousel-Item属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
name | 幻灯片的名字 | `String` | - | -
label | 该幻灯片所对应指示器的文本	 | `String`、`Number` | - | -
width | 卡片形式的大小 | `Number`、`String` | - | 70%
gutter | 卡片之间的间距 | `Number` | - | 0
scale | 卡片的缩放 | `Number` | - | 0.83

### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---
change | 幻灯片切换时触发 | `(activeIndex: Number) => void 0` | `activeIndex`：目前激活的幻灯片索引，原幻灯片索引

### 方法
方法名 | 说明 | 参数
---|---|---
setActiveItem | 手动切换幻灯片 | 需要切换的幻灯片的索引，从 0 开始；或相应 `vc-carousel-item`的`name`属性值
prev | 切换至上一张幻灯片 | -
next | 切换至下一张幻灯片 | -