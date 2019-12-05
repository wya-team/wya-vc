import Vue from 'vue';

const Global = window || global || this || {};

const createEl = () => {
	const el = document.createElement('div');

	el.id = `app__${Math.random()}`;
	document.body.appendChild(el);

	return el;
};

export const requestAnimationFrame = Global.requestAnimationFrame || function (cb) {
	return setTimeout(cb, 0);
};

export const createVue = (Compo, options = {}) => {
	// mounted  - 是否添加到 DOM 上
	const { mounted = true, ...rest } = options;

	return new Vue(Compo).$mount(mounted === false ? null : createEl());
};
/**
 * 创建一个测试组件实例
 * @link http://vuejs.org/guide/unit-testing.html#Writing-Testable-Components
 * @param  {Object}  Compo          - 组件对象
 * @param  {Object}  propsData      - props 数据
 * @param  {Object}  options
 * @return {Object} vm
 */

export const createComponent = (wrapper, propsData, options = {}) => {
	// mounted  - 是否添加到 DOM 上
	const { mounted = true, ...rest } = options;
	const Ctor = Vue.extend(wrapper);
	const vm = new Ctor({ propsData, ...rest });

	vm.$mount(mounted === false ? null : createEl());

	return vm;
};

/**
 * 回收 vm
 * @param  {Object} vm
 */

export const destroyVM = (vm) => {
	vm.$destroy && vm.$destroy();
	vm.$el 
		&& vm.$el.parentNode 
		&& vm.$el.parentNode.removeChild(vm.$el);
};


/**
 * 触发一个事件
 * mouseenter, mouseleave, mouseover, keyup, change, click 等
 * @param  {Element} el
 * @param  {String} name
 * @param  {*} opts
 */

export const triggerEvent = (el, name, ...opts) => {
	let eventName;

	if (/^mouse|click/.test(name)) {
		eventName = 'MouseEvents';
	} else if (/^key/.test(name)) {
		eventName = 'KeyboardEvent';
	} else {
		eventName = 'HTMLEvents';
	}
	const evt = document.createEvent(eventName);

	evt.initEvent(name, ...opts);
	el.dispatchEvent
		? el.dispatchEvent(evt)
		: el.fireEvent('on' + name, evt);

	return el;
};

/**
 * 触发 “mouseup” 和 “mousedown” 事件
 * @param {Element} el
 * @param {*} opts
 */

export const triggerClick = (el, ...opts) => {
	triggerEvent(el, 'mousedown', ...opts);
	triggerEvent(el, 'mouseup', ...opts);

	return el;
};

/**
 * 触发 keydown 事件
 * @param {Element} el
 * @param {keyCode} int
 */

export const triggerKeyDown = (el, keyCode) => {
	const evt = document.createEvent('Events');
	evt.initEvent('keydown', true, true);
	evt.keyCode = keyCode;
	el.dispatchEvent(evt);
};

/**
 * 等待 s 秒，返回 Promise
 * @param {Number} s
 */

export const wait = (s = 0.05, callback) => {
	return new Promise(resolve => setTimeout(() => {
		callback && callback();
		resolve();
	}, s * 1000));
};

/**
 * 等待一个 Tick，代替 Vue.nextTick，返回 Promise
 */
export const waitImmediate = () => wait(0);






