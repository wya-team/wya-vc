<template>
	<div
		:id="id"
		ref="pswpElement"
		class="pswp"
		tab-index="-1"
		role="dialog"
		aria-hidden="true"
	>
		<div class="pswp__bg" />
		<div class="pswp__scroll-wrap">
			<div class="pswp__container">
				<div class="pswp__item" />
				<div class="pswp__item" />
				<div class="pswp__item" />
			</div>
			<div class="pswp__ui pswp__ui--hidden">
				<div class="pswp__top-bar">
					<div class="pswp__counter" />
					<button
						class="pswp__button pswp__button--close"
						title="关闭(Esc)"
					/>
					<!-- <button
						class="pswp__button pswp__button--share"
						title="Share"
					/> -->
					<button
						class="pswp__button pswp__button--fs"
						title="全屏"
					/>
					<button class="pswp__button pswp__button--zoom" title="缩放" />
					<vc-icon 
						type="rotate-right" 
						class="vc-imgs-preview-core__button" 
						title="向右旋转90度"
						@click="handleRotate(90)" 
					/>
					<!-- icon标签不能直接为svg, 否则会报错 -->
					<vc-icon 
						type="rotate-left" 
						class="vc-imgs-preview-core__button" 
						title="向左旋转90度"
						@click="handleRotate(-90)" 
					/>
					<template v-for="(action, index) in actionBar">
						<vc-icon 
							:key="index"
							:type="action.icon" 
							:title="action.name" 
							class="vc-imgs-preview-core__button"
							@click="action.onClick(photoSwipe, dataSource)" 
						/>
					</template>
					<div class="pswp__preloader">
						<div class="pswp__preloader__icn">
							<div class="pswp__preloader__cut">
								<div class="pswp__preloader__donut" />
							</div>
						</div>
					</div>
				</div>
				<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
					<div class="pswp__share-tooltip" />
				</div>
				<button
					class="pswp__button pswp__button--arrow--left"
					title="上一张"
				/>
				<button
					class="pswp__button pswp__button--arrow--right"
					title="下一张"
				/>
				<div class="pswp__caption">
					<div 
						class="pswp__caption__center" 
						style="text-align: center"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Portal from '../portal/index';
import Icon from '../icon/index';
import { photoSwipeEvents } from './constants';
import { VcInstance } from '../vc/index';

/**
 * visible 父级传递
 * show 当前组件内
 */
const wrapperComponent = {
	name: "vc-imgs-preview-core",
	components: {
		'vc-icon': Icon
	},
	props: {
		id: String,
		// 图片源
		dataSource: Array,

		// ps 参数
		opts: {
			type: Object,
			default: () => ({})
		},

		// ps 事件
		events: {
			type: Object,
			default: () => ({

			})
		},
		// 工具栏扩展
		actionBar: {
			type: Array,
			default: () => (VcInstance.config.ImgsPreview.actionBar || [])
		},
		// 获取实例
		getInstance: Function
	},
	data() {
		return {
		};
	},
	computed: {
		images() {
			return this.dataSource.map((item, index) => {
				if (typeof item === 'object') {
					return {
						w: 1200,
						h: 900,
						...item
					}; // 会被photoswiper所引用
				} else {
					return {
						src: item,
						thumbnail: item,
						title: `IMG_${index + 1}`,
						w: 1200,
						h: 900
					};
				}
			});
		}
	},
	watch: {
	},
	created() {
		this.responsiveImages = [];
		// 避免污染
		this.defaultEvent = {
			gettingData: this.gettingData
		};

		this.angle = 0;
	},
	mounted() {
		/**
		 * this.initPhotoSwipe(), 会造成动画异常，可能绘制影响
		 */
		this.$nextTick(this.initPhotoSwipe);
	},
	destroyed() {
		this.destroyPhotoSwipe();
	},
	methods: {
		/**
		 * 事件处理
		 * 自动适配
		 * http://photoswipe.com/documentation/responsive-images.html
		 */
		gettingData(instance, index) {
			let { items } = this.photoSwipe;
			let item = items[index];
			if (item.src && !this.responsiveImages.includes(item.src)) {
				let img = new Image();
				img.src = item.src;
				img.onload = () => {
					this.responsiveImages.push(img);
					item.w = img.naturalWidth;
					item.h = img.naturalHeight;
					this.photoSwipe.updateSize(true);
				};
			}
		},
		/**
		 * 旋转
		 */
		handleResetAngle() {
			this.angle = 0;
			document.querySelectorAll('.pswp__img').forEach(i => {
				i.style.transform = `rotate(0deg)`;
			});
		},
		handleRotate(newAngle) {
			this.angle += newAngle;
			document.querySelectorAll('.pswp__img').forEach(i => {
				i.style.transform = `rotate(${this.angle}deg)`;
			});
		},
		/**
		 * 实例
		 */
		async initPhotoSwipe() {
			// 插入的节点
			let pswpElement = this.$refs.pswpElement;

			/* eslint-disable */

			let PhotoSwipe = window.PhotoSwipe 
				|| await import("photoswipe");
			let PhotoSwipeUI_Default = window.PhotoSwipeUI_Default 
				|| await import("photoswipe/dist/photoswipe-ui-default");

			PhotoSwipe = PhotoSwipe.default ? PhotoSwipe.default : PhotoSwipe;
			PhotoSwipeUI_Default = PhotoSwipeUI_Default.default ? PhotoSwipeUI_Default.default : PhotoSwipeUI_Default;

			/* eslint-enable */

			// 实例
			this.photoSwipe = new PhotoSwipe(
				pswpElement, 
				PhotoSwipeUI_Default, 
				this.images, 
				{
					...this.opts,
					closeOnScroll: false,
				}
			);

			this.getInstance && this.getInstance(this.photoSwipe);

			this.photoSwipe.next = () => {
				this.handleResetAngle();
				this.photoSwipe.goTo(this.photoSwipe.getCurrentIndex() + 1);
			};

			this.photoSwipe.prev = () => {
				this.handleResetAngle();
				this.photoSwipe.goTo(this.photoSwipe.getCurrentIndex() - 1);
			};

			// 绑定事件
			photoSwipeEvents.forEach((event) => {
				const callback = this.events[event] || this.defaultEvent[event];
				if (callback || event === 'destroy') {
					this.photoSwipe.listen(event, (...args) => {
						if (callback) {
							args.unshift(this);
							callback(...args);
						}
						if (event === 'destroy') {
							// 关闭时，将当前的index给外部
							this.$emit('close', { current: this.photoSwipe.getCurrentIndex() });
						}
					});
				}
			});

			// 初始化
			this.photoSwipe.init();
		},
		/**
		 * 销毁实例
		 */
		destroyPhotoSwipe() {
			if (!this.photoSwipe) {
				return;
			}
			this.photoSwipe.close();
		}
	}
};
export default wrapperComponent;

export const Func = new Portal(wrapperComponent, {
	promise: false
});

</script>
<style lang='scss'>
@import '../style/vars.scss';

@include block(vc-imgs-preview-core) {
	@include element(button) {
		width: 44px;
		height: 44px;
		position: relative;
		background: none;
		cursor: pointer;
		overflow: visible;
		-webkit-appearance: none;
		display: block;
		border: 0;
		padding: 0;
		margin: 0;
		float: right;
		opacity: 0.75;
		transition: opacity 0.2s;
		box-shadow: none;
		color: white;
		line-height: 44px;
		text-align: center;
		font-size: 16px
	}
}
</style>