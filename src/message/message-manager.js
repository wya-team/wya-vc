import Vue from 'vue';
import Message from './message';
import { getOption } from '../utils/index';
import Portal from '../portal/index';

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
		const query = ['content', 'duration', 'onClose'];
		const number = Object.keys(this.APIS)
			.filter(item => item.includes(this.globalOptions.cName)).length;
		const formatParams = getOption(params, query);
		const top = (formatParams.top || this.wrapper.props.top.default) + number * 40;
		const maxH = window.innerHeight - 100;
		
		const options = {
			...opts,
			...formatParams,
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