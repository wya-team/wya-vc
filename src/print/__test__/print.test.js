import { createVue, createComponent, wait, waitImmediate } from '@tests/helper';
import Print from '..';

describe('Print', () => {
	it('basic', () => {
		expect(!!Print).to.equal(true);
	});

	
	it('tag', () => {
		const vm = createComponent(Print, {
			tag: 'div',
			value: '打印的内容'
		});
		expect(vm.$el.tagName).to.equal('DIV');
	});
	
	it('value', () => {
		const vm = createVue({
			template: `
				<vc-print value="打印的内容" tag="div" />
			`,
			components: {
				'vc-print': Print
			},
		});
		expect(vm.$el.innerHTML).to.equal('打印的内容');
	});

	it('print', async () => {
		const vm = createVue({
			template: `
				<vc-print value="测试手动调用打印" tag="div" ref="print" />
			`,
			components: {
				'vc-print': Print
			},
		});
		vm.$refs.print.print();
		let nodes = Array.prototype.slice.call(document.getElementsByTagName("DIV"));
		expect(nodes[nodes.length - 1].innerHTML).to.equal('测试手动调用打印');
	});
});
