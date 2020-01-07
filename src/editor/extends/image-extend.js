import Vue from 'vue';
import Upload from '../../upload';

class ImageExtend {
	constructor(editor, options = {}) {
		this.editor = editor;
		this.options = options;
		this.init();
	}

	init = () => {
		this.initUploadInstance();
		this.initListener();
	}

	initUploadInstance = () => {
		let { upload = {} } = this.options;
		const el = document.querySelector('vc-quill-editor');
		const Component = Vue.extend({ ...Upload });
		this.vm = new Component({
			propsData: {
				...upload
			}
		}).$mount(el);
	}

	initListener = () => {
		this.editor.root.addEventListener('paste', this.handlePaste, false);
		this.editor.root.addEventListener('drop', this.handleDrop, false);
		this.vm.$on('file-start', this.handleUploadStart);
		this.vm.$on('file-success', this.handleUploadSuccess);
		this.vm.$on('complete', this.handleUploadComplete);
	}

	getLength = () => {
		return (this.editor.getSelection() || {}).length || this.editor.getLength();
	}

	handleUploadStart = () => {
		// TODO
	}

	handleUploadSuccess = (res) => {
		this.insert(res.data.url);
	}

	handleUploadComplete = () => {
		// TODO
	}

	handlePaste = (e) => {
		if (e.clipboardData && e.clipboardData.files && e.clipboardData.files.length) {
			e.preventDefault();
			this.readFiles(e.clipboardData.files);
		}
	}

	handleDrop = (e) => {
		e.preventDefault();
		if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
			if (document.caretRangeFromPoint) {
				const selection = document.getSelection();
				const range = document.caretRangeFromPoint(e.clientX, e.clientY);
				if (selection && range) {
					selection.setBaseAndExtent(range.startContainer, range.startOffset, range.startContainer, range.startOffset);
				}
			}
			this.readFiles(e.dataTransfer.files);
		}
	}

	readFiles = (files) => {
		[].forEach.call(files, file => {
			if (!file.type.match(/^image\/(gif|jpe?g|a?png|svg|\.icon)/i)) {
				return;
			}
			this.vm.post(file);
		});
	}

	insert = (dataUrl) => {
		const index = this.getLength();
		this.editor.insertEmbed(index, 'image', dataUrl, 'user');
		this.editor.setSelection(index + 1);
	}
}

export default ImageExtend;