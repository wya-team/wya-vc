## [Demo Basic](https://wya-team.github.io/wya-vc/dist/icon/basic.html)
## 功能
`wya-vc` 图标

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
type | icon类型 | `string` | -


#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
@click | 点击事件 | `function` | -



## 基础用法

```html
<template>
	<vc-icon type="up" />
</template>
<script>
import Icon from '../icon';

export default {
	name: "vc-icon-basic",
	components: {
		'vc-icon': Icon
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>
```