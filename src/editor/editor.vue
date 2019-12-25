<template>
	<div class="vc-quill-editor">
		<slot name="toolbar">
			<vc-editor-toolbar v-if="options.modules && options.modules.toolbar === '#toolbar'">
				<button id="img" style="outline: none; line-height: 1;">
					<vc-upload
						v-bind="uploadOpts"
						:accept="accept" 
						@file-success="handleImgSuccess"
					>
						<vc-icon type="image" style="font-size: 15px" @click="handleUploadImg" />
					</vc-upload>
				</button>
				<slot name="extend" />
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
import defaultOptinos from './default-options';
import { VcInstance } from '../vc/index';

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
		disabled: {
			type: Boolean,
			default: false
		},
		uploadOpts: {
			type: Object,
			default: () => ({})
		},
		/**
		 * 手机端建议用image/*，避免Android端选不了
		 */
		accept: {
			type: String,
			default: 'image/gif,image/jpeg,image/jpg,image/png'
		},
		gallery: {
			type: [Function, Boolean],
			default: true
		}
	},
	data() {
		return {
			content: ''
		};
	},
	computed: {
		
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
		let Quill = await import('quill');
		// 兼容webpack 3.0/4.0 写法
		this.Quill = Quill.default ? Quill.default : Quill;

		this.init();
		this.initListener();
		this.$emit('ready');
	},
	beforeDestroy() {
		this.editor = null;
		delete this.editor;
	},
	methods: {
		init() {
			this.initFontSize();
			this.editor = new this.Quill(this.$refs.editor, { ...defaultOptinos, ...this.options });
			this.editor.enable(!this.disabled);
			if (this.value) {
				this.editor.setText('zhellll');
				this.editor.clipboard.dangerouslyPasteHTML(this.value);
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
			const fontSize = ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '50px'];
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
			const ImageBlot = this.Quill.import('formats/image');
			const Parchment = this.Quill.import('parchment');
			this.editor.root.addEventListener('click', (ev) => {
				let image = Parchment.find(ev.target);
				if (image instanceof ImageBlot) {
					
					let imgs = this.getImgs();
					this.handlePreview(ev, 0);
				}
			});
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
		handleImgSuccess(res) {
			// 获取光标所在位置
			let length;
			let selection = this.editor.getSelection();
			if (!selection) {
				length = this.editor.getLength();
			} else {
				length = selection.index;
			}
			this.editor.insertEmbed(length, 'image', res.data.url);
			// 光标向后移动一位
			this.editor.setSelection(length + 1);
		},
		handlePreview(e, idx) {
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
				dataSource: [e.target.currentSrc],
				opts: {
					index: idx,
					history: false,
					getThumbBoundsFn: (index) => pos
				}
			});
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
		// 跟imgs-picker 对外暴露的增加方法保持同名
		add(imgs = []) {
			imgs.forEach(image => {
				this.handleImgSuccess({ data: { url: image } });
			});
		}
	}
};
</script>

<style lang="scss">
.vc-quill-editor {
	color: #333 !important;
	display: flex;
	flex-direction: column;
	.vc-editor-size {
		width: 78px;
	}
	.ql-container {
		flex: 1;
		overflow: auto;
	}
}
</style>