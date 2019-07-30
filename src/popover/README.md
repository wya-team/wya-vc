## [Demo Basic](https://wya-team.github.io/wya-vc/dist/popover/basic.html)
## 功能
Popover

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
visible | 显示popover | `boolean` | `false`
animation | 自定义的动画效果 | `string` | 无
placement | 弹层的位置(`top` `left` `right` `bottom` `bottom-left` `bottom-right` `top-left` `top-right` `right-top` `right-bottom` `left-top` `left-bottom`) | `string` | `bottom`
trigger | 触发的行为`hover` `click` `focus` | `string` | `hover`
content | 显示的内容 | `string` | 无
getPopupContainer | 浮层渲染父节点 | `func` | 无
portal | 是否渲染到body上，默认body | `boolean` | 无
arrow | 浮层有无箭头 | `boolean` | `true`
theme | 颜色主体`light` `dark` | `string` | `light`
always | 弹层不隐藏 | `boolean` | `false`


#### 事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
`visible-change` | 弹层显示隐藏的回调 | `visible` | `true | false`
`close` | 关闭时回调 | - | -
`ready` | 弹层节点挂载完成回调 | - | -

#### Slot

属性 | 说明
---|---
default | 触发器
content | 弹层内容

### API方法调用

```
Popover.open({
	el: document.body,
	cName: 'vc-table-popover',
	triggerEl: el,
	hover: true,
	alone: true, // 需要开启
	theme: 'dark',
	placement: "top",
	content: '222',
});
```

## 基础用法

```html
<div class="vc1-popover-basic" style="background: #f2f2f2; height: 3000px">
	<div ref="parent" class="_btn-container">
		<div class="__left" style="margin-top: 32px; margin-bottom: 32px">
			<vc-popover 
				:get-popup-container="getPopupContainer"
				trigger="click" 
				placement="left-top"
				content="LeftTop"
				@visible-change="handleVisibleChange"
			>
				<vc-button class="_btn _m-tb-10">
					LT
				</vc-button>
				<template #content>
					<div style="height: 100px; width: 200px">
						动态改变内容{{ content }}
					</div>
				</template>
				
			</vc-popover>
			<vc-popover 
				v-model="visible"
				:portal="false"
				trigger="click" 
				placement="left" 
				content="Left"
			>
				<vc-button class="_btn _m-tb-10">
					Left
				</vc-button>
				<template #content>
					<div style="height: 100px; width: 200px">
						跟随父节点
						<span @click="visible = false">点击我关闭弹窗</span>
					</div>
				</template>
			</vc-popover>
			<vc-popover trigger="click" placement="left-bottom" content="LeftBottom">
				<vc-button class="_btn _m-tb-10">
					LB
				</vc-button>
				<template #content>
					<div style="height: 100px; width: 200px">
						Body
					</div>
				</template>
			</vc-popover>
		</div>
		<div class="__middle">
			<div class="_flex-jc-sb">
				<vc-popover 
					:get-popup-container="getPopupContainer"
					trigger="click" 
					placement="top-left" 
					content="TopLeft"
				>
					<vc-button class="_btn _m-lr-10">
						TL
					</vc-button>
					<template #content>
						<div style="height: 100px; width: 200px">
							getPopupContainer
						</div>
					</template>
				</vc-popover>
				<vc-popover 
					:portal="false"
					trigger="click" 
					placement="top" 
					content="Top"
				>
					<vc-button class="_btn _m-lr-10">
						Top
					</vc-button>
					<template #content>
						<div style="height: 100px; width: 200px">
							portal="false"
						</div>
					</template>
				</vc-popover>
				<vc-popover 
					trigger="click" 
					placement="top-right" 
					content="TopRight"
				>
					<vc-button class="_btn _m-lr-10">
						TR
					</vc-button>
					<template #content>
						<div style="height: 100px; width: 200px">
							Body
						</div>
					</template>
				</vc-popover>
			</div>
			<div class="_flex-jc-sb">
				<vc-popover 
					:get-popup-container="getPopupContainer"
					trigger="click" 
					placement="bottom-left"
					content="BottomLeft"
				>
					<vc-button class="_btn _m-lr-10">
						BL
					</vc-button>
					<template #content>
						<div style="height: 100px; width: 200px">
							getPopupContainer
						</div>
					</template>
				</vc-popover>
				<vc-popover 
					:portal="false"
					trigger="click" 
					placement="bottom" 
					content="Bottom"
				>
					<vc-button class="_btn _m-lr-10">
						Bottom
					</vc-button>
					<template #content>
						<div style="height: 100px; width: 200px">
							portal="false"
						</div>
					</template>
				</vc-popover>
				<vc-popover 
					trigger="click" 
					placement="bottom-right"
					content="BottomRight"
				>
					<vc-button class="_btn _m-lr-10">
						BR
					</vc-button>
					<template #content>
						<div style="height: 100px; width: 200px">
							Body
						</div>
					</template>
				</vc-popover>
			</div>
		</div>
		<div class="__right" style="margin-top: 32px; margin-bottom: 32px">
			<vc-popover 
				:get-popup-container="getPopupContainer"
				trigger="click" 
				placement="right-top" 
				content="RightTop"
			>
				<vc-button class="_btn _m-tb-10">
					RT
				</vc-button>
				<template #content>
					<div style="height: 100px; width: 200px">
						getPopupContainer
					</div>
				</template>
			</vc-popover>
			<vc-popover 
				:portal="false"
				trigger="click" 
				placement="right" 
				content="Right"
			>
				<vc-button class="_btn _m-tb-10">
					Right
				</vc-button>
				<template #content>
					<div style="height: 100px; width: 200px">
						portal="false"
					</div>
				</template>
			</vc-popover>
			<vc-popover 
				trigger="click" 
				placement="right-bottom" 
				content="RightBottom"
			>
				<vc-button class="_btn _m-tb-10">
					RB
				</vc-button>
				<template #content>
					<div style="height: 100px; width: 200px">
						Body
					</div>
				</template>
			</vc-popover>
		</div>
	</div>
</div>
```

## 注意事项
- 不要在引用的地方带有vc-popover的className
- content的slot写法必须采用vue2.6退出的新语法，旧语法在插槽内容更新时不会同步更新
- `trigger` 为 `false` 时，`Popover` 包含的内容必须是个节点，且有`focus` 和 `blur`事件。