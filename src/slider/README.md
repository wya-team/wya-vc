## [Demo Basic](https://wya-team.github.io/wya-vc/dist/slider/basic.html)
## 功能
滑动

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
value | 滑块选定的值，可以使用 v-model 双向绑定数据。普通模式下，数据格式为数字，在双滑块模式下，数据格式为长度是2的数组，且每项都为数字 | Number, Array | 0
min | 最小值 | Number | 0
max | 最大值 | Number | 100
step | 步长，取值建议能被（max - min）整除 | Number | 1
disabled | 是否禁用滑块 | Boolean | false
range | 是否开启双滑块模式 | Boolean | false
show-input | 是否显示数字输入框，仅在单滑块模式下有效 | Boolean | false
show-stops | 是否显示间断点，建议在 step 不密集时使用 | Boolean | false
show-tip | 提示的显示控制，可选值为 `hover`（悬停，默认）、`always`（总是可见）、`never`（不可见） | String | hover
tip-format | Slider 会把当前值传给 `tip-format`，并在 Tooltip 中显示 tip-format 的返回值，若为 null，则隐藏 Tooltip | Function | value


#### 事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
change | 在松开滑动时触发，返回当前的选值，在滑动过程中不会触发 | value | ---
input | 滑动条数据变化时触发，返回当前的选值，在滑动过程中实时触发 | value | ---


## 基础用法

```vue
<template>
	<div style="padding: 20px">
		<p>基础用法</p>
		<vc-slider v-model="value1" show-tip="always"/>
		<vc-slider v-model="value1" show-tip="never"/>
		<vc-slider v-model="value1" />
		<vc-slider v-model="value2" range/>
		<vc-slider v-model="value3" range disabled/>
		<p>离散值</p>
		<vc-slider v-model="value4" :step="10"/>
		<vc-slider v-model="value5" :step="10" range/>
		<p>显示中间断点</p>
		<vc-slider v-model="value6" :step="10" show-stops/>
		<vc-slider v-model="value7" :step="10" show-stops range/>
		<p>自定义提示</p>
		<vc-slider v-model="value9" :tip-format="format"/>
		<vc-slider v-model="value10" :tip-format="hideFormat"/>
	</div>
</template>
<script>
import Slider from '..';

export default {
	name: "vc-slider-basic",
	components: {
		'vc-slider': Slider
	},
	data() {
		return {
			value1: 25,
			value2: [20, 50],
			value3: [20, 50],
			value4: 30,
			value5: [20, 50],
			value6: 30,
			value7: [20, 50],
			value8: 25,
			value9: 25,
			value10: 25
		};
	},
	computed: {
		
	},
	methods: {
		handleChange() {
			console.log(arguments[0]);
		},
		format(val) {
			return 'Progress: ' + val + '%';
		},
		hideFormat() {
			return null;
		}
	}
};
</script>
```