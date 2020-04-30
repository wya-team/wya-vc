## 加载更多（pull-scroll）

手机端上拉刷新下拉加载

### 基础用法

以整个window作为容器，滚动条到达屏幕底部触发上拉事件，使用loadData属性进行异步请求

:::RUNTIME
```vue
<template>
	<div class="vc-pull-scroll-basic">
		<div class="v-container-phone">
			<vc-marquee
				content="需要滚动条到达屏幕底部触发上拉事件，请查看容器中的滚动案例"
				autoplay
			/>
			<vc-pull-scroll
				key="0"
				:load-data="loadData"
				:data-source="dataSource"
				:total="total"
			>
				<template #default="{ it }">
					<div style="padding: 20px; border-bottom: 1px solid #e8e8e8">
						{{ it.content }}
					</div>
				</template>
			</vc-pull-scroll>
		</div>
	</div>
</template>
<script>
import { PullScroll, Marquee } from "@wya/vc"
import { ajax } from "@wya/http"
export default {
	name: "vc-pull-scroll-basic",
	components: {
		'vc-pull-scroll': PullScroll,
		'vc-marquee': Marquee
	},
	data() {
		return {
			local_data: [
				{
					content: '兄弟，干了这碗鸡汤吧'
				}, {
					content: '1.没有太晚的开始，不如就从今天行动。总有一天，那个一点一点可见的未来，会在你心里，也在你的脚下慢慢清透。生活，从不亏待每一个努力向上的人。'
				}, {
					content: '2.你之所以会觉得难受，大概是因为你投入了大把时间和精力，到最后却没能得到你想要的东西，那种一瞬间被失落灌满的样子让你感到不值得。'
				}, {
					content: '3.最困难的时刻也许就是拐点的开始，改变一下思维方式就可能迎来转机。以平常心看世界，花开花谢都是风景。'
				}, {
					content: '4.既然选择了追求，就不要哭泣。坚持一下，扛过今天，幸福就更近一步。真正能把人累垮的，是心里的绝望。'
				}, {
					content: '5.每天给自己一个希望，试着不为明天而烦恼，不为昨天而叹息，只为今天更美好。'
				}, {
					content: '6.别小看任何人，越不起眼的人、往往会做些让人想不到的事。'
				}, {
					content: '7.不要去听别人的忽悠，你人生的每一步都必须靠自己的能力完成。自己肚子里没有料，手上没本事，认识再多人也没用。'
				}, {
					content: '8.人生是一次旅程，有上坡也有下坡。我不在乎自己的终点是坡顶还是谷底，只在乎沿路的风景美丽而富有生机！'
				}, {
					content: '9.生活不是一场赛跑，生活是一场旅行，要懂得好好欣赏每一段的风景。不要只因一次失败，就放弃你原来决心想达到的目的。'
				}
			],
			dataSource: [],
			total: 0
		}
	},
	methods: {
		loadData(page, isRefresh) {
			return new Promise((resolve, reject) => {
				ajax({
					url: 'test.json',
					localData: {
						status: 1,
						data: {
							page: {
								current: page,
								total: 2,
							},
							list: this.getFakeData(page)
						}

					},
					delay: 3
				}).then((res) => {
					this.total = res.data.page.total;
					isRefresh
						? (this.dataSource = res.data.list)
						: this.dataSource.splice(this.dataSource.length, 0, ...res.data.list);
					resolve();
				}).catch((e) => {
					console.log(e);
					reject();
				});
			});

		},
		getFakeData(page) {
			return this.local_data
		}
	}
}
</script>
<style>
.vc-pull-scroll-basic .v-container-phone{
	width: 320px;
	height: 640px;
	border: 1px solid #d9d9d9;
	box-shadow: 5px 5px 5px #d9d9d9;
	overflow-y: scroll;
}
</style>

```
:::

### 容器中的滚动

加入`wrapper`，使scorll可以在元素容器中实现上拉加载下拉刷新

