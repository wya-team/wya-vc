import { createVue, destroyVM } from '@tests/helper';
import Modal from '../index';
import MModal from '../index.m';

describe('Modal', () => {
	let vm;
	afterEach(() => {
		const el = document.querySelector('.vc-modal');
		vm && destroyVM(vm);
		if (!el) return;
		if (el.parentNode) {
		  el.parentNode.removeChild(el);
		}
		if (el.__vue__) {
		  el.__vue__.$destroy();
		}

	});
	it('basic', () => {
		expect(!!Modal).to.equal(true);
		expect(!!MModal).to.equal(true);
	});
	it('创建多种mode的弹框', (done) => {
		Modal.info();
		Modal.success();
		Modal.error({
			size: 'large'
		});
		Modal.warning();
		setTimeout(() => {
			expect(document.querySelector('.is-success')).to.exist;
			expect(document.querySelector('.is-info')).to.exist;
			expect(document.querySelector('.is-error')).to.exist;
			expect(document.querySelector('.is-warning')).to.exist;
			done();
		}, 50);
	});
	it('自定义header和footer', () => {
		vm = createVue({
			template: `
			<vc-modal
				:visible="visible"
			>
				<template slot="header">
					<div class="__newHeader">222</div>
				</template>
				<template slot="footer">
					<div class="__newFooter">222</div>
				</template>
			</vc-modal>
			`,
			components: {
				'vc-modal': Modal
			},
			data() {
				return {
					visible: true
				};
			}
		});
		expect(document.querySelector('.__newHeader')).to.exist;
		expect(document.querySelector('.__newFooter')).to.exist;
	});
	it('创建不同size的modal', () => {
		vm = createVue({
			template: `
			<div>
				<vc-modal
					ref="small"
					:visible="visible"
				>
					<template slot="header">
						<div class="__newHeader">222</div>
					</template>
					<template slot="footer">
						<div class="__newFooter">222</div>
					</template>
				</vc-modal>
				<vc-modal
					ref="medium"
					:visible="visible"
					size="medium"
				>
					<template slot="header">
						<div class="__newHeader">222</div>
					</template>
					<template slot="footer">
						<div class="__newFooter">222</div>
					</template>
				</vc-modal>
				<vc-modal
					ref="large"
					:visible="visible"
					size="large"
				>
					<template slot="header">
						<div class="__newHeader">222</div>
					</template>
					<template slot="footer">
						<div class="__newFooter">222</div>
					</template>
				</vc-modal>
			</div>
			`,
			components: {
				'vc-modal': Modal
			},
			data() {
				return {
					visible: true
				};
			}
		});
		const smallRef = vm.$refs.small.$refs.container;
		const mediumRef = vm.$refs.medium.$refs.container;
		const largeRef = vm.$refs.large.$refs.container;
		expect(smallRef.style.width).to.equal('480px');
		expect(mediumRef.style.width).to.equal('640px');
		expect(largeRef.style.width).to.equal('864px');
	});
});