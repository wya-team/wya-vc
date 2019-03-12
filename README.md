# \@wya/vc
[![npm][npm-image]][npm-url] [![changelog][changelog-image]][changelog-url]

## [Demo](https://wya-team.github.io/wya-vc/dist/index.html)

## 安装

```vim
npm install @wya/vc --save
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
					"libraryName": "@wya/vc",
					"libraryDirectory": "lib"
				}
			]
		]
	]
}
```

- template下可以使用`vc-loader`

- 注册选项
```js
import { Vc } from '@wya/vc';

Vue.use(Vc, {
	// config
});
```

```js
// 调用, 如下：
import { Copy } from 'wya-vc';
```

## 组件（暂时不归类）
### 实例
- [`Vc: 上下文传递`](https://github.com/wya-team/wya-vc/tree/master/src/vc/)
### 通用（PC优先）
- [`Calendar: 日历展示`](https://github.com/wya-team/wya-vc/tree/master/src/calendar/)
- [`Copy: 复制`](https://github.com/wya-team/wya-vc/tree/master/src/copy/)
- [`CreateCustomer: 创建自定义组件`](https://github.com/wya-team/wya-vc/tree/master/src/create-customer/)
- [`CreatePortal: 创建兄弟节点(方法调用) -> （）=> Promise`](https://github.com/wya-team/wya-vc/tree/master/src/create-portal/)
- [`DebounceClick: 防抖`](https://github.com/wya-team/wya-vc/tree/master/src/debounce-click/)
- [`DownCount: 倒计时`](https://github.com/wya-team/wya-vc/tree/master/src/down-count/)
- [`Echarts: 图表组件`](https://github.com/wya-team/wya-vc/tree/master/src/echarts/)
- [`Imgs-Crop: 图片裁剪`](https://github.com/wya-team/wya-vc/tree/master/src/imgs-crop/)
- [`Imgs-Picker: 图片上传`](https://github.com/wya-team/wya-vc/tree/master/src/imgs-picker/)
- [`Imgs-Preview: 图片预览`](https://github.com/wya-team/wya-vc/tree/master/src/imgs-preview/)
- [`Paging: 分页`](https://github.com/wya-team/wya-vc/tree/master/src/paging/)
- [`Print: 打印`](https://github.com/wya-team/wya-vc/tree/master/src/print/)
- [`Upload: 上传`](https://github.com/wya-team/wya-vc/tree/master/src/upload/)

### Mobile - 移动端
- [`MToast: 轻提示`](https://github.com/wya-team/wya-vc/tree/master/src/m-toast/)

### PC - PC端

## Todo

- 提前编译

<!--  以下内容无视  -->
[changelog-image]: https://img.shields.io/badge/changelog-md-blue.svg
[changelog-url]: CHANGELOG.md

[npm-image]: https://img.shields.io/npm/v/@wya/vc.svg
[npm-url]: https://www.npmjs.com/package/@wya/vc
