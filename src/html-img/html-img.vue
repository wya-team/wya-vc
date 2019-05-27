<template>
	<div ref="target">
		<slot />
	</div>
</template>
<script>
import { Utils } from '@wya/utils';
import VcError from '../vc/error';

export default {
	name: "vc-tpl",
	props: {
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
		async getImg(fileName = 'image', getFile = true) {
			try {
				let html2canvas = await import('html2canvas');
				// 兼容webpack 3.0/4.0 写法
				html2canvas = html2canvas.default ? html2canvas.default : html2canvas;

				const canvas = await html2canvas(this.$refs.target, { allowTaint: false, useCORS: true });

				const { file, base64Image } = await Utils.canvas2file(canvas, { fileName, getFile });

				return {
					file,
					base64Image
				};
			} catch (e) {
				throw new VcError('html-img', e);
			}
		},

		async download(fileName = 'image', getFile = true) {
			try {
				const { file, base64Image } = await this.getImg(fileName, getFile);

				let $this = document.createElement('a');
				// initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
				let evt = document.createEvent("HTMLEvents");
				evt.initEvent("click", true, true);
				// load
				$this.download = fileName;
				$this.href = URL.createObjectURL(file);
				$this.click();
				return {
					file,
					base64Image
				};
			} catch (e) {
				throw new VcError('html-img', e);
			}
		}
	}
};
</script>
<style></style>