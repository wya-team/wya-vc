/**
 * imgs-picker的核心js
 */
import emitter from '../extends/mixins/emitter'; // 表单验证
import ImgsPreview from '../imgs-preview/index';

export default {
	mixins: [emitter],
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
		/**
		 * vc-upload组件的属性
		 */
		upload: {
			type: Object,
			default() {
				return {};
			}
		},
		/**
		 * 上传成功后对数据的格式化
		 */
		format: Function,
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
		uploadClassName: String
	},
	data() {
		return {
			data: this.dataSource,
			uploadOpts: { ...this.upload }
		};
	},
	watch: {
		dataSource: {
			immediate: true,
			handler(newVal) {
				let arr = this.data.length === 0 ? newVal : this.data;
				this.data = arr.map((it) => {
					for (let i = 0; i < newVal.length; i++) {
						if (typeof it === 'string' && newVal[i] === it) {
							return newVal[i];
						}
					}
					return it;
				});
				if (this.upload.multiple) {
					let max = this.upload.max || 1;
					let canSelectNum = max - this.data.length;
					if (this.uploadOpts.max != canSelectNum) {
						this.uploadOpts.max = canSelectNum;
					}
				}
			}
		}
	},
	methods: {
		handleFileStart(res) {
			this.data = [...this.data, res];
			// 开始上传时，最大值 -1
			if (this.uploadOpts.multiple) {
				let max = this.uploadOpts.max - 1;
				this.uploadOpts.max = max >= 0 ? max : 0;
			}
		},
		handleFileProgress(e, file) {
			if (parseInt(e.percent, 10) <= 100) {
				this.data = this.data.map((item) => {
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
			this.data = this.data.map((item) => {
				if (item.uid === file.uid) {
					return this.getUrl(res);
				}
				return item;
			});
			// 将已经上传成功的文件传递给外部
			dataSource = this.data.filter((it) => !it.errorFlag && this.getUrl(res));
			this.$emit('change', dataSource);

			// form表单
			this.dispatch('vc-form-item', 'form-change', dataSource);
		},
		handleFileError(res, file) {
			// 内部保存上传失败的文件，不传递给外层
			this.data = this.data.map((item) => {
				if (item.uid === file.uid) {
					return {
						...item,
						...res,
						errorFlag: new Date().getTime()
					};
				}
				return item;
			});
			this.$emit('error', res);
		},
		handleFileComplete(res) {
			this.$emit('complete', res);
		},
		handleDel(item, index) {
			// 删除时，最大值加1
			if (this.uploadOpts.multiple) {
				this.uploadOpts.max = this.uploadOpts.max + 1;
			}
			if (item.errorFlag) {
				this.data = this.data.filter(it => it.uid != item.uid);
				return;
			}
			// this.data.splice(index, 1);
			this.data = this.data.filter(it => it != item);
			let dataSource = this.data.filter(it => !it.errorFlag);
			this.$emit('change', dataSource);

			// form表单
			this.dispatch('vc-form-item', 'form-change', dataSource);
		},
		handlePreview(e, idx) {
			// 自定义的预览方法， open\close事件不暴露，可由外面控制
			let { preview } = this.$listeners || {};
			if (preview) {
				preview(e, idx);
				return;
			}
			
			let pos = {};
			try {
				const target = e.target; // 先得到pos, 否则getThumbBoundsFn再计划，target已变化
				const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
				const rect = target.getBoundingClientRect();

				pos = { x: rect.left, y: rect.top + pageYScroll, w: rect.width };

			} catch (e) {
				console.log(e);
			}

			this.$emit('open');
			ImgsPreview.open({
				visible: true,
				dataSource: this.dataSource,
				opts: {
					index: idx,
					history: false,
					getThumbBoundsFn: (index) => pos
				},
				onSure: () => this.$emit('close'),
				onClose: () => this.$emit('close'),
			});
		},
		getUrl(res) {
			return this.format ? this.format(res) : res.data.url;
		}
	}
};