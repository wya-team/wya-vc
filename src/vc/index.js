class Vc {
	constructor() {
		this.hasInit = false;
		this.APIS = {};
		this.config = {
			PGallery: {
				URL_PGALLERY_PATHS_LIST_GET: null,
				URL_PGALLERY_PATHS_ITEM_RENAME_POST: null,
				URL_PGALLERY_PATHS_ITEM_DEL_POST: null,
				URL_PGALLERY_PATHS_ITEM_ADD_POST: null,
				URL_PGALLERY_IMGS_LIST_GET: null,
				URL_PGALLERY_IMGS_ITEM_DEL_POST: null,
				URL_PGALLERY_IMGS_UPLOAD_POST: null,
				URL_PGALLERY_IMGS_ITEM_ADD_POST: null,
				URL_PGALLERY_IMGS_ITEM_RENAME_POST: null,
				URL_PGALLERY_IMGS_ITEM_MOVE_POST: null,
			},	
			Upload: {
				IMG_UPLOAD_URL: null,
				FILE_UPLOAD_URL: null
			}
		};
	}

	/**
	 * 初始化配置全局
	 */
	init(opts = {}) {
		if (!this.hasInit) {
			this.config = {
				...this.config,
				...opts
			};
			this.hasInit = true;
		} else {
			console.error('只能初始化一次');
		}
		return this;
	}

	/**
	 * 清理Portals类型组件
	 * @param  {str | array} cName 清理的组件名
	 * @param  {str | array} force 是否强制清理, cName 存在会变为true
	 */
	clean(cName, force = false) {
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
				if (this.APIS[i] && (force === true || this.APIS[i].__AUTO_DESTORY__ === true)) {
					this.APIS[i].$emit('destory');
					delete this.APIS[i];
				}
			}
		} catch (e) {
			console.log(`[vc-instance]: ${e}`);
		}
		return this;
	}

	/**
	 * 清理全部
	 */
	cleanAll() {
		try {
			for (let i in this.APIS) {
				if (this.APIS[i]) {
					this.APIS[i].$emit('destory');
					delete this.APIS[i];
				}
			}
		} catch (e) {
			console.log(`[vc-instance]: ${e}`);
		}
		return this;
	}
}
/**
 * 组件内部调用
 */
export const VcInstance = new Vc();

/**
 * 注册使用
 */
export default {
	install(Vue, opts = {}) {
		Vue.prototype.$vc = VcInstance.init(opts);
	},
	instance: VcInstance
};

