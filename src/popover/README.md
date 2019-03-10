## [Demo Basic](https://wya-team.github.io/wya-vc/dist/web/popover/basic.html)
## 功能
Popover

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
visible | 显示popover | `boolean` | `false`
animate | 自定义的动画效果 | `string` | 无
placement | 弹层的位置(`top` `left` `right` `bottom` `bottom-left` `bottom-right` `top-left` `top-right` `right-top` `right-bottom` `left-top` `left-bottom`) | `string` | `bottom`
trigger | 触发的行为`hover` `click` | `string` | `hover`
content | 显示的内容 | `string` | 无
getPopupContainer | 浮层渲染父节点 | `func` | 无
transfer | 是否渲染到body上，默认body | `boolean` | 无
arrow | 浮层有无箭头 | `boolean` | `true`


#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
- | - | `any` | -



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
				>
					<vc-button class="_btn _m-tb-10">
						LT
					</vc-button>
					<div slot="content" style="height: 100px; width: 200px">
						getPopupContainer
					</div>
				</vc-popover>
				<vc-popover 
					:transfer="false"
					trigger="click" 
					placement="left" 
					content="Left"
				>
					<vc-button class="_btn _m-tb-10">
						Left
					</vc-button>
					<div slot="content" style="height: 100px; width: 200px">
						transfer="false"
					</div>
				</vc-popover>
				<vc-popover trigger="click" placement="left-bottom" content="LeftBottom">
					<vc-button class="_btn _m-tb-10">
						LB
					</vc-button>
					<div slot="content" style="height: 100px; width: 200px">
						Body
					</div>
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
						<div slot="content" style="height: 100px; width: 200px">
							getPopupContainer
						</div>
					</vc-popover>
					<vc-popover 
						:transfer="false"
						trigger="click" 
						placement="top" 
						content="Top"
					>
						<vc-button class="_btn _m-lr-10">
							Top
						</vc-button>
						<div slot="content" style="height: 100px; width: 200px">
							transfer="false"
						</div>
					</vc-popover>
					<vc-popover 
						trigger="click" 
						placement="top-right" 
						content="TopRight"
					>
						<vc-button class="_btn _m-lr-10">
							TR
						</vc-button>
						<div slot="content" style="height: 100px; width: 200px">
							Body
						</div>
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
						<div slot="content" style="height: 100px; width: 200px">
							getPopupContainer
						</div>
					</vc-popover>
					<vc-popover 
						:transfer="false"
						trigger="click" 
						placement="bottom" 
						content="Bottom"
					>
						<vc-button class="_btn _m-lr-10">
							Bottom
						</vc-button>
						<div slot="content" style="height: 100px; width: 200px">
							transfer="false"
						</div>
					</vc-popover>
					<vc-popover 
						trigger="click" 
						placement="bottom-right"
						content="BottomRight"
					>
						<vc-button class="_btn _m-lr-10">
							BR
						</vc-button>
						<div slot="content" style="height: 100px; width: 200px">
							Body
						</div>
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
					<div slot="content" style="height: 100px; width: 200px">
						getPopupContainer
					</div>
				</vc-popover>
				<vc-popover 
					:transfer="false"
					trigger="click" 
					placement="right" 
					content="Right"
				>
					<vc-button class="_btn _m-tb-10">
						Right
					</vc-button>
					<div slot="content" style="height: 100px; width: 200px">
						transfer="false"
					</div>
				</vc-popover>
				<vc-popover 
					trigger="click" 
					placement="right-bottom" 
					content="RightBottom"
				>
					<vc-button class="_btn _m-tb-10">
						RB
					</vc-button>
					<div slot="content" style="height: 100px; width: 200px">
						Body
					</div>
				</vc-popover>
			</div>
		</div>
	</div>
```