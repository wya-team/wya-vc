## [Demo Basic](https://wya-team.github.io/wya-vc/dist/artboard/basic.html)
## 功能
artboard canvas画板

## API

#### 属性
属性 | 说明 | 类型 | 默认值
---|---|---|---
config | canvas配置参数 | Object | -
type | 生成的图片的类型, 可取 image/png image/jpeg, toDataURL参数 | String | image/png
encoderOptions | 生成图片的质量, toDataURL参数, 0 - 1之间 | Number | true

#### 事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
change | canvas内容发生改变时触发 | - | steps: 笔画数据, index: 当前笔画的顺序
undo-error | 回退出错 | - | -
redo-error | 取消回退出错 | - | -

#### 方法

属性 | 说明 | 参数 | 返回值
---|---|---|---
undo | 回退一画 | - | -
cancel | 取消回退 | - | -
clear | 清除画板内容 | - | -
getImage | 获取图片 | 查看toDataURL参数 | -


## 基础用法

```vue
<template>
	<div class="v-artboard">
		<vc-artboard ref="artboard" :config="{ strokeStyle: 'red', shadowColor: 'red' }" />	
		<vc-button @click="handleClear">清除</vc-button>
		<vc-button @click="handleGetImg">生成图片</vc-button>
		<vc-button @click="handleUndo">回退一步</vc-button>
		<vc-button @click="handleCancel">取消回退</vc-button>
		<img :src="src" alt="">
	</div>
</template>

<script>
import artboard from '../artboard.vue';
import button from '../../button';

export default {
	name: 'v-artboard',
	components: {
		'vc-artboard': artboard,
		'vc-button': button,
	},
	props: {
	},
	data() {
		return {
			src: '',
		};
	},
	created() {
	},
	methods: {
		handleUndo() {
			this.$refs.artboard.undo();
		},
		handleCancel() {
			this.$refs.artboard.cancel();
		},
		handleClear() {
			this.$refs.artboard.clear();
		},
		handleGetImg() {
			this.src = this.$refs.artboard.getImage();
		},
	},
};
</script>

<style lang="scss">
.v-artboard {
	canvas {
		width: 200px;
		height: 200px;
	}
	img {
		width: 200px;
		height: 200px;
	}
}
</style>

```