class TriggerManager {
	constructor(el, options = {}) {
		this.el = el;
		this.options = options;
	}

	touchmove(start, end) {
		const [startX, startY] = start;
		const [endX, endY] = end;
		this.triggerEvent('touchstart', startX, startY);
		const distanceX = endX - startX;
		const distanceY = endY - startY;
		for (let i = 4; i > 0; i--) {
			this.triggerEvent(
				'touchmove', 
				distanceX / i + startX,
				distanceY / i + startY
			);
		}
		this.triggerEvent('touchend', endX, endY);
	}

	triggerEvent(eventName, x, y) {
		const touches = this.options.touches || [this.getTouch(x, y)];
		const event = document.createEvent('CustomEvent');
		event.initCustomEvent(eventName, true, true);
		Object.assign(event, {
			clientX: x,
			clientY: y,
			touches,
			targetTouches: touches,
			changedTouches: touches,
			...this.options
		});
		this.el.dispatchEvent(event);
	}

	getTouch(x, y) {
		return {
			identifier: Date.now(),
			target: this.el,
			clientX: x,
			clientY: y,
			pageX: x,
			pageY: y,
			radiusX: 11.5,
			radiusY: 11.5,
			rotationAngle: 0
		};
	}
}

export default (el, options) => new TriggerManager(el, options);