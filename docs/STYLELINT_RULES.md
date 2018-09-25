# StyleLint Rules

### Autofixable(可自动修复)
+ shorthand-property-no-redundant-values: 重复值要简写
+ color-hex-case: 颜色值大小写
+ color-hex-length: 颜色值的长度
+ number-leading-zero: 数值小于`1`时，是否显示`0`
+ number-no-trailing-zeros: 禁止尾随零数字
+ string-quotes: 字符串使用`单引号`还是`双引号`
+ length-zero-no-unit: 不允许为`0`时带单位（`em`, `ex`, `ch`, `vw`, `vh`, `cm`, `mm`, `in`, `pt`, `pc`, `px`, `rem`, `vmin`, and `vmax`）
+ custom-property-empty-line-before: 不允许空行之前自定义属性
+ declaration-empty-line-before: 空行之前声明
+ rule-empty-line-before: 规则之间是否空行
+ at-rule-empty-line-before: `@`之前是否空行
+ at-rule-name-case: `@`后的名字是否大写
+ comment-empty-line-before: `注释`前始终要有空行
+ no-missing-end-of-source-newline: 不允许换行结束

### 其他添加的配置
+ function-comma-newline-after: 方法参数可换行
+ function-name-case: 方法名称大小写
+ function-max-empty-lines: 最大空行数
+ function-whitespace-after: 方法后是否留白
+ selector-combinator-space-after: 选择器后面留空格
+ selector-list-comma-newline-after: 多重选择器是否换行
+ selector-pseudo-element-colon-notation: 为适用的伪元素指定单冒号或双冒号符号
+ unit-no-unknown: 不允许位置单位
+ value-list-max-empty-lines: 属性值之间的最大空行
+ block-closing-brace-empty-line-before: `{}`闭合前是否空一行
+ declaration-bang-space-before: 修饰器前要有一个空格
+ property-no-unknown: 未知属性
