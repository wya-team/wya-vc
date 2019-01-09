import Vue from 'vue';
import MToast from './m-toast.vue';
import { VcInstance } from '../vc/index';
import { getUid, getOption } from '../utils/index';

const Dom = document.body;
const basicName = "vcm-toast";

const Target = {
	init(opts = {}) {

		let cName = `${basicName}-${getUid()}`;

		const div = document.createElement('div');
		const VueComponent = Vue.extend(MToast);
		let vm;
		vm = new VueComponent({
			el: div,
			propsData: {
				...opts
			},
			methods: {
			}
		});

		vm.$on('close', () => {
			vm.$emit('destroy');
			opts.callback && opts.callback();
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
	getParams(params, type) {
		let query = {
			0: 'message',
			1: 'duration',
			2: 'callback',
			3: 'maskClosable'
		};
		params = getOption(params, query);
		params.mode = type;
		return this.init(params);
	},
	info(...params) {
		this.getParams(params, 'info');
	},
	loading(...params) {
		params.maskClosable = false;
		this.getParams(params, 'loading');
	},
	success(...params) {
		this.getParams(params, 'success');
	},
	warn(...params) {
		this.getParams(params, 'warn');
	},
	error(...params) {
		this.getParams(params, 'error');
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
			console.log('vcm-toast', e);
		}
		
	}
};

export default Target;
