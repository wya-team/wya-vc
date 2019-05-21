## [Demo Basic](https://wya-team.github.io/wya-vc/dist/imgs-picker/basic.html)
## 功能
图片上传
##### 备注
上传错误的文件数据不会传递给外层，切传递给组件的是 `dataSource` 必须是字符串数组

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
tag | 容器标签 | `String` | div
dataSource | 上传的图片 | `Array` | []
max | 图片的最大数量 | `Number` | 0（不限制）
disabled | 是否禁止上传和删除 | `Boolean` | false
upload | upload组件的属性 | `Object` | {}
accept | 可接受的文件类型 | `String` | `image/gif`, `image/jpeg`, `image/jpg`, `image/png`
format | 自定义返回数据格式 | `Function` | - 


#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
@change | `dataSource`值改变的回调 | `-` | -
@error | 上传错误的回调的回调 | `-` | -
@complete | 上传完成后的回调 | `-` | -


#### 插槽

属性 | 说明 | 默认值
---|---|---
image | 上传后图片的插槽 | `{ it }`
upload | 上传按钮的插槽 | -


## 基础用法

```html
<template>
	<vc-form
		ref="form"
		:model="formValidate" 
		:rules="ruleValidate" 
	>
		<vc-form-item prop="imgs">
			<vc-imgs-picker v-model="formValidate.imgs" :max="2" />
		</vc-form-item>
		<div @click="handleSubmit">提交</div>
	</vc-form >
</template>
<script>
import { ImgsPicker, Form, FormItem, Input, VcInstance } from '@wya/vc';

VcInstance.init({
	Upload: {
		URL_UPLOAD_IMG_POST: 'https://wyaoa-new.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=oa',
		URL_UPLOAD_FILE_POST: 'https://wyaoa-new.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=oa'
	}
});

export default {
	name: "vc-print-basic",
	components: {
		'vc-imgs-picker': ImgsPicker,
		'vc-form': Form,
		'vc-form-item': Form.Item,
		'vc-input': Input,
	},
	data() {
		return {
			formValidate: {
				imgs: [],
			},
			ruleValidate: {
				imgs: [
					{ required: true, type: 'array', message: '请选择图片', trigger: 'change' }
				],
			}
		};
	},
	computed: {
		
	},
	methods: {
		handleSubmit(name) {
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.$Message.success('Success!');
				} else {
					this.$Message.error('Fail!');
				}
			});
		},
	}
};
</script>
```