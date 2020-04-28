## 进度条（Progress）
展示操作的当前进度

### 何时使用
在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。
- 当一个操作会打断当前界面，或者需要在后台运行，且耗时可能超过 2 秒时。
- 当需要显示一个操作完成的百分比时。

### 基础用法
默认是线性进度条，通过`status`控制进度条类型，当 percent 为 100 时，自动将状态置为 `success`。

:::RUNTIME
```html
<template>
	<div class="v-progress-basic">
		<vc-progress
            :percent="50"
        />
        <vc-progress
            :percent="100"
            status="success"
        />
        <vc-progress
            :percent="20"
            status="error"
        />
	</div>
</template>
<script>
import { Progress } from '@wya/vc';

export default {
	components: {
		"vc-progress": Progress
	},
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
通过`stroke-width`控制进度条宽度，单位`px`。

:::RUNTIME
```html
<template>
	<div class="v-progress-basic">
         <vc-progress
            :percent="100"
            status="success"
            :stroke-width="15"
        />
        <vc-progress
            :percent="20"
            status="error"
            :stroke-width="25"
        />
         <vc-progress
            :percent="50"
            :stroke-width="35"
        />
	</div>
</template>
<script>
import { Progress } from '@wya/vc';

export default {
	components: {
		"vc-progress": Progress
	},
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


### 进度条动态展示
通过`stroke-width`控制进度条宽度，单位`px`。

:::RUNTIME
```html
<template>
	<div class="v-progress-basic">
         <vc-progress
            :percent="percent"
        />
        <vc-button @click="handleIncrease">增加进度</vc-button>
        <vc-button @click="handleDecrease">减少进度</vc-button>
	</div>
</template>
<script>
import { Progress, Button } from '@wya/vc';

export default {
	components: {
        "vc-progress": Progress,
        "vc-button": Button
    },
    data() {
        return {
            percent: 30,
        }
    },
    methods: {
        handleIncrease() {
            this.percent += 10;
            if (this.percent > 100) {
                this.percent = 100;
            }
        },
        handleDecrease() {
            this.percent -= 10;
            if (this.percent < 0) {
                this.percent = 0;
            }
        }
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
type `circle`控制，stroke-color控制颜色。

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
        <br/>
        <vc-progress
            :stroke-width="10" 
            :percent="60"
            :size="150"
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
};
</script>
<style>
.v-progress-circle > .vc-progress {
    margin-bottom: 5px;
}
</style>
```
:::

## API

### 基础属性
属性 | 说明 | 类型| 可选值 | 默认值
---|---|---|---|---
type | 进度条类型 | `String` | `line`、`circle` | `line`
percent | 进度百分比 | `Number`、 `String` | - | 0 
status | 状态 | `String` | `normal`、`success`、`error`、`active` |  `normal`
size | 环形进度条画布宽度（只有type为`circle`时可用），单位`px` | `Number` | - | 120
stroke-width | 进度条宽度，单位`px` | `Number` | - | 6
stroke-color | 环形进度条颜色 | `String` | - | #2d8cf0 
show-info | 是否显示进度数值或者状态图标 | `Boolean` | - |true
line-theme| line的颜色 | `Object` | - | `{ normal: '#5495f6', success: '#52c41a', error: '#f5222d' }`
