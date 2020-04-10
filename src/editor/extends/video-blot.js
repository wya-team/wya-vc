export const registVideoBlot = (Quill) => {
	const BlockEmbed = Quill.import('blots/block/embed');
	// 生成video 标签插入editor中
	class VideoBlot extends BlockEmbed {
		static create(value) {
			let node = super.create();
			node.setAttribute('src', value.url);
			node.setAttribute('controls', value.controls);
			node.setAttribute('width', value.width);
			node.setAttribute('height', value.height);
			node.setAttribute('style', value.style);
			node.setAttribute('webkit-playsinline', true);
			node.setAttribute('playsinline', true);
			node.setAttribute('x5-playsinline', true);
			node.setAttribute('poster', value.poster);
			return node;
		}

		static value(node) {
			return {
				url: node.getAttribute('src'),
				controls: node.getAttribute('controls'),
				width: node.getAttribute('width'),
				height: node.getAttribute('height'),
				style: node.getAttribute('style'),
				poster: node.getAttribute('poster'),
			};
		}
	}
	VideoBlot.blotName = 'vc-video';
	VideoBlot.tagName = 'video';
	Quill.register(VideoBlot);
};