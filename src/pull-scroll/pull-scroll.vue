<template>
	<div :style="[basicStyle]" class="vc-pull-scroll">
		<vc-status
			v-if="reverse"
			:style="style"
			:status="isEnd"
			:y="y" 
			:current="currentPage"
			:data-source="dataSource" 
			type="scroll"
		/>
		<vc-status
			v-if="!reverse && pull"
			:style="style" 
			:status="status" 
			:y="y" 
			type="pull" 
		/>
		<!-- TODO: reverse-status -->
		<vc-core
			ref="core"
			:style="style"
			:show="show"
			:pull="!reverse && pull"
			:scroll="scroll"
			:reverse="reverse"
			:current="currentPage"
			:total="total"
			:scale-y="scaleY"
			:pause-y="pauseY"
			:load-data="loadData"
			:is-end="isEnd"
			:y.sync="y"
			:status.sync="status" 
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
		<vc-status
			v-if="!reverse && scroll"
			:style="style"
			:status="isEnd"
			:y="y" 
			:current="currentPage"
			:data-source="dataSource" 
			type="scroll"
		/>
	</div>
</template>
<script>
import { pick } from 'lodash';
import Status from './status.vue';
import Core from './core.vue';

export default {
	name: "vc-pull-scroll",
	components: {
		'vc-status': Status,
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
		...pick(Core.props, ['scaleY', 'pauseY', 'reverse', 'dataSource', 'show', 'loadData', 'current', 'total']),
		...pick(Status.props, ['scrollText', 'pullText'])
	},
	data() {
		return {
			y: 0, // 下拉的距离
			status: 0, // 下拉的距离
			isEnd: 0,

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
			return {
				transition: `transform ${!this.pulling && (this.status === 0 || this.status === 3) ? '300' : '0'}ms ease-out`,
				transform: `translate3d(0, ${this.y}px, 0)`
			};
		}
	},
	mounted() {
		['scrollTo', 'scrollTop', 'scrollBottom']
			.forEach(i => this[i] = this.$refs.core[i]);
	},
	methods: {
		reset() {
			this.y = 0;
			this.status = 0;
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
					this.status = value;
					break;
				case 3:
					this.y = this.pauseY;
					this.status = value;
					break;
				default:
					this.status = value;
					break;
			}
		},
		handlePending(res) {
			this.isEnd = 1;
			this.$emit('load-pending', res);
		},
		handleSuccess(res, page) {
			this.currentPage = page;
			this.$emit('load-success', res);
		},
		handleFinish(res) {
			this.isEnd = this.total < Number(this.currentPage) + 1 ? 2 : 0;
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