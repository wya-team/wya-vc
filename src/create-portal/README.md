## [Demo Basic](https://wya-team.github.io/wya-vc/dist/create-portal/basic.html)
## 功能 - 传送门组件

根节点兄弟组件 - `() => Promise` - 传送门组件

## 关联组件清单

- Upload/Tips （上传）

## API

#### `CreatePortal(opts: Object, wrapper: Object)`

属性 | 说明 | 类型 | 默认值
---|---|---|---
el | 创建的外层元素 | `string` | div
root | 根节点 | `string` | body
cName | 组件名称：用于标识卸载 | `string` | -
onBefore | 初始化组件前操作，可以是ajax | `(opts = {}) => Promise` | -


#### `[Viewer].popup`

属性 | 说明 | 类型 | 默认值
---|---|---|---
parent | 用于传递context| `obj` | -
store | vuex | `obj` | -
router | vue-router | `obj` | -
getInstance | 获取当前组件实例回调 | `(instance) => void` | -
onBefore | 自定义ajax, 替代先前onBefore | `(opts = {}) => Promise` | -
cName | 自定义cName, 替代先前cName | `string` | -

## 基础用法

- 例子
```vue
<template>
	<i-modal
		v-model="visible"
		title="Common Modal dialog box title"
		@on-ok="handleOk"
		@on-cancel="handleCancel"
	>
		<p>Content of dialog</p>
		<p>Content of dialog</p>
		<p>Content of dialog</p>
	</i-modal>
</template>

<script>
import { Modal } from 'iview';
import CreatePortal from '../../index';

export default {
	name: "vc-tpl-basic",
	components: {
		'i-modal': Modal
	},
	data() {
		return {
			visible: false
		};
	},
	computed: {
		
	},
	mounted() {
		this.visible = true;
	},
	methods: {
		handleOk() {
			/**
			 * v-model会默认被触发，要由该组件控制，给组件i-modal传值 loading: true
			 */
			// this.visible = false;
			this.$emit('sure');
		},
		handleCancel() {
			// this.visible = false;
			this.$emit('close');
		}
	}
};
export const PModalWithBefore = CreatePortal({
	onBefore() {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, 1000);
		});
	}
}, module.exports.default);

export const PModal = CreatePortal({}, module.exports.default);
</script>
```
- 调用
```vue
<template>
	<div>
		<div @click="handleClickWithBefore">
			点我(带延迟)
		</div>
		<div @click="handleClick">
			点我(不带延迟)
		</div>
	</div>
</template>
<script>
import { PModal, PModalWithBefore } from './basic/modal';

export default {
	name: "vc-tpl-basic",
	components: {
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
		handleClickWithBefore() {
			PModalWithBefore.popup({

			}).then((res) => {
				console.log(res);
			}).catch((res) => {
				console.log(res);
			});
		},
		handleClick() {
			PModal.popup({

			}).then((res) => {
				console.log(res);
			}).catch((res) => {
				console.log(res);
			});
		}
	}
};
</script>

```
