import { createComponent, wait, destroyVM } from "@tests/helper";
import Calendar from '..';

describe('Calendar', () => {
	it('basic', () => {
		expect(typeof Calendar).to.equal("object");

		const vm = createComponent(Calendar, {});
		expect(typeof vm).to.equal("object");
		destroyVM(vm);
	});

	it('month', () => {
		let vm = createComponent(Calendar, {});
		let noMonth = vm.getCurrentInfo(2019, 0);
		expect(noMonth.month).to.equal(12);
		let lastMonth = vm.getCurrentInfo(2019, 12);
		expect(lastMonth.month).to.equal(12);

		let eightMonth = vm.getCurrentInfo(2019, 8);
		expect(eightMonth.month).to.equal(8);
		let errorMonth = vm.getCurrentInfo(2019, 13);
		expect(errorMonth.month).to.equal(1);
		destroyVM(vm);
	});

	it("getweek", () => {
		let vm = createComponent(Calendar, {});
		let week = vm.getWeek(null);
		let day = new Date().getDay();
		expect(week).to.equal(day);
		destroyVM(vm);
	});

	it("prev", async () => {
		let vm = createComponent(Calendar, {});
		vm.prev();
		await wait(0.01);
		vm.currentMonth = 0;
		vm.prev();
		expect(vm.currentMonth).to.equal(11);
		await wait(0.01);
		vm.currentMonth = 7;
		vm.prev();
		expect(vm.currentMonth).to.equal(6);
		await wait(0.01);
		destroyVM(vm);
	});
	it("next", async () => {
		let vm = createComponent(Calendar, {});
		vm.next();
		await wait(0.2);
		vm.currentMonth = 11;
		vm.next();
		expect(vm.currentMonth).to.equal(0);
		await wait(0.2);
		destroyVM(vm);
	});

});
