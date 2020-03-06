import { createVue, wait, destroyVM, triggerEvent } from '@tests/helper';
import MToast from '../index.m';

describe('Toast', () => {
	it('basic', () => {
		expect(!!MToast).to.equal(true);
	});
	it('toast open', async () => {
		let vm = MToast.info('测试1', 2);
		await wait(1);
		expect(vm.$el.querySelector('.vcm-toast__wrapper').style.display).to.equal('');
		await wait(2);
		expect(vm.$el.querySelector('.vcm-toast__wrapper').style.display).to.equal('none');
		MToast.destroy();
	});
	it('toast loading', async () => {
		let vm = MToast.loading('加载中');
		await wait(2);
		expect(vm.$el.querySelector('.vcm-toast__wrapper').style.display).to.equal('');
		MToast.destroy();
	});
	it('手动关闭toast', async () => {
		let vm = MToast.info('点击关闭', 0, {
			maskClosable: true
		});
		await wait(2);
		expect(vm.$el.querySelector('.vcm-toast__wrapper').style.display).to.equal('');
		triggerEvent(vm.$el.querySelector('.vcm-toast__bg'), 'click');
		await wait(2);
		expect(vm.$el.querySelector('.vcm-toast__wrapper').style.display).to.equal('none');
		MToast.destroy();
	});
	it('不能手动关闭toast', async () => {
		let vm = MToast.info('不能关闭', 0, {
			maskClosable: false
		});
		await wait(2);
		expect(vm.$el.querySelector('.vcm-toast__wrapper').style.display).to.equal('');
		triggerEvent(vm.$el.querySelector('.vcm-toast__bg'), 'click');
		await wait(2);
		expect(vm.$el.querySelector('.vcm-toast__wrapper').style.display).to.equal('');
		MToast.destroy();
	});
	it('toast success', async () => {
		let vm = MToast.success('成功', 2);
		await wait(1);
		expect(vm.$el.querySelector('.vcm-toast__wrapper').style.display).to.equal('');
		await wait(2);
		expect(vm.$el.querySelector('.vcm-toast__wrapper').style.display).to.equal('none');
		MToast.destroy();
	});
	it('toast warning', async () => {
		let vm = MToast.warning('警告', 2);
		await wait(1);
		expect(vm.$el.querySelector('.vcm-toast__wrapper').style.display).to.equal('');
		await wait(2);
		expect(vm.$el.querySelector('.vcm-toast__wrapper').style.display).to.equal('none');
		MToast.destroy();
	});
	it('toast error', async () => {
		let vm = MToast.error('错误', 2);
		await wait(1);
		expect(vm.$el.querySelector('.vcm-toast__wrapper').style.display).to.equal('');
		await wait(2);
		expect(vm.$el.querySelector('.vcm-toast__wrapper').style.display).to.equal('none');
		MToast.destroy();
	});
});