import { createVue, createComponent, wait, destroyVM } from '@tests/helper';
import Form from '../index';
import Input from '../../input';

const DELAY = 50;

describe('Form', () => {
	let vm;

	afterEach(() => {
		destroyVM(vm);
	});
	
	it('basic', () => {
		expect(!!Form).to.equal(true);
	});

	it('label width', done => {
		vm = createVue({
			template: `
				<vc-form ref="form" :model="form" :label-width="80">
					<vc-form-item label="活动名称">
						<vc-input v-model="form.name"></vc-input>
					</vc-form-item>
				</vc-form>
			`,
			components: {
				'vc-form': Form,
				'vc-form-item': Form.Item,
				'vc-input': Input
			},
			data() {
				return {
					form: {
						name: ''
					}
				};
			}
		});
		setTimeout(() => {
			expect(vm.$el.querySelector('.vc-form-item__label').style.width).to.equal('80px');
			expect(vm.$el.querySelector('.vc-form-item__wrapper').style.marginLeft).to.equal('80px');
			done();
		}, DELAY);
	});

	it('inline form', done => {
		vm = createVue({
			template: `
				<vc-form ref="form" :model="form" inline>
					<vc-form-item label="活动名称">
						<vc-input v-model="form.name"></vc-input>
					</vc-form-item>
				</vc-form>
			`,
			components: {
				'vc-form': Form,
				'vc-form-item': Form.Item,
				'vc-input': Input
			},
			data() {
				return {
					form: {
						name: ''
					}
				};
			}
		});
		setTimeout(() => {
			expect(vm.$el.querySelector('.is-inline')).to.exist;
			done();
		}, DELAY);
	});

	it('label position', done => {
		vm = createVue({
			template: `
				<vc-form ref="form" :model="form" label-position="top">
					<vc-form-item label="活动名称">
						<vc-input v-model="form.name"></vc-input>
					</vc-form-item>
				</vc-form>
			`,
			components: {
				'vc-form': Form,
				'vc-form-item': Form.Item,
				'vc-input': Input
			},
			data() {
				return {
					form: {
						name: ''
					}
				};
			}
		});
		setTimeout(() => {
			expect(vm.$el.querySelector('.is-top')).to.exist;
			done();
		}, DELAY);
	});

	it('show message', done => {
		vm = createVue({
			template: `
				<vc-form ref="form" :model="form">
					<vc-form-item label="活动名称" prop="name" :show-message="false"
					:rules="{
						required: true,
						message: '请输入活动名称',
						trigger: 'change'
					}">
						<vc-input v-model="form.name"></vc-input>
					</vc-form-item>
				</vc-form>
			`,
			components: {
				'vc-form': Form,
				'vc-form-item': Form.Item,
				'vc-input': Input
			},
			data() {
				return {
					form: {
						name: ''
					}
				};
			}
		});
		setTimeout(() => {
			vm.$refs.form.validate(() => {}).then(() => {

			}).catch((err) => {
				expect(err).to.exist;
				vm.$refs.form.$nextTick(() => {
					expect(vm.$el.querySelector('.vc-form-item__tip')).to.not.exist;
				});
			});
			done();
		}, DELAY);
	});
});