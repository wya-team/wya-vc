import Vue from 'vue';
import Message from './message.vue';
import { getOption } from '../utils/index';
import CreatePortal from '../create-portal/index';

const registerOptions = {
	multiple: true,
	promise: false, 
	autoDestroy: false
};

class MessageManager extends CreatePortal.Core {
	constructor(globalOptions, wrapper) { // eslint-disable-line
		super(globalOptions, wrapper);
		// todo
	}

	run(params, opts) {
		let query = ['content', 'duration', 'onClose'];
		let number = Object.keys(this.APIS)
			.filter(item => item.includes(this.globalOptions.cName)).length;
		let options = {
			...opts,
			...getOption(params, query),
			top: 30 + number * 40,
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

	warn(...params) {
		this.run(params, {
			mode: 'warn'
		});
	}

	error(...params) {
		this.run(params, {
			mode: 'error'
		});
	}
}
export default new MessageManager(registerOptions, Message);