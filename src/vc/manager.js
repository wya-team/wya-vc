import { EventStore } from '@wya/ps';
import IconManager from '../icon/manager';
import VcBasic from './basic';
import VcError from './error';

class VcManager extends VcBasic {
	constructor() {
		super();
		this.hasInit = false;
		this.setEventStore(new EventStore());
	}

	setEventStore(instance) {
		this.on = instance.on.bind(instance);
		this.off = instance.off.bind(instance);
		this.emit = instance.emit.bind(instance);
		this.once = instance.once.bind(instance);
	}

	/**
	 * 初始化配置全局
	 */
	init(opts = {}) {
		if (!this.hasInit) {
			super.setConfig(opts);
			this.hasInit = true;

			Promise.all(this.config.Icon.urls.map(url => IconManager.load(url)))
				.then(() => {
					// TODO: 解决系统下不同path项目相互清理
					// IconManager.clear();
				})
				.catch((e) => {
					throw new VcError('instance', e);
				});
		} else {
			throw new VcError('instance', '只能初始化一次');
		}
		return this;
	}
}

export default VcManager;