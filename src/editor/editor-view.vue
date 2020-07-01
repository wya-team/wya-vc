<template>
	<div class="vc-quilleditor-view ql-snow">
		<div class="ql-editor" v-html="content" />
	</div>
</template>

<script>
import { Load } from '@wya/utils';
import { getUid } from '../utils/utils';
import { lineHeight, letterSpacing } from './constant';
import ImgsPreview from '../imgs-preview/index';
import { insertFontStyle, insertLineHeightStyle, insertLetterSpacingStyle } from './utils';
	
export default {
	name: 'vc-editor-view',
	props: {
		content: {
			type: String,
			default: ""
		},
		fontSize: {
			type: Array,
			default: () => ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '50px']
		},
		lineHeight: {
			type: Array,
			default: () => lineHeight
		},
		letterSpacing: {
			type: Array,
			default: () => letterSpacing
		},
	},
	data() {
		return {
		};
	},
	watch: {
		content: {
			immediate: true,
			handler(v) {
				v ? this.getImgUrls(v) : (this.imgSource = []);
			}
		}
	},
	created() {
		this.styleId = getUid('editor-view-style');
		this.lineHeightStyleId = getUid('editor-toolbar-style');
		this.letterSpacingStyleId = getUid('editor-toolbar-style');
		insertFontStyle(this.fontSize, this.styleId);
		insertLineHeightStyle(this.lineHeight.map((it) => String(it * 10)), this.lineHeightStyleId); // 设置的样式1.2为class不起由于有.不生效, 默认扩大十倍，样式再除以10
		insertLetterSpacingStyle(this.letterSpacing, this.letterSpacingStyleId);
	},
	mounted() {
		this.initListener();
	},
	destroyed() {
		Load.removeCSSCode(this.styleId);
		Load.removeCSSCode(this.lineHeightStyleId);
		Load.removeCSSCode(this.letterSpacingStyleId);
	},
	methods: {
		initListener() {
			let dom = document.getElementsByClassName('ql-editor');
			Array.from(dom).forEach(it => {
				if (it.parentNode.className.indexOf('vc-quilleditor-view ql-snow') !== -1) {
					it.addEventListener('click', (e) => {
						if (e.target.nodeName === 'IMG') {
							let index = (this.imgSource || []).indexOf(e.target.currentSrc);
							this.handlePreview(e, index);
						}
					});
				}
			});
		},
		getImgUrls(content) {
			/* eslint-disable */
			const IMG_REGX = /<img.*?(?:>|\/>)/gi;
			const SRC_REGX = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
			/* eslint-enable */

			let imgs = content.match(IMG_REGX);
			if (imgs) {
				let imgUrls = [];
				for (let i = 0; i < imgs.length; i++) {
					let src = imgs[i].match(SRC_REGX);
					// 获取图片地址
					src[1] && imgUrls.push(src[1]);
				}
				this.imgSource = imgUrls;
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
				dataSource: this.imgSource,
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
