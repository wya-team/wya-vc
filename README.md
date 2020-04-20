# [\@wya/vc](https://wya-team.github.io/wya-vc/dist/index.html)

[![npm][npm-image]][npm-url] [![changelog][changelog-image]][changelog-url]

<details>
<summary>安装 / 导入 / 使用</summary>

#### 

- 安装

```vim
npm install @wya/vc --save
```

- 按需加载，需要安装 [`babel-plugin-import`](https://github.com/ant-design/babel-plugin-import/issues) 配置`.babelrc`

```js
{
	[
		[
			"import",
			[
				{
					libraryName: "@wya/vc",
					libraryDirectory: "lib",
					customName: (name) => {
						if (/^m-/.test(name)) {
							return `@wya/vc/lib/${name.replace(/^m-/, '')}/index.m`;
						}
						return `@wya/vc/lib/${name}`;
					}
				}
			]
		]
	];
}
```

- template下可以使用[`vc-loader`](https://github.com/wya-team/vc-loader)

- 注册

```js
import { Vc } from '@wya/vc';

Vue.use(Vc, {
	// config
});
```


```js
// 调用, 如下：
import { Clipboard } from 'wya-vc';
```

</details>

<details>
<summary>TODO</summary>

- 完成测试用例，覆盖率90%+
- 2.0版本发布

</details>

<details open>
<summary>组件</summary>

- 实例

名称 | 说明 | 开发 | 计划
---|---|---|---
[Vc][Vc] | 上下文传递  | 1 | -

- 通用

名称 | 说明 | 开发 | 计划
---|---|---|---
[Button][Button] | 按钮 | 1 | -
[Icon][Icon] | 图标 | 1 | -

- 导航

名称 | 说明 | 开发 | 计划
---|---|---|---
[Affix][Affix] | 图钉 | 0 | -
[BackTop][BackTop] | 回到顶部 | 0 | -

- 数据录入

名称 | 说明 | 开发 | 计划
---|---|---|---
[Artboard][Artboard] | 画板 | 1 | -
[Cascader][Cascader] | 级联选择 | 1 | -
[Checkbox][Checkbox] | 多选框 | 1 | -
[ColorPicker][ColorPicker] | 颜色选择 | 1 | -
[DatePicker][DatePicker] | 日期选择框 | 1 | -
[Editor][Editor] | 富文本编辑 | 1 | -
[FilesPicker][FilesPicker] | 文件上传 | 1 | -
[Form][Form] | 表单管理 | 1 | -
[ImgsPicker][ImgsPicker] | 图片上传 | 1 | -
[Input][Input] | 输入框 | 1 | -
[Picker][Picker] | 联动选择弹框 | 1 | -
[Radio][Radio] | 单选框 | 1 | -
[Select][Select] | 选择器 | 1 | -
[Slider][Slider] | 滑动输入条 | 1 | -
[SortList][SortList] | 排序 | 1 | -
[Switch][Switch] | 开关 | 1 | -
[TimePicker][TimePicker] | 时间选择器 | 1 | -
[TreeSelect][TreeSelect] | 树选择 | 1 | -
[Textarea][Textarea] | 多行文本 | 1 | -

- 数据展示

名称 | 说明 | 开发 | 计划
---|---|---|---
[Calendar][Calendar] | 日历 | 1 | -
[Card][Card] | 卡片 | 1 | -
[Carousel][Carousel] | 轮播 | 1 | -
[Collapse][Collapse] | 折叠面板 | 1 | -
[Countdown][Countdown] | 倒计时 | 1 | -
[Dropdown][Dropdown] | 下拉菜单 | 1 | -
[Echarts][Echarts] | 图表 | 1 | -
[Expand][Expand] | 展开 | 1 | -
[HtmlImg][HtmlImg] | html2canvas | 1 | -
[Img][Img] | 图片展示 | 1 | -
[ImgsCrop][ImgsCrop] | 图片裁剪 | 1 | -
[ImgsPreview][ImgsPreview] | 图片预览 | 1 | -
[ImgsProcessing][ImgsProcessing] | 图片优化 | 1 | -
[List][List] | 列表 | 1 | -
[Page][Page] | 分页 | 1 | -
[Popover][Popover] | 气泡卡片 | 1 | -
[Table][Table] | 表格 | 1 | -
[Tabs][Tabs] | 选项卡 | 1 | -
[Tag][Tag] | 标签 | 1 | -
[Text][Text] | 文本自定义行数 | 1 | -
[Tree][Tree] | 树形 | 1 | -

- 组合

名称 | 说明 | 开发 | 计划
---|---|---|---
[Paging][Paging] | 表格分页 | 1 | -
[PullScroll][PullScroll] | 列表分页 | 1 | -
[RecycleList][RecycleList] | 列表分页（性能） | 0 | -


- 辅助

名称 | 说明 | 开发 | 计划
---|---|---|---
[Clipboard][Clipboard] | 剪切板 | 1 | -
[Customer][Customer] | 自定义组件 | 1 | -
[Fragment][Fragment] | 空节点 | 1 | Vue 3.x废除
[Portal][Portal] | 传送门组件 | 1 | -
[Print][Print] | 打印 | 1 | -
[Scroller][Scroller] | 滚动条自定义 | 0 | -
[Touch][Touch] | 手势 | 1 | -
[Transition][Transition] | 动画 | 1 | 同animate.css优化api
[Upload][Upload] | 上传 | 1 | -

- 反馈 

名称 | 说明 | 开发 | 计划
---|---|---|---
[Drawer][Drawer] | 抽屉 | 1 | -
[Marquee][Marquee] | 滚动提示 | - | -
[Message][Message] | 轻提示 | 1 | -
[Modal][Modal] | 模态框 | 1 | -
[Notice][Notice] | 提示框 | 1 | -
[Popconfirm][Popconfirm] | 气泡确认框 | 1 | -
[Popup][Popup] | 弹窗 | 1 | -
[Progress][Progress] | 进度条 | 1 | -
[Spin][Spin] | 加载中 | 1 | -
[Skeleton][Skeleton] | 骨架屏 | 0 | -
[Toast][Toast] | 轻提示 | 1 | -


<!--  以下内容无视  -->
[changelog-image]: https://img.shields.io/badge/changelog-md-blue.svg
[changelog-url]: CHANGELOG.md

[npm-image]: https://img.shields.io/npm/v/@wya/vc.svg
[npm-url]: https://www.npmjs.com/package/@wya/vc

[Vc]: https://github.com/wya-team/wya-vc/tree/master/src/vc/
[Button]: https://github.com/wya-team/wya-vc/tree/master/src/button/
[Calendar]: https://github.com/wya-team/wya-vc/tree/master/src/calendar/
[Card]: https://github.com/wya-team/wya-vc/tree/master/src/card/
[Cascader]: https://github.com/wya-team/wya-vc/tree/master/src/cascader/
[Checkbox]: https://github.com/wya-team/wya-vc/tree/master/src/checkbox/
[Customer]: https://github.com/wya-team/wya-vc/tree/master/src/customer/
[Collapse]: https://github.com/wya-team/wya-vc/tree/master/src/collapse/
[ColorPicker]: https://github.com/wya-team/wya-vc/tree/master/src/color-picker/
[Clipboard]: https://github.com/wya-team/wya-vc/tree/master/src/clipboard/
[Customer]: https://github.com/wya-team/wya-vc/tree/master/src/customer/
[Portal]: https://github.com/wya-team/wya-vc/tree/master/src/portal/
[DatePicker]: https://github.com/wya-team/wya-vc/tree/master/src/date-picker/
[DebounceClick]: https://github.com/wya-team/wya-vc/tree/master/src/debounce-click/
[Countdown]: https://github.com/wya-team/wya-vc/tree/master/src/countdown/
[Drawer]: https://github.com/wya-team/wya-vc/tree/master/src/drawer/
[Dropdown]: https://github.com/wya-team/wya-vc/tree/master/src/dropdown/
[Echarts]: https://github.com/wya-team/wya-vc/tree/master/src/echarts/
[Editor]: https://github.com/wya-team/wya-vc/tree/master/src/editor/
[Expand]: https://github.com/wya-team/wya-vc/tree/master/src/expand/
[FilesPicker]: https://github.com/wya-team/wya-vc/tree/master/src/files-picker/
[Form]: https://github.com/wya-team/wya-vc/tree/master/src/form/
[Fragment]: https://github.com/wya-team/wya-vc/tree/master/src/fragment/
[Icon]: https://github.com/wya-team/wya-vc/tree/master/src/icon/
[ImgsCrop]: https://github.com/wya-team/wya-vc/tree/master/src/imgs-crop/
[ImgsPicker]: https://github.com/wya-team/wya-vc/tree/master/src/imgs-picker/
[ImgsPreview]: https://github.com/wya-team/wya-vc/tree/master/src/imgs-preview/
[Input]: https://github.com/wya-team/wya-vc/tree/master/src/input/
[DatePicker]: https://github.com/wya-team/wya-vc/tree/master/src/date-picker/
[Form]: https://github.com/wya-team/wya-vc/tree/master/src/form/
[Picker]: https://github.com/wya-team/wya-vc/tree/master/src/picker/
[Popup]: https://github.com/wya-team/wya-vc/tree/master/src/popup/
[Toast]: https://github.com/wya-team/wya-vc/tree/master/src/toast/
[Touch]: https://github.com/wya-team/wya-vc/tree/master/src/touch/
[Message]: https://github.com/wya-team/wya-vc/tree/master/src/message/
[Modal]: https://github.com/wya-team/wya-vc/tree/master/src/modal/
[Page]: https://github.com/wya-team/wya-vc/tree/master/src/page/
[Paging]: https://github.com/wya-team/wya-vc/tree/master/src/paging/
[Popover]: https://github.com/wya-team/wya-vc/tree/master/src/popover/
[Print]: https://github.com/wya-team/wya-vc/tree/master/src/print/
[Progress]: https://github.com/wya-team/wya-vc/tree/master/src/progress/
[PullScroll]: https://github.com/wya-team/wya-vc/tree/master/src/pull-scroll/
[Radio]: https://github.com/wya-team/wya-vc/tree/master/src/radio/
[Select]: https://github.com/wya-team/wya-vc/tree/master/src/select/
[Slider]: https://github.com/wya-team/wya-vc/tree/master/src/slider/
[SortList]: https://github.com/wya-team/wya-vc/tree/master/src/sort-list/
[Spin]: https://github.com/wya-team/wya-vc/tree/master/src/spin/
[Switch]: https://github.com/wya-team/wya-vc/tree/master/src/switch/
[Table]: https://github.com/wya-team/wya-vc/tree/master/src/table/
[Tabs]: https://github.com/wya-team/wya-vc/tree/master/src/tabs/
[Tag]: https://github.com/wya-team/wya-vc/tree/master/src/tag/
[TimePicker]: https://github.com/wya-team/wya-vc/tree/master/src/time-picker/
[Tree]: https://github.com/wya-team/wya-vc/tree/master/src/tree/
[Upload]: https://github.com/wya-team/wya-vc/tree/master/src/upload/
[TreeSelect]: https://github.com/wya-team/wya-vc/tree/master/src/tree/
[Popconfirm]: https://github.com/wya-team/wya-vc/tree/master/src/popconfirm/
[Textarea]: https://github.com/wya-team/wya-vc/tree/master/src/textarea/
[Transition]: https://github.com/wya-team/wya-vc/tree/master/src/transition/
[Option]: https://github.com/wya-team/wya-vc/tree/master/src/option/
[Carousel]: https://github.com/wya-team/wya-vc/tree/master/src/carousel/
[HtmlImg]: https://github.com/wya-team/wya-vc/tree/master/src/html-img/
[List]: https://github.com/wya-team/wya-vc/tree/master/src/list/
[Skeleton]: https://github.com/wya-team/wya-vc/tree/master/src/
[Affix]: https://github.com/wya-team/wya-vc/tree/master/src/
[Scroller]: https://github.com/wya-team/wya-vc/tree/master/src/
[BackTop]: https://github.com/wya-team/wya-vc/tree/master/src/
[Marquee]: https://github.com/wya-team/wya-vc/tree/master/src/marquee/
[Artboard]: https://github.com/wya-team/wya-vc/tree/master/src/artboard/
[Img]: https://github.com/wya-team/wya-vc/tree/master/src/img/
[ImgsProcessing]: https://github.com/wya-team/wya-vc/tree/master/src/imgs-processing/
[Notice]: https://github.com/wya-team/wya-vc/tree/master/src/notice/
[RecycleList]: https://github.com/wya-team/wya-vc/tree/master/src/recycle-list/
[Text]: https://github.com/wya-team/wya-vc/tree/master/src/text/
