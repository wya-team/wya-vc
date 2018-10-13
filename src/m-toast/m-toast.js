import Vue from 'vue';
import MToast from './m-toast.vue';
import { VcInstance } from '../vc/index';

const Dom = document.body;
const cName = "MToast";

const Target = {
	info(message, duration = 3, onCallback, showClose = true, opts = {}) {

		VcInstance.APIS[cName] && VcInstance.APIS[cName].$emit('close');

		const div = document.createElement('div');
		const VueComponent = Vue.extend(MToast);
		let vm;
		vm = new VueComponent({
			el: div,
			propsData: {
				...opts,
				message,
				duration: duration == 0 ? 1 * 60 * 60 * 24 : duration,
				showClose
			},
			methods: {
			}
		});

		vm.$on('callback', () => {
			onCallback && onCallback();
		});
		
		vm.$on('close', () => {
			vm.$destroy();
			// 主动卸载节点
			Dom.removeChild(vm.$el);
			delete VcInstance.APIS[cName];
		});

		VcInstance.APIS[cName] = vm;

		document.body.appendChild(vm.$el);

		return vm;
	}
};

export default Target;
