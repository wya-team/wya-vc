import { EventStore } from '@wya/ps';
import VcBasic from './basic';
import VcError from './error';

class Manager extends VcBasic {
	constructor() {
		super();
		this.hasInit = false;
		this.config = {
			/**
			 * vuex + vue-router
			 */
			store: null,
			router: null,
			eventStore: null,
			/**
			 * components
			 */
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
				FILE_UPLOAD_URL: null,
				onPostBefore: null,
				onPostArter: null,
			},
			CreatePortal: {
				aliveRegExp: null
			},
			Paging: {
				stripe: null,
				tableOpts: null,
				pageOpts: null,
			}
		};

		this.initEventStore(new EventStore());
	}

	initEventStore(instance) {
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
			this.config = {
				...this.config,
				...opts
			};

			opts.eventStore && this.initEventStore(opts.eventStore);

			this.hasInit = true;
		} else {
			throw new VcError('instance', '只能初始化一次');
		}
		return this;
	}
}

export default Manager;