:::RUNTIME
```vue
<template>
	<div class="vc-pull-scroll-wrapper">
		<div class="v-container-phone">
			<vc-pull-scroll
				:load-data="loadData"
				:data-source="dataSource"
				:total="total"
				:height="640"
				key="1"
				@pull-start='handlePullStar'
				:pull-up='true'
				:pull-down='true'
				wrapper
			>
				<template #default="{ it }">
					<div style="padding: 20px; border-bottom: 1px solid #e8e8e8">
						{{ it.content }}
					</div>
				</template>
				<template #scroll-status>
					<div>
						hahhahah
					</div>
				</template>
			</vc-pull-scroll>
		</div>
	</div>
</template>
<script>
import { PullScroll, Marquee } from "@wya/vc"
import { ajax } from "@wya/http"
export default {
	name: "vc-pull-scroll-basic",
	components: {
		'vc-pull-scroll': PullScroll,
		'vc-marquee': Marquee
	},
	data() {
		return {
			local_data: [
				{
					content: '兄弟，干了这碗鸡汤吧'
				}, {
					content: '1.没有太晚的开始，不如就从今天行动。总有一天，那个一点一点可见的未来，会在你心里，也在你的脚下慢慢清透。生活，从不亏待每一个努力向上的人。'
				}, {
					content: '2.你之所以会觉得难受，大概是因为你投入了大把时间和精力，到最后却没能得到你想要的东西，那种一瞬间被失落灌满的样子让你感到不值得。'
				}, {
					content: '3.最困难的时刻也许就是拐点的开始，改变一下思维方式就可能迎来转机。以平常心看世界，花开花谢都是风景。'
				}, {
					content: '4.既然选择了追求，就不要哭泣。坚持一下，扛过今天，幸福就更近一步。真正能把人累垮的，是心里的绝望。'
				}, {
					content: '5.每天给自己一个希望，试着不为明天而烦恼，不为昨天而叹息，只为今天更美好。'
				}, {
					content: '6.别小看任何人，越不起眼的人、往往会做些让人想不到的事。'
				}, {
					content: '7.不要去听别人的忽悠，你人生的每一步都必须靠自己的能力完成。自己肚子里没有料，手上没本事，认识再多人也没用。'
				}, {
					content: '8.人生是一次旅程，有上坡也有下坡。我不在乎自己的终点是坡顶还是谷底，只在乎沿路的风景美丽而富有生机！'
				}, {
					content: '9.生活不是一场赛跑，生活是一场旅行，要懂得好好欣赏每一段的风景。不要只因一次失败，就放弃你原来决心想达到的目的。'
				}
			],
			dataSource: [],
			total: 0
		}
	},
	methods: {
		handlePullStar() {
			console.log('start')
		},
		loadData(page, isRefresh) {
			return new Promise((resolve, reject) => {
				ajax({
					url: 'test.json',
					localData: {
						status: 1,
						data: {
							page: {
								current: page,
								total: 2,
							},
							list: this.getFakeData(page)
						}

					},
					delay: 3
				}).then((res) => {
					this.total = res.data.page.total;
					isRefresh
						? (this.dataSource = res.data.list)
						: this.dataSource.splice(this.dataSource.length, 0, ...res.data.list);
					resolve();
				}).catch((e) => {
					console.log(e);
					reject();
				});
			});

		},
		getFakeData(page) {
			return this.local_data
		}
	}
}
</script>
<style>
.vc-pull-scroll-wrapper .v-container-phone{
	width: 320px;
	height: 640px;
	border: 1px solid #d9d9d9;
	box-shadow: 5px 5px 5px #d9d9d9;
	overflow-y: scroll;
}
</style>

```
:::

### 下拉加载更多

加入`inverted`，使scorll可以在元素容器中实现下拉加载更多

