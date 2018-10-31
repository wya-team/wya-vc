## [Demo Basic](https://wya-team.github.io/wya-vc/dist/files-picker/basic.html)
## 功能
文件选择

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
value | 上传的文件 | `array` | []
max | 文件的最大数量 | `number` | 0（不限制）
disabled | 是否禁止上传 | `boolean` | false
upload | upload组件的属性 | `object` | {}
accept | 文件接收类型 | `string` | -


#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
@change | `value`值改变的回调 | `function` | -
@error | 上传错误的回调的回调 | `function` | -



## 基础用法

```html
<template>
	<vc-files-picker 
		:upload="{multiple: true}"
	>
		<!-- <template slot-scope="slotProps">
			<div v-for="(item, index) in slotProps.files" :key="index">
				{{ item }}
			</div>
		</template> -->
	</vc-files-picker>
</template>
<script>
import FilesPicker from '../files-picker';
import { VcInstance } from '../../vc/index';

VcInstance.init({
	Upload: {
		URL_UPLOAD_IMG_POST: 'https://wyaoa-new.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=oa',
		URL_UPLOAD_FILE_POST: 'https://wyaoa-new.ruishan666.com/uploadfile/upimg.json?action=uploadfile&encode=utf-8&code=oa'
	}
});

export default {
	name: "vc-files-picker-basic",
	components: {
		"vc-files-picker": FilesPicker
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