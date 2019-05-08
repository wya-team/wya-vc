import { cloneDeep } from 'lodash';

const now = +(new Date());
let index = 0;

export const getUid = () => {
	return `vc-${now}-${++index}`;
};


export const getParseDOM = (str) => {
	const parser = typeof DOMParser === 'undefined' ? null : new DOMParser();

	if (!parser) {
		return null;
	}
	return parser.parseFromString(str, 'text/html');
};

export const retrieveImageURL = (dataTransferItems, callback) => {
	for (let i = 0; i < dataTransferItems.length; i++) {
		let item = dataTransferItems[i];
		if (item.type === 'text/html') {
			item.getAsString(value => {
				// value = <img src="" ... /> 即网页拖入的值
				const doc = getParseDOM(value); // 生成一个document 类似iframe（但有区别）
				const img = doc.querySelector('img');
				if (img && img.src) {
					callback(img.src);
				}
			});
			break;
		}
	}
};

export const isTouchDevice = !!(
	typeof window !== 'undefined'
	&& typeof navigator !== 'undefined'
	&& ('ontouchstart' in window || navigator.msMaxTouchPoints > 0)
);

export const isFileAPISupported = typeof File !== 'undefined';

/**
 * 获取源数据
 * [value, label, children]
 */
export const getSelectedData = (value = [], source = [], opts = {}) => {
	let label = [];
	let data = [];
	if (source.some(i => !!i.children)) { // 联动
		value.reduce((pre, cur) => {
			let target = pre.find(it => it.value === cur) || {};
			data.push(target);
			label.push(target.label);
			return target.children || [];
		}, source);
	} else if (source.length !== 0) {
		value.forEach((item, index) => {
			let target = source[index].find(it => it.value === item);
			data.push(target);
			label.push(target.label);
		});
	}
	return cloneDeep({
		value,
		label,
		data
	});
};

/**
 * 是否符合条件
 * @exceptions {
 *    id,
 *    tagName,
 *    className,
 *    ...HTMLElement
 * }
 */
export const eleInRegExp = (el, exceptions) => {
	for (let i in exceptions) {
		if (exceptions[i].test(el[i])) {
			return true;
		}
	}
	return false;
};

/**
 * 合并字符串和对象为一个新的对象
 * query: 参数为字符串时的规则 如下
 * ['message','duration']
 */
export const getOption = (target, query = []) => {
	let result = {};
	target.map((item, index) => {
		if (typeof item === 'object' && target.length === index + 1) {
			result = {
				...result,
				...item
			};
		} else {
			result[query[index]] = item;
		}
		return true;
	});
	target = result;
	return target;
};