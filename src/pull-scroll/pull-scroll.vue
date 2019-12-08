<template>
	<div :style="[basicStyle]" class="vc-pull-scroll vc-hack-scroll">
		<slot 
			v-if="inverted" 
			:style="[pullStyle, pullAnimateStyle]"
			:status="rebuildScrollStatus" 
			name="scroll-status"
		>
			<vc-scroll-status
				:style="[pullStyle, pullAnimateStyle]"
				:status="rebuildScrollStatus"
				:text="scrollText"
				:empty-text="emptyText"
			/>
		</slot>
		<slot
			v-if="!inverted && pullDown"
			:style="[pullStyle, pullAnimateStyle]" 
			:status="pullDownStatus" 
			:pre-status="prePullDownStatus" 
			name="pull-down-status"
		>
			<vc-pull-down-status
				:style="[pullStyle, pullAnimateStyle]"
				:status="pullDownStatus"
				:pre-status="prePullDownStatus"
				:text="pullDownText"
			/>
		</slot>
		<vc-core
			ref="core"
			:style="[pullStyle, pullAnimateStyle]"
			:show="show"
			:pull-down="!inverted && pullDown"
			:pull-up="!inverted && pullUp"
			:scroll="scroll"
			:inverted="inverted"
			:current="currentPage"
			:total="total"
			:scale-y="scaleY"
			:pause-y="pauseY"
			:load-data="loadData"
			:scroll-status="scrollStatus"
			:y.sync="y"
			:pull-down-status.sync="pullDownStatus" 
			:pre-pull-down-status.sync="prePullDownStatus" 
			:pull-up-status.sync="pullUpStatus" 
			:pre-pull-up-status.sync="prePullUpStatus" 
			:auto="auto"
			v-on="hooks"
		>
			<div v-if="$slots.header || $scopedSlots.header" ref="header"><slot name="header" /></div>
			<div v-if="$slots.content || $scopedSlots.content" ref="content"><slot name="content" /></div>
			<div 
				v-if="waterfall" 
				ref="waterfall" 
				:style="{ height: waterfallHeight + 'px' }"
				class="vc-pull-scroll__waterfall">
				<!-- 项目中统一使用it, key由slot决定 -->
				<template v-for="(item, index) in dataSource">
					<slot 
						:it="item" 
						:index="index" 
						:width="itemWidth"
						:styles="itemStyles[index]"
					/>
				</template>
			</div>
			<template v-else>
				<!-- 项目中统一使用it, key由slot决定 -->
				<template v-for="(item, index) in dataSource">
					<slot :it="item" :index="index" />
				</template>
			</template>
			<div v-if="$slots.footer || $scopedSlots.footer" ref="footer"><slot name="footer" /></div>
		</vc-core>
		<slot 
			v-if="!inverted && scroll"
			:status="rebuildScrollStatus"
			:style="[pullStyle, pullAnimateStyle]" 
			name="scroll-status"
		>
			<vc-scroll-status
				:style="[pullStyle, pullAnimateStyle]"
				:status="rebuildScrollStatus"
				:text="scrollText"
				:empty-text="emptyText"
			/>
		</slot>
		<slot
			v-if="!inverted && pullUp" 
			:status="pullUpStatus" 
			:pre-status="prePullDownStatus" 
			:style="[pullStyle, pullAnimateStyle]"
			:lack="isLack"
			name="pull-up-status"
		>
			<vc-pull-up-status
				:style="[pullStyle, pullAnimateStyle]"
				:status="pullUpStatus"
				:pre-status="prePullUpStatus"
				:text="pullUpText"
				:lack="isLack"
			/>
		</slot>
	</div>
</template>
<script>
/**
 * TODO: 长列表优化
 */
import { pick, throttle } from 'lodash';
import { Resize } from '../utils/index';
import Core from './core.vue';
import ScrollStatus from './scroll-status.vue';
import PullDownStatus from './pull-down-status.vue';
import PullUpStatus from './pull-up-status.vue';

