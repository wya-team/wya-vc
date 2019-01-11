## 功能
- 针对`wya-vc`组件的配置和方法
- 带有注册器的: `userOptions` > `regiserOptions` > `globalOptions` > `defaultOptions`
- 参数配置原则: `userOptions` > `globalOptions(vc)` > `defaultOptions`

## 方法

方法 | 说明 | 类型 | 默认值
---|---|---|---
init | 初始化 | `any` | -
clean | 删除api式组件 | `func` | `(cName, focre){}`

> clean() 清理需要自动销毁的组件，clean(null, true), 强制清除所有组件；clean('xxx'), 清理单个

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