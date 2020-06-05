/**
 * imgs-picker的核心js
 */
import { Device } from '@wya/utils';
import Message from '../message/index';
import Toast from '../toast/index';
import Extends from '../extends';
import { VcInstance } from '../vc/index';
import { recognizer } from './utils';

export default {
	mixins: [...Extends.mixins(['emitter'])],
	model: {
		prop: 'dataSource',
		event: 'change'
	},
	props: {
		picker: {
			type: Array,
			default: () => (['image'])
		},
		sortable: {
			type: Boolean,
			default: false
		},
		mask: {
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
		 * 数据源['xxx.jpg', ....]
		 */
		dataSource: {
			type: Array,
			default: () => ([]),
		},
		/**
		 * 可上传的最大值,跟upload内的Max不同，有可能是对象类型，对应的Upload做限制
		 */
		max: {
			type: [Number, Object],
			default: Number.MAX_SAFE_INTEGER
		},
		disabled: {
			type: Boolean,
			default: false
		},
		/**
		 * 上传成功后对数据的格式化
		 */
		formatter: Function,
		// TODO 下面两个重复了，需删除
		/**
		 * 盒子className
		 */
		boxClassName: String,
		imgsPreviewOpts: {
			type: Object,
			default: () => ({})
		},
		imgClassName: String,
		videoClassName: String,
		fileClassName: String,
		urlKey: {
			type: String,
			default: 'url'
		}
	},
	data() {
		return {
			currentValue: {
				image: [],
				video: [],
				file: []
			},
			currentUploadOpts: { 
				image: {
					accept: 'image/gif,image/jpeg,image/jpg,image/png',
					...(this.uploadOpts.image || {})
				},
				video: {
					accept: 'video/*',
					...(this.uploadOpts.video || {})
				},
				file: {
					...(this.uploadOpts.video || {})
				}
			}
		};
	},
	computed: {
		dynamicMax() {
			const image = this.currentValue.image || [];
			const video = this.currentValue.video || [];
			const file = this.currentValue.file || [];

			// 如果过滤出上传成功的文件，在上传中时，currentValue占位，达到max，upload控件仍不会隐藏，用户可以再次上传，导致会超出max
			let imageCount = image.length || 0;
			let videoCount = video.length || 0;
			let fileCount = file.length || 0;
			
			if (typeof this.max === 'number') {
				let curNum = imageCount + videoCount + fileCount;
				const leftNum = this.max - curNum;
				return {
					image: leftNum,
					video: leftNum,
					file: leftNum,
				};
			} else if (typeof this.max === 'object') {
				const { image, video, file } = this.max;
				const max = {};
				image && (max.image = image - imageCount);
				video && (max.video = video - videoCount);
				file && (max.file = file - fileCount);
				return max;
			}
			return {};
		},
		multiple() {
			const { image, video, file } = this.dynamicMax;
			return {
				image: image >= 1,
				video: video >= 1,
				file: file >= 1,
			};
		},
		// hooks() {
		// 	return (type) => {
		// 		const hooks = {};
		// 		this.$listeners.begin && (hooks.begin = (...param) => {
		// 			this.$emit('begin', ...param, type);
		// 		});
		// 		this.$listeners['post-before'] && (hooks['post-before'] = (...param) => {
		// 			this.$emit('post-before', ...param, type);
		// 		});
		// 		this.$listeners['post-after'] && (hooks['post-after'] = (...param) => {
		// 			this.$emit('post-after', ...param, type);
		// 		});
		// 		return hooks;
		// 	};
		// },
	},
	watch: {
		dataSource: {
			immediate: true,
			handler(newVal) {
				this.currentValue = this.isEmpty(this.currentValue) || newVal.length === 0 ? this.parseDataSource(newVal) : this.currentValue;
			}
		}
	},
	methods: {
		isEmpty(dataSource) {
			const [image, video, file] = Object.values(dataSource);
			if (image.length || video.length || file.length) return false;
			return true;
		},
		parseDataSource(dataSource) {
			const initialData = { image: [], video: [], file: [] };
			return dataSource.reduce((pre, cur) => {
				switch (this.recognizer(cur)) {
					case 'image':
						pre.image.push(cur);
						return pre;
					case 'video':
						pre.video.push(cur);
						return pre;
					case 'file':
						pre.file.push(cur);
						return pre;
					default:
						return pre;
				}
			}, initialData);
		},
		formatDataSource(dataSource, type) {
			dataSource = {
				...this.currentValue,
				[type]: dataSource
			};
			return this.picker.reduce((pre, cur) => {
				return pre.concat(dataSource[cur] || []);
			}, []);
		},
		recognizer(url) {
			const fn = (VcInstance.config.UploadPicker || {}).recognizer || recognizer;
			return fn(url, recognizer);
		},
		getUrl(res) {
			return this.formatter ? this.formatter(res) : res.data[this.urlKey];
		},
		handleFileBefore(file, fileList, type) {
			return new Promise((resolve) => {
				const { "file-before": fileBefore } = this.$listeners; 

				if (!fileBefore) return resolve(file);
				const before = fileBefore(file, fileList, type);
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
		handleFileStart(res, type) {
			res.title = res.name;
			this.currentValue[type].push(res);
			this.$emit('file-start', res, type);
		},
		handleFileProgress(e, file, type) {
			if (parseInt(e.percent, 10) <= 100) {
				this.currentValue[type] = this.currentValue[type].map((item) => {
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
		handleFileSuccess(res, file, cycle, type) {
			let dataSource;
			this.currentValue[type] = this.currentValue[type].map((item) => {
				if (item.uid === file.uid) {
					// 图片、视频
					if (['image', 'video'].includes(type)) {
						return this.getUrl(res);
					} else { // 其他文件
						let result = { ...item, ...res.data };
						return this.formatter ? this.formatter(result) : result;
					}
				}
				return item;
			});
			// 将已经上传成功的文件传递给外部
			dataSource = this.currentValue[type].filter((it) => !it.errorFlag && this.getUrl(res));
			dataSource = this.formatDataSource(dataSource, type);
			this.$emit('success', res, file, cycle, type);
			this.sync(dataSource);
		},
		handleFileError(res, file, cycle, type) {
			// 内部保存上传失败的文件，不传递给外层
			this.currentValue[type] = this.currentValue[type].map((item) => {
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
			this.handleError(res, type, file);
		},
		handleError(err, type, file) {
			let { $listeners: { error } } = this;
			!error && (Device.touch ? Toast.info(err.msg, 2) : Message.error(err.msg, 2));
			this.$emit('error', err, type, file);
		},
		handleFileComplete(res, type) {
			this.$emit('complete', res, type);
		},
		handleDel(index, type) {
			const { 'del-before': delBefore } = this.$listeners; // 传入promise
			const fn = delBefore && delBefore();
			if (fn && fn.then) {
				fn.then(() => {
					this.delData(index, type);
				}).catch((err) => {
					return;
				});
			} else {
				this.delData(index, type);
			}
		},
		delData(index, type) {
			const target = this.currentValue[type];
			const item = target[index];
			if (item.errorFlag) {
				this.currentValue[type] = target.filter(it => it.uid != item.uid);
				return;
			}
			target.splice(index, 1);
			let dataSource = target.filter(it => !it.errorFlag);
			dataSource = this.formatDataSource(dataSource, type);
			this.sync(dataSource);
		},
		handleSortChange(value, type) {
			this.currentValue[type] = value;
			let dataSource = value.filter(it => !it.errorFlag);
			dataSource = this.formatDataSource(dataSource, type);
			this.$emit('change', dataSource);
		},
		sync(v) {
			this.$emit('change', v);

			// form表单
			this.dispatch('vc-form-item', 'form-change', v);
		},

		/**
		 * 对外暴露
		 */
		delete(index, type) {
			this.handleDel(index, type);
		},

		/**
		 * 增加
		 */
		add(source, type) {
			if (!(source instanceof Array)) {
				source = [source];
			}
			source = source.filter(it => !!it);
			
			if (source.length) {
				this.currentValue[type].push(...source);
				let dataSource = this.currentValue[type].filter(it => !it.errorFlag);
				dataSource = this.formatDataSource(dataSource, type);
				this.sync(dataSource);
			}
		},
		/**
		 * 重置value
		 */
		reset(source = []) {
			if (!(source instanceof Array)) {
				throw Error('【vc-upload-picker】: reset参数要为字符串数组');
			}
			this.currentValue = this.parseDataSource(source);
			// form表单
			this.dispatch('vc-form-item', 'form-change', this.currentValue);
		}
	}
};