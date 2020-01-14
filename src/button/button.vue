<template>
	<vc-debounce-click
		:tag="tag"
		:class="classes" 
		:disabled="disabled" 
		:wait="wait"
		:type="htmlType"
		class="vc-btn"
		@click="handleClick"
	>
		<vc-icon v-if="!!icon" :type="icon" />
		<vc-spin 
			v-if="isLoading" 
			:size="12" 
			:foreground="type === 'default' ? '#ccc' : '#fff'" 
			class="vc-btn__loading"
		/>
		<span v-if="hasSlot" ref="slot"><slot /></span>
	</vc-debounce-click>
</template>
<script>
import Icon from "../icon";
import Spin from "../spin";
import DebounceClick from '../debounce-click';

export default {
	name: "vc-button",
	components: {
		"vc-icon": Icon,
		'vc-debounce-click': DebounceClick,
		'vc-spin': Spin,
	},
	props: {
		tag: {
			type: String,
			default: 'button'
		},
		type: {
			type: String,
			validator: v => /(default|primary|text|success|error|warning)/.test(v),
			default: 'default'
		},
		size: {
			type: String,
			validator: v => /(small|medium|large)/.test(v),
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
		htmlType: {
			type: String,
			default: 'button',
			validator: v => /(button|submit|reset)/.test(v),
		},
	},
	inject: {
		group: {
			from: 'buttonGroup',
			default: () => ({
				size: 'medium',
				vertical: false,
				circle: false
			})
		}
	},
	data() {
		return {
			hasSlot: true,
			isLoading: false
		};
	},
	computed: {
		classes() {
			return [
				{
					'is-circle': this.circle || this.group.circle,
					'is-alone': !this.hasSlot,
					'is-round': this.round,
					'is-long': this.long,
					'is-disabled': this.disabled,
					[`is-${this.size}`]: true,
					[`is-${this.type}`]: true
				}
			];
		},
	},
	mounted() {
		this.hasSlot = this.$slots.default !== undefined;
	},
	methods: {
		handleClick(e, callback) {
			let { $listeners: { click } } = this;

			let fn = click && click(e, callback);

			if (fn && fn.then) {
				this.isLoading = true;
				fn.then((res) => {
					return res;
				}).catch((res) => {
					return Promise.reject(res);
				}).finally(() => {
					this.isLoading = false;
				});
			}
		}
	},
};
</script>
<style lang="scss">
@import '../style/vars.scss';
// 定义默认属性

$primary-color: #5495f6;
$primary-hover-color: #67a4ff;

$success-color: #19be6b;
$success-hover-color: #47cb89;

$error-color: #ed4014;
$error-hover-color: #f16643;

$warning-color: #e6a23c;
$warning-hover-color: #ebb563;

@include block(vc-btn) {
	padding: 7px 16px;
	line-height: 1;
	font-size: 12px;
	border-radius: 4px;
	border: 1px solid transparent;
	border-color: #d9d9d9;
	background: $white;
	user-select: none;
	cursor: pointer;
	outline: 0 none !important;
	/**
	 * 外部v-show控制
	 */
	transition: color .2s linear, 
		background-color .2s linear,
		border .2s linear,
		box-shadow .2s linear;
	@include element(loading) {
		vertical-align: middle;
	}
	@include when(circle) {
		border-radius: 32px;
	}
	@include when(long) {
		width: 100%;
	}
	@include when(default) {
		color: #515151;
		border-color: #d9d9d9;
		&:hover {
			color: #5495f6;
			background-color: white;
			border-color: #5495f6;
		}
	}
	@include when(primary) {
		color: $white;
		background-color: $primary-color;
		border-color: $primary-color;
		&:hover {
			background-color: $primary-hover-color;
			border-color: $primary-hover-color;
		}
	}
	@include when(text) {
		color: #515151;
		background-color: transparent;
		border-color: transparent;
		&:hover {
			color: $primary-hover-color;
		}
	}
	@include when(success) {
		color: $white;
		background-color: $success-color;
		border-color: $success-color;
		&:hover {
			background-color: $success-hover-color;
			border-color: $success-hover-color;
		}
	}
	@include when(error) {
		color: $white;
		background-color: $error-color;
		border-color: $error-color;
		&:hover {
			background-color: $error-hover-color;
			border-color: $error-hover-color;
		}
	}
	@include when(warning) {
		color: $white;
		background-color: $warning-color;
		border-color: $warning-color;
		&:hover {
			background: $warning-hover-color;
			border-color: $warning-hover-color;
		}
	}
	@include when(disabled) {
		color: $caaa;
		background-color: $cf4;
		border-color: $cd9;
		cursor: not-allowed;
		&:hover {
			background: $cf4;
			border-color: $cd9;
		}
	}
	@include when(large) {
		padding: 8px 16px;
		font-size: 14px;
		border-radius: 4px;
		@include when(circle) {
			border-radius: 36px;
		}
	}
	@include when(small) {
		padding: 3px 8px;
		font-size: 12px;
		border-radius: 3px;
		@include when(circle){
			border-radius: 24px;
		}
	}
	@include when(alone) {
		& {
			@include when(round) {
				border-radius: 50%;
				width: 32px;
				height: 32px;
				padding: 0;
				font-size: 12px;
			}
			@include when(large) {
				@include when(round) {
					border-radius: 50%;
					width: 36px;
					height: 36px;
					padding: 0;
					font-size: 14px;
				}
			}
			@include when(small) {
				@include when(round) {
					border-radius: 50%;
					width: 24px;
					height: 24px;
					padding: 0;
					font-size: 12px;
				}
			}
		}
	}
}

</style>