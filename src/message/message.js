import Vue from 'vue';
import Message from './message.vue';
import { VcInstance } from '../vc/index';
import { getUid } from '../utils/index';

const Dom = document.body;
const basicName = "vc-message";

const Target = {
	init(message, duration = 1.5, callback, maskClosable = true, opts = {}) {
		let cName = `${basicName}-${getUid()}`;
		const div = document.createElement('div');
		const VueComponent = Vue.extend(Message);
		let vm;
		let number = Object.keys(VcInstance.APIS).length;
		vm = new VueComponent({
			el: div,
			propsData: {
				...opts,
				message,
				duration: duration == 0 ? 1 * 60 * 60 * 24 : duration,
				maskClosable,
				topValue: 30 + number * 37,
			},
			methods: {
			}
		});

		vm.$on('close', () => {
			vm.$emit('destroy');
			callback && callback();
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
		params[4] = {
			mode: 'info'
		};
		return this.init(...params);
	},
	loading(...params) {
		params[3] = false;
		params[4] = {
			mode: 'loading'
		};
		return this.init(...params);
	},
	success(...params) {
		params[4] = {
			mode: 'success'
		};
		return this.init(...params);
	},
	warn(...params) {
		params[4] = {
			mode: 'warn'
		};
		return this.init(...params);
	},
	error(...params) {
		params[4] = {
			mode: 'error'
		};
		return this.init(...params);
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
