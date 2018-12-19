const now = +(new Date());
let index = 0;

export const getUid = () => {
	return `vc-${now}-${++index}`;
};

const endsWith = (str, suffix) => {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

export const attrAccept = (file, acceptedFiles) => {
	if (file && acceptedFiles) {
		const acceptedFilesArray = Array.isArray(acceptedFiles)
			? acceptedFiles
			: acceptedFiles.split(',');
		const fileName = file.name || '';
		const mimeType = file.type || '';
		const baseMimeType = mimeType.replace(/\/.*$/, '');

		return acceptedFilesArray.some(type => {
			const validType = type.trim();
			if (validType.charAt(0) === '.') {
				return endsWith(fileName.toLowerCase(), validType.toLowerCase());
			} else if (/\/\*$/.test(validType)) {
				// This is something like a image/* mime type
				return baseMimeType === validType.replace(/\/.*$/, '');
			}
			return mimeType === validType;
		});
	}
	return true;
};

// -- 业务相关 --

export const initSelect = (res, value, label, children, level = 1) => {
	let __arr = [];
	let __child = [];
	if (res instanceof Array && level > 0) {
		for (let j = 0; j < res.length; j++) {
			__arr = [...__arr, {
				value: res[j][value] || j,
				label: res[j][label] || res[j],
				children: initSelect(res[j][children], value, label, children, level - 1)
			}];
		}
		return __arr;
	}
	return level == 0 ? undefined : [];
};
/**
 * 初始化数据
 * @param  {String} res 传入的数据
 * @param  {String} id  数组是已str区分 ，默认'id'
 * @param  {String} _count
 * @param  {Object} initObj 判断是否有init
 * @param  {Array} initArr 判断是否有init
 * @return {String}
 * 参考reducers中的使用
 */
export const initItem = (res, str, count, initObj, initArr) => {
	let itemArr = [];
	let itemObj = {};
	let data;
	let id = str || 'id';
	if (typeof res == "object" && res.data && res.data instanceof Array) { // 传入的不是数组。res.data是数组
		data = res.data;
	} else if (res instanceof Array) { // 传入的是数组
		data = res;
	} else {
		return console.error('初始化参数错误');
	}
	for (let i = 0; i < data.length; i++) {
		itemArr = [...itemArr, data[i][id]];
		itemObj = {
			...itemObj,
			[data[i][id]]: initObj || data[i]
		};
	}
	/* 判断是否有_count*/
	if (count) {
		let { _count } = res;
		return { itemArr, itemObj, _count };
	} else {
		return { itemArr, itemObj };
	}
};
/**
 * 作为分页初始数据
 * for mobile
 */
export const initObj = {
	currentPage: 0, // 当前页数
	totalPage: 1, // 总页数
	isEnd: 0, // 是否正在加载 0 上拉加载，1为加载中，2为已全部加载,3数据异常
	itemArr: [],
	itemObj: {},

};
/**
 * 作为分页初始数据
 * for pc
 */
export const initPage = {
	curPage: 0, // 当前页数
	totalPage: 1, // 总页数
	totalCount: 0,
	pageSize: 10, // 条数
	isEnd: 0, // 是否正在加载 0 上拉加载，1为加载中，2为已全部加载,3数据异常
	itemArr: {},
	itemObj: {},
};
/**
 * 图片
 */
export const getCroppedImg = (canvas, fileName = '____fileName', getFile = false) => {
	// As base64
	const base64Image = canvas.toDataURL("image/png");
	// As a blob 移动端不兼容
	return new Promise((resolve, reject) => {
		let file;
		if (getFile) {
			let arr = base64Image.split(',');
			let mime = arr[0].match(/:(.*?);/)[1];
			let bstr = atob(arr[1]);
			let n = bstr.length;
			let u8arr = new Uint8Array(n);
			while (n--) {
			    u8arr[n] = bstr.charCodeAt(n);
			}
			file = new Blob([u8arr], { type: mime });
			// file = (typeof File && fileName) ? new File([file], fileName) : file;
			file.name = fileName;
		}
		resolve({ file, base64Image });
	});
};
/**
 * 重构url
 * @param  {Object}
 * @return {String}
 */
export const getConstructUrl = (route, opts = {}) => { // 创建新的url
	const {
		path,
		query
	} = route;
	let result = path.join('/');
	let queryArr = [];
	if (query && typeof query === 'object') {
		queryArr = Object.keys(query).sort()
			.filter(key => query[key] !== null)
			.map(key => `${key}=${query[key]}`);
	}

	if (queryArr.length > 0) {
		result += `?${queryArr.join('&')}`;
	}

	return result;
};
/**
 * 解析url
 * @param  {String} url
 * @return {Object}
 */
export const getParseUrl = (url = `${location.pathname}${location.search}`, opts = {}) => { // 解析url
	let path = [];
	const query = {};
	// const urlArr = url.replace('/', '').split('?');
	const urlArr = url.split('?');
	path = urlArr[0].split('/');

	if (urlArr.length > 1) {
		urlArr[1].split('&').forEach(str => {
			const arr = str.split('=');
			const key = arr[0];
			const value = arr[1];
			if (isNaN(value) || value[0] === '0' || value === '') {
				query[key] = value;
			} else {
				query[key] = Number(value);
			}
		});
	}

	return {
		path,
		query
	};
};
export const parseDOM = (str) => {
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
				const doc = parseDOM(value); // 生成一个document 类似iframe（但有区别）
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
 * 用于对象
 * @createMixins({})
 * class {}
 */
export const createMixins = (...mixins) => target => {
	Object.assign(target.prototype, ...mixins);
};

/**
 * 小于10的数字前面加0
 */
export const prefixZero = (num) => {
	if (num < 10 && num > 0) {
		return "0" + num;
	} else if (num <= 0) {
		return '00';
	}
	return num;
};

export const def = (obj, key, val, enumerable) => {
	Object.defineProperty(obj, key, {
		value: val,
		enumerable: !!enumerable,
		writable: true,
		configurable: true
	});
};

export const isObj = target => typeof target === 'object';

/**
 * 判断是否存在
 */
export const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key);

/**
 * 深拷贝
 */
let baseClone = (target, source) => {
	for (let k in source) {
		// 只拷贝实例属性，不进行原型的拷贝
		if (hasOwn(source, k)) {
			// 引用类型的数据单独处理
			if (typeof source[k] == 'object') {
				target[k] = Array.isArray(source[k]) ? [] : {};
				// 递归处理引用类型数据(利用引用处理)
				baseClone(target[k], source[k]);
			} else {
				// 值类型的数据直接进行拷贝
				target[k] = source[k];
			}
		}
	}
	return target;
};
export const cloneDeep = (source) => baseClone(Array.isArray(source) ? [] : {}, source);
export const cloneDeepEasier = (source) => JSON.parse(JSON.stringify(source));

/**
 * 获取源数据
 * [value, label, children]
 */
export const getSelectedData = (value = [], source = [], opts = {}) => {
	source = cloneDeepEasier(source);
	let label = [];
	let data = [];
	if (source.some(item => !!item.children)) { // 联动
		value.reduce((data, item) => {
			let itemData = data.find(it => it.value === item);
			data.push(itemData);
			label.push(itemData.label);
			return itemData.children;
		}, source);
	} else if (source.length !== 0) {
		value.forEach((item, index) => {
			let itemData = source[index].find(it => it.value === item);
			data.push(itemData);
			label.push(itemData.label);
		});
	}
	return cloneDeep({
		value,
		label,
		data
	});
};

export const date2value = (v, format) => {
	let target = {
		Y: v.getFullYear() + '',
		M: v.getMonth() * 1 + 1 + '',
		D: v.getDate() + '',
		H: v.getHours() + '',
		m: v.getMinutes() + '',
	};
	let typeArr = typeof format === 'string' ? format.split('') : format; // 'YMDHm'

	let result = typeArr.map(item => prefixZero(target[item]));

	return result;
};

export const value2date = (v) => {
	let result = [];
	for (let i = 0; i < 5 - v.length; i++) {
		result.push(false);
	}
	result = [...v, ...result];
	const target = {
		Y: result[0] || new Date().getFullYear(),
		M: result[1] || new Date().getMonth() * 1 + 1,
		D: result[2] || new Date().getDate(),
		H: result[3] || '00',
		m: result[4] || '00',
	};
	return new Date(
		target.Y, 
		target.M * 1 - 1, 
		target.D, 
		target.H, 
		target.m
	);
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