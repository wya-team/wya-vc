<template>
	<div :class="stepsClasses" class="vc-steps">
		<slot />
	</div>
</template>
<script>
import { debounce } from 'lodash';

export default {
	name: "vc-steps",
	props: {
		current: Number, // 当前位置
		direction: {
			type: String,
			defualt: 'horizontal',
			validator(value) {
				return ['horizontal', 'vertical'].includes(value);
			}
		},
		size: {
			type: String,
			defualt: 'default',
			validator(value) {
				return ['default', 'small'].includes(value);
			}
		},
		// 当初步骤的状态 
		status: {
			type: String,
			default: 'process',
			validator(value) {
				return ['wait', 'process', 'finish', 'error'].includes(value);
			}
		}
	},
	data() {
		return {};
	},
	computed: {
		stepsClasses() {
			return { 
				'is-vertical': this.direction === 'vertical',
				'is-small': this.size === 'small'
			};
		}
	},
	watch: {
		current() {
			this.updateChildren();
		}
	},
	created() {
		this.$on('step-add', this.updateSteps());
		this.$on('step-remove', this.updateSteps());
	},
	methods: {
		updateSteps() {
			return debounce(function () {
				this.updateChildren();
			});
		},
		updateChildren() {
			let total = this.$children.length;
			this.$children.forEach((child, index) => {
				child.stepNumber = index + 1;
				child.total = total;
			});
		}
	}
};
</script>
<style lang="scss">
@import '../style/vars.scss';

@include block(vc-steps) {
    display: flex;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0,0,0,.85);
    font-size: 14px;
    line-height: 1.5715;
    list-style: none;
    width: 100%;
    font-size: 0;
    text-align: initial;
	@include when(vertical) {
		flex-direction: column;
		.vc-steps-step {
			padding-left: 0;
		}
		.vc-steps-step__tail {
			display: block;
		}
		.vc-steps-step__title {
			&::after {
				display: none
			}
		}
	}
	@include when(small) {
		.vc-steps-step__icon {
			width: 24px;
			height: 24px;
			margin: 0 8px 0 0;
			font-size: 12px;
			line-height: 24px;
			text-align: center;
			border-radius: 24px;
		}
		.vc-steps-step__title { 
			padding-right: 12px;
			font-size: 14px;
			line-height: 24px;
			&::after {
				top: 12px;
			}
		}
	}
}
</style>