export default {
	name: "vc-pull-scroll",
	components: {
		'vc-scroll-status': ScrollStatus,
		'vc-pull-down-status': PullDownStatus,
		'vc-pull-up-status': PullUpStatus,
		'vc-core': Core,
	},
	props: {
		height: {
			type: [String, Number],
			default: window.innerHeight,
		},
		pullDown: {
			type: Boolean,
			default: true
		},
		pullUp: {
			type: Boolean,
			default: false
		},
		scroll: {
			type: Boolean,
			default: true
		},
		wrapper: {
			type: Boolean,
			default: false,
		},
		waterfall: {
			type: Boolean,
			default: false
		},
		columns: {
			type: Number,
			default: 2
		},
		rowGap: {
			type: Number,
			default: 10
		},
		verticalGap: {
			type: Number,
			default: 10
		},
		...pick(Core.props, ['scaleY', 'pauseY', 'inverted', 'dataSource', 'show', 'loadData', 'total']),
		pullDownText: PullDownStatus.props.text,
		pullUpText: PullUpStatus.props.text,
		scrollText: ScrollStatus.props.text,
		emptyText: ScrollStatus.props.emptyText,
	},
	data() {
		return {
			y: 0, // 下拉的距离
			/**
			 * 0.未touchstart 
			 * 1.pulling但未达到pauseY 
			 * 2.pulling达到pauseY 
			 * 3.进入pause状态 （loading）
			 */
			pullDownStatus: 0,
			prePullDownStatus: 0,

			/**
			 * 0: '上滑加载', 
			 * 1: '加载中', 
			 * 2: '已全部加载', 
			 * 3: '网络不稳定，请稍后重试', 
			 * 4: '没有内容可供显示'
			 */
			scrollStatus: 0,

			/**
			 * 0.未touchstart 
			 * 1.pulling但未达到pauseY 
			 * 2.pulling达到pauseY 
			 * 3.进入pause状态 （loading）
			 */
			pullUpStatus: 0,
			prePullUpStatus: 0,

			// 页面
			currentPage: 0,

			// 内容的高度 是否大于 容器的高度，默认false
			isLack: false,

			// 瀑布流容器元素
			waterfallContainer: null,
			// 瀑布流每列的高度数组
			colHeights: [],
			// 列表每个item的宽度
			itemWidth: 0,
			// 附加给列表每个item的样式
			itemStyles: []
		};
	},
	computed: {
		basicStyle() {
			return { 
				minHeight: `${this.height}px`, 
				height: (this.wrapper && this.height) ? `${this.height}px` : "auto" 
			};
		},
		pullStyle() {
			// 影响内部fixed的为组织
			// TODO： 写对应的demo, 避免重构时出问题
			return this.y !== 0
				? {
					transform: `translate3d(0, ${this.y}px, 0)`,
				}
				: {};
		},
		pullAnimateStyle() {
			let allow = status => ['10', '23', '30', '20'].includes(status);
			let down = `${this.prePullDownStatus}${this.pullDownStatus}`;
			let up = `${this.prePullUpStatus}${this.pullUpStatus}`;

			return (allow(down) || allow(up))
				? { transition: `transform 300ms ease-out` }
				: {};
		},
		rebuildScrollStatus() {
			return this.isEmpty ? 4 : this.scrollStatus;
		},
		isEmpty() {
			return this.currentPage === 1 && this.dataSource.length === 0;
		},
		auto() {
			return this.basicStyle.height === 'auto';
		},
		hooks() {
			let basic = {
				'load-pending': this.handlePending,
				'load-success': this.handleSuccess,
				'load-finish': this.handleFinish,
			};

			Object.keys(this.$listeners).forEach((key) => {
				if (/pull-[^-]+-[^-]+/.test(key)) {
					basic[key] = this.$listeners[key];
				}
			});
			return basic;
		},
		// 瀑布流容器高度，因为子元素都是绝对定位，所以需要要用高度撑开
		waterfallHeight() {
			return Math.max.apply(null, this.colHeights);
		}
	},
	watch: {
		pullDownStatus(v, oldV) {
			this.prePullDownStatus = oldV;
		},
		pullUpStatus(v, oldV) {
			this.prePullUpStatus = oldV;
		},
		columns() {
			this.waterfall && this.resetWaterfall();
		}
	},
	mounted() {
		/**
		 * 方法的映射
		 */
		['scrollTo', 'scrollToTop', 'scrollToEnd']
			.forEach(i => this[i] = this.$refs.core[i]);
		
		this.pullUp 
			&& this.$refs.core
			&& Resize.on(this.$refs.core.$el, this.handleResize);
		
		if (this.waterfall) {
			this.initWaterfall();
			Resize.on(this.$refs.waterfall, this.handleWaterfallResize);
		}
	},
	beforeDestroy() {
		this.pullUp
			&& this.$refs.core 
			&& Resize.off(this.$refs.core.$el, this.handleResize);
		
		this.waterfall && Resize.off(this.$refs.waterfall, this.handleWaterfallResize);
	},
	methods: {
		handleResize() {
			let fn = () => {
				const { containerHeight } = this.$refs.core.getParams();

				this.isLack = this.$refs.core.$el.offsetHeight < containerHeight;
			};
			
			this.$refs.core.getParams ? fn() : setTimeout(fn, 0);
		},

		/**
		 * 加载中
		 */
		handlePending({ scroll, type }) {
			scroll && (this.scrollStatus = 1);
			this.$emit('load-pending', { type });
		},

		/**
		 * 成功
		 */
		handleSuccess({ data, page, type }) {
			this.currentPage = page;
			this.$emit('load-success', { data, type });
			this.waterfall && this.addWaterfallItem(data.length);
		},

		/**
		 * 结束
		 */
		handleFinish({ type }) {
			this.scrollStatus = this.total < Number(this.currentPage) + 1 ? 2 : 0;
			this.$emit('load-finish', { type });
		},
		/**
		 * 初始化瀑布流
		 */
		initWaterfall() {
			this.waterfallContainer = this.$refs.waterfall;
			this.calcItemWidth();
		},
		/**
		 * 重设瀑布流（原因：列数变化、容器resize）
		 */
		resetWaterfall() {
			this.calcItemWidth();
			this.itemStyles = [];
			this.colHeights = [];
			this.$nextTick(() => {
				this.addWaterfallItem(this.dataSource.length);
			});
		},
		/**
		 * 计算瀑布流每个item的宽度
		 */
		calcItemWidth() {
			const containerWidth = this.waterfallContainer.clientWidth;
			this.itemWidth = (containerWidth - (this.columns + 1) * this.rowGap) / this.columns;
		},
		/**
		 * 追加瀑布流item
		 */
		addWaterfallItem(count) {
			const baseLength = this.itemStyles.length;
			
			Array.from({ length: count }).forEach((it, index) => {
				const realIndex = baseLength + index;
				const item = this.waterfallContainer.children[realIndex];
				const height = item ? item.clientHeight : 0;
				
				let activeIndex = 0; // 应该追加item的那列的索引（第x列）
				// 第一行
				if (realIndex < this.columns) {
					this.itemStyles.push({
						position: 'absolute',
						top: 0,
						left: this.itemWidth * realIndex + this.rowGap * (realIndex + 1) + 'px',
						width: this.itemWidth + 'px'
					});
					activeIndex = realIndex;
				} else { // 其它行
					// 找到当前高度最小的那列的高度和索引
					const minHeight = this.colHeights.reduce((pre, cur, curIndex) => {
						if (cur < pre) {
							activeIndex = curIndex;
							return cur;
						} else {
							return pre;
						}
					}, this.colHeights[0]);
					this.itemStyles.push({
						position: 'absolute',
						top: minHeight + this.verticalGap + 'px',
						left: this.itemWidth * activeIndex + this.rowGap * (activeIndex + 1) + 'px',
						width: this.itemWidth + 'px'
					});
				}
				// 更新该列的高度
				this.$set(
					this.colHeights, 
					activeIndex, 
					(this.colHeights[activeIndex] || 0) + height + (realIndex < this.columns ? 0 : this.verticalGap)
				);
			});
		},
		handleWaterfallResize: throttle(function () {
			this.resetWaterfall();
		}, 200)
	}
};
</script>
<style lang="scss">
.vc-pull-scroll {
	position: relative;
	overflow-scrolling: touch;
	-webkit-overflow-scrolling: touch;
	overflow: auto;
	&__waterfall {
		position: relative;
		overflow: auto;
		height: 100%;
	}
}
</style>