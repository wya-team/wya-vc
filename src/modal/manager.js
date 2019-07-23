import Vue from 'vue';
import Modal from './modal.vue';
import { getOption } from '../utils/index';
import Portal from '../portal/index';

const registerOptions = {
	multiple: true,
	promise: false
};

class ModalManager extends Portal {
	allowMethod = ['info', 'success', 'error', 'warning']
	constructor(wrapper, globalOptions) { // eslint-disable-line
		super(wrapper, globalOptions);

		this.allowMethod.forEach(mode => {
			this[mode] = (opts = {}) => {
				let vm = this.run({ 
					...opts, 
					onSure: opts.onClose,
					confirm: true,
					mode, 
				});
				vm.visible = true;
				
				return vm;
			};
		});
	}

	run(options) {
		// TODO: 其他
		// 执行弹窗
		return this.popup(options);
	}
}
export default new ModalManager(Modal, registerOptions);