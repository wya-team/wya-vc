## 表单（Form）

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据

### 典型表单
包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。
在 Form 组件中，每一个表单域由一个 Form-Item 组件构成，表单域中可以放置各种类型的表单控件，包括 Input、Select、Checkbox、Radio、Switch、DatePicker、TimePicker

:::RUNTIME
```html
<template>
	<vc-form 
		ref="formValidate" 
		:model="formValidate" 
		:label-width="96"
		style="padding-left: 56px; margin-top: 21px"
		@submit.native.prevent
	>
		<vc-form-item label="input：">
			<vc-input v-model="formValidate.input" style="width: 300px" />
		</vc-form-item>
		<vc-form-item label="select：">
			<vc-select v-model="formValidate.select" style="width: 300px;" clearable>
				<vc-option
					v-for="(item, index) in cityList"
					:value="item.label"
					:key="index"
				>{{ item.label }}</vc-option>
			</vc-select>
		</vc-form-item>
		<vc-form-item label="switch：">
			<vc-switch v-model="formValidate.switch"/>
		</vc-form-item>
		<vc-form-item label="date：">
			<vc-date-picker 
				v-model="formValidate.date"
				type="datetime" 
				clearable
				placeholder="Select date" 
				style="width: 300px"
			/>
		</vc-form-item>
		<vc-form-item label="checkbox：">
			<vc-checkbox-group v-model="formValidate.checkbox">
				<vc-checkbox label="香蕉" />
				<vc-checkbox label="苹果" />
				<vc-checkbox label="西瓜" />
			</vc-checkbox-group>
		</vc-form-item>
		<vc-form-item label="radio：">
			<vc-radio-group v-model="formValidate.radio" vertical>
				<vc-radio label="金斑蝶" />
				<vc-radio label="爪哇犀牛" />
				<vc-radio label="印度黑羚" />
			</vc-radio-group>
		</vc-form-item>
		<vc-form-item label="radio：">
			<vc-radio-group v-model="formValidate.radio">
				<vc-radio label="金斑蝶" />
				<vc-radio label="爪哇犀牛" />
				<vc-radio label="印度黑羚" />
			</vc-radio-group>
		</vc-form-item>
		<vc-form-item
			v-for="(item, index) in formValidate.items"
			v-if="item.status"
			:key="index"
			:label="'Item ' + item.index + '：'"
			:prop="'items.' + index + '.value'"
			:rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'change'}"
		>
			<span @click="handleRemove(index)">Delete</span>
		</vc-form-item>
		<vc-form-item>
			<div @click="handleAdd">
				Add item
			</div>
		</vc-form-item>
		<vc-form-item>
			<vc-button type="primary" @click="handleSubmit('formValidate')">
				Submit
			</vc-button>
			<vc-button style="margin-left: 8px" @click="handleReset('formValidate')">
				Reset
			</vc-button>
			<vc-button style="margin-left: 8px" @click="handleOnly('formValidate')">
				Only
			</vc-button>
		</vc-form-item>
	</vc-form>
</template>
<script>
import { Form, Input, Button, Checkbox, Radio, Select, Option, DatePicker, Switch } from '@wya/vc';

export default {
	name: "vc-form-basic",
	components: {
		'vc-form': Form,
		'vc-form-item': Form.Item,
		'vc-input': Input,
		'vc-select': Select,
		'vc-option': Option,
		'vc-date-picker': DatePicker,
		'vc-button': Button,
		'vc-checkbox-group': Checkbox.Group,
		'vc-checkbox': Checkbox,
		'vc-radio-group': Radio.Group,
		'vc-radio': Radio,
		'vc-switch': Switch,
	},
	data() {
		return {
			index: 1,
			formValidate: {
				input: '',
				select: '',
				switch: '',
				date: '',
				checkbox: [],
				radio: '',
				items: [{
					value: '',
					index: 1,
					status: 1
				}]
			},
			cityList: [{
				value: '1',
				label: 'New York'
			}, {
				value: '2',
				label: 'London'
			}]
		};
	},
	methods: {
		handleSubmit() {
			console.log(res, this.formValidate);
		},
		handleReset(name) {
			this.$refs[name].resetFields();
		},
		handleAdd() {
			this.index++;
			this.formValidate.items.push({
				value: '',
				index: this.index,
				status: 1
			});
		},
		handleRemove(index) {
			this.formValidate.items[index].status = 0;
		}
	}
};
</script>

<style>
.v-form-basic {
	margin-bottom: 10px;
}
</style>
```
:::

