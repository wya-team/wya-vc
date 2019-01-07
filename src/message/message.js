import Vue from 'vue';
import Message from './message.vue';
import { VcInstance } from '../vc/index';
import { getUid } from '../utils/index';

const Dom = document.body;
const basicName = "vc-message";

const Target = {
	init(message, opts = {}) {
		let cName = `${basicName}-${getUid()}`;
		const div = document.createElement('div');
		const VueComponent = Vue.extend(Message);
		let vm;
		let number = Object.keys(VcInstance.APIS).filter(item => item.includes(basicName)).length;
		console.log(Object.keys(VcInstance.APIS).filter(item => item.includes(basicName)));
		vm = new VueComponent({
			el: div,
			propsData: {
				...opts,
				message,
				top: 30 + number * 37,
			},
			methods: {
			}
		});

		vm.$on('close', () => {
			vm.$emit('destroy');
			opts.onClose && opts.onClose();
		});
		
		vm.$on('destroy', () => {
			vm.$destroy();
			// 主动卸载节点
			Dom.removeChild(vm.$el);
			delete VcInstance.APIS[cName];
		});

		// 不自动销毁
		vm.__AUTO_DESTORY__ = false;

		VcInstance.APIS[cName] = vm;

		document.body.appendChild(vm.$el);

		return vm;
	},
	info(...params) {
		let newParams = [];
		if (typeof params[0] === 'object') {
			newParams[1] = Object.assign(params[0], params[1]);
		} else {
			newParams[0] = params[0];
			newParams[1] = {
				mode: 'info'
			};
		}
		return this.init(...newParams);
	},
	loading(...params) {
		let newParams = [];
		if (typeof params[0] === 'object') {
			newParams[1] = Object.assign(params[0], params[1]);
		} else {
			newParams[0] = params[0];
			newParams[1] = {
				mode: 'loading'
			};
		}
		return this.init(...newParams);
	},
	success(...params) {
		let newParams = [];
		if (typeof params[0] === 'object') {
			newParams[1] = Object.assign(params[0], params[1]);
		} else {
			newParams[0] = params[0];
			newParams[1] = {
				mode: 'success'
			};
		}
		return this.init(...newParams);
	},
	warn(...params) {
		let newParams = [];
		if (typeof params[0] === 'object') {
			newParams[1] = Object.assign(params[0], params[1]);
		} else {
			newParams[0] = params[0];
			newParams[1] = {
				mode: 'warn'
			};
		}
		return this.init(...newParams);
	},
	error(...params) {
		let newParams = [];
		if (typeof params[0] === 'object') {
			newParams[1] = Object.assign(params[0], params[1]);
		} else {
			newParams[0] = params[0];
			newParams[1] = {
				mode: 'error'
			};
		}
		return this.init(...newParams);
	},
	hide(id) {
		try {
			if (id) {
				let instance = typeof id === 'object' ? id : VcInstance.APIS[id];
				instance && instance.$emit('destory');
			} else {
				Object.keys(VcInstance.APIS).forEach(item => {
					if (item.includes(basicName)) {
						VcInstance.APIS[item] && VcInstance.APIS[item].$emit('destory');
					}
				});
			}
		} catch (e) {
			console.log('vc-message', e);
		}
		
	}
};

export default Target;
