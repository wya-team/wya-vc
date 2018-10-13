import { ajax } from 'wya-fetch';
import { getUid, attrAccept, initItem } from '../utils/utils';
import { VcInstance } from '../vc/index';
import { Tips } from './tips';

export default {
	name: "vc-upload",
	props: {
		// 外层标签
		tag: {
			type: [String, Object, Function],
			default: 'span'
		},

		// 样式前缀
		prefixCls: {
			type: String,
			default: 'c-upload'
		},

		// 是否禁用
		disabled: {
			type: Boolean,
			default: false
		},

		// 单图/多图上传
		multiple: {
			type: Boolean,
			default: false 
		},

		// 上传类型限制
		accept: String,

		// 文件大小
		size: {
			type: Number,
			default: 0
		},

		// ajax
		ajax: {
			type: Function,
			default: ajax
		},

		// ajax url
		url: String,

		// ajax额外的数据
		extra: {
			type: Object,
			default: () => ({})
		},

		// ajax headers
		headers: {
			type: Object,
			default: () => ({})
		},

		// 上传类型为图片
		type: {
			type: String,
			default: 'images'
		},

		// 给后端的字段名，历史原因
		name: {
			type: String,
			default: 'Filedata'
		},

		showTips: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			uid: undefined
		};
	},
	computed: {
		
	},
	created() {
		this.reqs = {};
		this._isMounted = false;
		this.setDefaultCycle();
	},
	mounted() {
		this._isMounted = true;

		if (!this.showTips) return;
		Tips.popup({
			cName: getUid(),
			getInstance: (vm) => {
				this.tips = vm;
			}
		}).then((res) => {
			console.log(`tips: ${res}`);
		}).catch((error) => {
			console.log(`tips: ${error}`);
		});

	},
	destroyed() {
		this._isMounted = false;
		this.tips && this.tips.$emit('close');
		this.cancel();
	},
	methods: {
		/**
		 * 状态管理
		 */
		setDefaultCycle() {
			this.cycle = {
				error: 0,
				success: 0,
				total: 0,
				imgs: []
			};
		},

		handleClick() {
			const el = this.$refs.input;
			if (!el) {
				return;
			}
			el.click();
		},
		handleChange(e) {
			const files = e.target.files;
			this.uploadFiles(files);

			this.uid = getUid();
		},
		handleFileDrop(e) {
			if (e.type === 'dragover') {
				e.preventDefault();
				return;
			}
			const files = Array.prototype.slice.call(e.dataTransfer.files).filter(
				file => attrAccept(file, this.accept)
			);
			this.uploadFiles(files);

			e.preventDefault();
		},
		handleKeyDown(e) {
			if (e.key === 'Enter') {
				this.handleClick();
			}
		},
		uploadFiles(files) {
			const postFiles = Array.prototype.slice.call(files);
			const length = postFiles.length;
			// reset
			this.setDefaultCycle();

			
			this.$emit('begin', postFiles);

			postFiles.forEach((file, index) => {
				file.uid = getUid();
				file.current = index + 1;
				file.total = length;
				file.percent = 0;
				this.upload(file, postFiles);
			});

			// tips
			this.tips && this.tips.show(
				initItem(postFiles.map(it => ({ ...it, size: it.size, name: it.name })), 'uid')
			);
		},
		upload(file, fileList, index) {

			// 此处不用this.$emit('xxx')
			const { 
				"file-before": fileBefore 
			} = this.$listeners;

			if (!fileBefore) {
				// 总是异步的，以防使用react状态保存文件列表。
				setTimeout(() => this.post(file), 0);
				return;
			}

			const before = fileBefore(file, fileList);
			if (before && before.then) {
				before.then((processedFile) => {
					const processedFileType = Object.prototype.toString.call(processedFile);
					if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
						try {
							const { uid, current, total, percent } = file;
							processedFile.uid = uid;
							processedFile.current = current;
							processedFile.total = total;
							processedFile.percent = percent;
							this.post(processedFile);
						} catch (e) {
							this.post(processedFile);
						}
					} else {
						this.post(file);
					}
				}).catch(e => {
					console && console.error(e);
				});
			} else if (before !== false) {
				setTimeout(() => this.post(file), 0);
			}
		},

		post(file) {
			if (!this._isMounted) {
				return;
			}
			const { url, type, name, headers, extra } = this;
			const { URL_UPLOAD_FILE_POST, URL_UPLOAD_IMG_POST } = VcInstance.config.Upload || {};
			const defaultUrl = type === 'images' ? URL_UPLOAD_IMG_POST : URL_UPLOAD_FILE_POST;
			const { uid } = file;
			const { ajax, size } = this;
			let localData;
			if (size && file.size > size * 1024 * 1024) {
				localData = {
					status: 0,
					msg: `上传失败，大小限制为${size}MB`
				};
			}
			// onFileStart, onFileProgress, onFileSuccess, onFileError, onComplete 
			this.reqs[uid] = ajax({
				url: url || defaultUrl,
				type: "FORM",
				param: {
					name,
					file,
					data: extra
				},
				headers,
				localData,
				onProgress: e => {
					this.$emit('file-progress', e, file);
					this.tips && this.tips.setValue(uid, 'percent', e.percent);
				}
			}).then((res) => {
				delete this.reqs[uid];
				this.cycle.success++;
				this.cycle.total++;
				this.cycle.imgs = [...this.cycle.imgs, res];

				this.$emit('file-success', res, file, { ...this.cycle });

				// tips
				this.tips && this.tips.setValue(uid, 'success');

				// console.log(`success: ${this.cycle.success}, total: ${this.cycle.total}`);
				if (this.cycle.total === file.total) {

					this.$emit('complete', { ...this.cycle } || {});
					this.setDefaultCycle();

					// tips
					this.tips && this.tips.setTipsStatus(true);
				}
			}).catch((res) => {
				delete this.reqs[uid];
				this.cycle.error++;
				this.cycle.total++;

				this.$emit('file-error', res, file, { ...this.cycle });

				// tips
				this.tips && this.tips.setValue(uid, 'error', res.msg);

				// console.log(`error: ${this.cycle.error}, total: ${this.cycle.total}`);
				if (this.cycle.total === file.total) {

					this.$emit('complete', { ...this.cycle } || {});
					this.setDefaultCycle();

					// tips
					this.tips && this.tips.setTipsStatus(true);
				}
			});
			this.$emit('file-start', file);
		},
		cancel(file) {
			const { reqs } = this;
			if (file) {
				let uid = file;
				if (file && file.uid) {
					uid = file.uid;
				}
				if (this.reqs[uid]) {
					this.reqs[uid].cancel();
					delete this.reqs[uid];
				}
			} else {
				Object.keys(reqs).forEach((uid) => {
					if (this.reqs[uid]) {
						this.reqs[uid].cancel();
					}
					delete reqs[uid];
				});
			}
		}
	},
	render(h) {
		const {
			prefixCls,
			disabled,
			accept,
			multiple
		} = this;

		// class
		const classes = {
			[prefixCls]: true,
			[`${prefixCls}-disabled`]: disabled,
		};
		const events = disabled ? {} : {
			click: this.handleClick,
			// keydown: this.handleKeyDown,
			drop: this.handleFileDrop,
			dragover: this.handleFileDrop
		};

		// 上传
		const ele = h('input', {
			attrs: {
				type: 'file',
				accept,
				multiple
			},
			style: {
				display: 'none'
			},
			on: {
				change: this.handleChange
			},
			key: this.uid,
			ref: 'input'
		});

		return h(this.tag, {
			class: classes,
			on: events
		}, [ele, this.$slots.default]);
	}
};
