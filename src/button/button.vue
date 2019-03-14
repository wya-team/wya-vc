<template>
	<vc-debounce-click 
		:tag="tag" 
		:class="classes" 
		:disabled="disabled"
		:wait="wait"
		@click="$emit('click', $event)"
	>
		<vc-icon v-if="icon ? true : false" :type="icon"/>
		<span v-if="showSlot" ref="slot"><slot/></span>
	</vc-debounce-click>
</template>
<script>
import Icon from "../icon";
import DebounceClick from '../debounce-click';

const basicClass = 'vc-btn';
export default {
	name: "vc-button",
	components: {
		"vc-icon": Icon,
		'vc-debounce-click': DebounceClick
	},
	props: {
		tag: {
			type: String,
			default: 'button'
		},
		type: {
			type: String,
			default: 'default'
		},
		size: {
			type: String,
			default: 'medium'
		},
		wait: {
			type: Number,
			default: 250
		},
		icon: String,
		disabled: Boolean,
		circle: Boolean,
		round: Boolean,
		long: Boolean,
	},
	data() {
		return {
			showSlot: true
		};
	},
	computed: {
		tagName() {
			return 'button';
		},
		classes() {
			return [
				`${basicClass}`,
				`${basicClass}-${this.type}`,
				{
					[`${basicClass}-circle`]: this.circle,
					[`${basicClass}-${this.size}`]: !!this.size,
					[`${basicClass}-icon-only`]: !this.showSlot,
					[`${basicClass}-round`]: this.round,
					[`${basicClass}-long`]: this.long
				}
			];
		},
	},
	mounted() {
		this.showSlot = this.$slots.default !== undefined;
	},
	methods: {
	},
};
</script>
<style lang="scss" scoped>
@import '../style/index.scss';

$primary-color: #5495f6;
$primary-hover-color: #67a4ff;

$success-color: #19be6b;
$success-hover-color: #47cb89;

$error-color: #ed4014;
$error-hover-color: #f16643;

$warning-color: #e6a23c;
$warning-hover-color: #ebb563;
.vc-btn {
	padding: 3px 16px 4px;
	font-size: 12px;
	border-radius: 4px;
	border: 1px solid transparent;
	border-color: #dcdee2;
	background: #fff;
	user-select: none;
	cursor: pointer;
	transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
	outline:0 none !important;
	&[disabled], &[disabled]:hover {
		color: #aaa;
		background-color: #f4f4f4;
		border-color: #d9d9d9;
		cursor: not-allowed;
	}
	&.vc-btn-circle {
		border-radius: 32px;
	}
	&.vc-btn-long{
		width: 100%;
	}
	.wyaicon{
		vertical-align: middle;
	}
	span{
		vertical-align: middle;
	}
}
.vc-btn-default {
	&:hover {
		color: #57a3f3;
		background-color: #fff;
		border-color: #57a3f3;
	}
}
.vc-btn-primary {
	color: #fff;
    background-color: $primary-color;
    border-color: $primary-color;
	&:hover {
		background-color: $primary-hover-color;
		border-color: $primary-hover-color;
	}
}
.vc-btn-text {
	color: #515a6e;
    background-color: transparent;
    border-color: transparent;
	&:hover {
		color: $primary-hover-color;
	}
}
.vc-btn-success {
	color: #fff;
    background-color: $success-color;
    border-color: $success-color;
	&:hover {
		background-color: $success-hover-color;
		border-color: $success-hover-color;
	}
}
.vc-btn-error {
	color: #fff;
    background-color: $error-color;
    border-color: $error-color;
	&:hover {
		background-color: $error-hover-color;
		border-color: $error-hover-color;
	}
}
.vc-btn-warning {
	color: #fff;
    background-color: $warning-color;
    border-color: $warning-color;
	&:hover {
		background: $warning-hover-color;
		border-color: $warning-hover-color;
	}
}
.vc-btn-large {
	padding: 4px 16px;
    font-size: 14px;
    border-radius: 4px;
	&.vc-btn-circle {
		border-radius: 36px;
	}
}
.vc-btn-small {
	padding: 0 8px;
    font-size: 12px;
    border-radius: 3px;
	&.vc-btn-circle {
		border-radius: 24px;
	}
}
.vc-btn-icon-only {
	&.vc-btn-round {
		border-radius: 50%;
		width: 32px;
		height: 32px;
		padding: 0;
		font-size: 12px;
		.wyaicon{
			vertical-align: baseline;
			line-height: 1.5;
		}
	}
	&.vc-btn-large {
		&.vc-btn-round {
			border-radius: 50%;
			width: 36px;
			height: 36px;
			padding: 0;
			font-size: 14px;
		}
	}
	&.vc-btn-small {
		&.vc-btn-round {
			border-radius: 50%;
			width: 24px;
			height: 24px;
			padding: 0;
			font-size: 12px;
		}
	}
	
}
</style>