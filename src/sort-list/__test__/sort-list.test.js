import { createVue, createComponent, destroyVM, wait } from '@tests/helper';
import SortList from '..';

describe('SortList', () => {
	it('basic', () => {
		expect(!!SortList).to.equal(true);
	});

	it('drag', async () => {
		let count = 0;
		let vm = createVue({
			template: `
				<vc-sort-list v-model="dataSource">
					<div
						slot-scope="{ it }"
						style="width: 200px;line-height: 5; color: white"
					>
						{{ it.id }}
					</div>
				</vc-sort-list>
			`,
			components: {
				'vc-sort-list': SortList,
			},
			data() {
				return {
					dataSource: Array.from({ length: 5 }, () => ({ id: `${count++}` }))
				};
			},
		});

		let el = document.querySelectorAll('.vc-sort-list__item')[0];
		let el2 = document.querySelectorAll('.vc-sort-list__item')[1];

		let dragstart = new DragEvent('dragstart', {});
		let dragenter = new DragEvent('dragenter', {});
		let dragend = new DragEvent('dragend', {});
		let dragover = new DragEvent('dragover', {});
		Object.defineProperty(dragstart, 'dataTransfer', {
			value: {}
		});
		Object.defineProperty(dragend, 'dataTransfer', {
			value: {}
		});
		dragstart.dataTransfer.setData = v => v;
		dragend.dataTransfer.clearData = v => v;
		el.dispatchEvent(dragstart);
		el2.dispatchEvent(dragenter);
		el2.dispatchEvent(dragover);
		el.dispatchEvent(dragend);

		await wait(0.1);
		expect(vm.dataSource[0].id).to.equal('1');
		expect(vm.dataSource[1].id).to.equal('0');

		destroyVM(vm);
	});

	it('simple-data-drag', async () => {
		let count = 0;
		let vm = createVue({
			template: `
				<div>
					<vc-sort-list v-model="dataSource">
						<div
							slot-scope="{ it , index }"
							style="width: 200px;line-height: 5; color: white"
						>
							{{ it }}
						</div>
					</vc-sort-list>
					<vc-sort-list/>
				</div>
			`,
			components: {
				'vc-sort-list': SortList,
			},
			data() {
				return {
					dataSource: [1, 2, 3, 4, 5]
				};
			},
		});

		let el = document.querySelectorAll('.vc-sort-list__item')[0];
		let el2 = document.querySelectorAll('.vc-sort-list__item')[1];

		let dragstart = new DragEvent('dragstart', {});
		let dragenter = new DragEvent('dragenter', {});
		let dragend = new DragEvent('dragend', {});
		let dragover = new DragEvent('dragover', {});
		Object.defineProperty(dragstart, 'dataTransfer', {
			value: {}
		});
		Object.defineProperty(dragend, 'dataTransfer', {
			value: {}
		});
		dragstart.dataTransfer.setData = v => v;
		dragend.dataTransfer.clearData = v => v;
		el.dispatchEvent(dragstart);
		el2.dispatchEvent(dragenter);
		el2.dispatchEvent(dragenter);
		el2.dispatchEvent(dragover);
		el2.dispatchEvent(dragover);
		el.dispatchEvent(dragend);

		await wait(0.1);
		expect(vm.dataSource[0]).to.equal(2);
		expect(vm.dataSource[1]).to.equal(1);

		destroyVM(vm);
	});

	it('click-sort', async () => {
		let count = 0;
		let vm = createVue({
			template: `
				<vc-sort-list v-model="dataSource">
					<div
						slot-scope="{ it }"
						style="width: 200px;line-height: 5; color: white"
					>
						{{ it.id }}
					</div>
				</vc-sort-list>
			`,
			components: {
				'vc-sort-list': SortList,
			},
			data() {
				return {
					dataSource: Array.from({ length: 5 }, () => ({ id: `${count++}` }))
				};
			},
		});

		let el = document.querySelectorAll('.vc-sort-list__item')[2];
		let left = el.querySelector('.vc-sort-list__mask').firstElementChild;
		let del = el.querySelector('.vc-sort-list__mask').querySelectorAll('span')[1];
		let right = el.querySelector('.vc-sort-list__mask').lastElementChild;
		await wait(0.1);

		left.click();
		expect(vm.dataSource.map(v => v.id).join()).to.equal('0,2,1,3,4');

		await wait(0.1);
		right.click();
		expect(vm.dataSource.map(v => v.id).join()).to.equal('0,1,2,3,4');

		del.click();
		await wait(0.1);
		expect(vm.dataSource.map(v => v.id).join()).to.equal('0,1,3,4');

		destroyVM(vm);
	});
});
