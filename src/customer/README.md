## [Demo Basic](https://wya-team.github.io/wya-vc/dist/create-customer/basic.html)
## 功能
自定义渲染组件，以参数形式传递

## 关联组件清单

- Upload/Tips （上传）

## API（自由的）

## 基础用法

```vue
<template>
	<div>
		<vc-customer
			:render="renderRow"
			:value="value" 
			:date="date" 
			class="vc-customer"
			style="border: 1px solid red"
			name="time"
		/>
	</div>
</template>
<script>
import Customer from '..';

export default {
	name: "vc-customer-basic",
	components: {
		'vc-customer': Customer
	},
	data() {
		return {
			value: 1,
			date: new Date()
		};
	},
	computed: {
		
	},
	mounted() {
		setInterval(() => {
			this.value++;
			this.date = new Date();
		}, 1000);
	},
	methods: {
		renderRow(h, props) {
			const { style, className, name, value, date } = props;
			/**
			 * 与React类似
			 */
			return (
				<div class={className} style={style}>
					{date.toString()}:{name}:{value}
				</div>
			);
		}
	}
};
</script>


```