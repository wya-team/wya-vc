/**
 * 通过文件url判断文件类型  --->  image（图片） | video（视频） | file（其他文件）
 * @param {*} url 文件url或者文件名
 */
export const recognizer = (url) => {
	const reg = /\.(jpe?g|png|gif|bmp|webp|mp4|mov|avi|mpg|mpeg|rmvb)/ig;
	const result = url.match(reg);
	return result && result.length
		? /.(jpe?g|png|gif|bmp|webp)/ig.test(result[result.length - 1]) ? 'image' : 'video'
		: 'file';
};

export const FILE_ACCEPT_MAP = {
	DOC_ACCEPTS: '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	EXCEL_ACCEPTS: '.csv,.xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	PPT_ACCEPTS: '.ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation',
	PDF_ACCEPTS: '.pdf,application/pdf',
	TXT_ACCEPTS: 'text/plain',
	HTML_ACCEPTS: 'text/html',
};