import { createVue, wait } from '@tests/helper';
import Text from '../index';

describe('Tpl', () => {
	it('basic', () => {
		expect(typeof Text).to.equal('object');
		expect(typeof Text.data()).to.equal('object');
	});
	it('line 0', async () => {
		let vm = createVue({
			template: `<div style="inline-block; width: 200px;">
				<vc-text 
				ref="text"
				:value="text" 
				:line="0"
				style="line-height: 16px;" />
			</div>`,
			components: {
				"vc-text": Text
			},
			data() {
				const text = '默认行数5行';
				return {
					text: text.repeat(10),
				};
			},
		});
		await wait(0.5);
		expect(vm.$refs.text.$el).to.exist;
		expect(vm.$refs.text.$el.clientHeight).to.equal(80);
	});
	it('renderRow', async () => {
		let vm = createVue({
			template: `<div style="inline-block; width: 200px;">
				<vc-text 
				ref="text"
				:value="text" 
				:line="0"
				:renderRow="renderRow"
				style="line-height: 16px;" />
			</div>`,
			components: {
				"vc-text": Text
			},
			data() {
				const text = '默认行数5行';
				return {
					text: text.repeat(10),
					renderRow: (h, props, parent) => {
						const { value } = props;
						return h('div', {}, value);
					}
				};
			},
		});
		await wait(0.5);
		expect(vm.$refs.text.$el).to.exist;
		expect(vm.$refs.text.$el.tagName).to.equal('DIV');
		expect(vm.$refs.text.$el.clientHeight).to.equal(80);
	});
	it('line change', async () => {
		let vm = createVue({
			template: `<div style="inline-block; width: 200px;">
				<vc-text 
				ref="text"
				:value="text14" 
				:line="line"
				style="line-height: 16px;" />
			</div>`,
			components: {
				"vc-text": Text
			},
			data() {
				const text = '默认5行';
				return {
					text14: text.repeat(14),
					line: 1
				};
			},
			methods: {
				handleChangeLine(line) {
					this.line = line;
				}
			}
		});
		await wait(0.5);
		expect(vm.$refs.text.$el).to.exist;
		expect(vm.$refs.text.$el.clientHeight).to.equal(16);
		vm.handleChangeLine(2);
		await wait(0.5);
		expect(vm.$refs.text.$el.clientHeight).to.equal(32);
	});
});