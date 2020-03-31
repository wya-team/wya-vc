## 选择器（Picker）
移动端选择器

## 基础用法vcm-picker
组件通过cascade属性判断picker是否为层级联动。

:::RUNTIME
```vue
<template>
	<div class="vcm-picker-basic">
		<vcm-picker
			:data-source="dataSource"
			:cascade="true"
			:cols="3"
			v-model="value"
			@change="handleChange"
			@ok="handleOk"
			@cancel="handleCancel"
		/>
		<vcm-picker
			:data-source="dataAsyncSource"
			:cascade="true"
			:cols="3"
			:load-data="loadData"
			v-model="valueAsync"
		>
			<template #default="it">
				<h2>
					点击选择：{{ it.label }}
				</h2>
			</template>
		</vcm-picker>
		<vcm-picker
			:dataSource="dataSeasons"
			:cascade="false"
			:cols="2"
			v-model="valueSeasons"
			extra="非联动选择"
		/>
	</div>
</template>
<script>
import { cloneDeep } from 'lodash';
import { MToast, MPicker } from '@wya/vc';

export default {
	name: "vcm-picker-basic",
	components: {
		'vcm-picker': MPicker
	},
	data() {
		return {
			show: false,
			dataSource: [{
				"value": "110000",
				"label": "北京市",
				"parent_id": "0",
				"children": [{
					"value": "110100",
					"label": "北京市辖区",
					"parent_id": "110000",
					"children": [{
						"value": "110101",
						"label": "东城区",
						"parent_id": "110100",
						"children": []
					}, {
						"value": "110102",
						"label": "西城区",
						"parent_id": "110100",
						"children": []
					}, {
						"value": "110116",
						"label": "其他",
						"parent_id": "110100",
						"children": []
					}]
				}, {
					"value": "110200",
					"label": "北京县区",
					"parent_id": "110000",
					"children": [{
						"value": "110228",
						"label": "密云县",
						"parent_id": "110200",
						"children": []
					}, {
						"value": "110229",
						"label": "延庆县",
						"parent_id": "110200",
						"children": []
					}]
				}]
			}],
			dataAsyncSource: [],
			value: ["110000", "110100", "110101"],
			valueAsync: ["110000", "110100", "110101"],
			valueSeasons: [],
			dataSeasons: [
				[
					{
						label: '2013',
						value: '2013',
					},
					{
						label: '2014',
						value: '2014',
					}
				],
				[
					{
						label: '春',
						value: '春',
					},
					{
						label: '夏',
						value: '夏',
					}
				]
			]
		};
	},
	computed: {
	},
	mounted() {

	},
	methods: {
		loadData() {
			MToast.info('异步加载中');
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					this.dataAsyncSource = cloneDeep(this.dataSource);
					resolve();
				}, 3000);
			});
		},
		handleChange(value) {
			console.log(value)
		},
		handleOk() {
			///do something
		},
		handleCancel() {
			///do something
		}
	},
};

</script>
<style>
.vcm-picker-basic div{
	display: flex;
	height: 44px;
	background: white;
	border-bottom: 1px solid #e7e7e7;
	justify-content: center;
	align-items: center;
}
</style>
```
:::

## 方法调用vcm-picker
:::RUNTIME
```html
<template>
	<div class="vcm-picker-basic">
		<div @click="handleClick">点击直接调用</div>
	</div>
</template>
<script>
import { cloneDeep } from 'lodash';
import { MToast, MPicker } from '@wya/vc';

export default {
	name: "vcm-picker-basic",
	components: {
		'vcm-picker': MPicker
	},
	data() {
		return {
			dataSource:[{
				"value": "110000",
				"label": "北京市",
				"parent_id": "0",
				"children": [{
					"value": "110100",
					"label": "北京市辖区",
					"parent_id": "110000",
					"children": [{
						"value": "110101",
						"label": "东城区",
						"parent_id": "110100",
						"children": []
					}, {
						"value": "110102",
						"label": "西城区",
						"parent_id": "110100",
						"children": []
					}, {
						"value": "110116",
						"label": "其他",
						"parent_id": "110100",
						"children": []
					}]
				}, {
					"value": "110200",
					"label": "北京县区",
					"parent_id": "110000",
					"children": [{
						"value": "110228",
						"label": "密云县",
						"parent_id": "110200",
						"children": []
					}, {
						"value": "110229",
						"label": "延庆县",
						"parent_id": "110200",
						"children": []
					}]
				}]
			}]

		}
	},
	methods: {
		handleClick() {
			MPicker.open({
				dataSource: this.dataSource,
				value: ["110000", "110100", "110101"],
				cols: 3,
				onOk: (value, label) => {
					MToast.info(label.join(','));
				},
				onCancel: () => {
					MToast.info('value');
				}
			});
		}
	}

}
</script>
```
:::