### 行内表单
当垂直方向空间受限且表单较简单时，可以在一行内放置表单。
设置 `inline` 属性可以让表单域变为行内的表单域

:::RUNTIME
```html
<template>
	<vc-form 
		ref="formValidate" 
		:label-width="50"
		inline
		style="padding-left: 56px; margin-top: 21px"
		@submit.native.prevent
	>
		<vc-form-item label="input：">
			<vc-input v-model="formValidate.input" />
		</vc-form-item>
		<vc-form-item label="select：">
			<vc-select v-model="formValidate.select" clearable>
				<vc-option
					v-for="(item, index) in cityList"
					:value="item.label"
					:key="index"
				>{{ item.label }}</vc-option>
			</vc-select>
		</vc-form-item>
		<vc-form-item>
			<vc-button type="primary" @click="handleSubmit('formValidate')">
				Submit
			</vc-button>
		</vc-form-item>
	</vc-form>
</template>
<script>
import { Form, Input, Button, Select, Option } from '@wya/vc';

export default {
	name: "vc-form-basic",
	components: {
		'vc-form': Form,
		'vc-form-item': Form.Item,
		'vc-input': Input,
		'vc-select': Select,
		'vc-button': Button,
	},
	data() {
		return {
			formValidate: {
				input: '',
				select: '',
			},
			cityList: [{
				value: '1',
				label: 'New York'
			}, {
				value: '2',
				label: 'London'
			}]
		};
	},
	methods: {
		handleSubmit(name) {
			console.log(res, this.formValidate);
		},
	}
};
</script>

<style>
.v-form-basic {
	margin-bottom: 10px;
}
</style>
```
:::

### 对齐方式
根据具体目标和制约因素，选择最佳的标签对齐方式。
通过设置 `label-position` 属性可以改变表单域标签的位置，可选值为 `top`、`left`，当设为 `top` 时标签会置于表单域的顶部

:::RUNTIME
```html
<template>
	<div>
		<vc-radio-group v-model="labelPosition" type="button">
			<vc-radio label="left">左对齐</vc-radio>
			<vc-radio label="right">右对齐</vc-radio>
			<vc-radio label="top">顶部对齐</vc-radio>
		</vc-radio-group>
		<vc-form 
			ref="formValidate" 
			:label-width="50"
			:label-position="labelPosition"
			style="margin-top: 21px"
			@submit.native.prevent
		>
			<vc-form-item label="input：">
				<vc-input v-model="formValidate.input" />
			</vc-form-item>
			<vc-form-item label="input：">
				<vc-input v-model="formValidate.input" />
			</vc-form-item>
			<vc-form-item label="input：">
				<vc-input v-model="formValidate.input" />
			</vc-form-item>
		</vc-form>
	</div>
</template>
<script>
import { Form, Input } from '@wya/vc';

export default {
	name: "vc-form-basic",
	components: {
		'vc-form': Form,
		'vc-form-item': Form.Item,
		'vc-input': Input,
	},
	data() {
		return {
			labelPosition: 'right',
			formValidate: {
				input: '',
			},
		};
	},
	methods: {
		handleSubmit(name) {
			console.log(res, this.formValidate);
		},
	}
};
</script>

<style>
.v-form-basic {
	margin-bottom: 10px;
}
</style>
```
:::

### 表单校验
在防止用户犯错的前提下，尽可能让用户更早地发现并纠正错误。
Form 组件提供了表单验证的功能，只需要通过 `rules` 属性传入约定的验证规则，并将 Form-Item 的 `prop` 属性设置为需校验的字段名即可。

