# 历史版本

### 0.4.38 (2018-06-26)

* 增加`ImgsPicker` 图片预览功能

### 0.4.34 (2018-06-26)

* 修改`Upload` filename -> name

### 0.4.3 (2018-05-10)

* 修改[`Echarts`](https://github.com/wya-team/wya-vc/tree/master/src/web/echarts/) 按需加载`echart.js`卸载时报错(页面快速切换导致事件未绑定，就卸载了)，添加`try catch`

### 0.4.2 (2018-05-08)

* 修改 [`getParseUrl`]中`0001 -> 1` 的情况

### 0.4.0 (2018-05-04)
* 修改 [`Editor`](https://github.com/wya-team/wya-vc/tree/master/src/web/editor/) 富文本组件 获取实例的方式`onLoaded`（组件为使用`code spliting`）

### 0.3.10 (2018-05-01)

* 增加[`CreatePortalComponent: 创建兄弟节点(组件调用) -> Component`](https://github.com/wya-team/wya-vc/tree/master/src/web/create-portal-component/)
* 变更[`CreateRootSiblings: 创建兄弟节点`](https://github.com/wya-team/wya-vc/tree/master/src/web/create-portal-func/) -> [`CreatePortalFunc: 创建兄弟节点(方法调用) -> （）=> Promise`](https://github.com/wya-team/wya-vc/tree/master/src/web/create-portal-func/)

### 0.3.8 (2018-04-30)

* 增加[`Authorized: 权限判断`](https://github.com/wya-team/wya-vc/tree/master/src/web/authorized/)
* 增加[`CreateRootSiblings: 创建兄弟节点`](https://github.com/wya-team/wya-vc/tree/master/src/web/create-portal-func/)

### 0.3.6 (2018-04-20)

* 增加`Paging`中 `history` 和 `show` 扩展；
* 增加[`Pipe: 管道`](https://github.com/wya-team/wya-vc/tree/master/src/web/pipe/)

### 0.3.0 (2018-04-20)

- 升级`webpack 4.6`
- 升级`react 16.3.2`

### 0.2.12 (2018-04-19)

* 增加[`ToImg: html转图片`](https://github.com/wya-team/wya-vc/tree/master/src/web/to-img/)

### 0.2.11 (2018-03-31)

* 增加[`Swiper: 走马灯`](https://github.com/wya-team/wya-vc/tree/master/src/web/swiper/)
* 增加[`BetterScroll: 滚动`](https://github.com/wya-team/wya-vc/tree/master/src/web/better-scroll/)
* 增加[`PullScroll: 下拉刷新，上滑加载`](https://github.com/wya-team/wya-vc/tree/master/src/web/pull-scroll/)
* 增加[`CreateAccordion: 手风琴`](https://github.com/wya-team/wya-vc/tree/master/src/web/create-accordion/)


### 0.2.10 (2018-03-31)

* 增加[`MToasts: 轻提示`](https://github.com/wya-team/wya-vc/tree/master/src/web/m-toasts/)
* 增加[`MModals: 模态框`](https://github.com/wya-team/wya-vc/tree/master/src/web/m-modals/)
* 增加[`MTouch: 手势`](https://github.com/wya-team/wya-vc/tree/master/src/web/m-touch/)
* 增加[`ImgsCrop: 图片裁剪`](https://github.com/wya-team/wya-vc/tree/master/src/web/imgs-crop/)

### 0.2.2 (2018-03-14)

* 修复bug（`PGallery选择器 -> onInit调用有误`）


### 0.2.1 (2018-03-13)

* 增加[`PSortList: 排序`](https://github.com/wya-team/wya-vc/tree/master/src/web/p-sort-list/)
* 增加[`ImgsPreview: 预览`](https://github.com/wya-team/wya-vc/tree/master/src/web/imgs-preview/)

### 0.2.0 (2018-03-12)

* 删除组件`PSelectGoods`(业务变化太频繁)
* 增加`Paging`中`CheckBox`全选， 写法大改； 

### 0.1.29 (2018-03-08)

* 添加`Upload` showTips控制上传进度弹窗，size控制文件大小（size）

### 0.1.28 (2018-03-05)

* [`DebounceClick: click防抖`](https://github.com/wya-team/wya-vc/tree/master/src/web/debounce-click/)
* [`Calendar: 日历组件`](https://github.com/wya-team/wya-vc/tree/master/src/web/calendar/)
* 修改`PGallery`分页问题

### 0.1.27 (2018-02-27)

* 修改`PGallery` -> `cat_id = 0`,显示全部图片，增加多选功能（默认多选） 
* 修改`PSelectGooods`, `select` ->  `selectArr`, `disableSelect` -> `disableArr`

### 0.1.20 (2018-02-10)

* 添加[`DownCount: 倒计时`](https://github.com/wya-team/wya-vc/tree/master/src/web/down-count/)

### 0.1.19 (2018-02-09)

* 添加[`PSelectGoods`] 增加选择限制`max`

### 0.1.16 (2018-02-05)

* 添加[`PPopup`](https://github.com/wya-team/wya-vc/tree/master/src/web/p-popup/)
* 添加[`PSelectGoods`](https://github.com/wya-team/wya-vc/tree/master/src/web/p-select-goods/)

### 0.1.15 (2018-01-27)

* 修改`Upload`几个参数，针对单个文件
	* `onSuccess` -> `onFileSuccess`
	* `onError` -> `onFileError`
	* `onUploadBefore` -> `onFileBefore`
	* `onUploadStart` -> `onFileStart`
	* `onBegin`
	* `onComplete`
* `AsyncComponent`增加`refName`, `onLoaded`
* 富文本编辑框（图片暂时无法编辑）

### 0.1.11 (2018-01-27)

* 添加 [`AsyncComponent`](https://github.com/wya-team/wya-vc/tree/master/src/web/async-component/) 异步加载组件
* 添加 [`Editor`](https://github.com/wya-team/wya-vc/tree/master/src/web/editor/) 富文本组件

### 0.1.10 (2018-01-26)

* 添加 [`Upload`](https://github.com/wya-team/wya-vc/tree/master/src/web/upload/) 上传

### 0.1.7 (2018-01-24)

* 添加 [`RcIntance`](https://github.com/wya-team/wya-vc/tree/master/src/web/rc-instance/) 单例对象 `配置`
* 添加[`Paging`](https://github.com/wya-team/wya-vc/tree/master/src/web/paging/)
* 添加[`Echarts`](https://github.com/wya-team/wya-vc/tree/master/src/web/echarts/) 按需加载`echart.js`

### 0.1.4 (2018-01-20)

* 添加 `babel-plugin-transform-runtime` 处理支持 `async/await`
* 添加[`Copy`](https://github.com/wya-team/wya-vc/tree/master/src/web/copy/)

### 0.1.3 (2018-01-19)

* 初始化仓库，增加测试用例 `jest`
* 添加 `babel-cli` => `lib`
* 添加第一个组件 [`CreatePrint`](https://github.com/wya-team/wya-vc/tree/master/src/web/create-print/)

### 0.1.0 (2018-01-02)

* 添加仓库
