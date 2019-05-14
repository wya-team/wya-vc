# 历史版本

### 1.3.0
- select: `filter -> search`, `remote-method -> load-data`, `clearSingleSelect -> remove`
- select: 删除`remote`, `loading`, `loading-text`, `setQuery`

### 1.2.6
新增: `input-number` `input-search`

### 1.2.2

- popover: 新增ready事件
- popconfirm: 新增ready事件
- input: slot（prepend， append， 其他不支持）
- input: 不再支持`icon`,`prefix`,`suffix`


### 1.2.0 (2019-04-19)

- pull-scroll: it -> { it, index }
- paging[piece]: it -> { it, index }, data -> data-source
- sort-list: it -> { it, index }

### 1.0.35 (2019-04-11)

- transition: 新增动画`fade`, `slide`, `zoom`, `scale`,  `collapse`.额外扩展`basic-mixin.js`
- expand: `v-model`调整内部属性`show` -> `visible`, `change` -> `visible-change`, 删除`toggle`方法

### 1.0.34 (2019-04-06)
- vc: `clean` -> `clear`

### 1.0.26 (2019-03-30)
- form: 添加`slot`, `label`
- form: 过滤数组字段中为`''`的情况
- button: `loading`功能（内部属性）,`click`事件为`Promise`情况使用
- modal: 优化`modal`结构, 新增`close`事件, 默认`closeWithCancel: true`开启主动关闭时触发`cancel`（`cancel`为取消按钮）
- modal: 默认`ok`事件返回`Promise`, 将触发`loading`效果;
- modal: 新增`footer`字段
- popover: 定位和样式调整
- icon: 新增图标预览功能
- down-count: `render -> render-row`, 新增字段`showZero`控制是否显示`00`
- 针对bem规则优化`button`, `modal`, `form`, `imgs-preview`样式优化 


### 1.0.13 (2019-03-21)
- create-portal: `el -> tag`, `root -> el`

### 1.0.12 (2019-03-21)

- message: `hide -> destroy`
- m-toast: `hide -> destroy`

### 1.0.11 (2019-03-20)

- cascader: `data -> data-source`
- table: `data -> data-source`
- tree: `data -> data-source`
- date-picker: `type -> mode`
- timer-picker: `type -> mode`

- 新增`vc-textarea`

### 1.0.0 (2019-03-10)
* `wya-vc` -> `@wya/vc`

### 0.1.0 (2018-01-02)

* 添加仓库
