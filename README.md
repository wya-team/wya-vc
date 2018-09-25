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
...

<!--  以下内容无视  -->
[changelog-image]: https://img.shields.io/badge/changelog-md-blue.svg
[changelog-url]: CHANGELOG.md

[npm-image]: https://img.shields.io/npm/v/wya-vc.svg
[npm-url]: https://www.npmjs.com/package/wya-vc
