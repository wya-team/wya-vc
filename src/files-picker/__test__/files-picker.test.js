import Vue from 'vue';
import FilesPicker from '../files-picker.vue';

// 挂载元素并返回已渲染的文本的工具函数
function getRenderedText(Component, propsData) {
	const Constructor = Vue.extend(Component);
	const vm = new Constructor({
		propsData
	}).$mount();
	return vm;
}

describe('FilesPicker', () => {
	test('测试传递属性', () => {
		const component = getRenderedText(
			FilesPicker
		);
		expect(typeof component).toBe('object');
	});
});