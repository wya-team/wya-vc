import Notice from './notice.vue';
import Portal from '../portal/index';

const registerOptions = {
	multiple: true,
	promise: false, 
};

class NoticeManager extends Portal {
	constructor(wrapper, globalOptions) { // eslint-disable-line
		super(wrapper, globalOptions);
	}

	run(config, opts) {
		let number = Object.keys(this.APIS)
			.filter(item => item.includes(this.globalOptions.cName)).length;
		let noticeBox = document.querySelector('.vc-notice');
		if (!noticeBox) {
			let notice = document.createElement('div');
			notice.className = 'vc-notice';
			document.body.appendChild(notice);
		}
		let options = {
			...opts,
			...config,
			el: '.vc-notice',
		};
		// 执行弹窗
		return this.popup(options);
	}

	open(config) {
		return this.run(config);
	}

	info(config) {
		return this.run(config, {
			mode: 'info'
		});
	}

	success(config) {
		return this.run(config, {
			mode: 'success'
		});
	}

	warning(config) {
		return this.run(config, {
			mode: 'warning'
		});
	}

	error(config) {
		return this.run(config, {
			mode: 'error'
		});
	}
}
export default new NoticeManager(Notice, registerOptions);