:::RUNTIME
```html
<template>
	<vc-form 
		ref="formValidate" 
		:model="formValidate" 
		:rules="ruleValidate"
		:label-width="96"
		style="padding-left: 56px; margin-top: 21px"
		@submit.native.prevent
	>
		<vc-form-item prop="input" label="input：">
			<vc-input v-model="formValidate.input" style="width: 300px" />
		</vc-form-item>
		<vc-form-item prop="select" label="select：">
			<vc-select v-model="formValidate.select" style="width: 300px;" clearable>
				<vc-option
					v-for="(item, index) in cityList"
					:value="item.label"
					:key="index"
				>{{ item.label }}</vc-option>
			</vc-select>
		</vc-form-item>
		<vc-form-item prop="switch" label="switch：">
			<vc-switch v-model="formValidate.switch"/>
		</vc-form-item>
		<vc-form-item prop="date" label="date：">
			<vc-date-picker 
				v-model="formValidate.date"
				type="datetime" 
				clearable
				placeholder="Select date" 
				style="width: 300px"
			/>
		</vc-form-item>
		<vc-form-item prop="checkbox" label="checkbox：">
			<vc-checkbox-group v-model="formValidate.checkbox">
				<vc-checkbox label="香蕉" />
				<vc-checkbox label="苹果" />
				<vc-checkbox label="西瓜" />
			</vc-checkbox-group>
		</vc-form-item>
		<vc-form-item prop="radio" label="radio：">
			<vc-radio-group v-model="formValidate.radio" vertical>
				<vc-radio label="金斑蝶" />
				<vc-radio label="爪哇犀牛" />
				<vc-radio label="印度黑羚" />
			</vc-radio-group>
		</vc-form-item>
		<vc-form-item prop="radio" label="radio：">
			<vc-radio-group v-model="formValidate.radio">
				<vc-radio label="金斑蝶" />
				<vc-radio label="爪哇犀牛" />
				<vc-radio label="印度黑羚" />
			</vc-radio-group>
		</vc-form-item>
		<vc-form-item
			v-for="(item, index) in formValidate.items"
			v-if="item.status"
			:key="index"
			:label="'Item ' + item.index + '：'"
			:prop="'items.' + index + '.value'"
			:rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'change'}"
		>
			<span @click="handleRemove(index)">Delete</span>
		</vc-form-item>
		<vc-form-item>
			<div @click="handleAdd">
				Add item
			</div>
		</vc-form-item>
		<vc-form-item>
			<vc-button type="primary" @click="handleSubmit('formValidate')">
				Submit
			</vc-button>
			<vc-button style="margin-left: 8px" @click="handleReset('formValidate')">
				Reset
			</vc-button>
			<vc-button style="margin-left: 8px" @click="handleOnly('formValidate')">
				Only
			</vc-button>
		</vc-form-item>
	</vc-form>
</template>
<script>
import { Form, Input, Button, Checkbox, Radio, Select, Option, DatePicker, Switch } from '@wya/vc';

export default {
	name: "vc-form-basic",
	components: {
		'vc-form': Form,
		'vc-form-item': Form.Item,
		'vc-input': Input,
		'vc-select': Select,
		'vc-option': Option,
		'vc-date-picker': DatePicker,
		'vc-button': Button,
		'vc-checkbox-group': Checkbox.Group,
		'vc-checkbox': Checkbox,
		'vc-radio-group': Radio.Group,
		'vc-radio': Radio,
		'vc-switch': Switch,
	},
	data() {
		return {
			index: 1,
			formValidate: {
				input: '',
				select: '',
				switch: '',
				date: '',
				checkbox: [],
				radio: '',
				items: [
					{
						value: '',
						index: 1,
						status: 1
					}
				]
			},
			ruleValidate: {
				input: [
					{ required: true, message: '请输入内容', trigger: 'blur' },
           	 		{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				select: [
					{ required: true, message: '请选择区域', trigger: 'change' }
				],
				date: [
					{ required: true, type: 'date', message: '请选择日期', trigger: 'change' }
				],
				checkbox: [
					{ type: 'array', required: true, message: '请至少选择一种水果', trigger: 'change' }
				],
				radio: [
					{ required: true, message: '请选择动物', trigger: 'change' }
				],
			},
			cityList: [
				{
					value: '1',
					label: 'New York'
				},
				{
					value: '2',
					label: 'London'
				}]
		};
	},
	methods: {
		handleSubmit(name) {

			this.$refs[name].validate(() => {}).then((res) => {

			}).catch((res) => {
				console.log(res, this.formValidate);
			});
		},

		handleOnly(name) {
			this.$refs[name].validateField('items.0.value', { scroll: true }).then(() => {

			}).catch((error) => {
				console.log(error);
			});
		},

		handleReset(name) {
			this.$refs[name].resetFields();
		},

		handleAdd() {
			this.index++;
			this.formValidate.items.push({
				value: '',
				index: this.index,
				status: 1
			});
		},

		handleRemove(index) {
			this.formValidate.items[index].status = 0;
		}
	}
};
</script>

<style>
.v-form-basic {
	margin-bottom: 10px;
}
</style>
```
:::

