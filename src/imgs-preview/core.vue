<template>
	<div
		ref="pswpElement"
		:id="id"
		class="pswp"
		tab-index="-1"
		role="dialog"
		aria-hidden="true"
	>
		<div class="pswp__bg"/>
		<div class="pswp__scroll-wrap">
			<div class="pswp__container">
				<div class="pswp__item"/>
				<div class="pswp__item"/>
				<div class="pswp__item"/>
			</div>
			<div class="pswp__ui pswp__ui--hidden">
				<div class="pswp__top-bar">
					<div class="pswp__counter"/>
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
					<button class="pswp__button pswp__button--zoom" title="缩放"/>
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
					<div class="pswp__preloader">
						<div class="pswp__preloader__icn">
							<div class="pswp__preloader__cut">
								<div class="pswp__preloader__donut"/>
							</div>
						</div>
					</div>
				</div>
				<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
					<div class="pswp__share-tooltip"/>
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
import Photoswipe from 'photoswipe';
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";

import CreatePortal from '../create-portal/index';
import Icon from '../icon/index';
import { photoSwipeEvents } from './constants';

/**
 * visible 父级传递
 * show 当前组件内
 */
const config = {
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
			this.angle = this.angle + newAngle;
			document.querySelectorAll('.pswp__img').forEach(i => {
				i.style.transform = `rotate(${this.angle}deg)`;
			});
		},
		/**
		 * 实例
		 */
		initPhotoSwipe() {
			// 插入的节点
			let pswpElement = this.$refs.pswpElement;

			// 实例
			this.photoSwipe = new Photoswipe(
				pswpElement, 
				PhotoswipeUIDefault, 
				this.images, 
				this.opts
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
							this.$emit('close');
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
export default config;

export const Func = CreatePortal({}, config);

</script>
<style lang='scss'>
@import '../style/index.scss';

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
		font-size: 20px
	}
}
</style>