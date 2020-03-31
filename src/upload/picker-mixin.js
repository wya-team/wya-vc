/**
 * imgs-picker的核心js
 */
import { Device } from '@wya/utils';
import Message from '../message/index';
import Toast from '../toast/index';
import Extends from '../extends';
import ImgsPreview from '../imgs-preview/index';
import { VideoPreview } from './video-preview';
import { VcInstance } from '../vc/index';
import { attrAccept, recognizer } from './utils';

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
			type: [Number, Object],
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
		// 是否显示缩略图
		thumbnail: {
			type: Boolean,
			default: true
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
		videoClassName: String,
		fileClassName: String,
		/**
		 * upload  className
		 */
		uploadClassName: String,
		imgsPreviewOpts: {
			type: Object,
			default: () => ({})
		},
		urlKey: {
			type: String,
			default: 'url'
		}
	},
	data() {
		return {
			isMobile: Device.touch,
			currentValue: [],
			currentUploadOpts: { 
				...this.uploadOpts,
				// multiple: this.max > 1,
				// max: this.max, // 已max属性为主，及时upload内部设置了max，也会被覆盖
			}
		};
	},
	computed: {
		dynamicMax() {
			if (typeof this.max === 'number') {
				return this.max - this.currentValue.length;
			} else if (typeof this.max === 'object') {
				const { image, video, file } = this.max;
				let imageCount = 0;
				let videoCount = 0;
				let fileCount = 0;
				this.currentValue.forEach(it => {
					if (typeof it === 'string') {
						switch (this.recognizer(it, recognizer)) {
							case 'image':
								imageCount++;
								break;
							case 'video':
								videoCount++;
								break;
							case 'file':
								fileCount++;
								break;
						}
					} else {
						const type = this.recognizer(it.name || it.title, recognizer);
						if (type === 'image') {
							imageCount++;
						} else if (type === 'video') {
							videoCount++;
						} else {
							fileCount++;
						}
					}
				});
				const max = {};
				image && (max.image = image - imageCount);
				video && (max.video = video - videoCount);
				file && (max.file = file - fileCount);
				return max;
			}
		},
		dynamicAccept() {
			if (typeof this.max === 'number' || !this.accept) return this.accept;

			const { image, video, file } = this.dynamicMax;
			let tempAccept = this.accept.replace(/\s/g, '').split(',');
			if (typeof image !== 'undefined' && image <= 0) {
				tempAccept = tempAccept.filter(it => !(/image\//.test(it)));
			}
			if (typeof video !== 'undefined' && video <= 0) {
				tempAccept = tempAccept.filter(it => !(/video\//.test(it)));
			}
			if (typeof file !== 'undefined' && file <= 0) {
				tempAccept = tempAccept.filter(it => (/(image|video)\//.test(it)));
			}
			return tempAccept.join();
		},
		multiple() {
			return Object.values(this.dynamicMax).reduce((pre, cur) => pre + cur) > 1;
		}
	},
	watch: {
		dataSource: {
			immediate: true,
			handler(newVal) {
				let arr = this.currentValue.length === 0 || newVal.length === 0 ? newVal : this.currentValue;
				this.currentValue = arr.map((it) => {
					for (let i = 0; i < newVal.length; i++) {
						if (
							typeof newVal[i].uid !== 'undefined' 
							&& typeof it.uid !== 'undefined'
							&& newVal[i].uid === it.uid
						) {
							return newVal[i];
						}
					}
					return it;
				});
			}
		}
	},
	methods: {
		recognizer(url) {
			const fn = VcInstance.config.Upload.recognizer || recognizer;
			return fn(url, recognizer);
		},
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
			res.title = res.name;
			this.currentValue = [...this.currentValue, res];
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
					// 图片、视频
					if (attrAccept(file, 'image/*,video/*')) {
						return this.getUrl(res);
					} else { // 其他文件
						let result = { ...item, ...res.data };
						return this.formatter ? this.formatter(result) : result;
					}
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
						name: file.name,
						type: file.type,
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
		handleDel(index) {
			const item = this.currentValue[index];
			if (item.errorFlag) {
				this.currentValue = this.currentValue.filter(it => it.uid != item.uid);
				return;
			}
			
			this.currentValue.splice(index, 1);
			let dataSource = this.currentValue.filter(it => !it.errorFlag);
			this.sync(dataSource);
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
			return this.formatter ? this.formatter(res) : res.data[this.urlKey];
		},

		// 拿到可预览的图片，供预览组件使用
		getPreviewData() {
			return this.currentValue
				.filter(it => typeof it === 'string' && this.recognizer(it) === 'image')
				.map((src) => src);
		},

		handleVideoPreview(it) {
			VideoPreview.popup({
				dataSource: [it]
			});
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
			this.handleDel(index);
		},

		/**
		 * 增加
		 */
		add(source) {
			if (!(source instanceof Array)) {
				source = [source];
			}
			source = source.filter(it => !!it);
			
			if (source.length) {
				this.currentValue.push(...source);
				this.sync(this.currentValue);
			}
		},
		/**
		 * 重置value
		 */
		reset(source = []) {
			if (!(source instanceof Array)) {
				throw Error('【vc-upload-picker】: reset参数要为字符串数组');
			}
			this.currentValue = [...source];
			// form表单
			this.dispatch('vc-form-item', 'form-change', this.currentValue);
		}
	}
};