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
			opts.onClose && opts.onClose();
		});
		
		vm.$on('destroy', () => {
			vm.$destroy();
			// 主动卸载节点
			Dom.removeChild(vm.$el);
			delete VcInstance.APIS[cName];

			vm = null;
		});

		// 不自动销毁
		vm.__AUTO_DESTORY__ = false;

		VcInstance.APIS[cName] = vm;

		document.body.appendChild(vm.$el);

		return vm;
	},
	run(params, opts) {
		let query = ['content', 'duration', 'onClose', 'maskClosable'];
		let result = {
			...opts,
			...getOption(params, query)
		};

		// 执行弹窗
		this.init(result);
	},
	info(...params) {
		this.run(params, {
			mode: 'info'
		});
	},
	loading(...params) {
		this.run(params, {
			mode: 'loading',
			duration: 0,
			maskClosable: false
		});
	},
	success(...params) {
		this.run(params, {
			mode: 'success'
		});
	},
	warn(...params) {
		this.run(params, {
			mode: 'warn'
		});
	},
	error(...params) {
		this.run(params, {
			mode: 'error'
		});
	},
	destory(id) {
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
