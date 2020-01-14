import { createVue, createComponent, destroyVM } from '@tests/helper';
import Spin from '../index';

const getStyleValue = (el, property) => {
	return window.getComputedStyle(el, null)[property];
};

describe('Spin', () => {
	let vm;

	afterEach(() => {
		vm && destroyVM(vm);
	});

	it('basic', () => {
		expect(!!Spin).to.equal(true);
	});

	it('props: size', () => {
		const size = 20;
		vm = createComponent(Spin, { size });

		expect(getStyleValue(vm.$el.firstChild, 'font-size')).to.equal(`${size}px`);
	});

	it('props: foreground', () => {
		const foreground = '#5495f6';
		vm = createComponent(Spin, { foreground });

		expect(vm.foreground).to.equal(foreground);
	});

	it('props: background', () => {
		const background = '#00ff00';
		vm = createComponent(Spin, { background });

		expect(vm.background).to.equal(background);
	});

	it('custom loading slot content', () => {
		const cls = '_custom-loading';
		const vm = createVue({
			template: `
				<vc-spin>
					<template #loading><div class="${cls}">This is custom loading content.</div></template>
				</vc-spin>
			`,
			components: { 
				'vc-spin': Spin
			}
		});
		
		const isCustomLoading = !!vm.$el.querySelector(`.${cls}`);
		expect(isCustomLoading).to.be.true;
	});
});