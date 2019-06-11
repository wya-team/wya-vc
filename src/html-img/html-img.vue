<template>
	<div ref="target">
		<slot />
	</div>
</template>
<script>
import { Utils } from '@wya/utils';
import { isDataURL } from '../utils/utils';

import VcError from '../vc/error';

export default {
	name: "vc-html-img",
	props: {
		// useCORS
		crossOrigin: {
			type: String,
			// ''. 'anonymous', 'use-credentials'
			default: 'anonymous',
			validator: v => /^(|anonymous|use-credentials)$/.test(v),
		},
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
		async getImage(opts = {}) {
			const { filename = 'image', getFile = true } = opts;
			try {
				let html2canvas = await import('html2canvas');
				// 兼容webpack 3.0/4.0 写法
				html2canvas = html2canvas.default ? html2canvas.default : html2canvas;

				// 处理跨域兼容
				this.crossOrigin && await this.loadImageURL();

				const canvas = await html2canvas(this.$refs.target, { allowTaint: false, useCORS: true });

				const { file, base64Image } = await Utils.canvas2file(canvas, { filename, getFile });

				return {
					file,
					base64Image
				};
			} catch (e) {
				throw new VcError('html-img', e);
			}
		},

		async download(opts = {}) {
			const { filename = 'image', getFile = true } = opts;
			try {
				const { file, base64Image } = await this.getImage({ filename, getFile });

				let $this = document.createElement('a');
				// initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
				let evt = document.createEvent("HTMLEvents");
				evt.initEvent("click", true, true);
				// load
				$this.download = filename;
				$this.href = URL.createObjectURL(file);
				$this.click();
				return {
					file,
					base64Image
				};
			} catch (e) {
				throw new VcError('html-img', e);
			}
		},

		/**
		 * 网络的图片如果没有加上crossOrigin，且没有放在第一个就会出现问题（Safari）
		 */
		loadImageURL() {
			return Promise.all([...this.$refs.target.querySelectorAll('img')].map((node) => {
				return new Promise((resolve, reject) => {
					if (isDataURL(node.src)) { // data: base64
						resolve();
					} else {
						let img = new Image();
						img.crossOrigin = this.crossOrigin;
						img.src = `${node.src}?=${new Date().getTime()}`; // 强制不缓存
						img.onload = () => {
							node.src = img.src;
							resolve();
						};
						img.onerror = () => {
							// 打印不了该图片
							resolve();
						};
					}
				});
			}));
		},

	}
};
</script>
