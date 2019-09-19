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
			<slot name="header" />
			<slot name="content" />
			<!-- 项目中统一使用it, key由slot决定 -->
			<template v-for="(item, index) in dataSource">
				<slot :it="item" :index="index" />
			</template>
			<slot name="footer" />
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
import { pick } from 'lodash';
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
	},
	watch: {
		pullDownStatus(v, oldV) {
			this.prePullDownStatus = oldV;
		},
		pullUpStatus(v, oldV) {
			this.prePullUpStatus = oldV;
		}
	},
	mounted() {
		/**
		 * 方法的映射
		 */
		['scrollTo', 'scrollToTop', 'scrollToEnd']
			.forEach(i => this[i] = this.$refs.core[i]);
		
		this.pullUp && Resize.on(this.$refs.core.$el, this.handleResize);
	},
	destroyed() {
		this.pullUp && Resize.off(this.$refs.core.$el, this.handleResize);
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
		},

		/**
		 * 结束
		 */
		handleFinish({ type }) {
			this.scrollStatus = this.total < Number(this.currentPage) + 1 ? 2 : 0;
			this.$emit('load-finish', { type });
		}
	}
};
</script>
<style>
.vc-pull-scroll {
	position: relative;
	overflow-scrolling: touch;
	-webkit-overflow-scrolling: touch;
	overflow: auto;
}
</style>