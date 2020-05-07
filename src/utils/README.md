## constant.js
- `IS_SERVER`：判断当前是否处于服务端状态。

## resize.js
- `Resize`：提供`on`、`off`方法。

## style.js
- `TRANSFORM`：添加前缀的驼峰化`transform`
- `TRANSFORM_KEBAB`：添加前缀的扁平化`transform`
- `TRANSITION`：添加前缀的驼峰化`transition`
- `ANIMATION`：添加前缀的驼峰化`animation`

## util.js
- `getUid`：获取唯一id字符串
- `getParseDOM`：解析DOM字符串
- `retrieveImageURL`：恢复图片url
- `isTouchDevice`: 判断是否移动端设备
- `isFileAPISupported`：是否支持文件类型的api
- `isDataURL`：判断是否是url链接，基于base64正则
- `getSelectedData`：获取源数据
- `flattenData`：扁平化数据
- `getLabel`：根据传入的`value`获取对应的`label`
- `eleInRegExp`：判断元素是否符合正则
- `getOption`：合并字符串和对象为一个新的对象
- `getPropByPath`：根据路径查找对应的值
- `compose`：多函数传参
- `placement2mode`：方位转换
- `getComputedStyle`：获取元素的样式值