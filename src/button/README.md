---
## 按钮（button）

各种样式的按钮

### 何时使用

使用场景和使用方式

### 基础用法
通过`type`、`circle`控制按钮的样式
:::RUNTIME
```html
<template>
    <div class="vc-wrapper">
        <vc-button>默认按钮</vc-button>
        <vc-button type="primary">常规按钮</vc-button>
        <vc-button type="error">错误按钮</vc-button>
        <vc-button type="success">成功按钮</vc-button>
        <vc-button type="warning">警告按钮</vc-button>
        <vc-button type="text">文字按钮</vc-button>
        <br>
        <vc-button circle>默认按钮</vc-button>
        <vc-button circle type="primary">常规按钮</vc-button>
        <vc-button circle type="error">错误按钮</vc-button>
        <vc-button circle type="success">成功按钮</vc-button>
        <vc-button circle type="warning">警告按钮</vc-button>
    </div>
</template>

<script>
import { Button } from '@wya/vc';
export default {
    components: {
        "vc-button": Button
    },
    mounted() {
    },
    methods: {
    }
};
</script>
<style>
.vc-wrapper>button {
    margin-bottom: 10px;
}
</style>
```
:::

### 禁用状态
按钮不可用状态
:::RUNTIME
```html
<template>
    <div>
        <vc-button disabled type="primary">常规按钮</vc-button>
    </div>
</template>

<script>
import { Button } from '@wya/vc';
export default {
    components: {
        "vc-button": Button
    },
    mounted() {
    },
    methods: {
    }
};
</script>
<style>
</style>
```
:::

### 不同尺寸
通过设置`size`为`large` `small`来设置尺寸为大、小的按钮，不设置或者设置`medium`，则尺寸为中
:::RUNTIME
```html
<template>
    <div class="vc-wrapper">
        <vc-button size="large">大按钮</vc-button>
        <vc-button>默认按钮</vc-button>
        <vc-button size="small">小按钮</vc-button>
        <br>
        <vc-button circle size="large">大按钮</vc-button>
        <vc-button circle>默认按钮</vc-button>
        <vc-button circle size="small">小按钮</vc-button>
    </div>
</template>

<script>
import { Button } from '@wya/vc';
export default {
    components: {
        "vc-button": Button
    },
    mounted() {
    },
    methods: {
    }
};
</script>
<style>
.vc-wrapper>button {
    margin-bottom: 10px;
}
</style>
```
:::
### 图标按钮
:::RUNTIME
```html
<template>
    <div class="vc-wrapper">
        <vc-button icon="success" type="primary"></vc-button>
        <vc-button icon="search" type="primary">搜索</vc-button>
        <vc-button type="primary">搜索 <vc-icon type="search"/></vc-button>
    </div>
</template>

<script>
import { Button, Icon } from '@wya/vc';
export default {
    components: {
        "vc-button": Button,
        "vc-icon": Icon
    },
    mounted() {
    },
    methods: {
    }
};
</script>
<style>
.vc-wrapper>button {
    margin-bottom: 10px;
}
</style>
```
:::

### 长按钮
按钮长度跟随父元素长度
:::RUNTIME
```html
<template>
    <div>
        <div class="vc-box"><vc-button type="primary" long>常规按钮</vc-button></div>
        <div class="vc-box" style="width: 80%"><vc-button type="success" long>常规按钮</vc-button></div>
        <div class="vc-box" style="width: 40%"><vc-button type="warning" long>常规按钮</vc-button></div>
    </div>
</template>

<script>
import { Button } from '@wya/vc';
export default {
    components: {
        "vc-button": Button
    },
    mounted() {
    },
    methods: {
        handlePromise1(e, callback) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 300000); 
            });
        },
    }
};
</script>
<style>
.vc-box{
    margin-bottom: 10px;
}
</style>
```
:::

### 点击按钮出现加载图标
点击事件返回一个`promise`
:::RUNTIME
```html
<template>
    <div>
        <vc-button type="primary" @click="handlePromise1">点击加载</vc-button>
    </div>
</template>

<script>
import { Button } from '@wya/vc';
export default {
    components: {
        "vc-button": Button
    },
    mounted() {
    },
    methods: {
        handlePromise1(e, callback) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 300000); 
            });
        },
    }
};
</script>
<style>
</style>
```
:::

### 按钮组合
需要用`vc-button-group`包裹，根据`vertical`控制按钮组是水平还是垂直
:::RUNTIME
```html
<template>
    <div>
        <vc-button-group>
            <vc-button>左</vc-button>
            <vc-button>右</vc-button>
        </vc-button-group>
        <vc-button-group vertical>
            <vc-button type="primary" icon="up" />
            <vc-button type="primary" icon="down" />
        </vc-button-group>
    </div>
</template>

<script>
import { Button } from '@wya/vc';
export default {
    components: {
        "vc-button": Button
    },
    mounted() {
    },
    methods: {
    }
};
</script>
<style>
</style>
```
:::

### 不同尺寸的按钮组合
需要用`vc-button-group`包裹，并在`vc-button-group`上通过设置`size`为`large` `small`来设置尺寸为大、小的按钮，不设置或者设置`medium`，则尺寸为中
:::RUNTIME
```html
<template>
    <div>
        <vc-button-group size="large">
            <vc-button>大按钮</vc-button>
            <vc-button>大按钮</vc-button>
            <vc-button>大按钮</vc-button>
        </vc-button-group>
        <br>
        <vc-button-group>
            <vc-button>常规按钮</vc-button>
            <vc-button>常规按钮</vc-button>
            <vc-button>常规按钮</vc-button>
        </vc-button-group>
        <br>
        <vc-button-group size="small">
            <vc-button>小按钮</vc-button>
            <vc-button>小按钮</vc-button>
            <vc-button>小按钮</vc-button>
        </vc-button-group>
    </div>
</template>

<script>
import { Button } from '@wya/vc';
export default {
    components: {
        "vc-button": Button
    },
    mounted() {
    },
    methods: {
    }
};
</script>
<style>
</style>
```
:::
### API
### 基础属性
属性 | 说明 | 类型 | 默认值
---|---|---|---
type | 按钮的样式选择:`default`、`primary`、`text`、`success`、`error`、`warning` |`String` | `default`
disabled | 禁止点击 | `Boolean` | `false`
circle | 按钮是否圆角 | `Boolean` | `false`
size | 按钮大小:`large`、`medium`、`small` | `String` | `medium`
icon | 按钮内的图标 | `String` | -
long | 长按钮 | `Boolean` | `false`
wait | 阻止重复点击 | `Number` | 250
htmlType | 按钮的类型: `button`、 `submit`、`reset` [描述](https://www.w3school.com.cn/tags/att_button_type.asp) | `String` | `button`

### Group 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
size | 调节按钮组件的大小:`large`、`medium`、`small` | `String` | `medium`
circle | 按钮是否圆角 | `Boolean` | `false`
vertical | 按钮纵向排列 | `Boolean` | `false`

### 事件/方法
特殊说明
属性 | 说明 | 回调参数
---|---|---|---
click | 返回promise就会有loading图标 | --