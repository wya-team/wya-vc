<template>	
	<div class="vc-progress">
		<div 
			v-if="type === 'line'" 
			class="vc-progress-line"
		>
			<div :class="{'vc-progress-line__info': showInfo}" class="vc-progress-line__wrapper">
				<div class="vc-progress-line__box round">
					<div 
						:style="innerStyle"
						:class="`vc-progress-line__inner--${currentStatus}`" 
						class="vc-progress-line__inner"
					/>
				</div>
			</div>
			<div v-if="showInfo" class="vc-progress-line__percent">
				<vc-icon 
					v-if="isStatus" 
					:type="currentStatus"
					:class="`vc-progress-line__icon--${currentStatus}`"
				/>
				<span v-else>{{ percent }}%</span>
			</div>
		</div>
		<div v-else class="vc-progress-circle">
			<div :style="circleBoxSize" class="vc-progress-circle__box">
				<svg viewBox="0 0 100 100">
					<path 
						:d="pathString"
						:stroke-width="strokeWidth" 
						stroke="#eaeef2" 
						fill-opacity="0"
					/>
					<path 
						:d="pathString"
						:style="pathStyle"
						:stroke-width="strokeWidth" 
						:stroke="strokeColor" 
						stroke-linecap="round" 
						fill-opacity="0" 
					/>
				</svg>
				<div class="vc-progress-circles__inner">
					<slot>
						<span>{{ percent }}%</span>
					</slot>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Icon from '../icon';

export default {
	name: "vc-progress",
	components: {
		'vc-icon': Icon
	},
	props: {
		type: {
			type: String,
			default: 'line'
		},
		percent: {
			type: Number,
			default: 0
		},
		status: {
			validator(val) {
				return ['normal', 'active', 'error', 'success'].includes(val);
			},
			default: 'normal'
		},
		showInfo: {
			type: Boolean,
			default: true
		},
		strokeWidth: {
			type: Number,
			default: 6
		},
		strokeColor: {
			type: String,
			default: '#2d8cf0'
		},
		size: {
			type: Number,
			default: 120
		}
	},
	data() {
		return {
			currentStatus: this.status
		};
	},
	computed: {
		circleBoxSize() {
			return {
				width: `${this.size}px`, 
				height: `${this.size}px`,
				position: 'relative'
			};
		},
		innerStyle() {
			let style = {
				height: this.strokeWidth + 'px',
				width: this.percent + '%'
			};
			return style;
		},
		isStatus() {
			return this.currentStatus === 'error' || this.currentStatus === 'success';
		},
		radius() {
			return 50 - this.strokeWidth / 2;
		},
		len() {
			return Math.PI * 2 * this.radius;
		},
		pathString() {
			return `M 50,50 m 0,-${this.radius}
			a ${this.radius},${this.radius} 0 1 1 0,${2 * this.radius}
			a ${this.radius},${this.radius} 0 1 1 0,-${2 * this.radius}`;
		}, // path路劲画圆
		pathStyle() {
			let style = {};
			style = {
				'stroke-dasharray': `${this.len}px ${this.len}px`,
				'stroke-dashoffset': `${((100 - this.percent) / 100 * this.len)}px`,
				'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
			};
			return style;
		}
	},
	watch: {
		percent(val) {
			console.log(val);
		},
		status(val) {
			this.currentStatus = val;
		}
	},
	created() {
		this.handleStatus();
	},
	methods: {
		handleStatus() {
			if (parseInt(this.percent, 10) == 100) {
				this.currentStatus = 'success';
			}
		}
	}
};
</script>
<style lang="scss">
@import '../style/index.scss';

@include block(vc-progress) {
	@include block(vc-progress-line) {
		@include element(wrapper) {
			width: 100%;
			display: inline-block;
			vertical-align: middle;
			@include element(box) {
				width: 100%;
				background-color: #f3f3f3;
				overflow: hidden;
				&.round{
					border-radius: 8px;	
				}
				@include element(inner) {
					position: relative;
					transition: width .5s cubic-bezier(.075,.82,.165,1);
					border-radius: 8px;
					background-color: #5495f6; 
					@include modifier(success) {
						background-color: #52c41a;
						
					}
					@include modifier(error) {
						background-color: #f5222d;
						
					}
					@include modifier(active) {
						&::before{
							content: '';
							position: absolute;
							left: 0;
							top: 0;
							height: 100%;
							background-color: #fff;
							animation: handleWidth 2s infinite;
							border-radius: 8px;
						}
					}
				}
			}
		}
		@include element(info) {
			margin-right: -30px;
			padding-right: 33px;
		}
		@include element(percent) {
			display: inline-block;
			vertical-align: middle;
			line-height: 1;
			@include element(icon) {
				@include modifier(success) {
					font-size: 12px;
					color: #52c41a;
				}
				@include modifier(error) {
					font-size: 12px;
					color: #f5222d;
				}
			}
		}
	}
	@include block(vc-progress-circle) {
		@include element(box) {
			width: 120px;
			height: 120px;
			@include element(inner){
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}

	@keyframes handleWidth{
		0%{
			width: 0;
			opacity: 0;
		}
		40%{
			opacity: .2;
		}
		80%{
			width: 100%;
			opacity: 0;
		}
		100%{
			width: 100%;
			opacity: 0;
		}
	}
}
</style>