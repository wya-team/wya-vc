## [Demo Basic](https://wya-team.github.io/wya-vc/dist/web/create-customer/basic.html)
## 功能
自定义渲染组件，以参数形式传递

## 关联组件清单

- Upload/Tips （上传）

## API

#### `CreateCustomer(propsType: Object, opts: Object)`

属性 | 说明 | 类型 | 默认值
---|---|---|---
propsType | 创建的外层元素 | `object` | `{ render: Function }`
opts | 额外参数 | `object` | `{}`



## 基础用法

```vue
<template>
	<customer-row :render="renderRow" name="customer-render-test"/>
</template>
<script>
import CreateCustomer from '../index';

const CustomerRow = CreateCustomer({
	name: String
});

export default {
	name: "vc-tpl-basic",
	components: {
		CustomerRow
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
		renderRow(h, { name }) {
			//  注意jsx的语法是单大括号
			// return (
			// 	<div>
			// 		{ name }
			// 	</div>
			// );
			return h('div', {
				domProps: {
					innerHTML: name
				}
			});
		}
	}
};
</script>

```