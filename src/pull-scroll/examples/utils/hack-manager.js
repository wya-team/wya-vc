/**
 * 专门处理微信端相关兼容问题
 */
import { Storage, URL, Device } from '@wya/utils';
import { ajax } from '@wya/http';

/**
 * 暂时先有公共的管理，后期考虑每个项目中单独拥有
 */
export default class HackManager {
	constructor(options = {}) {
		this.inputTextType = /^(text|password|number|tel|url|email|search)$/; // 可输入的input类型
		this._initHackScroll();
	}
	
	/**
	 * 弹窗输入框后无法操作页面
	 * 键盘高度的影响
	 * 苹果设备，安卓设备（部分）
	 */
	_initHackScroll() {
		if (!Device.wechat || !Device.wechatVersion >= '6.7.4') return;
		document.addEventListener('click', async (e) => {
			let element = await this._getActiveElement();
			if (!element) return;
			element.addEventListener('blur', this.handleFn);
		}, true);
	}

	handleFn = (e) => {
		setTimeout(async () => {
			document.body.scrollTop = document.body.scrollTop + 0; // eslint-disable-line
			// hack等待焦点已被获取后，在拿activeElement
			let element = await this._getActiveElement();
			element && element.click();
			e.target.removeEventListener('blur', this.handleFn);
		}, 0);
	}

	_getActiveElement = (e) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				let element = document.activeElement;
				let canEditor = Boolean(element.getAttribute('contenteditable'));
				if (canEditor || (/^(INPUT|TEXTAREA)$/.test(element.nodeName) && this.inputTextType.test(element.type))) {
					resolve(element);
				} else {
					resolve();
				}
			}, 100);
		});
	}
}