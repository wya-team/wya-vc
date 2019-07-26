import { Device } from '@wya/utils';
import VcError from './error';

class VcBasic {
	setConfig(options = {}) {
		/**
		 * 共享配置
		 */
		VcBasic.prototype.config = {
			...VcBasic.prototype.config,
			...options
		};
	}
	
	/**
	 * 清理Portals类型组件
	 * @param  {str | array} cName 清理的组件名
	 * @param  {str | array} force 是否强制清理, cName 存在会变为true
	 */
	clear(cName, force = false) {
		try {
			// 清理对象 
			let target = [];
			if (cName) {
				if (typeof cName === 'string') {
					target = [cName];
				} else if (cName instanceof Array && cName.length > 0) {
					target = cName;
				}
				target = target.reduce((pre, cur) => { pre[cur] = ''; return pre; }, {});

				// 清理
				force = true;
			} else {
				target = this.APIS;
			}
			for (let i in target) {
				if (this.APIS[i] && (force === true || this.APIS[i].__AUTO_DESTROY__ === true)) {
					this.APIS[i].$emit('destroy');
					delete this.APIS[i];
				}
			}
		} catch (e) {
			throw new VcError('instance', e);
		}
		return this;
	}

	/**
	 * 清理全部
	 */
	clearAll() {
		try {
			for (let i in this.APIS) {
				if (this.APIS[i]) {
					this.APIS[i].$emit('destroy');
					delete this.APIS[i];
				}
			}
		} catch (e) {
			throw new VcError('instance', e);
		}
		return this;
	}
}

/**
 * 处理全局捕获的事件, 用于计算位置
 */
VcBasic.prototype.globalEvent = {};
document.addEventListener('click', (e) => {
	VcBasic.prototype.globalEvent = e;
	/**
	 * TODO
	 */
	// VcBasic.prototype.listeners.forEach(i => i(e));
}, true);

/**
 * 仅用户共享属性
 */
VcBasic.prototype.APIS = {};

VcBasic.prototype.config = {
	debug: process.env.NODE_ENV === 'development',
	/**
	 * 用于过时的缓存, 如icon的缓存解析
	 */
	version: '1.4.0',
	/**
	 * vuex + vue-router
	 */
	store: undefined,
	router: undefined,
	eventStore: undefined,
	/**
	 * components
	 */
	PGallery: {
		URL_PGALLERY_PATHS_LIST_GET: undefined,
		URL_PGALLERY_PATHS_ITEM_RENAME_POST: undefined,
		URL_PGALLERY_PATHS_ITEM_DEL_POST: undefined,
		URL_PGALLERY_PATHS_ITEM_ADD_POST: undefined,
		URL_PGALLERY_IMGS_LIST_GET: undefined,
		URL_PGALLERY_IMGS_ITEM_DEL_POST: undefined,
		URL_PGALLERY_IMGS_UPLOAD_POST: undefined,
		URL_PGALLERY_IMGS_ITEM_ADD_POST: undefined,
		URL_PGALLERY_IMGS_ITEM_RENAME_POST: undefined,
		URL_PGALLERY_IMGS_ITEM_MOVE_POST: undefined,
	},	
	Upload: {
		IMG_UPLOAD_URL: undefined,
		FILE_UPLOAD_URL: undefined,
		onPostBefore: undefined,
		onPostArter: undefined,
		enhancer: (ctx) => false
	},
	Portal: {
		aliveRegExp: undefined
	},
	Paging: {
		stripe: undefined,
		tableOpts: undefined,
		pageOpts: undefined,
	},
	Icon: {
		urls: []
	},
	ImgsPicker: {
		gallery: undefined
	},
	ImgsPreview: {
		enhancer: (index, images, ctx) => false,
	}
};

export default VcBasic;