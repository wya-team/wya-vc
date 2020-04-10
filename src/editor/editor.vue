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
						<vc-icon type="video" style="font-size: 16px" />
					</vc-upload>
				</button>
				<button class="vc-quill-editor__icon" @click="handleUndo">
					<vc-icon type="undo" style="font-size: 15px" />
				</button>
				<button class="vc-quill-editor__icon" @click="handleRedo">
					<vc-icon type="redo" style="font-size: 15px" />
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
import ImgsPreview from '../imgs-preview/index';
import defaultOptions from './default-options';
import { VcInstance } from '../vc/index';
import { registVideoBlot } from './extends/video-blot';
import ImageExtend from './extends/image-extend';
import Spin from '../spin';
import Message from '../message';

export default {
	name: "vc-editor",
	components: {
		'vc-editor-toolbar': EditorToolbar,
		'vc-upload': Upload,
		'vc-icon': Icon,
		'vc-spin': Spin
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
		poster: [Function, Boolean]
	},
	data() {
		return {
			content: '',
			uid: getUid('editor-toolbar'),
			loading: false,
			videoMax: this.videoUploadOpts.max || Number.MAX_SAFE_INTEGER,
			imgMax: this.imgUploadOpts.max || Number.MAX_SAFE_INTEGER,
		};
	},
	computed: {
		curOptions() {
			return {
				...this.options,
				modules: {
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
			return selection ? selection.index : this.editor.getLength();
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
			this.editor.insertEmbed(length, 'vc-video', {
				url: res.data.url,
				controls: 'controls',
				style: "max-width: 100%",
				width: 'auto',
				height: 'auto',
				poster: this.poster && typeof (this.poster) !== 'function' 
					? `${res.data.url}?x-oss-process=video/snapshot,t_1000,f_jpg,w_0,h_0,m_fast` 
					: this.poster(res.data.url)
			});
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
		},
		handleUploadImg(e) {
			const { ImgsPicker = {} } = VcInstance.config;
			if (typeof this.gallery === 'function' || (this.gallery && ImgsPicker.gallery)) {
				e.stopPropagation();

				let fn = typeof this.gallery === 'function' 
					? this.gallery
					: ImgsPicker.gallery;
					
				fn(this);
			} 
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
			this.imgMax = (this.videoUploadOpts.max || Number.MAX_SAFE_INTEGER) - imgNum;
		},
		// 跟imgs-picker 对外暴露的增加方法保持同名
		add(imgs = []) {
			imgs.forEach(image => {
				this.handleImgSuccess({ data: { url: image } });
			});
		},
		_register() {
			const { Quill, register } = this;
			Quill.register('modules/ImageExtend', ImageExtend);
			registVideoBlot(Quill);
			register && register(Quill);
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
