import Vue from 'vue';
import Message from './message';
import { getOption } from '../utils/index';
import Portal from '../portal/index';
import { IS_SERVER } from '../utils/constant';

const registerOptions = {
	multiple: true,
	promise: false, 
	autoDestroy: false
};

class MessageManager extends Portal {
	constructor(wrapper, globalOptions) { // eslint-disable-line
		super(wrapper, globalOptions);
	}

	run(params, opts) {
		if (IS_SERVER) return;
		
		let query = ['content', 'duration', 'onClose'];
		let number = Object.keys(this.APIS)
			.filter(item => item.includes(this.globalOptions.cName)).length;
		let top = 30 + number * 40;
		let maxH = window.innerHeight - 100;
		
		let options = {
			...opts,
			...getOption(params, query),
			top: top > maxH ? maxH : top,
		};
		// 执行弹窗
		return this.popup(options);
	}

	info(...params) {
		return this.run(params, {
			mode: 'info'
		});
	}

	loading(...params) {
		return this.run(params, {
			mode: 'loading',
			duration: 0,
			maskClosable: false
		});
	}

	success(...params) {
		return this.run(params, {
			mode: 'success'
		});
	}

	warning(...params) {
		return this.run(params, {
			mode: 'warning'
		});
	}

	error(...params) {
		return this.run(params, {
			mode: 'error'
		});
	}
}
export default new MessageManager(Message, registerOptions);