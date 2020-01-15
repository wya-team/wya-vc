## 快速上手

本节将介绍如何在项目中使用 `@wya/vc`。

### 使用 Starter Kit

我们提供了通用的[项目模板](https://github.com/wya-team/vue-env)，可以直接下载使用。

如果不希望使用我们提供的模板，请继续阅读。

### 引入 `@wya/vc`

你可以引入整个 `@wya/vc`，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 `@wya/vc`

#### 完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import '@wya/vc/vc.min.css';
import Vc from '@wya/vc';
import App from './App.vue';

Vue.use(Vc);

let app = new Vue({
	el: '#app',
	render: h => h(App)
});
```

以上代码便完成了 `@wya/vc` 的引入。需要注意的是，样式文件需要单独引入。

#### 按需引入

- 针对Vue文件, 我们提供了[`vc-loader`](https://github.com/wya-team/vc-loader)来实现按需自动加载,  配置如下

```javascript
/**
 * loader的机制是从右到左
 */
{
	[
		{
			test: /\.vue$/,
			use: [
				{
					loader: 'vue-loader',
					options: {
						
					}
				},
				{
					loader: 'vc-loader'
				}
			]
		}
	];
}
```

```html
<template>
	<div>
		<vc-input />
		<vcm-input />
	</div>
</template>

<script>
export default {
	name: '',
};
</script>

<style>
</style>
```

- JS文件按需加载使用[babel-plugin-import](https://github.com/ant-design/babel-plugin-import)，配置如下(babel.config.js)

```js
[
	[
		"import",
		{
			"libraryName": "@wya/vc",
			"libraryDirectory": "lib",
			"customName": (name) => {
				if (/^m-/.test(name)) {
					return `@wya/vc/lib/${name.replace(/^m-/, '')}/index.m`;
				}
				return `@wya/vc/lib/${name}`;
			}
		},
		"@wya/vc"
	]
];
```

使用如下

```js
import { Input, MInput } from '@wya/vc';

export default {
	name: 'hello-world',
	render(h) {
		// return h('div', {}, [h(Input), h(MInput)])
		return (
			<div>
				<Input />
				<MInput />
			</div>
		);
	}
};
```

### 全局配置 ([可选项移步]())

```js
import { Vc } from '@wya/vc';

Vue.use(Vc, {});
```


### 开始使用

至此，一个基于 `Vue` 和 `@wya/vc` 的开发环境已经搭建完毕，现在就可以编写代码了。各个组件的使用方法请参阅它们各自的文档。

### 使用 Nuxt.js

我们还可以使用 [Nuxt.js](https://nuxtjs.org)：

> TODO
