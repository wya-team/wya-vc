<template>
	<div :style="{ height: h }" class="vc-pull-scroll">
		<vc-status
			v-if="pull"
			:style="style" 
			:status="status" 
			:y="y" 
			type="pull" 
		/>
		<vc-core
			:style="style"
			:show="show"
			:pull="pull"
			:scroll="scroll"
			:reverse="reverse"
			:current="current"
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
			<slot />
		</vc-core>
		<vc-status
			v-if="scroll"
			:style="style"
			:status="isEnd"
			:y="y" 
			:current="current"
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
			default: 'auto',
		},
		pull: {
			type: Boolean,
			default: true
		},
		scroll: {
			type: Boolean,
			default: true
		},
		current: String | Number,
		total: String | Number,
		...pick(Core.props, ['scaleY', 'pauseY', 'reverse', 'dataSource', 'show', 'loadData']),
		...pick(Status.props, ['scrollText', 'pullText'])
	},
	data() {
		return {
			y: 0, // 下拉的距离
			status: 0, // 下拉的距离
			isEnd: 0,

			pulling: false,
		};
	},
	computed: {
		h() {
			return typeof this.height === 'number' 
				? `${this.height}px` 
				: this.height;
		},
		auto() {
			return this.height === 'auto';
		},
		style() {
			return {
				transition: `transform ${!this.pulling && (this.status === 0 || this.status === 3) ? '300' : '0'}ms ease-out`,
				transform: `translate3d(0, ${this.y}px, 0)`
			};
		}
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
			// this.$emit('load-pending', res);
		},
		handleSuccess(res) {
			// this.$emit('load-success', res);
		},
		handleFinish(res) {
			this.isEnd = this.total < this.current + 1 ? 2 : 0;
			// this.$emit('load-finish', res);
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