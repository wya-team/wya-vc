<template>
	<div :name="name" :class="classes" class="vc-radio-group">
		<slot />
	</div>
</template>
<script>
import Emitter from '../extends/mixins/emitter';
import { getUid } from '../utils/index';

export default {
	name: 'vc-radio-group',
	mixins: [Emitter],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: {
			type: [String, Number],
			default: ''
		},
		type: {
			type: String,
			default: '', // 'button'
		},
		vertical: {
			type: Boolean,
			default: false
		},
		name: {
			type: String,
			default: () => getUid('radio')
		}
	},
	provide() {
		return { group: this };
	},
	data() {
		return {
			currentValue: '',
		};
	},
	computed: {
		classes() {
			return {
				'is-vertical': this.vertical,
				'is-button': this.type === 'button'
			};
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(v) {
				this.currentValue = v;
			}
		},
		currentValue(v, old) {
			this.$emit('change', v);
			this.dispatch('vc-form-item', 'form-change', v);
		}
	},
	mounted() {
	},
	methods: {
		reset(v) {
			this.currentValue = v;
		}
	}
};
</script>
<style lang="scss">
@import '../style/index.scss';

$size: 28px;

@include block(vc-radio-group) {
	display: inline-block;
	font-size: 12px;
	vertical-align: middle;
	@include when(vertical) {
		.vc-radio {
			display: block;
			height: 30px;
			line-height: 30px;
		}
	}
	@include when(button) {
		font-size: 0; // 去除间距
		.vc-radio {
			display: inline-block;
			height: $size;
			line-height: $size;
			margin: 0;
			padding: 0 12px;
			font-size: 12px;
			color: #515a6e;
			transition: all .2s ease-in-out;
			cursor: pointer;
			border: 1px solid #dcdee2;
			border-left: 0;
			background: #fff;
			position: relative;
			&:hover {
				position: relative;
				color: #2d8cf0
			}
			&.is-disabled {
				border-color: #dcdee2;
				background-color: #f7f7f7;
				cursor: not-allowed;
				color: #ccc;
			}
			> span {
				margin-left: 0;
			}
			&:first-child {
				border-radius: 4px 0 0 4px;
				border-left: 1px solid #dcdee2;
			}
			&.is-checked:first-child {
				border-color: #2d8cf0;
				box-shadow: none;
			}
			&:last-child {
				border-radius: 0 4px 4px 0;
			}
			&.is-checked:last-child {
				border-color: #2d8cf0;
				box-shadow: -1px 0 0 0 #2d8cf0;
			}
			&.is-checked {
				background: #fff;
				border-color: #2d8cf0;
				color: #2d8cf0;
				box-shadow: -1px 0 0 0 #2d8cf0;
				z-index: 1;
			}
			&.is-focus {
				box-shadow: -1px 0 0 0 #2d8cf0,0 0 0 2px rgba(45,140,240,.2);
				transition: all .2s ease-in-out;
			}
		}
		.vc-radio__border, input {
			opacity: 0;
			width: 0;
			height: 0;
		}
		.vc-radio__wrapper {
			width: 0;
			margin-right: 0;
		}
	}
}
</style>