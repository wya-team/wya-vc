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
import { Copy } from 'wya-vc';
```

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
~~[DebounceClick][DebounceClick]~~ | ~~防抖~~ | ~~1~~ | ~~即将废除~~
[Dropdown][Dropdown] | 下拉菜单 | 1 | -

- 导航

名称 | 说明 | 开发 | 计划
---|---|---|---
[Affix][Affix] | 图钉 | 0 | -
[Page][Page] | 分页 | 1 | -
[BackTop][BackTop] | 回到顶部 | 0 | -

- 数据录入

名称 | 说明 | 开发 | 计划
---|---|---|---
[Cascader][Cascader] | 级联选择 | 1 | -
[Checkbox][Checkbox] | 多选框 | 1 | -
[ColorPicker][ColorPicker] | 颜色选择 | 1 | -
[DatePicker][DatePicker] | 日期选择框 | 1 | -
[Editor][Editor] | 富文本编辑 | 1 | -
[FilesPicker][FilesPicker] | 文件上传 | 1 | -
[Form][Form] | 表单管理 | 1 | -
[ImgsPicker][ImgsPicker] | 图片上传 | 1 | -
[Input][Input] | 输入框 | 1 | -
[InputNumber][InputNumber] | 数字输入框 | 1 | -
[Option][Option] | 配合`Select` | 1 | -
[Radio][Radio] | 单选框 | 1 | -
[Select][Select] | 选择器 | 1 | -
[Slider][Slider] | 滑动输入条 | 1 | -
[SortList][SortList] | 排序 | 1 | -
[Switch][Switch] | 开关 | 1 | -
[TimePicker][TimePicker] | 时间选择器 | 1 | -
[TreeSelect][TreeSelect] | 树选择 | 0 | -
[Upload][Upload] | 上传 | 1 | -

- 数据录入（仅移动端）

名称 | 说明 | 开发 | 计划
---|---|---|---
~~[MForm][MForm]~~ | ~~表单管理~~ | ~~1~~ | ~~合并Form~~
[MPicker][MPicker] | 联动选择弹框 | 1 | -

- 数据展示

名称 | 说明 | 开发 | 计划
---|---|---|---
[Calendar][Calendar] | 日历 | - | -
[Card][Card] | 卡片 | - | -
[Collapse][Collapse] | 折叠面板 | - | -
[DownCount][DownCount] | 倒计时 | - | -
[Echarts][Echarts] | 图表 | - | -
[Expand][Expand] | 展开 | - | -
[ImgsCrop][ImgsCrop] | 图片裁剪 | - | -
[ImgsPreview][ImgsPreview] | 图片预览 | - | -
[Popover][Popover] | 气泡卡片 | - | -
[Table][Table] | 表格 | - | -
[Tabs][Tabs] | 选项卡 | - | -
[Tag][Tag] | 标签 | - | -
[Tree][Tree] | 树形 | - | -

- 数据展示（仅移动端）

名称 | 说明 | 开发 | 计划
---|---|---|---
[MPopup][MPopup] | 弹窗 | 1 | -

- 组合

名称 | 说明 | 开发 | 计划
---|---|---|---
[Paging][Paging] | 表格分页 | 1 | -
[PullScroll][PullScroll] | 列表分页 | 1 | -


- 辅助

名称 | 说明 | 开发 | 计划
---|---|---|---
[Copy][Copy] | 复制 | 1 | -
[CreateCustomer][CreateCustomer] | 自定义组件 | 1 | -
[CreatePortal][CreatePortal] | 传送门组件 | 1 | -
[Fragment][Fragment] | 空节点 | 1 | Vue 3.x废除
[Print][Print] | 打印 | 1 | -

- 辅助（仅移动端）

名称 | 说明 | 开发 | 计划
---|---|---|---
[Touch][Touch] | 手势 | 1 | -

- 反馈

名称 | 说明 | 开发 | 计划
---|---|---|---
[Message][Message] | 轻提示 | 1 | -
[Modal][Modal] | 模态框 | 1 | -
[Drawer][Drawer] | 抽屉 | 1 | -
[Popconfirm][Popconfirm] | 气泡确认框 | 0 | -
[Progress][Progress] | 进度条 | 1 | -
[Spin][Spin] | 加载中 | 1 | -
[Skeleton][Skeleton] | 骨架屏 | 0 | -

- 反馈（仅移动端）

名称 | 说明 | 开发 | 计划
---|---|---|---
[MToast][MToast] | 轻提示 | 1 | -


<details>
<summary>TODO</summary>

- 提前编译

</details>

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
[Collapse]: https://github.com/wya-team/wya-vc/tree/master/src/collapse/
[ColorPicker]: https://github.com/wya-team/wya-vc/tree/master/src/color-picker/
[Copy]: https://github.com/wya-team/wya-vc/tree/master/src/copy/
[CreateCustomer]: https://github.com/wya-team/wya-vc/tree/master/src/create-customer/
[CreatePortal]: https://github.com/wya-team/wya-vc/tree/master/src/create-portal/
[DatePicker]: https://github.com/wya-team/wya-vc/tree/master/src/date-picker/
[DebounceClick]: https://github.com/wya-team/wya-vc/tree/master/src/debounce-click/
[DownCount]: https://github.com/wya-team/wya-vc/tree/master/src/down-count/
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
[InputNumber]: https://github.com/wya-team/wya-vc/tree/master/src/input-number/
[MDatePicker]: https://github.com/wya-team/wya-vc/tree/master/src/mobile/date-picker/
[MForm]: https://github.com/wya-team/wya-vc/tree/master/src/mobile/form/
[MPicker]: https://github.com/wya-team/wya-vc/tree/master/src/mobile/picker/
[MPopup]: https://github.com/wya-team/wya-vc/tree/master/src/mobile/popup/
[MToast]: https://github.com/wya-team/wya-vc/tree/master/src/mobile/toast/
[MTouch]: https://github.com/wya-team/wya-vc/tree/master/src/mobile/touch/
[Message]: https://github.com/wya-team/wya-vc/tree/master/src/message/
[Modal]: https://github.com/wya-team/wya-vc/tree/master/src/modal/
[Option]: https://github.com/wya-team/wya-vc/tree/master/src/option/
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



[BackTop]: https://github.com/wya-team/wya-vc/tree/master/src/
[TreeSelect]: https://github.com/wya-team/wya-vc/tree/master/src/
[Popconfirm]: https://github.com/wya-team/wya-vc/tree/master/src/
[Skeleton]: https://github.com/wya-team/wya-vc/tree/master/src/