:::RUNTIME
```vue
<template>
	<div class="vc-pull-scroll-inverted">
		<div class="v-container-phone">
			<vc-pull-scroll
				:load-data="loadData"
				:data-source="dataSource"
				:total="total"
				key="2"
				wrapper
				inverted
			>
				<template #default="{ it }">
					<div style="padding: 20px; border-bottom: 1px solid #e8e8e8">
						{{ it.content }}
					</div>
				</template>
			</vc-pull-scroll>
		</div>
	</div>
</template>
<script>
import { PullScroll, Marquee } from "@wya/vc"
import { ajax } from "@wya/http"
export default {
	name: "vc-pull-scroll-inverted",
	components: {
		'vc-pull-scroll': PullScroll,
		'vc-marquee': Marquee
	},
	data() {
		return {
			local_data: [
				{
					content: '兄弟，干了这碗鸡汤吧'
				}, {
					content: '1.没有太晚的开始，不如就从今天行动。总有一天，那个一点一点可见的未来，会在你心里，也在你的脚下慢慢清透。生活，从不亏待每一个努力向上的人。'
				}, {
					content: '2.你之所以会觉得难受，大概是因为你投入了大把时间和精力，到最后却没能得到你想要的东西，那种一瞬间被失落灌满的样子让你感到不值得。'
				}, {
					content: '3.最困难的时刻也许就是拐点的开始，改变一下思维方式就可能迎来转机。以平常心看世界，花开花谢都是风景。'
				}, {
					content: '4.既然选择了追求，就不要哭泣。坚持一下，扛过今天，幸福就更近一步。真正能把人累垮的，是心里的绝望。'
				}, {
					content: '5.每天给自己一个希望，试着不为明天而烦恼，不为昨天而叹息，只为今天更美好。'
				}, {
					content: '6.别小看任何人，越不起眼的人、往往会做些让人想不到的事。'
				}, {
					content: '7.不要去听别人的忽悠，你人生的每一步都必须靠自己的能力完成。自己肚子里没有料，手上没本事，认识再多人也没用。'
				}, {
					content: '8.人生是一次旅程，有上坡也有下坡。我不在乎自己的终点是坡顶还是谷底，只在乎沿路的风景美丽而富有生机！'
				}, {
					content: '看够了吗，别做梦了。'
				}
			],
			dataSource: [],
			total: 0
		}
	},
	methods: {
		loadData(page, isRefresh) {
			return new Promise((resolve, reject) => {
				ajax({
					url: 'test.json',
					localData: {
						status: 1,
						data: {
							page: {
								current: page,
								total: 2,
							},
							list: this.getFakeData(page)
						}

					},
					delay: 3
				}).then((res) => {
					this.total = res.data.page.total;
					isRefresh
						? (this.dataSource = res.data.list)
						: this.dataSource.splice(this.dataSource.length, 0, ...res.data.list);
					resolve();
				}).catch((e) => {
					console.log(e);
					reject();
				});
			});

		},
		getFakeData(page) {
			return this.local_data
		}
	}
}
</script>
<style>
.vc-pull-scroll-inverted .v-container-phone{
	width: 320px;
	height: 640px;
	border: 1px solid #d9d9d9;
	box-shadow: 5px 5px 5px #d9d9d9;
	overflow-y: scroll;
}
</style>

```
:::


### 瀑布流

用于参差不齐的多列布局

:::RUNTIME
```vue
<template>
	<div class="vc-pull-scroll-waterfall">
		当前{{cols}}列，
		<vc-button style="margin-bottom: 21px;" @click="handleClick">点击切换为{{cols + 1 > 5 ? 1 : cols + 1}}列</vc-button>
		<div class="v-container-phone">
			<vc-pull-scroll
				:load-data="loadData"
				:data-source="dataSource"
				:total="total"
				key="3"
				:cols="cols"
				wrapper
				waterfall
			>
				<template #default="{ it, index, width, styles }">
					<img
						:key="index"
						:src="it.image"
						:style="[styles, { width: width + 'px' }]"
						class="_water-item"
					/>
				</template>
			</vc-pull-scroll>
		</div>
	</div>
</template>
<script>
import { PullScroll, Button } from "@wya/vc"
import { ajax } from "@wya/http"

export default {
	name: "vc-pull-scroll-waterfall",
	components: {
		'vc-pull-scroll': PullScroll,
		'vc-button': Button
	},
	data() {
		return {
			cols: 1,
			local_data: [
				{
					image: 'https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/172/20200409/0955971275/book1.jpeg'
				}, {
					image: 'https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/172/20200409/0955861173/book2.jpeg'
				}, {
					image: 'https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/172/20200409/0955639391/book3.jpeg'
				}, {
					image: 'https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/172/20200409/0955301159/book4.png'
				}, {
					image: 'https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/172/20200409/0955592201/book5.jpg'
				},{
					image: 'https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/172/20200409/0955971275/book1.jpeg'
				}, {
					image: 'https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/172/20200409/0955861173/book2.jpeg'
				}, {
					image: 'https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/172/20200409/0955639391/book3.jpeg'
				}, {
					image: 'https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/172/20200409/0955301159/book4.png'
				}, {
					image: 'https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/172/20200409/0955592201/book5.jpg'
				},
			],
			dataSource: [],
			total: 0
		}
	},
	methods: {
		loadData(page, isRefresh) {
			return new Promise((resolve, reject) => {
				ajax({
					url: 'test.json',
					localData: {
						status: 1,
						data: {
							page: {
								current: page,
								total: 2,
							},
							list: this.getFakeData(page)
						}

					},
					delay: 3
				}).then((res) => {
					this.total = res.data.page.total;
					isRefresh
						? (this.dataSource = res.data.list)
						: this.dataSource.push(...res.data.list);
						this.key += 1
					resolve(res.data.list);
				}).catch((e) => {
					console.log(e);
					reject();
				});
			});

		},
		getFakeData(page) {
			return this.local_data
		},
		handleClick() {
			(this.cols + 1) > 5 ? this.cols = 1 : this.cols += 1
			console.log((this.cols + 1) > 5)
		}
	}
}
</script>
<style>
.vc-pull-scroll-waterfall .v-container-phone{
	width: 320px;
	height: 640px;
	border: 1px solid #d9d9d9;
	box-shadow: 5px 5px 5px #d9d9d9;
	overflow-y: scroll;
}
.vc-pull-scroll-waterfall .v-container-phone::-webkit-scrollbar {
	width: 1px
}
</style>

```
:::


