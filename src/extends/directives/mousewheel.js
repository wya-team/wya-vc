/**
 * Mouse wheel normalization across multiple multiple browsers
 * https://github.com/basilfx/normalize-wheel
 * 由facebook针对滚轮事件在不同浏览器在兼容性、滚动距离和滚动速度做的优化代码
 */
import normalizeWheel from 'normalize-wheel';
import { Device } from '@wya/utils';

const mousewheel = (el, callback) => {
	if (el && el.addEventListener) {
		el.addEventListener(Device.firefox ? 'DOMMouseScroll' : 'mousewheel', function (e) {
			callback && callback.apply(this, [e, normalizeWheel(e)]);
		});
	}
};

export default {
	bind(el, binding) {
		mousewheel(el, binding.value);
	}
};
