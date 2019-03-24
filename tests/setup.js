import { JSDOM } from 'jsdom';
import Vue from 'vue';

// jsdom 失效时添加
if (typeof window === 'undefined') {
	const documentHTML = '<!doctype html><html><body><div id="root"></div></body></html>';
	global.document = new JSDOM(documentHTML);
	global.window = document.window;
	global.window.resizeTo = (width, height) => {
		global.window.innerWidth = width || global.window.innerWidth;
		global.window.innerHeight = height || global.window.innerHeight;
		global.window.dispatchEvent(new Event('resize'));
	};
}

global.requestAnimationFrame = global.requestAnimationFrame || function (cb) {
	return setTimeout(cb, 0);
};
// 挂载元素并返回已渲染的文本的工具函数
global.createComponent = (wrapper, propsData) => {
	const Constructor = Vue.extend(wrapper);
	const vm = new Constructor({ propsData }).$mount();
	return vm;
};

const Enzyme = require('enzyme');

Enzyme.configure({});