<template>
	<div 
		:class="stepClasses"
		class="vc-steps-step"
	>
		<div class="vc-steps-step__tail" />
		<div class="vc-steps-step__icon">
			<div class="vc-steps-step__icon--wrapper">
				<vc-icon v-if="['finish', 'error'].includes(currentStatus) || icon" :type="currentIcon" />
				<span v-else>{{ stepNumber }}</span>
			</div>
		</div>
		<div class="vc-steps-step__content">
			<div class="vc-steps-step__title">
				<slot name="title">{{ title }}</slot>
				<slot name="subtitle">
					<div v-if="subtitle" class="vc-steps-step__subtitle">
						{{ subtitle }}
					</div>
				</slot>
			</div>
			<div class="vc-steps-step__description">
				<slot name="description">{{ description }}</slot>
			</div>
		</div>
	</div>
</template>
<script>
import Icon from '../icon/index';
import Extends from '../extends';

export default {
	name: "vc-steps-step",
	components: {
		'vc-icon': Icon
	},
	mixins: [...Extends.mixins(['emitter'])],
	props: {
		title: String,
		subtitle: String,
		description: String,
		icon: String,
		status: {
			type: String,
			validator(value) {
				return ['wait', 'process', 'finish', 'error'].includes(value);
			}
		}
	},
	data() {
		return {
			stepNumber: '',
			total: 1
		};
	},
	computed: {
		currentStatus() {
			if (this.status) {
				return this.status;	
			}
			let currentStep = this.$parent.current;
			if (this.stepNumber < currentStep) {
				return 'finish';
			} else if (this.stepNumber == currentStep) {
				return this.$parent.status || 'process';
			}
			return 'wait';
		},
		currentIcon() {
			if (this.icon) return this.icon;
			return this.currentStatus === 'error' ? 'delete' : 'mark';
		},
		stepClasses() {
			return {
				'is-last': this.stepNumber == this.total,
				'is-wait': this.currentStatus === 'wait',
				'is-process': this.currentStatus === 'process',
				'is-finish': this.currentStatus === 'finish',
				'is-error': this.currentStatus === 'error',
			};
		},
	},
	mounted() {
		this.dispatch('vc-steps', 'step-add');
	},
	beforeDestroy() {
		this.dispatch('vc-steps', 'step-remove');
	},
	methods: {}
};
</script>
<style lang="scss">
@import '../style/vars.scss';

@include block(vc-steps-step) {
	position: relative;
    flex: 1;
    overflow: hidden;
    vertical-align: top;
	white-space: nowrap;
	padding-left: 16px;
	@include pseudo(first-child) {
		padding-left: 0;
	}
	@include element(tail) {
		position: absolute;
		top: 0;
		left: 16px;
		display: none;
		width: 1px;
		height: 100%;
		padding: 38px 0 6px;
		&::after {
			display: inline-block;
			width: 1px;
			height: 100%;
			background: #f0f0f0;
			border-radius: 1px;
			transition: background .3s;
			content: "";
		}
	}
	@include element(icon) {
		display: inline-block;
		width: 32px;
		height: 32px;
		margin: 0 8px 0 0;
		font-size: 16px;
		line-height: 32px;
		text-align: center;
		border: 1px solid rgba(0,0,0,.25);
		border-radius: 32px;
		transition: background-color .3s,border-color .3s;
		color: rgba(0,0,0,.25);
		@include modifier(wrapper) {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
		}
	}
	@include element(content) {
		display: inline-block;
		vertical-align: top;
	}
	@include element(title) {
		position: relative;
		display: inline-block;
		padding-right: 16px;
		color: #333333;
		font-size: 16px;
		line-height: 32px;
		&::after {
			position: absolute;
			top: 16px;
			left: 100%;
			display: block;
			width: 9999px;
			height: 1px;
			background: #f0f0f0;
			content: "";
		}
	}
	@include element(subtitle) {
		display: inline;
		margin-left: 8px;
		font-weight: 400;
		color: #999999;
		font-size: 14px;
	}
	@include element(description) {
		max-width: 140px;
		white-space: normal;
		font-size: 14px;
		color: #999999;
	}
	@include when(last) {
		.vc-steps-step__title {
			&::after {
				display: none
			}
		}
		.vc-steps-step__tail {
			display: none;
		}
	}
	@include when(wait) {
		.vc-steps-step__description, .vc-steps-step__title {
			color: #999999;
		}
	}
	@include when(process) {
		.vc-steps-step__icon {
			background: #1890ff;
			border-color: #1890ff;
			color: #ffffff;
		}
		.vc-steps-step__description {
			color: #333333;
		}
	}
	@include when(finish) {
		.vc-steps-step__icon {
			color: #1890ff;
			border-color: #1890ff;
		}
		.vc-steps-step__title {
			&::after {
				background: #1890ff;
			}
		}
		.vc-steps-step__tail {
			&::after {
				background: #1890ff;
			}
		}
	}
	@include when(error) {
		.vc-steps-step__icon {
			color: #ff4d4f;
			border-color: #ff4d4f;
		}
		.vc-steps-step__title {
			color: #ff4d4f;
		}
		.vc-steps-step__description {
			color: #ff4d4f;
		}
	}
}
</style>