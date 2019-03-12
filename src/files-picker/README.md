## [Demo Basic](https://wya-team.github.io/wya-vc/dist/files-picker/basic.html)
## 功能
文件选择
#### 备注
上传错误的文件数据不会传递给外层

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
dataSource | 上传的文件 | `array` | []
max | 文件的最大数量 | `number` | 0（不限制）
disabled | 是否禁止上传 | `boolean` | false
upload | upload组件的属性 | `object` | {}
accept | 文件接收类型 | `string` | -
urlKey | 文件的线上地址字段 | `string` | `url`
format | 自定义返回数据格式 | `Function` | -


#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
@change | `value`值改变的回调 | `function` | -
@error | 上传错误的回调的回调 | `function` | -
@complete | 上传完成后的回调 | `function` | -



## 基础用法

```html
<template>
	<vc-files-picker 
		:upload="{multiple: true}"
		class="v-files-picker "
	>
		<!-- <template slot-scope="slotProps">
			<div v-for="(item, index) in slotProps.files" :key="index">
				{{ item }}
			</div>
		</template> -->
		<div slot="trigger" class="_upload">
			上传
		</div>
	</vc-files-picker>
</template>
<script>
import { VcInstance, FilesPicker } from '@wya/vc';

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

<style lang="scss">
.v-files-picker {
	._upload {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 88px;
		height: 40px;
		font-size: 14px;
		border: 1px solid #d4d4d4;
		border-radius: 6px;
		background: #ffffff;
		margin-bottom: 12px;
		cursor: pointer;
		&:hover {
			border: 1px solid #0085ff;
			color: #0085ff;
		}
	}
}
</style>

```