import { cloneDeep } from 'lodash';
import { IS_SERVER } from './constant';

const now = +(new Date());
let index = 0;

/**
 * timestamp在某些场景下是有必要的
 */
export const getUid = (comp, opts = {}) => {
	const { prefix = 'vc', timestamp = false } = opts;

	return `${prefix}${`${comp ? `-${comp}` : ''}`}${timestamp ? `-${now}` : ''}-${++index}`;
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
 * 判断是否是url链接
 * 基于base64正则
 */
export const isDataURL = (str) => {
	if (str === null) {
		return false;
	}
	const regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z-]+=[a-z-]+)?)?(;base64)?,[a-z0-9!$&',()*+;=\-._~:@/?%\s]*\s*$/i;
	return !!str.match(regex);
};

/**
 * 获取源数据
 * [value, label, children]
 * value: Number or String -> '11' == 11
 */
export const getSelectedData = (value = [], source = [], opts = {}) => {
	let label = [];
	let data = [];
	const { cascader } = opts;
	if (source.length !== 0) {
		if (source.some(i => !!i.children) || !(source[0] instanceof Array)) { // 联动
			value.reduce((pre, cur) => {
				let target = pre.find(it => it.value == cur) || {};
				data.push(target);
				label.push(target.label);
				return target.children || [];
			}, source);
		} else {
			value.forEach((item, index) => {
				let target = source[index].find(it => it.value == item);
				data.push(target);
				label.push(target.label);
			});
		}
		
	}
	return cloneDeep({
		value,
		label,
		data
	});
};

/**
 * Table, Tree-Select 组件有多处使用
 * opts: {
 * 	parent
 *  cascader
 * }
 */
export const flattenData = (data, opts = {}) => {
	const result = [];
	data.forEach((item) => {
		if (item.children) {
			const { children, ...rest } = item;
			opts.parent 
				? result.push(...[opts.cascader ? item : rest, ...flattenData(children, opts)])
				: result.push(...flattenData(children));
			
		} else {
			result.push(item);
		}
	});
	return result;
};

export const getLabel = (data, v) => {
	let { label = '' } = data.find(i => i.value == v) || {};
	return label;
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

/**
 * 查找对应的值
 * {a: {b: {c: 1}}}, a.b.c -> { o, k, v }
 */
export const getPropByPath = (obj, path) => {
	let target = obj;
	path = path.replace(/\[(\w+)\]/g, '.$1');
	path = path.replace(/^\./, '');

	let keyArr = path.split('.');
	let i = 0;

	for (let len = keyArr.length; i < len - 1; ++i) {
		let key = keyArr[i];
		if (key in target) {
			target = target[key];
		} else {
			throw new Error('[@wya/vc]: 无效路径!');
		}
	}
	// Oracle Key Vault?
	return {
		target,
		key: keyArr[i],
		value: target[keyArr[i]]
	};
};

/**
 * https://github.com/reduxjs/redux/blob/master/src/compose.js
 */
export const compose = (...funcs) => {
	if (funcs.length === 0) {
		return arg => arg;
	}
	if (funcs.length === 1) {
		return funcs[0];
	}
	return funcs.reduce((a, b) => (...args) => a(b(...args)));
};

export const placement2mode = {
	left: 'left',
	right: 'right',
	bottom: 'up',
	top: 'down',
	center: '',
};

export const getComputedStyle = (el, SIZING_STYLE, opts = {}) => {
	// 注: 服务端渲染为0, 在客服端激活前，展示端存在问题【高度不定】
	if (IS_SERVER) return {};
	const style = window.getComputedStyle(el);

	const boxSizing = style.getPropertyValue('box-sizing') 
		|| style.getPropertyValue('-moz-box-sizing') 
		|| style.getPropertyValue('-webkit-box-sizing');

	const paddingSize = parseFloat(style.getPropertyValue('padding-bottom')) 
		+ parseFloat(style.getPropertyValue('padding-top'));

	const borderSize = parseFloat(style.getPropertyValue('border-bottom-width')) 
		+ parseFloat(style.getPropertyValue('border-top-width'));

	const sizingStyle = SIZING_STYLE
		.map(key => `${key}:${style.getPropertyValue(key)}`)
		.join(';');

	return {
		sizingStyle,
		paddingSize,
		borderSize,
		boxSizing,
	};
};