### API

#### 属性

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
pull-down | 是否允许向下拉动操作 | `Boolean` | - | `true`
pull-up | 是否允许向上拉动操作，为`true`时总是允许，不受`total`限制 | `Boolean` | -| `false`
scroll | 是否允许进行上拉和下拉操作 | `Boolean` | -| `true`
height | 滚动区域的高度 | `String`,`Number` | - | `window.innerHeight`
wrapper | 当有`wrapper`为`true`，滚动区域高度为`height`的值，否则高度为`auto` | `Boolean` | - | `false`
waterfall | 是否使用瀑布流布局 | `Boolean` | - | `false`
cols | 瀑布流的列数 | `Number` | -| 2
gutter | 瀑布流间距[水平间距, 垂直间距] | `Array` | -| `[10, 10]`
pull-down-text | 下拉到底部的文字信息 | `Object`,`Function` | - | `{ 0: '~', 1: '↓ 下拉刷新', 2: '↑ 释放更新', 3: '加载中...' }`
pull-up-text | 上拉到顶部的文字信息 | `Object`,`Function` | - | `{ 0: '~', 1: '↑ 上拉加载, 2: '↓ 释放加载更多', 3: '加载中...' }`
scroll-text | 滚动条中的状态信息 | `Object`,`Function` | - | `{ 0: '上拉加载', 1: '加载中 2: '已全部加载', 3: '网络不稳定，请稍后重试', 4: '没有内容可供显示' }`
empty-text | 数据为空时显示的文字 | `String`,`Function` | - | `没有内容可供显示`
scale-y | 使用`scaleY`对拉动的距离进行缩放 | `Number` | - | `0.4`
pause-y | 拉动的值超过`pauseY`，即提示释放刷新 | `Number` | - | `75`
inverted | 是否使用向下拉动加载更多 | `Boolean` | - | `false`
data-source | 数据源 | `Array` | - | -
show | 为`false`阻止滚动事件产生数据请求 | `Boolean` | - | `true`
load-data | 数据加载 | `Function` | - | -
total | 总页数 | `String`, `Number` | - | -

### 事件/方法

事件名 | 说明 | 参数 | 返回值
---|---|---|---
load-pending | 请求正在加载中的状态 | - | -
load-success | 请求成功后触发 | - | -
load-finish | 请求结束，无论请求结果成功还是失败都会触发 | - |


### Slot

属性 | 说明
---|---
header | scroll头部
footer | scroll底部
content | scroll内容
scroll-status | 滚动条状态
pull-down-status | 向下拖动展示的内容
pull-up-status | 向上拖动展示的内容



## 基础用法

```jsx

```
## TODO

- `SSR`时请求, 服务端会触发一次请求【无意义】， 客服端也会触发请求; 【无意义 -> 初始化直接渲染这些数据，且客服端无需再请求】