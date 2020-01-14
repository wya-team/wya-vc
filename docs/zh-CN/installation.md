## 安装

### npm 安装

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。

```shell
npm install @wya/vc --save
```

### CDN

目前可以通过 [unpkg.com/@wya/vc](https://unpkg.com/@wya/vc/) 获取到最新版本的资源，在页面上引入 js 和 css 文件即可开始使用。

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/@wya/vc/lib/vc.min.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/@wya/vc/lib/vc.min.js"></script>
```

:::TIP
我们建议使用 CDN 引入`@wya/vc`的用户在链接地址上锁定版本，以免将来`@wya/vc`升级时受到非兼容性更新的影响。锁定版本的方法请查看 [unpkg.com](https://unpkg.com)。
:::

### Hello world

:::RUNTIME
```html
<template>
	<vc-popover content="Bottom">
		<vc-button>Hello world</vc-button>
		<template #content>
			<span class="v-installation">Hello @wya/vc</span>
		</template>
	</vc-popover>
</template>

<script>
export default {
	name: 'hello-world'
}
</script>

<style>
.v-installation {
	color: #873bf4;
}
</style>
```
:::

如果是通过 npm 安装，并希望配合 webpack 使用，请阅读下一节：[快速上手](/zh-CN/component/quickstart)。
