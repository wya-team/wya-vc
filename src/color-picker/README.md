## 颜色选择器（ColorPicker）

用于颜色选择，支持多种格式。

### 基础用法

:::RUNTIME
```html
<template>
	<div class="v-color-picker">
		<div style="margin-right: 50px;">
			<p style="text-align: left;">有默认值</p>	
			<vc-color-picker v-model="color" />
		</div>
		<div>
			<p style="text-align: left;">无默认值</p>	
			<vc-color-picker v-model="color1" />
		</div>	
	</div>
</template>

<script>
import { ColorPicker } from '@wya/vc';

export default {
	components: {
		"vc-color-picker": ColorPicker
	},
	data() {
		return {
			color: '#19be6b',
            color1: '',
        }
    },
};
</script>
<style>
.v-color-picker {
	margin: 40px; 
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
```
:::

### 选择透明度
ColorPicker 支持普通颜色，也支持带 Alpha 通道的颜色，通过`alpha`属性即可控制是否支持透明度的选择。

:::RUNTIME
```html
<template>
	<div>
        <vc-color-picker v-model="color" alpha />
	</div>
</template>

<script>
import { ColorPicker } from '@wya/vc';

export default {
	components: {
		"vc-color-picker": ColorPicker
	},
	data() {
		return {
			color: 'rgba(19, 206, 102, 0.8)',
        }
    },
};
</script>
```
:::

### 预定义颜色
ColorPicker 支持预定义颜色，通过`colors`属性预定义颜色。

:::RUNTIME
```html
<template>
	<div>
        <vc-color-picker v-model="color" :colors="predefine" />
	</div>
</template>

<script>
import { ColorPicker } from '@wya/vc';

export default {
	components: {
		"vc-color-picker": ColorPicker
	},
	data() {
		return {
            color: '',
            predefine: [
                '#ff4500',
				'#ff8c00',
				'#ffd700',
				'#90ee90',
				'#00ced1',
				'#1e90ff',
				'#c71585',
				'rgba(255, 69, 0, 0.68)',
				'rgb(255, 120, 0)',
				'hsv(51, 100, 98)',
				'hsva(120, 40, 94, 0.5)',
				'hsl(181, 100%, 37%)',
				'hsla(209, 100%, 56%, 0.1)',
				'hsla(209, 100%, 56%, 0.73)'
            ]
        }
    },
};
</script>
```
:::


### 不同尺寸
ColorPicker 支持不同尺寸的选择器，通过`size`属性控制选择器大小。

:::RUNTIME
```html
<template>
	<div>
        <vc-color-picker v-model="color" size="small" />
        <vc-color-picker v-model="color" size="default" />
        <vc-color-picker v-model="color" size="large" />
	</div>
</template>

<script>
import { ColorPicker } from '@wya/vc';

export default {
	components: {
		"vc-color-picker": ColorPicker
	},
	data() {
		return {
            color: '#19be6b',
        }
    },
};
</script>
<style>
.vc-color-picker {
    margin-right: 20px;    
}
</style>
```
:::

#### 属性

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
value | 绑定的值，可使用 v-model 双向绑定 | `String` | - | -
disabled | 是否禁用 | `Boolean` | - | `false`
editable | 是否可以输入色值 | `Boolean` | - | `true`
alpha | 是否支持透明度选择 | `Boolean` | - | `false`
hue | 是否支持色彩选择 | `Boolean` | - | `true`
recommend | 是否显示推荐的颜色预设 | `Boolean` | - | `false`
colors | 自定义颜色预设 | `Array` | - | []
format | 颜色的格式 | `String` | `hsl` 、 `hsv` 、 `hex` 、 `rgb` | 开启 `alpha` 时为 `rgb`，其它为 `hex`
size | 尺寸 | String |  `large`、`default`、`small` | `default`


#### 事件

事件名 | 说明 | 类型 | 参数
---|---|---|---
change | 当绑定值变化时触发 | `(value: String) => void 0` | `value`: 当前选中的颜色值
color-change | 面板中当前显示的颜色发生改变时触发 | `(value: String) => void 0` | `value`: 当前选中的颜色值
visible-change | 下拉框展开或收起时触发 | `(value: Boolean) => void 0` | `value`: 当前`visible`值