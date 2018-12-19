import Vue from 'vue';
import MToast from './m-toast.vue';
import { VcInstance } from '../vc/index';
import { getUid } from '../utils/index';

const Dom = document.body;
const basicName = "vcm-toast";

const Target = {
	vm: [],
	init(message, duration = 3, callback, maskClosable = true, opts = {}) {

		let cName = `${basicName}-${getUid()}`;

		const div = document.createElement('div');
		const VueComponent = Vue.extend(MToast);
		let vm;
		vm = new VueComponent({
			el: div,
			propsData: {
				...opts,
				message,
				duration: duration == 0 ? 1 * 60 * 60 * 24 : duration,
				maskClosable
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
			if (id && VcInstance.APIS[id]) {
				VcInstance.APIS[id];
			} else {
				Object.keys(VcInstance.APIS).forEach(item => {
					if (item.includes(basicName)) {
						VcInstance.APIS[item] && VcInstance.APIS[item].$emit('destory');
					}
				});
			}
		} catch (e) {
			console.log('vcm-toast', e);
		}
		
	}
};

export default Target;
