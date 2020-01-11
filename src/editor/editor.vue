<template>
	<div class="vc-quill-editor">
		<slot name="toolbar">
			<vc-editor-toolbar 
				ref="toolbar"
				:toolbar="options.modules.toolbar"
				:toolbar-id="toolbarId"
			>
				<button class="vc-quill-editor__icon">
					<vc-upload
						v-bind="imgUploadOpts"
						@file-success="handleImgSuccess"
					>
						<vc-icon type="image" style="font-size: 15px" @click="handleUploadImg" />
					</vc-upload>
				</button>
				<button class="vc-quill-editor__icon">
					<vc-upload
						v-bind="videoUploadOpts"
						:gallery="false"
						@file-success="handleVideoSuccess"
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
	</div>
</template>

<script>
import './style.scss';
import Extends from '../extends';
import EditorToolbar from './toolbar';
import Upload from '../upload/index';
import Icon from '../icon/index';
import ImgsPreview from '../imgs-preview/index';
import defaultOptions from './default-options';
import { VcInstance } from '../vc/index';
import { registVideoBlot } from './extends/video-blot';
import ImageExtend from './extends/image-extend';

export default {
	name: "vc-editor",
	components: {
		'vc-editor-toolbar': EditorToolbar,
		'vc-upload': Upload,
		'vc-icon': Icon
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
		toolbarId: {
			type: String,
			default: 'toolbar'
		},
		disabled: {
			type: Boolean,
			default: false
		},
		imgUploadOpts: {
			type: Object,
			default: () => ({
				accept: 'image/gif,image/jpeg,image/jpg,image/png', // 手机端建议用image/*，避免Android端选不了
			})
		},
		videoUploadOpts: {
			type: Object,
			default: () => ({
				accept: 'video/mp4,video/webm,video/ogg', // video标签目前只支持这些类型的视频
			})
		},
		gallery: {
			type: [Function, Boolean],
			default: true
		},
		// 注册扩展
		register: Function
	},
	data() {
		return {
			content: ''
		};
	},
	computed: {
		curOptions() {
			return {
				...this.options,
				modules: {
					...this.options.modules,
					toolbar: `#${this.toolbarId}`
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
			});
			// 光标向后移动一位
			this.editor.insertText(length + 1, '');
			this.editor.setSelection(length + 2);
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
@import '../style/index.scss';

$block: vc-quill-editor;

@include block($block) {
	color: #333 !important;
	display: flex;
	flex-direction: column;
	@include element(icon) {
		outline: none; 
		line-height: 1;
	}
	.ql-container {
		flex: 1;
		overflow: auto;
	}
}
</style>
