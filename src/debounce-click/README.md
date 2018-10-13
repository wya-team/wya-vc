## [Demo Basic](https://wya-team.github.io/wya-vc/dist/web/debounce-click/basic.html)
## 功能
tpl

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
wait | 延迟的时间 | number | 250
tag | 标签名 | `string object func` | `div`


## 基础用法

```vue
<template>
	<div>
		<vc-debounce-click @click="handleClick">
			点击
		</vc-debounce-click>
		<vc-debounce-click :tag="Button" @click="handleClick">
			点击
		</vc-debounce-click>
	</div>
</template>
<script>
import { DebounceClick } from 'wya-vc';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-debounce-click': DebounceClick,
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	beforeCreate() {
		/**
		 * 这样不会被注册监听
		 */
		this.Button = Button;
	},
	methods: {
		handleClick(e) {
			console.log(e, new Date());
		}
	}
};
</script>

```