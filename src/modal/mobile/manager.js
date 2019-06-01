import Vue from 'vue';
import Modal from './modal.vue';
import { getOption } from '../../utils/index';
import CreatePortal from '../../create-portal/index';

const registerOptions = {
	multiple: true,
	promise: false 
};

class ModalManager extends CreatePortal.Core {
	allowMethod = ['alert', 'operation']
	constructor(globalOptions, wrapper) { // eslint-disable-line
		super(globalOptions, wrapper);

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
export default new ModalManager(registerOptions, Modal);