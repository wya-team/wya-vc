<template>
	<div :style="[basicStyle]" class="vc-pull-scroll vc-hack-scroll">
		<div v-if="inverted" :style="[pullStyle, pullAnimateStyle]">
			<slot :status="rebuildScrollStatus" name="scroll-status">
				<vc-scroll-status
					:status="rebuildScrollStatus"
					:text="scrollText"
					:empty-text="emptyText"
				/>
			</slot>
		</div>
		<div v-if="!inverted && pullDown" :style="[pullStyle, pullAnimateStyle]">
			<slot :status="pullDownStatus" :pre-status="prePullDownStatus" name="pull-down-status">
				<vc-pull-down-status
					:status="pullDownStatus"
					:pre-status="prePullDownStatus"
					:text="pullDownText"
				/>
			</slot>
		</div>
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
			:pull-up-status.sync="pullUpStatus" 
			:auto="auto"
			v-on="hooks"
		>
			<slot name="header" />
			<!-- 项目中统一使用it, key由slot决定 -->
			<template v-for="(item, index) in dataSource">
				<slot :it="item" :index="index"/>
			</template>
			<slot name="footer" />
		</vc-core>
		<div v-if="!inverted && scroll" :style="[pullStyle, pullAnimateStyle]">
			<slot :status="rebuildScrollStatus" name="scroll-status">
				<vc-scroll-status
					:status="rebuildScrollStatus"
					:text="scrollText"
					:empty-text="emptyText"
				/>
			</slot>
		</div>
		<!-- TODO: 上拉 -->
		<div v-if="!inverted && pullUp" :style="[pullStyle, pullAnimateStyle]">
			<slot :status="pullUpStatus" :pre-status="prePullDownStatus" name="pull-up-status">
				<vc-pull-up-status
					:status="pullUpStatus"
					:pre-status="prePullDownStatus"
					:text="pullUpText"
				/>
			</slot>
		</div>
	</div>
</template>
<script>
import { pick } from 'lodash';
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
			return this.pullDownStatus === 3 || this.pullDownStatus === 0
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
				if (/pull-[a-z]-[a-z]/.test(key)) {
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
		['scrollTo', 'scrollTop', 'scrollBottom']
			.forEach(i => this[i] = this.$refs.core[i]);
	},
	methods: {
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