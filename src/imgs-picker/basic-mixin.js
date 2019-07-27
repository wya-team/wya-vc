/**
 * imgs-picker的核心js
 */
import { Device } from '@wya/utils';
import Message from '../message/index';
import Toast from '../toast/index';
import Extends from '../extends';
import ImgsPreview from '../imgs-preview/index';
import { VcInstance } from '../vc/index';

export default {
	mixins: [...Extends.mixins(['emitter'])],
	model: {
		prop: 'dataSource',
		event: 'change'
	},
	props: {
		tag: {
			type: String,
			default: 'div'
		},
		/**
		 * 图片数据源['xxx.jpg', ....]
		 */
		dataSource: {
			type: Array,
			default() {
				return [];
			},
		},
		/**
		 * 可上传的最大值
		 */
		max: {
			type: Number,
			default: 0
		},
		disabled: {
			type: Boolean,
			default: false
		},
		// 拖拽排序
		sortable: {
			type: Boolean,
			default: false
		},
		/**
		 * vc-upload组件的属性
		 */
		uploadOpts: {
			type: Object,
			default() {
				return {};
			}
		},
		/**
		 * 上传成功后对数据的格式化
		 */
		formatter: Function,
		/**
		 * 盒子className
		 */
		boxClassName: String,
		/**
		 * 图片item  className
		 */
		imgClassName: String,
		/**
		 * upload  className
		 */
		uploadClassName: String,
		imgsPreviewOpts: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			currentValue: [],
			currentUploadOpts: { 
				...this.uploadOpts,
				multiple: this.max > 1,
				max: this.max, // 已max属性为主，及时upload内部设置了max，也会被覆盖
			}
		};
	},
	watch: {
		dataSource: {
			immediate: true,
			handler(newVal) {
				let arr = this.currentValue.length === 0 ? newVal : this.currentValue;
				this.currentValue = arr.map((it) => {
					for (let i = 0; i < newVal.length; i++) {
						if (typeof it === 'string' && newVal[i] === it) {
							return newVal[i];
						}
					}
					return it;
				});
				if (this.uploadOpts.multiple) {
					let max = this.max || 1;
					let canSelectNum = max - this.currentValue.length;
					if (this.currentUploadOpts.max != canSelectNum) {
						this.currentUploadOpts.max = canSelectNum;
					}
				}
			}
		}
	},
	methods: {
		handleFileBefore(file, fileList) {
			return new Promise((resolve) => {
				const { "file-before": fileBefore } = this.$listeners;

				if (!fileBefore) return resolve(file);
				const before = fileBefore(file, fileList);
				if (before && before.then) {
					before.then((processedFile) => {
						resolve(processedFile);
					}).catch(e => {
						reject(e);
					});
				} else {
					resolve(file);
				}
			});
		},
		handleFileStart(res) {
			this.currentValue = [...this.currentValue, res];
			// 开始上传时，最大值 -1
			if (this.currentUploadOpts.multiple) {
				let max = this.currentUploadOpts.max - 1;
				this.currentUploadOpts.max = max >= 0 ? max : 0;
			}
		},
		handleFileProgress(e, file) {
			if (parseInt(e.percent, 10) <= 100) {
				this.currentValue = this.currentValue.map((item) => {
					if (file.uid === item.uid) {
						return {
							...item,
							percent: e.percent
						};
					}
					return item;
				});
			}
		},
		handleFileSuccess(res, file) {
			let dataSource;
			this.currentValue = this.currentValue.map((item) => {
				if (item.uid === file.uid) {
					return this.getUrl(res);
				}
				return item;
			});
			// 将已经上传成功的文件传递给外部
			dataSource = this.currentValue.filter((it) => !it.errorFlag && this.getUrl(res));
			
			this.sync(dataSource);
		},
		handleFileError(res, file) {
			// 内部保存上传失败的文件，不传递给外层
			this.currentValue = this.currentValue.map((item) => {
				if (item.uid === file.uid) {
					return {
						...item,
						...res,
						errorFlag: new Date().getTime()
					};
				}
				return item;
			});
			this.handleError(res);
		},
		handleError(err) {
			let { $listeners: { error } } = this;
			!error && (Device.touch ? Toast.info(err.msg, 2) : Message.error(err.msg, 2));
			this.$emit('error', err);
		},
		handleFileComplete(res) {
			this.$emit('complete', res);
		},
		handleDel(item) {
			// 删除时，最大值加1
			if (this.currentUploadOpts.multiple) {
				this.currentUploadOpts.max = this.currentUploadOpts.max + 1;
			}
			if (item.errorFlag) {
				this.currentValue = this.currentValue.filter(it => it.uid != item.uid);
				return;
			}
			
			this.currentValue = this.currentValue.filter(it => it != item);
			let dataSource = this.currentValue.filter(it => !it.errorFlag);
			this.$emit('change', dataSource);

			// form表单
			this.dispatch('vc-form-item', 'form-change', dataSource);
		},
		handlePreview(e, index) {
			/**
			 * 渐进增强
			 */
			let { enhancer } = VcInstance.config.ImgsPreview || {};

			enhancer = this.imgsPreviewOpts.enhancer || enhancer || (() => false);
			let images = this.getPreviewData().map(item => ({ src: item }));
			enhancer(index, images, this) || this.previewByPS(e, index);
		},
		previewByPS(e, index) {
			let pos = {};
			try {
				const target = e.target; // 先得到pos, 否则getThumbBoundsFn再计划，target已变化（比如弹窗transition的影响）
				const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
				const rect = target.getBoundingClientRect();

				pos = { x: rect.left, y: rect.top + pageYScroll, w: rect.width };

			} catch (e) {
				console.log(e);
			}

			this.$emit('open');
			ImgsPreview.open({
				visible: true,
				dataSource: this.getPreviewData(),
				opts: {
					index,
					history: false,
					getThumbBoundsFn: (index) => pos
				},
				onSure: () => this.$emit('close'),
				onClose: () => this.$emit('close'),
			});
		},
		getUrl(res) {
			return this.formatter 
				? this.formatter(res) 
				: res.data.url;
		},

		// 拿到可预览的图片，供预览组件使用
		getPreviewData() {
			return this.currentValue.filter(it => typeof it === 'string').map((src) => src);
		},

		sync(v) {
			this.$emit('change', v);

			// form表单
			this.dispatch('vc-form-item', 'form-change', v);
		},

		/**
		 * 对外暴露
		 */
		delete(index) {
			this.currentValue[index] && this.handleDel(this.currentValue[index]);
		},

		/**
		 * 增加
		 */
		add(imgs) {
			if (!(imgs instanceof Array)) {
				imgs = [imgs];
			}
			this.currentValue.push(...imgs);

			this.sync(this.currentValue);
		}
	}
};