import Vue from 'vue';
import Message from './message.vue';
import { VcInstance } from '../vc/index';
import { getUid, getOption } from '../utils/index';

const Dom = document.body;
const basicName = "vc-message";

const Target = {
	init(opts = {}) {
		let cName = `${basicName}-${getUid()}`;
		const div = document.createElement('div');
		const VueComponent = Vue.extend(Message);
		let vm;
		let number = Object.keys(VcInstance.APIS).filter(item => item.includes(basicName)).length;
		vm = new VueComponent({
			el: div,
			propsData: {
				...opts,
				top: 30 + number * 40,
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
		let query = ['content', 'duration', 'onClose'];
		let result = {
			...opts,
			...getOption(params, query),
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
