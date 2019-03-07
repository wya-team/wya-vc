<template>
	<div class="vc-pull-scroll">
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
			:direction="direction"
			:current="current"
			:scale-y="scaleY"
			:load-data="loadData"
			:is-end="isEnd" 
		>
			<slot />
		</vc-core>
		<vc-status
			v-if="scroll"
			:status="isEnd"
			:pulled-y="pulledY" 
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
			type: Number,
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
		pulledPauseY: {
			type: Number,
			default: 60,
		},
		current: String | Number,
		isEnd: {
			type: Number,
			default: 0
		},
		...pick(Core.props, ['scaleY', 'direction', 'dataSource', 'wrapper', 'show', 'loadData']),
		...pick(Status.props, ['scrollText', 'pullText'])
	},
	data() {
		return {
			pulledY: 0, // 下拉的距离
			pullStatus: 0, // 下拉的距离
		};
	},
	computed: {
		
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
		}
	}
};
</script>
<style>
.vc-pull-scroll {
	position: relative;
	overflow-scrolling: touch;
	overflow: auto;
}
</style>