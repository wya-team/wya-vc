# 历史版本
### 

- transition: 新增动画`fade`, `slide`, `zoom`, `scale`,  `collapse`.额外扩展`basic-mixin.js`
- expand: `v-model`调整内部属性`show` -> `visible`, `change` -> `visible-change`

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
