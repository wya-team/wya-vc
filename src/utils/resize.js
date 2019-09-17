import ResizeObserver from 'resize-observer-polyfill';

class ResizeManager {
	constructor(options = {}) {
		/**
		 * TODO
		 * 只传递element也可以销毁
		 */
		this.events = [];
	}

	on(element, fn) {
		if (!element) return;
		if (!element.__resizeListeners__) {
			element.__resizeListeners__ = [];
			element.__ro__ = new ResizeObserver(this.handleResize);
			element.__ro__.observe(element);
		}
		element.__resizeListeners__.push(fn);
	}

	off(element, fn) {
		if (!element || !element.__resizeListeners__) return;
		element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
		if (!element.__resizeListeners__.length) {
			element.__ro__.disconnect();
		}
	}

	handleResize(entries) {
		for (let entry of entries) {
			const listeners = entry.target.__resizeListeners__ || [];
			if (listeners.length) {
				listeners.forEach(fn => {
					fn();
				});
			}
		}
	}
}

export const Resize = new ResizeManager();