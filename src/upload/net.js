/**
 * ajax
 * @param  {[type]} url     地址
 * @param  {[type]} method  请求类型
 * @param  {[type]} body    请求的参数
 * @param  {Object} options 扩展
 *
 */
import { ajaxFn } from 'wya-fetch';

const afterFn = (response, options) => {
	// TODO 
	if (response.state === 'SUCCESS') {
		return {
			status: 1,
			data: response
		};
	} else {
		return {
			status: 0,
			msg: response.state
		};
	}
};

const defaultOptions = {
	onAfter: afterFn
	// requestType: 'form-data:json',
};

export const ajax = ajaxFn(defaultOptions);
