## [Demo Basic](https://wya-team.github.io/wya-vc/dist/popup/mobile-basic.html)
## 功能
移动端弹出层

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
fixed | 是否使用fixed布局 | `Boolean` | false
show | 是否显示 | `Boolean` | false
placement | 从哪个方向弹出（top/bottom/left/right/center） | `String` | bottom
theme | 背景（dark/light/none） | `String` | light
mask | 是否显示遮罩（只有在position为bottom的时候才有用） | `Boolean` | true
maskClosable | 是否允许通过点击遮罩关闭弹窗 | `Boolean` | true
wrapperClassName | - | `Object,Array,String` | -
wrapperStyle | - | `Object,Array,String` | -
scrollRegExp | 判断滑动是否在滚动容器内，防止滚动穿透弹层 | `Function` | `void: function(v) { return /g-scroll-container/.test(v); }`

#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
visible-change | 组件关闭时候触发出来的一个事件，参数为false | `value: Boolean` | -



## 基础用法

```vue
<template>
	<div>
		<vcm-popup v-model="show">
			xxx
		</vcm-popup>
		<button @click="handleClick">当前组件：click</button>
	</div>
</template>
<script>
import { MPopup } from '@wya/vc';

export default {
	name: "vc-popup-basic",
	components: {
		'vcm-popup': MPopup
	},
	data() {
		return {
			show: false
		};
	},
	computed: {

	},
	methods: {
		handleClick() {
			this.show = true;
		},
		
	}
};

</script>

```