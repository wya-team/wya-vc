import Vue from 'vue';
import upload from '../../upload';

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
		let { uploadProps = {} } = this.options;
		const el = document.querySelector('vc-quill-editor');
		const UploadComp = Vue.extend({ ...upload });
		this.vm = new UploadComp({
			propsData: {
				...uploadProps
			}
		}).$mount(el);
	}

	initListener = () => {
		this.editor.root.addEventListener('paste', this.handlePaste, false);
		this.editor.root.addEventListener('drop', this.handleDrop, false);
		this.vm.$on('file-success', this.handleFileSuccess);
	
	}

	getLength = () => {
		return (this.editor.getSelection() || {}).length || this.editor.getLength();
	}

	handleFileSuccess = (res) => {
		this.insert(res.data.url);
	}

	handlePaste = (evt) => {
		if (evt.clipboardData && evt.clipboardData.files && evt.clipboardData.files.length) {
			evt.preventDefault();
			this.readFiles(evt.clipboardData.files);
		}
	}

	handleDrop = (evt) => {
		evt.preventDefault();
		if (evt.dataTransfer && evt.dataTransfer.files && evt.dataTransfer.files.length) {
			// TODO
			if (document.caretRangeFromPoint) {
				const selection = document.getSelection();
				const range = document.caretRangeFromPoint(evt.clientX, evt.clientY);
				if (selection && range) {
					selection.setBaseAndExtent(range.startContainer, range.startOffset, range.startContainer, range.startOffset);
				}
			}
			this.readFiles(evt.dataTransfer.files);
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