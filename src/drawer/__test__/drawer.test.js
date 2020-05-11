import { createVue, createComponent, wait, destroyVM } from '@tests/helper';
import Vue from "Vue";
import Drawer from '..';

describe('Drawer', () => {
	let vm;
	afterEach(() => {
		destroyVM(vm);
	});
	it('basic', () => {
		expect(typeof Drawer).to.equal('object');
		vm = createComponent(Drawer, {});
		expect(typeof vm).to.equal('object');
	});
	it('visiible', () => {
		vm = createComponent(Drawer, {
			visible: false
		});
		expect(vm.$el.querySelector('.vc-drawer__wrapper').style.display).to.equal('none');
	});
	it('mask', () => {
		vm = createComponent(Drawer, {
			visible: true,
			mask: false,
		});
		expect(vm.$el.querySelector('.vc-drawer__mask').style.display).to.equal('none');
	});
	it('wrapperClassName', () => {
		vm = createComponent(Drawer, {
			wrapperClassName: 'newClass'
		});
		expect(vm.$el.querySelector('.vc-drawer__wrapper').classList.contains('newClass')).to.equal(true);
	});
	it('palcement', () => {
		vm = createComponent(Drawer, {
			placement: 'top',
			height: 400,
			visible: true,
		});
		expect(vm.$el.querySelector('.vc-drawer__wrapper').style.height).to.equal('400px');
	});
	it('关闭事件', async () => {
		vm = createVue({
			template: `
			<vc-drawer
				ref="target"
				v-model="visible"
				:mask-closable="maskClosable"
			>
				我是content1
			</vc-drawer>
			`,
			data() {
				return {
					visible: true,
					maskClosable: false
				};
			},
			components: {
				'vc-drawer': Drawer
			}
		});
		const vmTag = vm.$refs.target;
		vmTag.handleClose('', false);
		expect(vmTag.isActive).to.equal(true);
		await wait(3);
		vmTag.handleClose('', true);
		expect(vmTag.isActive).to.equal(false);

	});
	it('动画执行后关闭', () => {
		vm = createVue({
			template: `
			<vc-drawer
				ref="target"
				v-model="visible"
				@visible-change="handleRemove"
			>
				我是content1
			</vc-drawer>
			`,
			data() {
				return {
					visible: true,
					animationStatus: true
				};
			},
			components: {
				'vc-drawer': Drawer
			},
			methods: {
				handleRemove(e) {
					this.animationStatus = e;
				}
			}
		});
		let vmRef = vm.$refs.target;
		vmRef.handleClose('', true);
		vmRef.handleRemove();
		expect(vm.animationStatus).to.equal(false);
	});
	
});