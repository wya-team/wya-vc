<template>
	<div class="vc-quilleditor-view ql-snow">
		<div class="ql-editor" v-html="content"/>
	</div>
</template>

<script>
import ImgsPreview from '../imgs-preview/index';
	
export default {
	name: 'vc-editor-view',
	props: {
		content: {
			type: String,
			default: ""
		}
	},
	data() {
		return {
			allImgUlrs: []
		};
	},
	watch: {
		content: {
			immediate: true,
			handler(v) {
				if (v) {
				 this.getImgUrls(v);
				} else {
					this.allImgUlrs = [];
				}
			}
		}
	},
	mounted() {
		this.initListener();
	},

	methods: {
		initListener() {
			let dom = document.getElementsByClassName('ql-editor');
			Array.from(dom).forEach(it => {
				if (it.parentNode.className.indexOf('vc-quilleditor-view ql-snow') !== -1) {
					it.addEventListener('click', (ev) => {
						if (ev.target.nodeName === 'IMG') {
							let curSrcIndex = this.allImgUlrs.indexOf(ev.target.currentSrc);
							this.handlePreview(ev, curSrcIndex);
						}
					});
				}
			});
		},

		getImgUrls(str) {
			let imgs = document.querySelectorAll('img');
			let imgReg = /<img.*?(?:>|\/>)/gi;
			// eslint-disable-next-line
			let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
			let arr = str.match(imgReg);
			if (arr) {
				let imgUrls = [];
				for (let i = 0; i < arr.length; i++) {
					let src = arr[i].match(srcReg);
					// 获取图片地址
					if (src[1]) {
						imgUrls.push(src[1]);
					}
				}
				this.allImgUlrs = imgUrls;
			}
		},

		handlePreview(e, idx) {
			let pos = {};
			try {
				const target = e.target; 
				const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
				const rect = target.getBoundingClientRect();
				pos = { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
			} catch (e) {
				console.log(e);
			}

			ImgsPreview.open({
				visible: true,
				dataSource: this.allImgUlrs,
				opts: {
					index: idx,
					history: false,
					getThumbBoundsFn: (index) => pos
				}
			});
		}
	}
};
</script>

<style lang="scss">
.vc-quilleditor-view {
}
</style>
