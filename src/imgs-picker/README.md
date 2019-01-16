## [Demo Basic](https://wya-team.github.io/wya-vc/dist/imgs-picker/basic.html)
## 功能
图片上传
##### 备注
上传错误的文件数据不会传递给外层，切传递给组件的是 `dataSource` 必须是字符串数组

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
tag | 容器标签 | `string` | div
dataSource | 上传的图片 | `array` | []
max | 图片的最大数量 | `number` | 0（不限制）
disabled | 是否禁止上传和删除 | `boolean` | false
upload | upload组件的属性 | `object` | {}
accept | 可接受的文件类型 | `string` | `image/gif`, `image/jpeg`, `image/jpg`, `image/png`
format | 自定义返回数据格式 | `Function` | - 


#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
@change | `dataSource`值改变的回调 | `function` | -
@error | 上传错误的回调的回调 | `function` | -
@complete | 上传完成后的回调 | `function` | -


#### 插槽

属性 | 说明 | 默认值
---|---|---
operate | 蒙层中的操作视图 | `{src, index}`


## 基础用法

```html
<template>
	<i-form
		ref="form"
		:model="formValidate" 
		:rules="ruleValidate" 
	>
		<i-form-item prop="imgs">
			<vc-imgs-picker v-model="formValidate.imgs" :max="2" />
		</i-form-item>
		<div @click="handleSubmit">提交</div>
	</i-form >
</template>
<script>
import { Form, FormItem, Input } from 'iview';
import ImgsPicker from '../imgs-picker';
import { VcInstance } from '../../vc/index';

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
		'i-form': Form,
		'i-form-item': FormItem,
		'i-input': Input,
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