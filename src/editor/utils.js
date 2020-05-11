import { Load } from '@wya/utils';

export const insertFontStyle = (value, id) => {
	// 动态生成font-size的css，插入head
	let code = value.reduce((pre, fontSize) => {
		pre += `.ql-snow .ql-size.ql-picker .ql-picker-item[data-value="${fontSize}"]:before,
				.ql-snow .ql-size.ql-picker .ql-picker-label[data-value="${fontSize}"]:before {
					content: "${fontSize}"
				}`;
		pre += `.ql-editor .ql-size-${fontSize} {
					font-size: ${fontSize};
				}`;
		return pre;
	}, '');
	Load.cssCode(code, { id });
};