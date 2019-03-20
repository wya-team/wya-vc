## [Demo Basic](https://wya-team.github.io/wya-vc/dist/color-picker/basic.html)
## 功能
ColorPicker 颜色选择器

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
value | 绑定的值，可使用 v-model 双向绑定 | String | -
disabled | 是否禁用 | Boolean | false
editable | 是否可以输入色值 | Boolean | true
alpha | 是否支持透明度选择 | Boolean | false
hue | 是否支持色彩选择 | Boolean | true
recommend | 是否显示推荐的颜色预设 | Boolean | false
colors | 自定义颜色预设 | Array | []
format | 颜色的格式，可选值为 hsl、hsv、hex、rgb | String | 开启 alpha 时为 rgb，其它为 hex
size | 尺寸，可选值为large、small、default或者不设置 | String | -


#### 事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
change | 当绑定值变化时触发 | (value: String) | -
active-change | 面板中当前显示的颜色发生改变时触发 | (value: String) | -
open-change | 下拉框展开或收起时触发 | (value: Boolean) | -


## 基础用法

```vue
<template>
	<div>
		<vc-color-picker v-model="color1" />
		<vc-color-picker v-model="color2" />
	</div>
</template>
<script>
import ColorPicker from '..';

export default {
	name: "vc-color-picker-basic",
	components: {
		'vc-color-picker': ColorPicker
	},
	data() {
		return {
			color1: '#19be6b',
			color2: ''
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>

```