## vcm-picker-popup
仅为picker的弹层组件，不提供选择的用途，visible为ture默认开启。
:::RUNTIME
```vue
<template>
	<div>
		<vc-button @click="handleClick">弹出</vc-button>
		<vcm-picker-popup
			:visible="visible"
			title="标题"
			cancelText="取消"
			okText="确定"
			@cancel="handleCancel"
			@close="handleClose"
		>
			<div>内容</div>
		</vcm-picker-popup>
	</div>
</template>
<script>
import { MPicker,Button } from '@wya/vc';
export default {
	name: "vcm-picker-basic",
	components: {
		'vcm-picker-popup': MPicker.Popup
	},
	data() {
		return {
			visible: false
		}
	},
	methods: {
		handleClick() {
			this.visible = !this.visible
		},
		handleClose() {
			this.visible = !this.visible
		},
		handleCancel() {
			console.log('cancel')
		}
	}
}
</script>
```
:::

## vcm-picker-view
picker的选择组件，没有弹层。

:::RUNTIME
```html
<template>
	<vcm-picker-view
		v-model="formValidate.addr"
		:data-source="dataSource"
		:cascade="true"
		:cols="3"
	>
		<div>内容</div>
	</vcm-picker-popup>
</template>
<script>
import { cloneDeep } from 'lodash';
import { MToast, MPicker } from '@wya/vc';

export default {
	name: "vcm-picker-basic",
	components: {
		'vcm-picker-view': MPicker.View
	},
	data() {
		return {
			dataSource: [{
				"value": "110000",
				"label": "北京市",
				"parent_id": "0",
				"children": [{
					"value": "110100",
					"label": "北京市辖区",
					"parent_id": "110000",
					"children": [{
						"value": "110101",
						"label": "东城区",
						"parent_id": "110100",
						"children": []
					}, {
						"value": "110102",
						"label": "西城区",
						"parent_id": "110100",
						"children": []
					}, {
						"value": "110116",
						"label": "其他",
						"parent_id": "110100",
						"children": []
					}]
				}, {
					"value": "110200",
					"label": "北京县区",
					"parent_id": "110000",
					"children": [{
						"value": "110228",
						"label": "密云县",
						"parent_id": "110200",
						"children": []
					}, {
						"value": "110229",
						"label": "延庆县",
						"parent_id": "110200",
						"children": []
					}]
				}]
			}],
			formValidate: {
				addr: [],
			},
		}
	}
}
</script>
```
:::


## API

#### 属性

- `picker`

属性 | 说明 | 类型 | 默认值
---|---|---|---
loadData | 异步加载数据函数 | `Function` | -
extra | 占位符 | `String` | -
formatter | 格式化 | `Function` | -

- `picker-view`

属性 | 说明 | 类型 | 默认值
---|---|---|---
value | 返回值(v-model) | `Array` | -
dataSource | 数据源 | `Array` | -
cols | 列数 | `Number` | -
itemStyle | 列的样式 | `Object` | -
cascade | 是否为联动选中 | `Boolean` | `true`

- `dataSource 数据结构`

当传入多列数据时且`cascade`为`false`时，`columns`为一个多维数组。当`cascade`为`ture`时，`columns`为一个对象数组

键名 | 说明 | 类型
--- | --- | ---
value | 每一项的值 | `String`
label | 每一项的内容 | `String`
children | 子集对象数组 | `Array`


- `picker-popup`

属性 | 说明 | 类型 | 默认值
---|---|---|---
visible | 控制，可以使用v-model | `Boolean` | `false`
title | 标题，支持v-html | `String` | -
cancelText | 取消文本 | `String` | 取消
okText | 确定文本 | `String` |  确定
showToolbar | 是否显示toolbar | `Boolean` | `true`

#### 事件

- `picker`

属性 | 说明 | 类型 | 默认值
---|---|---|---
change | 组件关闭时候触发出来的一个事件，返回值为当前选中的值以及每一列的数据 | `function` | -
ok | - | `function` | -
cancel | - | `function` | -

- `picker-popup`

属性 | 说明 | 类型 | 默认值
---|---|---|---
ok | - | `function` | -
cancel | - | `function` | -
close | - | `function` | -

- `picke-view`

属性 | 说明 | 类型 | 默认值
---|---|---|---
change | - | `function` | -
picker-change | - | `function` | -

#### Slot

- `picker`

名称 | 说明
---|---
default ｜ 点击弹出区域

- `picker-popup`

名称 | 说明
---|---
default ｜ 弹出层的内容
