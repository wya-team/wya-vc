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

export const insertLineHeightStyle = (value, id) => {
	// 动态生成line-height的css，插入head
	let code = value.reduce((pre, lineHeight) => {
		pre += `.ql-snow .ql-lineHeight.ql-picker .ql-picker-item[data-value="${lineHeight}"]:before,
				.ql-snow .ql-lineHeight.ql-picker .ql-picker-label[data-value="${lineHeight}"]:before {
					content: "${lineHeight / 10}"
				}`;
		pre += `.ql-editor .ql-lineHeight-${lineHeight} {
					line-height: ${lineHeight / 10};
				}`;
		return pre;
	}, '');
	Load.cssCode(code, { id });
};