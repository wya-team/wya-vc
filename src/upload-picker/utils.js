const getContentType = (url) => {
	let contentType = '';
	try {
		let req = new XMLHttpRequest();
		req.open('GET', url, false); // false: 同步处理
		req.send(null);
		contentType = req.getResponseHeader("Content-Type");
	} catch (error) {
		console.log('getContentType', error);
	}
	return contentType;
};

const getTypeByContentType = (url) => {
	console.log('111');
	let IMG_REGEX = /^image/ig;
	let VIDEO_REGEX = /^video/ig;
	let contentType = getContentType(url);
	if (IMG_REGEX.test(contentType)) {
		return 'image';
	} else if (VIDEO_REGEX.test(contentType)) {
		return 'video';
	}
	return 'file';
};

/**
 * 通过文件url判断文件类型  --->  image（图片） | video（视频） | file（其他文件）
 * @param {*} url 文件url或者文件名
 */
export const recognizer = (url) => {
	const reg = /\.(jpe?g|png|gif|bmp|webp|mp4|mov|avi|mpg|mpeg|rmvb)/ig;
	const result = url.match(reg);
	return result && result.length
		? /.(jpe?g|png|gif|bmp|webp)/ig.test(result[result.length - 1]) ? 'image' : 'video'
		: getTypeByContentType(url);
};