<template>
	<div :style="[basicStyle]" class="vc-pull-scroll">
		<div v-if="inverted" :style="style">
			<slot :status="rebuildScrollStatus" name="scroll-status">
				<vc-scroll-status
					:status="rebuildScrollStatus"
					:text="scrollText"
					:empty-text="emptyText"
				/>
			</slot>
		</div>
		<div v-if="!inverted && pull" :style="style">
			<slot :status="rebuildScrollStatus" name="pull-status">
				<vc-pull-status
					:status="pullStatus"
					:text="pullText"
				/>
			</slot>
		</div>
		<vc-core
			ref="core"
			:style="style"
			:show="show"
			:pull="!inverted && pull"
			:scroll="scroll"
			:inverted="inverted"
			:current="currentPage"
			:total="total"
			:scale-y="scaleY"
			:pause-y="pauseY"
			:load-data="loadData"
			:scroll-status="scrollStatus"
			:y.sync="y"
			:pull-status.sync="pullStatus" 
			:auto="auto"
			@load-pending="handlePending"
			@load-success="handleSuccess"
			@load-finish="handleFinish"
			@pull-start="handleStart"
			@pull-end="handleEnd"
		>
			<slot name="header" />
			<!-- 项目中统一使用it, key由slot决定 -->
			<template v-for="(item, index) in dataSource">
				<slot :it="item" :index="index"/>
			</template>
			<slot name="footer" />
		</vc-core>
		<div v-if="!inverted && scroll" :style="style">
			<slot :status="rebuildScrollStatus" name="scroll-status">
				<vc-scroll-status
					:status="rebuildScrollStatus"
					:text="scrollText"
					:empty-text="emptyText"
				/>
			</slot>
		</div>
	</div>
</template>
<script>
import { pick } from 'lodash';
import Core from './core.vue';
import ScrollStatus from './scroll-status.vue';
import PullStatus from './pull-status.vue';

export default {
	name: "vc-pull-scroll",
	components: {
		'vc-scroll-status': ScrollStatus,
		'vc-pull-status': PullStatus,
		'vc-core': Core,
	},
	props: {
		height: {
			type: Number | String,
			default: window.innerHeight,
		},
		pull: {
			type: Boolean,
			default: true
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
		scrollText: ScrollStatus.props.text,
		pullText: PullStatus.props.text,
		emptyText: ScrollStatus.props.emptyText,
	},
	data() {
		return {
			y: 0, // 下拉的距离
			pullStatus: 0,
			scrollStatus: 0,

			pulling: false,

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
		auto() {
			return this.basicStyle.height === 'auto';
		},
		style() {
			// 影响内部fixed的为组织
			// TODO： 写对应的demo, 避免重构时出问题
			return this.y !== 0 
				? {
					transition: `transform ${!this.pulling && (this.pullStatus === 0 || this.pullStatus === 3) ? '300' : '0'}ms ease-out`,
					transform: `translate3d(0, ${this.y}px, 0)`
				}
				: {};
		},
		isEmpty() {
			return this.currentPage === 1 && this.dataSource.length === 0;
		},
		rebuildScrollStatus() {
			return this.isEmpty ? 4 : this.scrollStatus;
		}
	},
	mounted() {
		['scrollTo', 'scrollTop', 'scrollBottom']
			.forEach(i => this[i] = this.$refs.core[i]);
	},
	methods: {
		reset() {
			this.y = 0;
			this.pullStatus = 0;
		},
		handleChange(value) {
			const { pauseY } = this;
			/**
			 * 0.未touchstart 
			 * 1.pulling但未达到pauseY 
			 * 2.pulling达到pauseY 
			 * 3.进入pause状态 （loading）
			 */
			switch (value) {
				case 0:
					this.y = 0;
					this.pullStatus = value;
					break;
				case 3:
					this.y = this.pauseY;
					this.pullStatus = value;
					break;
				default:
					this.pullStatus = value;
					break;
			}
		},
		handlePending(res) {
			this.scrollStatus = 1;
			this.$emit('load-pending', res);
		},
		handleSuccess(res, page) {
			this.currentPage = page;
			this.$emit('load-success', res);
		},
		handleFinish(res) {
			this.scrollStatus = this.total < Number(this.currentPage) + 1 ? 2 : 0;
			this.$emit('load-finish', res);
		},
		handleStart() {
			this.pulling = true;
		},
		handleEnd() {
			this.pulling = false;
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