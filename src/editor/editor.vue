<template>
	<div class="vc-quill-editor">
		<slot v-if="$slots.toolbar" name="toolbar"/>
		<template v-else>
			<toolbar>
				<button id="img" style="outline: none" >
					<vc-upload
						v-bind="upload"
						accept="image/gif,image/jpeg,image/jpg,image/png" 
						style="outline: none"
						@file-success="handleImgSuccess"
					>
						<vc-icon type="image" />
					</vc-upload>
				</button>
				<slot name="extend" />
			</toolbar>
		</template>
		<div ref="editor"/>
	</div>
</template>

<script>
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import emitter from '../extends/mixins/emitter'; // 表单验证
import Toolbar from './toolbar';
import Upload from '../upload/index';
import Icon from '../icon/index';
import ImgsPreview from '../imgs-preview/index';
import { getUid } from '../utils/utils';
import defaultOptinos from './options';

export default {
	// name: "vc-editor",
	components: {
		'toolbar': Toolbar,
		'vc-upload': Upload,
		'vc-icon': Icon
	},
	mixins: [emitter],
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
				return {};
			}
		},
		disabled: {
			type: Boolean,
			default: false
		},
		upload: {
			type: Object,
			default: () => ({})
		},
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
	mounted() {
		this.init();
		this.initListener();
	},
	beforeDestroy() {
		this.editor = null;
		delete this.editor;
	},
	methods: {
		init() {
			this.editor = new Quill(this.$refs.editor, { ...defaultOptinos, ...this.options });
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
		initListener() {
			const ImageBlot = Quill.import('formats/image');
			const Parchment = Quill.import('parchment');
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
			console.log(deltas);

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
				const target = e.target; // 先得到pos, 否则getThumbBoundsFn再计划，target已变化
				const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
				const rect = target.getBoundingClientRect();

				pos = { x: rect.left, y: rect.top + pageYScroll, w: rect.width };

			} catch (e) {
				// console.log(e);
			}

			ImgsPreview.popup({
				visible: true,
				dataSource: [e.target.currentSrc],
				opts: {
					index: idx,
					history: false,
					getThumbBoundsFn: (index) => pos
				}
			}).then(() => {

			}).catch(() => {

			});
		}
	}
};
</script>

<style lang="scss">
.vc-quill-editor {
	color: #333 !important;
	.ql-editor{
		height:500px;
	}
}
</style>