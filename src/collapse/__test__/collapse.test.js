import { createVue, createComponent, destroyVM, wait } from '@tests/helper';
import Collapse from '..';

describe('Collapse', () => {

	let vm;
	afterEach(() => {
		destroyVM(vm);
	});

	it('basic', () => {
		expect(!!Collapse).to.equal(true);
		vm = createVue({
			template: `<div>111</div>`
		});
	});

	it('toggle', async () => {
		vm = createVue({
			template: `
				<div>
					<vc-collapse ref="collapse" :accordion="accordion" class="v-collapse" :value="value">
						<vc-collapse-item ref="collapse-item" name="1" class="item">
							<div class="_title">
								title
							</div>
							<span slot="icon" slot-scope="it" class="_icon">
								{{ it.isExpend }}
							</span>
							<div slot="content" class="_content">
								content
							</div>
						</vc-collapse-item>
						<vc-collapse-item name="2" class="item">
							<div class="_title">
								title
							</div>
							<div slot="content" class="_content">
								content
							</div>
						</vc-collapse-item>
						<vc-collapse-item class="item">
							<div class="_title">
								title
							</div>
							<div slot="content" class="_content">
								content
							</div>
						</vc-collapse-item>
					</vc-collapse>
				</div>
			`,
			components: {
				'vc-collapse': Collapse,
				'vc-collapse-item': Collapse.Item
			},
			data() {
				return {
					value: '1',
					accordion: true
				};
			}
		});
		let co = vm.$refs.collapse;

		let it1 = co.$children[0].$el.firstChild;
		let it2 = co.$children[1].$el.firstChild;
		let it3 = co.$children[2].$el.firstChild;
		it2.click();
		await wait(0.1);
		expect(co.currentValue.join()).to.equal('2');
		it1.click();
		await wait(0.1);
		expect(co.currentValue.join()).to.equal('1');
		it1.click();
		await wait(0.1);
		expect(co.currentValue.join()).to.equal('');
		it2.click();
		await wait(0.1);
		expect(co.currentValue.join()).to.equal('2');

		vm.value = ['1', '2'];
		await wait(0.1);
		expect(co.currentValue.join()).to.equal('1,2');

		vm.value = undefined;
		await wait(0.1);
		expect(co.currentValue).to.equal(undefined);

		vm.value = ['2'];
		vm.accordion = false;
		await wait(0.1);
		it1.click();
		await wait(0.1);
		expect(co.currentValue.includes('1') && co.currentValue.includes('2')).to.equal(true);

		it2.click();
		await wait(0.1);
		expect(co.currentValue.join()).to.equal('1');

		it3.click();
		await wait(0.1);
		expect(co.currentValue.join()).to.equal('1,2');

		it3.click();
		await wait(0.1);
		expect(co.currentValue.join()).to.equal('1');
	});
});
