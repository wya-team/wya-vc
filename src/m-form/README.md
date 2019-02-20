## [Demo Basic](https://wya-team.github.io/wya-vc/dist/web/m-popup/basic.html)
## 功能
移动端弹出层

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
fixed | 是否使用fixed布局 | `Boolean` | false
show | 是否显示 | `Boolean` | false
position | 从哪个方向弹出（top/bottom） | `String` | bottom
mask | 是否显示遮罩（只有在position为bottom的时候才有用） | `Boolean` | true
maskClosable | 是否允许通过点击遮罩关闭弹窗 | `Boolean` | true


#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
change | 组件关闭时候触发出来的一个事件，参数为false | `function` | -



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
import { MPopup } from 'wya-vc';

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