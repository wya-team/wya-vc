## [Demo Basic](https://wya-team.github.io/wya-vc/dist/picker/mobile-basic.html)
## 功能
移动端选择器

## API

#### 属性

- `vcm-picker`

属性 | 说明 | 类型 | 默认值
---|---|---|---
loadData | 异步加载数据函数 | `Function` | -
extra | 占位符 | `String` | -
formatter | 格式化 | `Function` | -

- `vcm-picke-view`

属性 | 说明 | 类型 | 默认值
---|---|---|---
value | 返回值(v-model) | `Array` | -
dataSource | 数据源 | `Array` | -
cols | 列数 | `Number` | -
itemStyle | 列的样式 | `Object` | -
cascade | 是否为联动选中 | `Boolean` | true

- `vcm-picke-popup`

visible | 控制，可以使用v-model | `Boolean` | false
title | 标题 | `String` | -
title | 标题 | `String` | -
cancelText | 取消文本 | `String` | 取消
okText | 确定文本 | `String` |  确定
showToolbar | 是否显示toolbar | `Boolean` | true

#### 事件

- `vcm-picker`

属性 | 说明 | 类型 | 默认值
---|---|---|---
change | 组件关闭时候触发出来的一个事件，返回值为当前选中的值以及每一列的数据 | `function` | -
ok | - | `function` | -
cancel | - | `function` | -

- `vcm-picke-popup`

属性 | 说明 | 类型 | 默认值
---|---|---|---
ok | - | `function` | -
cancel | - | `function` | -
close | - | `function` | -

- `vcm-picke-view`

属性 | 说明 | 类型 | 默认值
---|---|---|---
change | - | `function` | -
picker-change | - | `function` | -

```
// 方法
MPicker.open({
	...,
	onOk: () => {},
	onCancel: () => {},
});

// 组件
`vcm-picker`
`vcm-picker-popup`
`vcm-picker-view`
```

## 基础用法

```
<template>
	<div class="vcm-picker-basic">
		<vcm-picker
			:data-source="dataSource"
			:cascade="true"
			:cols="3"
			v-model="value"
		/>

		<vcm-picker
			:data-source="dataAsyncSource"
			:cascade="true"
			:cols="3"
			:load-data="loadData"
			v-model="valueAsync"
		>
			<h2 slot-scope="it">
				{{ it.label }}
			</h2>
		</vcm-picker>

		<vcm-picker
			:data-source="dataSeasons"
			:cascade="false"
			:cols="2"
			v-model="valueSeasons"
			extra="非联动选择"
		/>

		<div @click="handleClick">点击直接调用</div>
	</div>
</template>
<script>
import { cloneDeep } from 'lodash';
import MToast from '../../m-toast/index';
import MPicker from '../m-picker.vue';
import { cascadeData, seasons } from './basic/mock';

export default {
	name: "vcm-picker-basic",
	components: {
		'vcm-picker': MPicker
	},
	data() {
		return {
			show: false,
			dataSource: cloneDeep(cascadeData),
			dataAsyncSource: [],
			value: ["140000", "140100", "140101"],
			valueAsync: ["140000", "140100", "140101"],
			valueSeasons: [],
			dataSeasons: cloneDeep(seasons),
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
					this.dataAsyncSource = cloneDeep(cascadeData);
					resolve();
				}, 3000);
			});
		},
		handleClick() {
			MPicker.popup({
				dataSource: cloneDeep(cascadeData),
				value: ["140000", "140100", "140101"],
				cols: 3
			}).then((res) => {
				MToast.info(res.label.join(','));
			}).catch(() => {
				MToast.info(res);
			});
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