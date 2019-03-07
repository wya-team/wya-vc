<template>
	<div :style="{ height: h }" class="vc-pull-scroll">
		<vc-status
			v-if="pull"
			:status="pullStatus" 
			:y="pulledY" 
			type="pull" 
		/>
		<vc-core
			:show="show"
			:pull="pull"
			:scroll="scroll"
			:reverse="reverse"
			:current="current"
			:scale-y="scaleY"
			:load-data="loadData"
			:is-end.sync="isEnd" 
			:auto="auto"
			@load-pending="handlePending"
			@load-success="handleSuccess"
			@load-finish="handleFinish"
		>
			<slot />
		</vc-core>
		<vc-status
			v-if="scroll"
			:status="isEnd"
			:y="pulledY" 
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
		pulledPauseY: {
			type: Number,
			default: 60,
		},
		current: String | Number,
		total: String | Number,
		...pick(Core.props, ['scaleY', 'reverse', 'dataSource', 'show', 'loadData']),
		...pick(Status.props, ['scrollText', 'pullText'])
	},
	data() {
		return {
			pulledY: 0, // 下拉的距离
			pullStatus: 0, // 下拉的距离
			isEnd: 0
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
		}
	},
	methods: {
		reset() {
			this.pulledY = 0;
			this.pullStatus = 0;
		},
		handlePulling(value) {
			this.pulledY = value;
		},
		handleChange(value) {
			const { pulledPauseY } = this.props;
			/**
			 * 0.未touchstart 
			 * 1.pulling但未达到pulledPauseY 
			 * 2.pulling达到pulledPauseY 
			 * 3.进入pause状态 （loading）
			 */
			switch (pullStatus) {
				case 0:
					this.pulledY = 0;
					this.pullStatus = value;
					break;
				case 3:
					this.pulledY = this.pulledPauseY;
					this.pullStatus = value;
					break;
				default:
					this.pullStatus = value;
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