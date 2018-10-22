<template>
	<div class="vc-quill-editor">
		<slot name="toolbar"/>
		<div ref="editor"/>
	</div>
</template>

<script>
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import defaultOptinos from './options';

export default {
	name: "vc-editor",
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
	mounted() {
		this.init();
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
				// this.editor.setText('zhellll');
				this.editor.clipboard.dangerouslyPasteHTML(this.value);
			}
			
			this.editor.on('selection-change', range => {
				if (!range) {
					this.$emit('blur', this.editor);
				} else {
					this.$emit('focus', this.editor);
				}
			});

			this.editor.on('text-change', (delta, oldDelta, source) => {
				let html = this.$refs.editor.children[0].innerHTML;
				const editor = this.editor;
				const text = this.editor.getText();
				if (html === '<p><br></p>') html = '';
				this.content = html;
				// this.$emit('input', this.content);
				this.$emit('change', { html, text, editor });
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