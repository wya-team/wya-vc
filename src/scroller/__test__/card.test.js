import { createComponent, destroyVM, wait } from "@tests/helper";
import Card from '../index';

describe('Card', () => {

	it("basic", () => {
		expect(typeof Card).to.equal("object");

		const vm = createComponent(Card, {});
		expect(typeof vm).to.equal("object");

		destroyVM(vm);
	});

	it("border", () => {
		const vm = createComponent(Card, {
			border: true
		});

		expect(vm.$el.classList.contains("is-border")).to.equal(true);

		destroyVM(vm);
	});

	it("shadow", () => {
		const vm = createComponent(Card, {
			shadow: true
		});
		expect(vm.$el.classList.contains("is-shadow")).to.equal(true);

		destroyVM(vm);
	});

	it("padding", () => {
		const vm = createComponent(Card, {
			padding: 10
		});
		const el = vm.$el.querySelector('.vc-card__body');
		expect(el.style.padding).to.equal('10px');

		destroyVM(vm);
	});

	it("title", () => {
		const vm = createComponent(Card, {
			title: '标题'
		});
		const el = vm.$el.querySelector('.vc-card__header');
		expect(el).to.exist;
		expect(el.innerText).to.equal('标题');
		destroyVM(vm);
	});

	it('icon', () => {
		const vm = createComponent(Card, {
			title: '标题',
			icon: 'success'
		});
		const el = vm.$el.querySelector('.vc-icon');
		expect(el).to.exist;
		destroyVM(vm);
	});
});
