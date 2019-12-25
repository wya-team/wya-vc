<template>
	<div class="vc-quilleditor-view ql-snow">
		<div class="ql-editor" v-html="content" />
	</div>
</template>

<script>
import ImgsPreview from '../imgs-preview/index';
	
export default {
	name: 'vc-editor-view',
	props: {
		content: String
	},
	data() {
		return {
		};
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
							this.handlePreview(ev, 0);
						}
					});
				}
			});
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
				dataSource: [e.target.currentSrc],
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
