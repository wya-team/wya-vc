## 进度条（Progress）
显示是上传的进度

### 基础用法
默认是线性进度条,通过status控制

:::RUNTIME
```html
<template>
	<div class="v-progress-basic">
		<vc-progress
            :percent="50"
            status="active"
        />
        <vc-progress
            :percent="100"
            status="success"
        />
        <vc-progress
            :percent="20"
            status="error"
        />
         <vc-progress
            :percent="50"
        />
	</div>
</template>

<script>
import { Progress } from '@wya/vc';
export default {
	components: {
		"vc-progress": Progress
	},
	mounted() {
	},
	methods: {
	}
};
</script>
<style>
.v-progress-basic {
	width: 500px;
}
</style>
```
:::

### 控制进度条的宽度

:::RUNTIME
```html
<template>
	<div class="v-progress-basic">
		<vc-progress
            :percent="50"
            status="active"
            :show-info="false"
            :stroke-width="15"
        />
         <vc-progress
            :percent="100"
            status="success"
            :stroke-width="15"
        />
        <vc-progress
            :percent="20"
            status="error"
            :stroke-width="15"
        />
         <vc-progress
            :percent="50"
            :stroke-width="15"
        />
	</div>
</template>

<script>
import { Progress } from '@wya/vc';
export default {
	components: {
		"vc-progress": Progress
	},
	mounted() {
	},
	methods: {
	}
};
</script>
<style>
.v-progress-basic {
	width: 500px;
}
.v-progress-basic > .vc-progress{
    margin-bottom: 10px;
}
</style>
```
:::

### 圆形进度条
type `circle`控制，stroke-color控制颜色
:::RUNTIME
```html
<template>
	<div class="v-progress-circle">
		<vc-progress
            :stroke-width="10" 
			:percent="50"
			stroke-color="#ed4014"
			type="circle"
        />

        <vc-progress
            :stroke-width="10" 
            :percent="60"
            size="150"
			type="circle"
        >
			<div>这里可以自定义数据</div>
		</vc-progress>
	</div>
</template>

<script>
import { Progress } from '@wya/vc';
export default {
	components: {
		"vc-progress": Progress
	},
	mounted() {
	},
	methods: {
	}
};
</script>
<style>
.v-progress-circle > .vc-progress {
    margin-bottom: 5px;
}
</style>
```
:::
### API

### 基础属性

属性 | 说明 | 类型| 可选值 | 默认值
---|---|---|---|---
type | 进度条类型 | `String` | `line` `circle` | line
percent | 进度百分比 | `Number`| - | 0 
status | 状态 | `String` | `normal` `success` `error` `active` |  normal
size | 环形进度条画布宽度（只有type为`circle`时可用） | `Number` | - | 120
stroke-width | 进度条宽度 | `Number` | - | 6
stroke-color | 环形进度条颜色 | `String` | - | #2d8cf0 
show-info | 是否显示进度数值或者状态图标 | `Boolean` | - |true
line-theme| line的颜色 | `Object` | - | {normal: '#5495f6', success: '#52c41a', error: '#f5222d'}
