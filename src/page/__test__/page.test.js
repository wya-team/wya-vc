import {
	createVue,
	createComponent,
	triggerEvent,
	triggerKeyDown,
	wait,
	triggerKeyUp
} from "@tests/helper";
import Page from '../index';

describe('Page', () => {
	it('basic', () => {
		expect(typeof Page).to.equal('object');

		const vm = createComponent(Page, {});
		expect(typeof vm).to.equal('object');
	});
	it('pageSizeOpts', () => {
		const vm = createComponent(Page, {
			pageSizeOpts: [10, 20]
		});

		expect(typeof vm.$el.getAttribute('page-size-opts')).to.equal('object');
	});

	it("count", async () => {
		let vm = createVue({
			template: `
				<vc-page
					ref="target"
					:current="current"
					:count="count"
					show-count
				/>
			`,
			data() {
				return {
					current: 3,
					count: 100,
				};
			},
			components: {
				"vc-page": Page
			},
			mounted() {
				setTimeout(() => {
					this.count = 18;
				}, 150);
			}
		});
		await wait(0.2);
		let page = vm.$refs.target;
		expect(page.$el.querySelector(".vc-page__item.is-active"))
			.to.property("title")
			.to.equal('2');
	});

	it("count change ", async () => {
		let vm = createVue({
			template: `
				<vc-page
					ref="target"
					:current="current"
					:count="count"
					:page-size="20"
					show-count
				/>
			`,
			data() {
				return {
					current: 2,
					count: 30
				};
			},
			components: {
				"vc-page": Page
			},

		});
		await wait(0.01);
		vm.count = 0;
		await wait(0.02);
		let page = vm.$refs.target;
		expect(page.$el.querySelector(".vc-page__item.is-active"))
			.to.property("title")
			.to.equal("1");

		await wait(0.03);
		vm.count = 100;
		expect(page.$el.querySelector(".vc-page__item.is-active"))
			.to.property("title")
			.to.equal("1");
	});

	it("event: prev and next click", () => {
		let vm = createVue({
			template: `
				<vc-page
					ref="target"
					:current.sync="current"
					:count="100"
					:total="10"
					show-count
					show-elevator
					show-sizer
				/>
			`,
			data() {
				return {
					current: 3
				};
			},
			components: {
				"vc-page": Page
			},
		});
		const prev = vm.$el.querySelector(
			"[title = 'prev']"
		);
		const next = vm.$el.querySelector(
			"[title = 'next']"
		);
		prev.click();
		expect(vm.current).to.equal(2);
		next.click();
		expect(vm.current).to.equal(3);
	});
	it("event: prev to first and next to end ", () => {
		let vm = createVue({
			template: `
				<vc-page
					ref="target"
					:current.sync="current"
					:count="20"
					:total="2"
					show-count
					show-elevator
					show-sizer
				/>
			`,
			data() {
				return {
					current: 1
				};
			},
			components: {
				"vc-page": Page
			},
		});
		const prev = vm.$el.querySelector("[title = 'prev']");
		const next = vm.$el.querySelector("[title = 'next']");
		prev.click();
		expect(vm.current).to.equal(1);
		next.click();
		next.click();
		next.click();
		expect(vm.current).to.equal(2);
	});
	it("event: fast prev and next click", () => {
		let vm = createVue({
			template: `
				<vc-page
					ref="target"
					:current.sync="current"
					:count="200"
					:total="10"
					show-count
					show-elevator
					show-sizer
				/>
			`,
			data() {
				return {
					current: 6
				};
			},
			components: {
				"vc-page": Page
			},
		});
		const fastPrev = vm.$el.querySelector("[title = '向前 5 页']");
		const fastNext = vm.$el.querySelector("[title = '向后 5 页']");
		fastPrev.click();
		expect(vm.current).to.equal(1);
		fastNext.click();
		expect(vm.current).to.equal(6);
	});
	it("event: fast prev and next click", () => {
		let vm = createVue({
			template: `
				<vc-page
					ref="target"
					:current.sync="current"
					:count="200"
					:total="10"
					show-count
					show-elevator
					show-sizer
				/>
			`,
			data() {
				return {
					current: 6
				};
			},
			components: {
				"vc-page": Page
			}
		});
		const fastPrev = vm.$el.querySelector("[title = '向前 5 页']");
		const fastNext = vm.$el.querySelector("[title = '向后 5 页']");
		fastPrev.click();
		expect(vm.current).to.equal(1);
		fastNext.click();
		expect(vm.current).to.equal(6);
	});
	it("event: fast prev to first and next to end", () => {
		let vm = createVue({
			template: `
				<vc-page
					ref="target"
					:current.sync="current"
					:count="120"
					:total="10"
					show-count
					show-elevator
					show-sizer
				/>
			`,
			data() {
				return {
					current: 6,
					currentPage: 0
				};
			},
			components: {
				"vc-page": Page
			}
		});
		const fastPrev = vm.$el.querySelector("[title = '向前 5 页']");
		const fastNext = vm.$el.querySelector("[title = '向后 5 页']");
		fastPrev.click();
		fastPrev.click();
		expect(vm.current).to.equal(1);
		fastNext.click();
		fastNext.click();
		fastNext.click();
		expect(vm.current).to.equal(12);
	});
	it("event: input and enter", async () => {
		let vm = createVue({
			template: `
				<vc-page
					ref="target"
					:current.sync="current"
					:count="20"
					show-elevator
				/>
			`,
			data() {
				return {
					current: 1,
				};
			},
			components: {
				"vc-page": Page
			}
		});
		let inputer = vm.$el.querySelector('input');
		inputer.value = '2';
		triggerEvent(inputer, "input");
		expect(inputer.value).to.equal('2');
		await wait(0.05);
		let page = vm.$refs.target;
		inputer.value = '4';
		triggerEvent(inputer, "input");
		expect(inputer.value).to.equal('4');
		await wait(0.05);
		inputer.focus();
		inputer.value = '1';
		triggerKeyUp(inputer, 13);
		expect(inputer.value).to.equal('1');

	});

	it("change page size", async () => {
		let count = 0;
		let vm = createVue({
			template: `
				<vc-page
					ref="target"
					:current.sync="current"
					:count="22"
					:page-size="pageSize"
					show-count
					show-sizer
					@page-size-change="handleChangePageSize"
				/>
			`,
			data() {
				return {
					current: 2,
					pageSize: 10
				};
			},
			components: {
				"vc-page": Page
			},
			methods: {
				handleChangePageSize() {
					count++;
				}
			}
		});
		expect(count).to.equal(0);
		let page = vm.$refs.target;
		let parent = vm.$el.parentNode;

		vm.$el.querySelector(".vc-select").click();
		await wait(0.3);
		parent.querySelectorAll(".vc-select-option")[1].click();
		expect(count).to.equal(1);
		await wait(0.3);
		vm.$el.querySelector(".vc-select").click();
		await wait(0.3);
		parent.querySelectorAll(".vc-select-option")[2].click();
		page.currentPage = 2;
		expect(count).to.equal(2);
	});

	it("force change pageSize", async () => {
		let vm = createVue({
			template: `
				<vc-page
					ref="target"
					:current.sync="current"
					:count="18"
					show-sizer
				/>
			`,
			data() {
				return {
					current: 2
				};
			},
			components: {
				"vc-page": Page
			}
		});

		let parent = vm.$el.parentNode;
		vm.$el.querySelector(".vc-select").click();
		await wait(1);
		parent.querySelectorAll(".vc-select-option")[1].click();
		await wait(2);
		let page = vm.$refs.target;
		expect(page.currentPage).to.equal(1);
	});
});
