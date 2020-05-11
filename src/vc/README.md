## 功能
- 针对`@wya/vc`组件的配置和方法
- 参数配置原则: `userOptions(single)` > `registerOptions(HOF)` > `globalOptions(Vc)` > `defaultOptions(single)`

## 方法

方法名 | 说明 | 参数
---|---|---
init | 初始化 | -
clear | 清理Portals类型组件 | `Function` | `cName`：清理的组件名；`force`：是否强制清理
clearAll | 清理全部组件 | -

> clear() 清理需要自动销毁的组件，clear(null, true), 强制清除所有组件；clear('xxx'), 清理单个

## 组件配置

#### 如下：
```
{
	[组件 - 大驼峰]: {
		// .. 配置信息
	}
}
```

- `Upload`

```
Upload: {
	IMG_UPLOAD_URL: null,
	FILE_UPLOAD_URL: null
}

```