## [Demo Basic](https://wya-team.github.io/wya-vc/dist/web/check-box/basic.html)
## 功能
多选框

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
value | 只在单独使用时有效。可以使用 v-model 双向绑定数据 | Boolean | false
label | 只在组合使用时有效。指定当前选项的 value 值，组合会自动判断是否选中 | String, Number, Boolean | -
disabled | 是否禁用当前项 | Boolean | false
indeterminate | 设置 indeterminate 状态，只负责样式控制 | Boolean | false
size | 多选框的尺寸，可选值为 large、small、default 或者不设置 | String | -
true-value | 选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用 | String, Number, Boolean | true
false-value | 没有选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用 | String, Number, Boolean | false


#### 事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
change | 只在单独使用时有效。在选项状态发生改变时触发，通过修改外部的数据改变时不会触发 | `value: Boolean` | -


#### Group 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
value | 指定选中项目的集合，可以使用 v-model 双向绑定数据 | Array | []
size | 多选框组的尺寸，可选值为 large、small、default 或者不设置 | String | -


#### Group事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
change | 在选项状态发生改变时触发，返回已选中的数组。通过修改外部的数据改变时不会触发	 | `value: Array` | -


## 基础用法

```vue
<template>
	<div>
		<vc-checkbox v-model="single">{{ single }}</vc-checkbox>
		<vc-checkbox-group v-model="social">
			<vc-checkbox label="twitter">
				<span>Twitter</span>
			</vc-checkbox>
			<vc-checkbox label="facebook">
				<span>Facebook</span>
			</vc-checkbox>
			<vc-checkbox label="github" disabled>
				<span>Github</span>
			</vc-checkbox>
			<vc-checkbox label="snapchat" disabled>
				<span>Snapchat</span>
			</vc-checkbox>
		</vc-checkbox-group>
		<vc-checkbox-group v-model="fruit">
			<vc-checkbox label="香蕉"/>
			<vc-checkbox label="苹果"/>
			<vc-checkbox label="西瓜"/>
		</vc-checkbox-group>

		<!-- indeterminate -->
		<div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
			<vc-checkbox
				:indeterminate="indeterminate"
				:value="checkAll"
				@click.prevent.native="handleCheckAll"
			>全选</vc-checkbox>
		</div>
		<vc-checkbox-group v-model="checkAllGroup" @change="handleChange">
			<vc-checkbox label="香蕉"/>
			<vc-checkbox label="苹果"/>
			<vc-checkbox label="西瓜"/>
		</vc-checkbox-group>
	</div>
</template>
<script>
import Checkbox from '..';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-checkbox': Checkbox,
		'vc-checkbox-group': Checkbox.Group,
	},
	data() {
		return {
			single: false,
			social: ['facebook', 'github'],
			fruit: ['苹果'],

			indeterminate: true,
			checkAll: false,
			checkAllGroup: ['香蕉', '西瓜']
		};
	},
	computed: {
		
	},
	updated() {
		console.log({
			single: this.single,
			social: this.social,
			fruit: this.fruit,
			checkAll: this.checkAll
		});
	},
	methods: {
		handleCheckAll() {
			if (this.indeterminate) {
				this.checkAll = false;
			} else {
				this.checkAll = !this.checkAll;
			}
			this.indeterminate = false;

			if (this.checkAll) {
				this.checkAllGroup = ['香蕉', '苹果', '西瓜'];
			} else {
				this.checkAllGroup = [];
			}
		},
		handleChange(data) {
			if (data.length === 3) {
				this.indeterminate = false;
				this.checkAll = true;
			} else if (data.length > 0) {
				this.indeterminate = true;
				this.checkAll = false;
			} else {
				this.indeterminate = false;
				this.checkAll = false;
			}
		}
	}
};
</script>
```