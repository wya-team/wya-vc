const endsWith = (str, suffix) => {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

/**
 * file.type 在某些windows下为空
 */
export const attrAccept = (file, accept) => {
	if (file 
		&& file instanceof Blob 
		&& file.type 
		&& accept
	) {
		const acceptArr = Array.isArray(accept) ? accept : accept.split(',');
		const filename = file.name || '';
		const mimeType = file.type;
		
		const baseMimeType = mimeType.replace(/\/.*$/, '');

		return acceptArr.some(type => {
			const validType = type.trim();
			if (validType.charAt(0) === '.') {
				return endsWith(filename.toLowerCase(), validType.toLowerCase());
			} else if (/\/\*$/.test(validType)) {
				// This is something like a image/* mime type
				return baseMimeType === validType.replace(/\/.*$/, '');
			}
			return mimeType === validType;
		});
	}
	return true;
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
 * 通过文件url判断文件类型  --->  image（图片） | video（视频） | file（其他文件）
 * @param {*} url 文件url或者文件名
 */
export const recognizer = (url) => {
	const reg = /\.(jpe?g|png|gif|bmp|webp|mp4|mov|avi)/g;
	const result = url.match(reg);
	return result && result.length
		? /.(jpe?g|png|gif|bmp|webp)/.test(result[result.length - 1]) ? 'image' : 'video'
		: 'file';
};