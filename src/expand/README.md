## 折叠/展开（Expand）

折叠/展开面板

### 何时使用

需要对页面内容进行折叠、展开切换

### 基础用法
通过`v-model`控制折叠或展开

:::RUNTIME
```html
<template>
	<div>
		<span @click="handleToggle">
			更多搜索条件{{ visible ? `up` : `down` }}
		</span>
		<vc-icon :type="`triangle-${visible ? `up2` : `down2`}`" />
		<vc-expand 
			ref="expand"
			v-model="visible"
		>
			<div style="margin: 20px;">折叠的内容</div>
		</vc-expand>
	</div>
</template>

<script>
import { Expand, Icon} from '@wya/vc';

export default {
	name: 'vc-expand-basic',
	components: {
		'vc-expand': Expand,
		'vc-icon': Icon,
	},
	data() {
		return {
			visible: false
		};
	},
	methods: {
		handleToggle() {
			this.visible = !this.visible;
		}
	}
};

</script>
```
:::

### API

### 基础属性

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
tag | 要渲染成的html标签 |`String` | - | `div`
visible | 折叠或展开状态 | `Boolean` | `true`、`false` | `false`
