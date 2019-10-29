## [Demo Basic](https://wya-team.github.io/wya-vc/dist/form/basic.html)
## 功能
表单管理

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
model | 表单数据对象 | Object | -
rules | 表单验证规则，具体配置查看 [ async-validator](https://github.com/yiminghe/async-validator) | Object | -
inline | 是否开启行内表单模式 | Boolean | false
label-position | 表单域标签的位置，可选值为 `left`、`right`、`top` | String | right
label-width | 表单域标签的宽度，所有的 FormItem 都会继承 Form 组件的 label-width 的值 | Number | -
show-message | 是否显示校验错误信息 | Boolean | true
autocomplete | 原生的 autocomplete 属性，可选值为 off 或 on | String | off


#### 方法

属性 | 说明 | 参数 | 返回值
---|---|---|---
validate | 对整个表单进行校验，参数为检验完的回调，会返回一个 Boolean 表示成功与失败，支持 Promise | callback | - 可传入对象 { scroll: true }，页面定位报错位置
validateField | 对部分表单字段进行校验的方法，参数1为需校验的 prop，参数2为检验完回调，返回错误信息 | callback | -
resetFields | 对整个表单进行重置，将所有字段值重置为空并移除校验结果 | - | -


#### Item 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
prop | 对应表单域 model 里的字段 | String | - 
label | 标签文本 | String | - 
label-width | 表单域标签的的宽度 | Number | - 
label-for | 指定原生的 label 标签的 for 属性，配合控件的 `element-id` 属性，可以点击 label 时聚焦控件。 | String | - 
required | 是否必填，如不设置，则会根据校验规则自动生成 | Boolean | - 
rules | 表单验证规则 | Object  |  Array | - 
error | 表单域验证错误信息, 设置该值会使表单验证状态变为error，并显示该错误信息 | String | - 
show-message | 是否显示校验错误信息 | Boolean | true 

#### Item Slot

属性 | 说明
---|---
label | label 内容


#### 配合form验证的自定义组件

```
this.dispatch('vc-form-item', 'form-change', ...args);
```

## 基础用法

```vue
<template>
	<vc-form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 300px">
		<vc-form-item
			v-for="(item, index) in formDynamic.items"
			v-if="item.status"
			:key="index"
			:label="'Item ' + item.index"
			:prop="'items.' + index + '.value'"
			:rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}"
		>
			<input v-model="item.value" type="text" placeholder="Enter something..." >
			<span @click="handleRemove(index)">Delete</span>
		</vc-form-item>
		<vc-form-item>
			<div type="dashed" long icon="md-add" @click="handleAdd">Add item</div>
		</vc-form-item>
		<vc-form-item>
			<div type="primary" @click="handleSubmit('formDynamic')">Submit</div>
			<div style="margin-left: 8px" @click="handleReset('formDynamic')">Reset</div>
		</vc-form-item>
	</vc-form>
</template>
<script>
import Form from '..';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-form': Form,
		'vc-form-item': Form.Item,
	},
	data() {
		return {
			index: 1,
			formDynamic: {
				items: [
					{
						value: '',
						index: 1,
						status: 1
					}
				]
			}
		};
	},
	computed: {
		
	},
	methods: {
		handleSubmit(name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					this.$Message.success('Success!');
				} else {
					this.$Message.error('Fail!');
				}
			});
		},
		handleReset(name) {
			this.$refs[name].resetFields();
		},
		handleAdd() {
			this.index++;
			this.formDynamic.items.push({
				value: '',
				index: this.index,
				status: 1
			});
		},
		handleRemove(index) {
			this.formDynamic.items[index].status = 0;
		}
	}
};
</script>

```