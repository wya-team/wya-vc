# wya-vc
[![npm][npm-image]][npm-url] [![changelog][changelog-image]][changelog-url]

## [Demo](https://wya-team.github.io/wya-vc/dist/index.html)

## 安装

```vim
npm install wya-vc --save
```

## 使用方式 => 按需加载，需要安装 `babel-plugin-import`
```vim
npm install babel-plugin-import --save-dev
```
- 配置`.babelrc`
```vim
{
	"plugins": [
		[
			"import",
			[
				{
					"libraryName": "wya-vc",
					"libraryDirectory": "lib"
				}
			]
		]
	]
}
```

```js
// 调用, 如下：
import { Copy } from 'wya-vc';
```

## 组件（暂时不归类）
### 实例
- [`VcInstance: 上下文传递`](https://github.com/wya-team/wya-vc/tree/master/src/vc-instance/)
### 通用（移动优先）
- [`Copy: 复制`](https://github.com/wya-team/wya-vc/tree/master/src/copy/)
- [`Print: 打印`](https://github.com/wya-team/wya-vc/tree/master/src/print/)
- [`CreatePortal: 创建兄弟节点(方法调用) -> （）=> Promise`](https://github.com/wya-team/wya-vc/tree/master/src/create-portal/)
- [`Upload: 上传`](https://github.com/wya-team/wya-vc/tree/master/src/upload/)

### Mobile - 移动端

### PC - PC端

<!--  以下内容无视  -->
[changelog-image]: https://img.shields.io/badge/changelog-md-blue.svg
[changelog-url]: CHANGELOG.md

[npm-image]: https://img.shields.io/npm/v/wya-vc.svg
[npm-url]: https://www.npmjs.com/package/wya-vc
