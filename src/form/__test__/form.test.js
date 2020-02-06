import { createVue, createComponent, wait, destroyVM } from '@tests/helper';
import Form from '../index';
import Input from '../../input';
import Textarea from '../../textarea';
import Select from '../../select';
import Option from '../../option';
import DatePicker from '../../date-picker';
import Checkbox from '../../checkbox';
import Radio from '../../radio';

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
					<vc-form-item label="活动名称" >
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

	it('form item label width', done => {
		vm = createVue({
			template: `
				<vc-form ref="form" :model="form">
					<vc-form-item label="活动名称" :label-width="80">
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
						trigger: 'blur'
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

	it('reset field', done => {
		vm = createVue({
			template: `
				<vc-form ref="form" :model="form" :rules="rules">
					<vc-form-item label="活动名称" prop="name">
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
					},
					rules: {
						name: [
						  { required: true, message: '请输入活动名称', trigger: 'blur' }
						],
					}
				};
			},
			methods: {
				setValue() {
					this.form.name = 'name';
				}
			}
		});

		vm.setValue();
		vm.$refs.form.resetFields();
		setTimeout(() => {
			expect(vm.form.name).to.equal('');
			done();
		}, DELAY);
	});

	it('input', done => {
		vm = createVue({
			template: `
				<vc-form ref="form" :model="form" :rules="rules">
					<vc-form-item label="活动名称" prop="name" ref="field">
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
					},
					rules: {
						name: [{
							required: true, message: '请输入活动名称', trigger: 'change', min: 3, max: 6 
						}]
					}
				};
			},
			methods: {
				setValue(value) {
					this.form.name = value;
				}
			}
		});
		let field = vm.$refs.field;
		vm.$refs.form.validate();
		setTimeout(() => {
			expect(field.validateMessage).to.equal('请输入活动名称');
			vm.setValue('name');
			vm.$refs.form.$nextTick(() => {
				expect(field.validateMessage).to.equal('');
				done();
			});
		}, DELAY);
	});
	
	it('textarea', done => {
		vm = createVue({
			template: `
				<vc-form ref="form" :model="form" :rules="rules">
					<vc-form-item label="活动名称" prop="name" ref="field">
						<vc-textarea v-model="form.name" />
					</vc-form-item>
				</vc-form>
			`,
			components: {
				'vc-form': Form,
				'vc-form-item': Form.Item,
				'vc-textarea': Textarea
			},
			data() {
				return {
					form: {
						name: ''
					},
					rules: {
						name: [{
							required: true, message: '请输入活动名称', trigger: 'change', min: 3, max: 6 
						}]
					}
				};
			},
			methods: {
				setValue(value) {
					this.form.name = value;
				}
			}
		});
		let field = vm.$refs.field;
		vm.$refs.form.validate();
		setTimeout(() => {
			expect(field.validateMessage).to.equal('请输入活动名称');
			vm.setValue('name');
			vm.$refs.form.validate();
			setTimeout(() => {
				expect(field.validateMessage).to.equal('');
				done();
			}, DELAY);
		}, DELAY);
	});

	it('selector', done => {
		vm = createVue({
			template: `
				<vc-form ref="form" :model="form" :rules="rules">
					<vc-form-item label="地区" prop="region" ref="field">
						<vc-select v-model="form.region">
							<vc-option value="shanghai">上海</vc-option>
							<vc-option value="beijing">北京</vc-option>
						</vc-select>
					</vc-form-item>
				</vc-form>
			`,
			components: {
				'vc-form': Form,
				'vc-form-item': Form.Item,
				'vc-select': Select,
				'vc-option': Option,
			},
			data() {
				return {
					form: {
						region: ''
					},
					rules: {
						region: [{
							required: true, message: '请选择活动区域', trigger: 'change'
						}]
					}
				};
			},
		});
		let field = vm.$refs.field;
		vm.$refs.form.validate();
		setTimeout(() => {
			expect(field.validateMessage).to.equal('请选择活动区域');
			vm.$refs.form.validate();
			vm.form.region = 'shanghai';
			vm.$refs.form.validate();
			setTimeout(() => {
				expect(field.validateMessage).to.equal('');
				done();
			}, DELAY);
		}, DELAY);
	});

	it('datepicker', done => {
		vm = createVue({
			template: `
				<vc-form ref="form" :model="form" :rules="rules">
					<vc-form-item label="date" prop="date" ref="field">
						<vc-date-picker 
							v-model="form.date"
							type="datetime" 
						/>
					</vc-form-item>
				</vc-form>
			`,
			components: {
				'vc-form': Form,
				'vc-form-item': Form.Item,
				'vc-date-picker': DatePicker,
			},
			data() {
				return {
					form: {
						date: ''
					},
					rules: {
						date: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }]
					}
				};
			},
		});
		let field = vm.$refs.field;
		vm.$refs.form.validate();
		setTimeout(() => {
			expect(field.validateMessage).to.equal('请选择日期');
			vm.form.date = new Date();
			vm.$refs.form.validate();
			setTimeout(() => {
				expect(field.validateMessage).to.equal('');
				done();
			}, DELAY);
		}, DELAY);
	});

	it('checkbox', done => {
		vm = createVue({
			template: `
				<vc-form ref="form" :model="form" :rules="rules">
					<vc-form-item label="checkbox" prop="checkbox" ref="field">
						<vc-checkbox v-model="form.checkbox" label="香蕉" />
					</vc-form-item>
				</vc-form>
			`,
			components: {
				'vc-form': Form,
				'vc-form-item': Form.Item,
				'vc-checkbox': Checkbox,
			},
			data() {
				return {
					form: {
						checkbox: true
					},
					rules: {
						checkbox: [{
							validator: (rule, value, callback) => {
								value ? callback() : callback(new Error('您需要勾选香蕉'));
							},
							trigger: 'change'
						}]
					}
				};
			},
		});
		let field = vm.$refs.field;
		vm.form.checkbox = false;
		vm.$refs.form.validate();
		setTimeout(() => {
			expect(field.validateMessage).to.equal('您需要勾选香蕉');
			vm.form.checkbox = true;
			vm.$refs.form.validate();
			setTimeout(() => {
				expect(field.validateMessage).to.equal('');
				done();
			}, DELAY);
		}, DELAY);
	});

	it('checkbox group', done => {
		vm = createVue({
			template: `
				<vc-form ref="form" :model="form" :rules="rules">
					<vc-form-item label="水果" prop="checkbox" ref="field">
						<vc-checkbox-group v-model="form.checkbox">
							<vc-checkbox label="香蕉" />
							<vc-checkbox label="苹果" />
							<vc-checkbox label="西瓜" />
						</vc-checkbox-group>
					</vc-form-item>
				</vc-form>
			`,
			components: {
				'vc-form': Form,
				'vc-form-item': Form.Item,
				'vc-checkbox': Checkbox,
				'vc-checkbox-group': Checkbox.Group,
			},
			data() {
				return {
					form: {
						checkbox: []
					},
					rules: {
						checkbox: [
							{ type: 'array', required: true, message: '您需要勾选水果', trigger: 'change' }
						]
					}
				};
			},
		});

		let field = vm.$refs.field;
		vm.$refs.form.validate();
		setTimeout(() => {
			expect(field.validateMessage).to.equal('您需要勾选水果');
			vm.form.checkbox = ['香蕉'];
			vm.$refs.form.validate();
			setTimeout(() => {
				expect(field.validateMessage).to.equal('');
				done();
			}, DELAY);
		}, DELAY);
	});

	it('radio group', done => {
		vm = createVue({
			template: `
				<vc-form ref="form" :model="form" :rules="rules">
					<vc-form-item label="动物" prop="radio" ref="field">
						<vc-radio-group v-model="form.radio">
							<vc-radio label="金斑蝶" />
							<vc-radio label="爪哇犀牛" />
							<vc-radio label="印度黑羚" />
						</vc-radio-group>
					</vc-form-item>
				</vc-form>
			`,
			components: {
				'vc-form': Form,
				'vc-form-item': Form.Item,
				'vc-radio-group': Radio.Group,
				'vc-radio': Radio,
			},
			data() {
				return {
					form: {
						radio: ''
					},
					rules: {
						radio: [
							{ required: true, message: '您需要勾选动物', trigger: 'change' }
						]
					}
				};
			},
		});

		let field = vm.$refs.field;
		vm.$refs.form.validate();
		setTimeout(() => {
			expect(field.validateMessage).to.equal('您需要勾选动物');
			vm.form.radio = '金斑蝶';
			vm.$refs.form.validate();
			setTimeout(() => {
				expect(field.validateMessage).to.equal('');
				done();
			}, DELAY);
		}, DELAY);
	});

	it('validate field', done => {
		vm = createVue({
			template: `
				<vc-form ref="form" :model="form" :rules="rules">
					<vc-form-item label="活动名称" prop="name" ref="field">
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
					},
					rules: {
						name: [{
							required: true, message: '请输入活动名称', trigger: 'change', min: 3, max: 6 
						}]
					}
				};
			},
			methods: {
				setValue(value) {
					this.form.name = value;
				}
			}
		});
		let field = vm.$refs.field;
		vm.$refs.form.validateField('name').then().catch(err => {
			expect(err).to.equal('请输入活动名称');
		});
		
		done();
	});

	it('custom validate', done => {
		let checkName = (rule, value, callback) => {
			if (value.length < 5) {
				callback(new Error('长度至少为5'));
			} else {
				callback();
			}
		};
		vm = createVue({
			template: `
				<vc-form ref="form" :model="form" :rules="rules">
					<vc-form-item label="活动名称" prop="name" ref="field">
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
					},
					rules: {
						name: [{
							validator: checkName, trigger: 'change' 
						}]
					}
				};
			},
			methods: {
				setValue(value) {
					this.form.name = value;
				}
			}
		});
		let field = vm.$refs.field;
		vm.$refs.form.validate();
		setTimeout(() => {
			expect(field.validateMessage).to.equal('长度至少为5');
			vm.setValue('我大于长度5');
			vm.$refs.form.validate();
			setTimeout(() => {
				expect(field.validateMessage).to.equal('');
				done();
			}, DELAY);
		}, DELAY);
	});

	it('error', done => {
		vm = createVue({
			template: `
				<vc-form ref="form" :model="form" :rules="rules">
					<vc-form-item label="活动名称" prop="name" :error="error" ref="field">
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
					error: 'error',
					form: {
						name: 'name存在'
					},
					rules: {
						name: [
							{ required: true, message: '请输入活动名称', trigger: 'change', min: 3, max: 6 }
						]
					}
				};
			},
			methods: {
				setValue(value) {
					this.form.name = value;
				}
			}
		});
		let field = vm.$refs.field;
		vm.$refs.form.validate();
		vm.error = '输入不合法';
		setTimeout(() => {
			expect(field.validateState).to.equal('error');
			expect(field.validateMessage).to.equal('输入不合法');
			done();
		}, DELAY);
	});

	it('invalid fields', done => {
		let checkName = (rule, value, callback) => {
			if (value.length < 5) {
				callback(new Error('长度至少为5'));
			} else {
				callback();
			}
		};
		vm = createVue({
			template: `
				<vc-form ref="form" :model="form" :rules="rules">
					<vc-form-item label="活动名称" prop="name" ref="field">
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
					},
					rules: {
						name: [{
							validator: checkName, trigger: 'change' 
						}]
					}
				};
			},
			methods: {
				setValue(value) {
					this.form.name = value;
				}
			}
		});
		let field = vm.$refs.field;
		vm.$refs.form.validate();
		setTimeout(() => {
			expect(field.validateMessage).to.equal('长度至少为5');
			vm.setValue('我大于长度5');
			vm.$refs.form.validate();
			setTimeout(() => {
				expect(field.validateMessage).to.equal('');
				done();
			}, DELAY);
		}, DELAY);
	});
});
