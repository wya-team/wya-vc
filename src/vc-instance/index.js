class RcInstance {
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
			UpLoad: {
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
		
	}

	/**
	 * 清理Portals类型组件
	 */
	clean() {
		try {
			// ..
		} catch (e) {
			// 
		}
		
	}
}

export default new RcInstance();
