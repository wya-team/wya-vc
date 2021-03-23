## 步骤条
引导用户按照流程完成任务的导航条。

### 何时使用
当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。

### 基础用法
<!-- 仅展示最基本的用法 -->
:::RUNTIME
```html
<template>
	<div style="padding: 20px">
		<vc-steps-bar 
			v-model="current"
			:data-source="dataSource"
			@change="handleChange"
		/>
		<vc-steps :current="2" style="margin-top: 20px">
			<vc-step title="这是标题" subtitle="我是子标题" description="我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述" />
			<vc-step title="这是标题" subtitle="我是子标题" description="我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述" />
			<vc-step title="这是标题" subtitle="我是子标题" description="我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述" />
		</vc-steps>
		<vc-steps :current="2" style="margin-top: 20px" direction="vertical">
			<vc-step title="这是标题" subtitle="我是子标题" description="我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述" />
			<vc-step title="这是标题" subtitle="我是子标题" description="我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述" />
			<vc-step title="这是标题" subtitle="我是子标题" description="我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述" />
		</vc-steps>
		<vc-steps :current="2" style="margin-top: 20px" size="small">
			<vc-step title="这是标题" subtitle="我是子标题" description="我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述" />
			<vc-step title="这是标题" subtitle="我是子标题" description="我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述" />
			<vc-step title="这是标题" subtitle="我是子标题" description="我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述" />
		</vc-steps>
	</div>
</template>
<script>
import Steps from '..';

export default {
	name: "vc-steps-basic",
	components: {
		'vc-steps-bar': Steps.Bar,
		'vc-steps': Steps,
		'vc-step': Steps.Step,
	},
	data() {
		return {
			current: "1",
			dataSource: [
				{ 
					value: "1",
					label: '第1步'
				},
				{ 
					value: "2",
					label: '第2步'
				},
				{ 
					value: "3",
					label: '第3步'
				}
			]
		};
	},
	methods: {
		handleChange(e) {
			console.log(e);
		}
	}
};
</script>
```
:::

## API
### Steps 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
| current | 指定当前步骤，从 1 开始记数。在子 Step 元素中，可以通过 `status` 属性覆盖状态 | `Number` | - | 0 |
| direction | 指定步骤条方向。目前支持水平（`horizontal`）和竖直（`vertical`）两种方向 | `String` | `horizontal` `vertical` | `horizontal` |
| size | 指定大小，目前支持普通（`default`）和迷你（`small`） | `String` | `default` `small` | `default` |
| status | 指定当前步骤的状态 | `String` | `wait` `process` `finish` `error` | `process` |

### Steps Slot
属性 | 说明
---|---
default | -

### Step 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
| title | 标题 | `String` | - |  |
| subtitle | 子标题 | `String` | - |  |
| description | 步骤的详情描述 | `String` | - |  |
| icon | 步骤图标的类型 | `String` | - |  |
| status | 指定当前步骤的状态 | `String` | `wait` `process` `finish` `error` | `process` |
### Step Slot
属性 | 说明
---|---
title | 自定义标题
subtitle | 自定义子标题
description | 自定义描述


