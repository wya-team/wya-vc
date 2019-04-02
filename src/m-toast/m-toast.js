import Vue from 'vue';
import MToast from './m-toast.vue';
import { getOption } from '../utils/index';
import CreatePortal from '../create-portal/index';

const registerOptions = {
	multiple: true,
	promise: false, 
	autoDestroy: false
};

class MToastManager extends CreatePortal.Core {
	constructor(globalOptions, wrapper) { // eslint-disable-line
		super(globalOptions, wrapper);
		// todo
	}

	run(params, opts) {
		let query = ['content', 'duration', 'onClose', 'maskClosable'];
		let options = {
			...opts,
			...getOption(params, query)
		};

		// 执行弹窗
		return this.popup(options);
	}

	info(...params) {
		this.run(params, {
			mode: 'info'
		});
	}

	loading(...params) {
		this.run(params, {
			mode: 'loading',
			duration: 0,
			maskClosable: false
		});
	}

	success(...params) {
		this.run(params, {
			mode: 'success'
		});
	}

	warning(...params) {
		this.run(params, {
			mode: 'warning'
		});
	}

	error(...params) {
		this.run(params, {
			mode: 'error'
		});
	}
}
export default new MToastManager(registerOptions, MToast);
