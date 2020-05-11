import { createVue, destroyVM, triggerClick } from '@tests/helper';
import Modal from '../index';
import MModal from '../index.m';

describe('Modal', () => {
	let vm;
	afterEach(() => {
		vm && destroyVM(vm);
	});
	it('basic', () => {
		expect(!!Modal).to.equal(true);
		expect(!!MModal).to.equal(true);
	});
	it('创建多种mode的弹框', () => {
		let vm1 = Modal.info();
		let vm2 = Modal.success();
		let vm3 = Modal.error({
			size: 'large'
		});
		let vm4 = Modal.warning();
		expect(vm1.$el.querySelector('.is-info')).to.exist;
		expect(vm2.$el.querySelector('.is-success')).to.exist;
		expect(vm3.$el.querySelector('.is-error')).to.exist;
		expect(vm4.$el.querySelector('.is-warning')).to.exist;
		Modal.destroy();
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
		expect(vm.$el.querySelector('.__newHeader')).to.exist;
		expect(vm.$el.querySelector('.__newFooter')).to.exist;
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
	it('拖动弹框', () => {
		vm = createVue({
			template: `
			<vc-modal
				ref="newmodal"
				:visible="visible"
				draggable
			>
				<template slot="header">
					<div class="__newHeader">222</div>
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
		const headerRef = vm.$refs.newmodal.$refs.header;
		triggerClick(headerRef, 'mousedown');
	});
});