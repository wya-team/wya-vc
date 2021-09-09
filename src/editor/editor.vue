<template>
	<div class="vc-quill-editor">
		<slot name="toolbar">
			<vc-editor-toolbar 
				ref="toolbar"
				:toolbar="options.modules.toolbar"
				:uid="uid"
			>
				<button class="vc-quill-editor__icon">
					<!-- 手机端建议用image/*，避免Android端选不了 -->
					<vc-upload
						accept="image/gif,image/jpeg,image/jpg,image/png"
						v-bind="imgUploadOpts"
						:max="imgMax"
						@file-success="handleImgSuccess"
						@file-start="handleUploadStart"
						@file-error="handleUploadError(arguments[0], 'image')"
						@error="handleUploadError(arguments[0], 'image')"
						@complete="handleComplete"
					>
						<vc-icon type="image" style="font-size: 15px" @click="handleUploadImg" />
					</vc-upload>
				</button>
				<button class="vc-quill-editor__icon">
					<vc-upload
						accept="video/mp4,video/webm,video/ogg"
						v-bind="videoUploadOpts"
						:max="videoMax"
						:gallery="false" 
						@file-success="handleVideoSuccess"
						@file-start="handleUploadStart"
						@file-error="handleUploadError(arguments[0], 'video')"
						@error="handleUploadError(arguments[0], 'video')"
						@complete="handleComplete"
					>
						<vc-icon type="video" style="font-size: 16px" @click="handleUploadVideo" />
					</vc-upload>
				</button>
				<button class="vc-quill-editor__icon" @click="handleUndo">
					<vc-icon type="undo" style="font-size: 15px" />
				</button>
				<button class="vc-quill-editor__icon" @click="handleRedo">
					<vc-icon type="redo" style="font-size: 15px" />
				</button>
				<button class="vc-quill-editor__icon vc-quill-editor__color">
					<vc-color-picker :value="color" @change="handleColor" />
				</button>
				<template #extend>
					<slot name="extend" />
				</template>
			</vc-editor-toolbar>
		</slot>
		<div ref="editor" />
		<div 
			v-show="loading"
			class="vc-quill-editor__spin"
		>
			<vc-spin />
		</div>
	</div>
</template>

<script>
import { getUid } from '../utils/utils';
import Extends from '../extends';
import EditorToolbar from './toolbar';
import Upload from '../upload/index';
import Icon from '../icon/index';
import ColorPicker from "../color-picker";
import ImgsPreview from '../imgs-preview/index';
import defaultOptions from './default-options';
import { VcInstance } from '../vc/index';
import { registVideoBlot } from './extends/video-blot';
import { registerLineHeight } from './extends/line-height';
import { registerLetterSpacing } from './extends/letter-spacing';
import ImageExtend from './extends/image-extend';
import Spin from '../spin';
import Message from '../message';

export default {
	name: "vc-editor",
	components: {
		'vc-editor-toolbar': EditorToolbar,
		'vc-upload': Upload,
		'vc-icon': Icon,
		'vc-spin': Spin,
		'vc-color-picker': ColorPicker
	},
	mixins: [...Extends.mixins(['emitter'])],
	model: {
		prop: "value",
		event: "input"
	},
	props: {
		value: {
			type: String,
			default: ''
		},
		options: {
			type: Object,
			default() {
				return {
					modules: {
						toolbar: "#toolbar",
						// 必须要配置，否则该扩展不生效
						ImageExtend: {
							upload: {
								showTips: false,
								size: 10, // 单位：M
								max: 1,
								multiple: false
							}
						},
					}
				};
			}
		},
		disabled: {
			type: Boolean,
			default: false
		},
		imgUploadOpts: {
			type: Object,
			default: () => ({})
		},
		videoUploadOpts: {
			type: Object,
			default: () => ({})
		},
		gallery: {
			type: [Function, Boolean],
			default: true
		},
		// 注册扩展
		register: Function,
		videoPoster: [Function, Boolean],
		// 点击img元素是否可以进行预览，为false的时候会将光标聚焦到该元素后面
		preview: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			content: '',
			uid: getUid('editor-toolbar'),
			loading: false,
			color: '',
			videoMax: this.videoUploadOpts.max || Number.MAX_SAFE_INTEGER,
			imgMax: this.imgUploadOpts.max || Number.MAX_SAFE_INTEGER,
			selectionIndex: 0, // 保存点击图片失焦时光标位置
		};
	},
	computed: {
		curOptions() {
			const { Editor = {} } = VcInstance.config || {};
			return {
				...(Editor.options || {}),
				...this.options,
				modules: {
					...((Editor.options || {}).modules || {}),
					...this.options.modules,
					toolbar: `#${this.uid}`
				}
			};
		},
	},
	watch: {
		disabled(newVal, oldVal) {
			if (this.editor) {
				this.editor.enable(!newVal);
			}
		},
		value(newVal, oldVal) {
			if (this.editor) {
				if (newVal && newVal !== this.content) {
					this.content = newVal;
					this.editor.clipboard.dangerouslyPasteHTML(newVal);
				} else if (!newVal) {
					this.editor.setText('');
				}
			}
		},
	},
	async mounted() {
		let Quill = window.Quill || await import('quill');
		// 兼容webpack 3.0/4.0 写法
		this.Quill = Quill.default ? Quill.default : Quill;

		this.init();
		this.initListener();
		this.$emit('ready');
	},
	beforeDestroy() {
		this.removeListener();
		this.editor = null;
		delete this.editor;
	},
	methods: {
		init() {
			const { Quill } = this;
			this._register();
			this.initFontSize();
			this.editor = new Quill(this.$refs.editor, { ...defaultOptions, ...this.curOptions });
			
			this.editor.enable(!this.disabled);
			if (this.value) {
				this.editor.setText('');
				this.editor.clipboard.dangerouslyPasteHTML(this.value);
				let length = this.editor.getLength();
				this.editor.setSelection(length + 1); // 光标位置
			}
			
			this.editor.on('selection-change', range => {
				if (!range) {
					this.$emit('blur', this.editor);
				} else {
					this.$emit('focus', this.editor);
				}
			});

			// 监听文本内容变化
			this.editor.on('text-change', (delta, oldDelta, source) => {
				let html = this.$refs.editor.children[0].innerHTML;
				const editor = this.editor;
				const text = this.editor.getText();
				const isDelete = ((delta.ops || []).pop() || {}).delete;
				this.updateMax(); 	
				if (html === '<p><br></p>') html = '';
				this.content = html;
				this.$emit('input', this.content);
				this.$emit('change', { html, text, editor });
				this.dispatch('vc-form-item', 'form-change', this.content);
			});
		},
		initFontSize() {
			let fontSize = this.$refs.toolbar ? this.$refs.toolbar.fontSize : ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '50px'];
			let Parchment = this.Quill.import('parchment');
			let SizeClass = new Parchment.Attributor.Class('size', 'ql-size', {
				scope: Parchment.Scope.INLINE,
				whitelist: fontSize
			});
			let SizeStyle = new Parchment.Attributor.Style('size', 'font-size', {
				scope: Parchment.Scope.INLINE,
				whitelist: fontSize
			});
			this.Quill.register({
				'attributors/class/size': SizeClass,
				'attributors/style/size': SizeStyle
			}, true); // true 表示要覆盖已有的配置
			this.Quill.register({
				'formats/size': SizeClass,
			}, true);
		
		},
		initListener() {
			this.ImageBlot = this.Quill.import('formats/image');
			this.Parchment = this.Quill.import('parchment');
			this.editor.root.addEventListener('click', this.handlePreview);
		},
		removeListener() {
			this.editor.root.removeEventListener('click', this.handlePreview);
		},
		getImgs() {
			let imgs = [];
			let deltas = this.editor.getContents().ops || [];

			for (let i = 0; i < deltas.length; i++) {
				if (deltas[i].insert.image) {
					imgs.push({
						src: deltas[i].insert.image,
						thumbnail: deltas[i].insert.image + '!4-4',
						title: 'Image' + (i + 1),
						w: 1200,
						h: 900
					});
				}
			}
			return imgs;
		},
		getLength() {
			let selection = this.editor.getSelection();
			return selection ? selection.index : (this.selectionIndex || this.editor.getLength());
		},
		handleImgSuccess(res) {
			// 获取光标所在位置
			let length = this.getLength();
			this.editor.insertEmbed(length, 'image', res.data.url);
			// 光标向后移动一位
			this.editor.setSelection(length + 1);
		},
		handleVideoSuccess(res) {
			let length = this.getLength();
			const attrs = {
				url: res.data.url,
				controls: 'controls',
				style: "max-width: 100%",
				width: 'auto',
				height: 'auto',
			};
			if (typeof this.videoPoster === 'function') {
				attrs.poster = this.videoPoster(res.data.url);
			}
			this.editor.insertEmbed(length, 'vc-video', attrs);
			// 光标向后移动一位
			this.editor.insertText(length + 1, '');
			this.editor.setSelection(length + 2);
		},
		handleUploadStart() {
			this.loading = true;
		},
		handleUploadError(e, type) {
			if (type === 'image' && this.imgMax === 0) {
				Message.error(`图片最多上传${this.imgUploadOpts.max}张`);
			} else if (type === 'video' && this.videoMax === 0) {
				Message.error(`视频最多上传${this.videoUploadOpts.max}个`);
			} else {
				Message.error(e.msg || '网络错误');
			}
		},
		handleComplete() {
			this.loading = false;
		},

		handlePreview(e) {
			if (this.preview) {
				let { ImageBlot, Parchment } = this;
				let image = Parchment.find(e.target);
				if (image instanceof ImageBlot) {
					let index;
					let imgs = Array.from(document.querySelectorAll('.ql-container img'));
					let imgSource = imgs.map((it, idx) => {
						it === e.target && (index = idx);
						return it.src;
					});

					let pos = {};
					try {
						const target = e.target; // 先得到pos, 否则getThumbBoundsFn再计划，target已变化（比如弹窗transition的影响）
						const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
						const rect = target.getBoundingClientRect();

						pos = { x: rect.left, y: rect.top + pageYScroll, w: rect.width };

					} catch (e) {
						// console.log(e);
					}

					ImgsPreview.open({
						visible: true,
						dataSource: imgSource,
						opts: {
							index,
							history: false,
							getThumbBoundsFn: (index) => pos
						}
					});
				}
			} else if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
				// 图片和视频被点击时，将光标聚焦到该元素后面
				const sele = window.getSelection();
				const range = document.createRange();
				const parent = e.target.parentNode;
				const offset = Array.prototype.indexOf.call(parent.childNodes, e.target) + 1;
				range.setStart(parent, offset);
				range.setEnd(parent, offset);
				sele.removeAllRanges();
				sele.addRange(range);
			}
		},
		/**
		 * ImgsPicker已废除，3.x清理
		 */
		handleUploadImg(e) {
			const { ImgsPicker = {}, UploadPicker = {} } = VcInstance.config;
			if (
				typeof this.gallery === 'function' 
				|| (this.gallery && (ImgsPicker.gallery || UploadPicker.gallery))
			) {
				let fn = typeof this.gallery === 'function' 
					? this.gallery
					: (ImgsPicker.gallery || UploadPicker.gallery);
					
				fn(this, 'image') && e.stopPropagation();
			} 
			this.selectionIndex = this.getLength(); // 存储失焦时光标位置
		},
		handleUploadVideo(e) {
			const { UploadPicker = {} } = VcInstance.config;
			if (typeof this.gallery === 'function' || (this.gallery && UploadPicker.gallery)) {
				let fn = typeof this.gallery === 'function' ? this.gallery : UploadPicker.gallery;
					
				fn(this, 'video') && e.stopPropagation();
			} 
			this.selectionIndex = this.getLength(); // 存储失焦时光标位置
		},
		handleUndo() {
			this.editor.history.undo();
		},
		handleRedo() {
			this.editor.history.redo();
		},
		updateMax() {
			const content = this.editor.getContents().ops || [];
			let videoNum = 0;
			let imgNum = 0;
			content.map((it) => {
				const insertEl = it.insert || {};
				if (insertEl.hasOwnProperty('vc-video')) { // eslint-disable-line
					videoNum++;
				} else if (insertEl.hasOwnProperty('image')) { // eslint-disable-line
					imgNum++;
				}
				return it;
			});
			this.videoMax = (this.videoUploadOpts.max || Number.MAX_SAFE_INTEGER) - videoNum;
			this.imgMax = (this.imgUploadOpts.max || Number.MAX_SAFE_INTEGER) - imgNum;
		},
		// 跟imgs-picker 对外暴露的增加方法保持同名
		add(source = [], type = 'image') {
			const fn = type === 'video' ? this.handleVideoSuccess : this.handleImgSuccess;
			source.forEach(item => {
				fn({ data: { url: item } });
			});
		},
		_register() {
			let lineHeight;
			let letterSpacing;

			if (this.$refs.toolbar) {
				lineHeight = this.$refs.toolbar.lineHeight;
				letterSpacing = this.$refs.toolbar.letterSpacing;
			}
			const { Quill, register } = this;
			Quill.register('modules/ImageExtend', ImageExtend);
			registVideoBlot(Quill);
			registerLineHeight(Quill, lineHeight);
			registerLetterSpacing(Quill, letterSpacing);
			register && register(Quill);
		},
		// 增加vc-color-picker satrt起始位置 length选中长度
		handleColor(v) {
			let lastRange = this.editor.selection.lastRange;
			let start = lastRange.index;
			let length = lastRange.length;
			this.color = v;
			this.editor.formatText(start, length, 'color', v);
		}
	}
};
</script>

<style lang="scss">
@import '../style/vars.scss';

$block: vc-quill-editor;

@include block($block) {
	position: relative;
	color: #333 !important;
	display: flex;
	flex-direction: column;
	@include element(icon) {
		outline: none; 
		line-height: 1;
	}
	@include element(color) {
		width: 45px !important;
		padding: 0!important;
		margin-right: 10px;
		.vc-color-picker__input {
			padding: 1px 3px;
			height: 20px;
		}
		.vc-color-picker__append {
			padding-right: 3px;
		}
		
	}
	@include element(spin) {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #ffffffaa
	}
	.ql-container {
		flex: 1;
		overflow: auto;
	}
}
</style>
