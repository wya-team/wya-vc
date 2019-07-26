import { ajax } from '@wya/http';
import { Device, Utils } from '@wya/utils';
import { attrAccept, initItem } from './utils';
import { getUid } from '../utils/utils';
import { VcInstance, VcError } from '../vc/index';
import { Tips } from './tips';

export default {
	name: "vc-upload",
	props: {
		// 外层标签
		tag: {
			type: [String, Object, Function],
			default: 'span'
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

		// 选择文件时最多选择文件数量， 在multiple为true 或者 directory为true的情况下有效
		max: {
			type: Number,
			default: 1
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

		// ajax额外的数据
		async: {
			type: Boolean,
			default: true
		},

		// ajax headers
		headers: {
			type: Object,
			default: () => ({})
		},

		// 上传类型为图片
		mode: {
			type: String,
			default: 'images' // images | files
		},

		// 给后端的字段名，历史原因 (之前默认Filedata)
		name: {
			type: String,
			default: ''
		},

		showTips: {
			type: Boolean,
			default: false
		},

		// 选取文件夹
		directory: {
			type: Boolean,
			default: false
		},

		enhancer: Function
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
		this.__isMounted = false;
		this.setDefaultCycle();
	},
	mounted() {
		this.__isMounted = true;

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
		this.__isMounted = false;
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

			/**
			 * 渐进增强
			 */
			let { enhancer } = VcInstance.config.Upload || {};

			enhancer = this.enhancer || enhancer || (() => false);
			enhancer(this) || el.click();
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
			if (this.multiple && length > this.max) {
				this.$emit('error', { msg: `可选文件数量不能超过${this.max}个` });
				return;
			} else if (this.directory && length > this.max) {
				this.$emit('error', { msg: `文件夹内文件的数量不能超过${this.max}个` });
				return;
			}
			
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
					if (processedFile instanceof Blob) {
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
					throw new VcError('upload', e);
				});
			} else if (before !== false) {
				setTimeout(() => this.post(file), 0);
			}
		},

		async post(file) {
			if (!this.__isMounted) {
				return;
			}
			const { 
				"post-before": postBefore,
				"post-after": postAfter,
			} = this.$listeners;
			const { async, url, mode, name, headers, extra = {} } = this;

			const { 
				URL_UPLOAD_FILE_POST, 
				URL_UPLOAD_IMG_POST, 
				FORM_NAME, 
				onPostBefore, 
				onPostAfter 
			} = VcInstance.config.Upload || {};

			const defaultUrl = mode === 'images' 
				? URL_UPLOAD_IMG_POST 
				: URL_UPLOAD_FILE_POST;

			// 上传前/后的回调
			const onBefore = postBefore || onPostBefore || (() => ({}));
			const onAfter = postAfter || onPostAfter;

			const { uid } = file;
			const { ajax, size } = this;
			let localData;
			if (size && file.size > size * 1024 * 1024) {
				this.$emit('error', { msg: `上传失败，大小限制为${size}MB` });
				return;
			}
			
			// onFileStart, onFileProgress, onFileSuccess, onFileError, onComplete 
			this.$emit('file-start', file);
			
			ajax({
				url: url || defaultUrl,
				type: "FORM",
				param: {
					...extra, 
					[name || FORM_NAME || 'file']: file, // oss特殊场景, 需要file作为最后一个字段
				},
				async,
				headers,
				localData,
				onBefore,
				onAfter,
				onProgress: e => {
					this.$emit('file-progress', e, file);
					this.tips && this.tips.setValue(uid, 'percent', e.percent);
				},
				// todo 可优化
				getInstance: (xhr, cancel) => (this.reqs[uid] = { cancel })
			}).then((res) => {
				delete this.reqs[uid];
				this.cycle.success++;
				this.cycle.imgs = [...this.cycle.imgs, res];

				this.$emit('file-success', res, file, { ...this.cycle });

				// tips
				this.tips && this.tips.setValue(uid, 'success');

			}).catch((res) => {
				delete this.reqs[uid];
				this.handleReject(res, file);

			}).finally(() => {
				this.handleFinally(file);
			});
		},
		handleReject(res, file) {
			this.cycle.error++;

			this.$emit('file-error', res, file, { ...this.cycle });

			// tips
			this.tips && this.tips.setValue(file.uid, 'error', res.msg);
		},
		handleFinally(file) {
			this.cycle.total++;
				
			// console.log(`error: ${this.cycle.error}, total: ${this.cycle.total}`);
			if (this.cycle.total === file.total) {

				this.$emit('complete', { ...this.cycle } || {});
				this.setDefaultCycle();

				// tips
				this.tips && this.tips.setTipsStatus(true);
			}
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
					this.handleFinally(file);
					delete this.reqs[uid];
				}
			} else {
				Object.keys(reqs).forEach((uid) => {
					if (this.reqs[uid]) {
						this.reqs[uid].cancel();
						this.handleFinally(file);
					}
					delete reqs[uid];
				});
			}
		}
	},
	render(h) {
		const {
			disabled,
			accept,
			multiple,
			directory
		} = this;

		// class
		const classes = {
			'vc-upload': true,
			'vc-upload-disabled': disabled,
		};
		const events = disabled ? {} : {
			click: this.handleClick,
			// keydown: this.handleKeyDown,
			drop: this.handleFileDrop,
			dragover: this.handleFileDrop
		};

		// 上传
		let inputProps = {
			attrs: {
				type: 'file',
				accept,
				multiple,
				webkitdirectory: directory
			},
			style: {
				display: 'none'
			},
			on: {
				change: this.handleChange
			},
			key: this.uid,
			ref: 'input'
		};
		// 解决安卓手机上传图片没有拍照选项
		if (Device.android) {
			inputProps.capture = true;
		}
		const ele = h('input', {
			...inputProps
		});

		return h(this.tag, {
			class: classes,
			on: events
		}, [ele, this.$slots.default]);
	}
};
