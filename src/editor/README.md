## 富文本（Editor）

- 常用的富文本编辑器，可扩展；
- 请用 Editor.View: 富文本预览组件来显示富文本内容；

### 基本用法

:::RUNTIME
```html
<template>
	<div class="v-editor-basic">
		<vc-editor style="height: 200px" v-model="text" />

        <vc-editor-view :content="text" />
	</div>
</template>

<script>
import { Editor, VcInstance } from '@wya/vc';

// VcInstance.init({
// 	Upload: {
// 		URL_UPLOAD_IMG_POST: 'https://api.github.com/users/wya-team',
// 		URL_UPLOAD_FILE_POST: 'https://api.github.com/users/wya-team',
// 		onPostBefore: ({ options }) => {
// 			return new Promise((resolve, reject) => {
// 				// if (random(0, 10) > 10) {
// 				// 	throw new Error('异常处理');
// 				// }
// 				resolve({
// 					...options,
// 					param: {
// 						...options.param,
// 						timestamp: new Date()
// 					},
// 					type: 'GET',
// 					credentials: 'omit', //  cors下关闭
// 					headers: {
// 					}
// 				});
// 			});
// 		},
// 		onPostAfter: ({ response, options }) => { // eslint-disable-line
// 			const { file } = options.param;
// 			return new Promise((resolve) => {
				
// 				// 模拟强制返回
// 				resolve({
// 					status: 1,
// 					data: {
// 						url: 'https://avatars2.githubusercontent.com/u/34465004?v=4',
// 						type: `.${file.name.split('.').pop()}`,
// 						uid: file.uid,
// 						title: file.name,
// 						size: file.size
// 					},
// 					...response
// 				});
// 			});
// 		}
// 	}
// });

export default {
	components: {
        "vc-editor": Editor,
        "vc-editor-view": Editor.View
    },
    data() {
        return {
            text: ''
        }
    },
	mounted() {
        console.log(VcInstance, '-=-=-==' )
	},
	methods: {
	}
};
</script>
<style>

</style>
```
:::

## API

#### 属性
##### Editor
属性 | 说明 | 类型 | 默认值
---|---|---|---
value | 富文本内容 | `String` | -
options | 富文本toolbar（优先级最高） | `Object` | -
disabled | 富文本是否不可编辑 | `Boolean` | false
imgUploadOpts | 上传图片的配置项 | `Object` | `{accept: 'image/gif,image/jpeg,image/jpg,image/png'}`
videoUploadOpts | 上传视频的配置项 | `Object` | `{accept: 'video/mp4,video/webm,video/ogg'}`
register | Quill扩展注册 | `Function` | -

##### Editor.View
属性 | 说明 | 类型 | 默认值
---|---|---|---
content | 富文本内容（html形式） | `String` | -

#### 事件
##### Editor
属性 | 说明 | 类型 | 默认值
---|---|---|---
@blur | 富文本失去焦点 | `function` | `editor`
@focus | 富文本获取焦点 | `function` | `editor`
@change | 富文本内容变化 | `function` | `{ html, text, editor }`
@ready | quill对象已经实例化 | `function` | -

#### Slot
属性 | 说明
---|---
toolbar | 工具栏内容(外层节点需要有id属性为'toolbar')
extend | 组件提供的工具栏上的尾部工具拓展(和`toolbar`插槽不能同时使用)

## 基础用法

<!-- ```vue
<template>
    <vc-editor 
        ref="editor"
        v-model="value"
        :options="options"
        :disabled="disabled"
    />
    <vc-editor-view :content="value" />

    <vc-editor 
        ref="editor"
        v-model="formValidate.value"
        :disabled="disabled"
    >
        <div id="toolbar" slot="toolbar">
            <span class="ql-formats">
                <button class="ql-bold"/>
                <button class="ql-italic"/>
                <button class="ql-underline"/>
                <button class="ql-strike"/>
            </span>
        </div>
    </vc-editor-view>
</template>
<script>
import Editor from '../editor';

export default {
    name: "vc-editor-basic",
    components: {
        "vc-editor": Editor,
        "vc-editor-view": Editor.View,
    },
    data() {
        return {
            options: {
                modules: {
					ImageExtend: {
						upload: {
							showTips: false,
							size: 88888,
							max: 2,
							multiple: false
						}
					},
					toolbar: "#toolbar",
				}
            },
            disabled: false,
            value: ''
        };
    },
    computed: {
        
    },
    mounted() {
        console.log(this.$refs.editor);
    },
    methods: {
        
    }
};
</script>

``` -->