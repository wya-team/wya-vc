import Vue from 'vue';
import upload from '../../upload';

const el = document.querySelector('vc-quill-editor');
const UploadComp = Vue.extend({ ...upload });
let vm = new UploadComp().$mount(el);
console.log(vm, 'sdsd');

class ImageExtend {
	constructor(editor, options = {}) {
		this.editor = editor;
		this.options = options;
		this.initListener();
		vm = { ...vm, ...options.uploadProps };
		// createVm(options.uploadProps);
	}

	initListener = () => {
		this.editor.root.addEventListener('paste', this.handlePaste, false);
		this.editor.root.addEventListener('drop', this.handleDrop, false);
		vm.$on('file-error', this.handleProgress);
		vm.$on('file-success', this.handleFileSuccess);
		vm.$on('file-error', this.handleFileError);
	}

	getLength = () => {
		return (this.editor.getSelection() || {}).length || this.editor.getLength();
	}

	handleProgress = (res) => {
		console.log(res, 'handleProgress');
		
	}

	handleFileSuccess = (res) => {
		console.log(res, 'fileSuccess');
		this.insert(res.data.url);
	}

	handleFileError =(res) => {
		console.log(res, 'handleFileError');
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
			console.log(file, 'rerereerer');
			vm.post(file);

			// const reader = new FileReader();
			// reader.onload = (evt) => {
			// 	callback(evt.target.result);
			// };
			// const blob = file.getAsFile ? file.getAsFile() : file;
			// if (blob instanceof Blob) {
			// 	reader.readAsDataURL(blob);
			// }
		});
	}

	insert = (dataUrl) => {
		const index = this.getLength();
		this.editor.insertEmbed(index, 'image', dataUrl, 'user');
	}
}

export default ImageExtend;