### 自定义校验规则
这个例子中展示了如何使用自定义验证规则来完成密码的二次验证。

:::RUNTIME
```html
<template>
	<vc-form 
		ref="formValidate" 
		:model="formValidate" 
		:rules="ruleValidate"
		:label-width="96"
		style="padding-left: 56px; margin-top: 21px"
		@submit.native.prevent
	>
		<vc-form-item prop="pass" label="密码：">
			<vc-input type="password" v-model="formValidate.pass" style="width: 300px" />
		</vc-form-item>
		<vc-form-item prop="checkPass" label="确认密码：">
			<vc-input type="password" v-model="formValidate.checkPass" style="width: 300px" />
		</vc-form-item>
		<vc-form-item prop="age" label="年龄：">
			<vc-input v-model.number="formValidate.age" style="width: 300px" />
		</vc-form-item>
		<vc-form-item>
			<vc-button type="primary" @click="handleSubmit('formValidate')">
				Submit
			</vc-button>
			<vc-button style="margin-left: 8px" @click="handleReset('formValidate')">
				Reset
			</vc-button>
		</vc-form-item>
	</vc-form>
</template>
<script>
import { Form, Input, Button } from '@wya/vc';

export default {
	name: "vc-form-basic",
	components: {
		'vc-form': Form,
		'vc-form-item': Form.Item,
		'vc-input': Input,
		'vc-button': Button,
	},
	data() {
		const checkAge = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('年龄不能为空'));
			}
			setTimeout(() => {
				if (!Number.isInteger(value)) {
					callback(new Error('请输入数字值'));
				} else {
					if (value < 18) {
						callback(new Error('必须年满18岁'));
					} else {
						callback();
					}
				}
			}, 1000);
		};
		const validatePass = (rule, value, callback) => {
			if (!value) {
				callback(new Error('请输入密码'));
			} else {
				if (!this.formValidate.checkPass) {
					this.$refs.formValidate.validateField('checkPass');
				}
				callback();
			}
		};
		const validatePass2 = (rule, value, callback) => {
			if (!value) {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.formValidate.pass) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return {
			formValidate: {
				pass: '',
          		checkPass: '',
				age: ''
			},
			ruleValidate: {
				pass: [
					{ validator: validatePass, trigger: 'blur' }
				],
				checkPass: [
					{ validator: validatePass2, trigger: 'blur' }
				],
				age: [
					{ validator: checkAge, trigger: 'blur' }
				]
			},
		};
	},
	methods: {
		handleSubmit(name) {
			this.$refs[name].validate(() => {}).then((res) => {

			}).catch((res) => {
				console.log(res, this.formValidate);
			});
		},
		handleReset(name) {
			this.$refs[name].resetFields();
		},
	}
};
</script>

<style>
.v-form-basic {
	margin-bottom: 10px;
}
</style>
```
:::


#### 属性

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
model | 表单数据对象 | Object | - | -
rules | 表单验证规则，具体配置查看 [ async-validator](https://github.com/yiminghe/async-validator) | Object | - | -
inline | 是否开启行内表单模式 | Boolean | - | false
label-position | 表单域标签的位置 | String | `left`、`right`、`top` | right
label-width | 表单域标签的宽度，所有的 FormItem 都会继承 Form 组件的 label-width 的值 | Number | - | -
show-message | 是否显示校验错误信息 | Boolean | - | true
autocomplete | 原生的 autocomplete 属性 | String | `off`、`on` | off


#### 方法

属性 | 说明 | 参数 | 返回值
---|---|---|---
validate | 对整个表单进行校验，参数为检验完的回调，会返回一个 Boolean 表示成功与失败，支持 Promise | callback | -
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


