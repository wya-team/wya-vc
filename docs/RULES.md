##### 1.【强制】单行代码不超过120。元素属性合理换行，尽量不超过120，像一些正则表达式除外。

##### 2.【强制】缩进规范。`tab-size`为4，统一采用`tab`缩进， 不可出现`space`缩进。

##### 3.【强制】空格规范。

1. 关键字前后留空格。
2. 对象的值前面留空格。
3. 操作符前后留空格。
4. 逗号后面留空格。
5. 大括号中前后留空格。

##### 4.【强制】文件规范。

1. 文件名全部采用连字符, 例：`<vc-paging />`。
2. 验证组件的 `props`。
3. 自定义事件属性名称 handle[]：如：`@change="handleChange"`。
4. 自定义方法名称 
	- 请求数据：load[],如：`:load-data="loadData"`。
	- 获取数据: get[], 
	- 设置数据: set[],
	- 其他【建议】: show[],hide[],toggle[]等

5. 自定义组件发射的事件名称不要带 `on-`。

##### 5.【强制】组件结构规范。
```vue
<template>
</template>

<script>
import XXX from 'xxx';

export default {
	name: "vc-tpl-basic",
	funtional: false,
	components: {
		'xxx': XXX,
	},
	filters: {},
	directives: {},
	mixins: [],
	model: {},
	data() {
		return {
			xxx: ''
		};
	},
	computed: {
		
	},
	watch: {},
	beforeCreate() {},
	created() {},
	beforeMount() {},
	mounted() {},
	beforeUpdate() {},
	updated() {},
	beforeDestroy() {},
	destroyed() {},
	activated() {},
	deactivated() {},
	errorCaptured() {},
	methods: {
		loadData() {
		},
		handleFn() {
			console.log(arguments);
		},
		async handleSave() {
			try {
				const { file, base64Image } = await this.$refs.target.getImage();
				this.result = base64Image;

			} catch (e) {
				console.log(e, "跨域问题：需要添加 cors协议头");
			}
		}
	},
	// render(h) { return null; },
};
</script>

<style lang="scss"> <!-- 不要使用scoped -->

<!-- BEM -->
@import '../style/index.scss';

@include block(vc-xxx) {
	img {
		display: block;
	}
	@include element(item) { 
		&:hover {
			@include element(mask) {
				transition: opacity 0.5s;
				opacity: 1;
			}
		}
	}; 
	@include element(mask) {
		@include modifier(small) {
			
		}
	}
}

```

##### 6.【强制】其他

- 弹窗均使用CreatePortal, 包括select, picker, popover等
- 报错统一使用VcError类
- 相互间调用只定位到index.js文件, 所以方法提前暴露
- 动画统一使用vc-transition