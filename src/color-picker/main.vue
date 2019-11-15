<template>
	<vc-popover
		v-bind="$attrs"
		v-model="isActive"
		:portal-class-name="['is-padding-none', portalClassName]"
		:class="classes"
		:trigger="trigger"
		:arrow="arrow"
		:disabled="disabled"
		tag="div"
		class="vc-color-picker"
		@ready="$emit('ready')"
		@close="handleRestColor"
	>
		<div :class="{ 'vc-color-picker__disabled': disabled }" class="vc-color-picker__box">
			<input :value="value" type="hidden">
			<vc-icon type="down" class="vc-color-picker__icon" />
			<div class="vc-color-picker__container">
				<div 
					:class="{ 'vc-color-picker__focused': isActive }"
					class="vc-color-picker__input">
					<div class="vc-color-picker__color">
						<div v-show="value === '' && !showPanelColor">
							<vc-icon type="close" />
						</div>
						<div v-show="value || showPanelColor" :style="{ backgroundColor: displayedColorStyle }" />
					</div>
				</div>
			</div>
		</div>
		<template #content>
			<div class="vc-color-picker__picker">
				<div class="vc-color-picker__wrapper">
					<vc-color-picker-panel :color="color" />	
					<vc-color-picker-hue-slider />
					<vc-color-picker-alpha v-if="alpha" />
					<vc-color-picker-predefine 
						v-if="predefine"
						:colors="predefine"
						:color="color" /> 
				</div>
				<div class="vc-color-picker__confirm">
					<span class="vc-color-picker__value">
						<template v-if="editable">
							<vc-input
								v-model="customColor"
								@blur="handleConfirm"
								@enter="handleConfirm"
							/>
						</template>
						<template v-else>{{ currentColor }}</template>
					</span>
					<vc-button @click="handleClearValue">
						清空
					</vc-button>
					<vc-button type="primary" @click="handleConfirmValue">
						确定
					</vc-button>
				</div>
			</div>
		</template>
	</vc-popover>
</template>
<script>
import { pick } from "lodash";
import Extends from "../extends";
import Color from "./color";
import ColorPickerPanel from "./color-picker-panel";
import COlorPickerHueSlider from "./color-picker-hue-slider";
import ColorPickerAlpha from "./color-picker-alpha";
import ColorPickerPredefine from "./color-picker-predefine";
import Popover from "../popover/index";
import Icon from "../icon/index";
import Input from "../input/index";
import Button from "../button/index";

export default {
	name: 'vc-color-picker',
	components: {
		'vc-popover': Popover,
		'vc-icon': Icon,
		'vc-input': Input,
		'vc-button': Button,
		'vc-color-picker-panel': ColorPickerPanel,
		'vc-color-picker-hue-slider': COlorPickerHueSlider,
		'vc-color-picker-alpha': ColorPickerAlpha,
		'vc-color-picker-predefine': ColorPickerPredefine,
	},
	mixins: [...Extends.mixins(['emitter'])],
	inheritAttrs: false,
	props: {
		...pick(Popover.props, [
			'portalClassName'
		]),
		value: {
			type: String,
			default: ''
		},
		disabled: {
			type: Boolean,
			default: false
		},
		trigger: {
			type: String,
			default: 'click'
		},
		arrow: {
			type: Boolean,
			default: false
		},
		// size: {
		// 	type: String,
		// 	default: 'default',
		// 	validator: v => /(large|small|default)/.test(v)
		// },
		editable: {
			type: Boolean,
			default: true
		},
		alpha: {
			type: Boolean,
			default: false
		},
		predefine: {
			type: Array,
		},
		format: {
			type: String,
			validator: v => /(large|small|default)/.test(v),
		}
	},
	data() {
		const color = new Color({
			enableAlpha: this.alpha,
			format: this.format
		});
		return {
			color,
			isActive: false,
			showPanelColor: false,
			customColor: '',
		};
	},
	computed: {
		classes() {
			return {
				'is-large': this.size === 'large',
				'is-small': this.size === 'small',
				'is-default': this.size === 'default'
			};
		},
		currentColor() {
			return !this.value && !this.showPanelColor ? '' : this.color.value;
		},
		displayedColorStyle() {
			if (!this.value && !this.showPanelColor) {
				return 'transparent';
			}

			return this.getColorRgb(this.color, this.alpha);
		},
	},
	watch: {
		value(val) {
			if (!val) {
				this.showPanelColor = false;
			} else if (val && val !== this.color.value) {
				this.color.fromString(val);
			}
		},
		color: {
			deep: true,
			handler(val) {
				this.showPanelColor = true;
			}
		},
		currentColor: {
			immediate: true,
			handler(val) {
				this.customColor = val;
			}
		},
	},
	created() {

	},
	methods: {
		handleRestColor() {
			if (this.value) {
				this.color.fromString(this.value);
			} else {
				this.showPanelColor = false;
			}
		},
		handleConfirm() {
			this.color.fromString(this.customColor);
		},
		handleClearValue() {
			const value = '';
			this.handleButtons(value);
			this.showPanelColor = false;
		},
		handleConfirmValue() {
			const value = this.color.value;
			this.handleButtons(value);
		},
		handleButtons(value) {
			this.$emit('input', value);
			this.$emit('change', value);
			this.dispatch('vc-form-item', 'form-change', value);
			this.isActive = false;
		},
		getColorRgb(color, alpha) {
			if (!(color instanceof Color)) {
				throw Error('color should be instance of Color Class');
			}
			
			const { r, g, b } = color.toRgb();

			return alpha 
				? `rgba(${r}, ${g}, ${b}, ${color.get('alpha') / 100})`
				: `rgb(${r}, ${g}, ${b})`;
		}
	}
};
</script>
<style lang="scss">
@import '../style/index.scss';
$block: vc-color-picker;

@include block($block) {
	display: inline-block;
	@include element(box) {
		display: inline-block;
		width: 100%;
		position: relative;
		vertical-align: middle;
		line-height: 0;
		cursor: pointer;
		&:hover {
			@include element(input) {
				border-color: #57a3f3 !important;
			}
		}
	}
	@include element(disabled) {
		background-color: #f3f3f3;
		opacity: 1;
		cursor: not-allowed;
		color: #ccc;
	}
	@include element(icon) {
		width: 32px;
		height: 32px;
		line-height: 32px;
		font-size: 10px;
		text-align: center;
		color: #808695;
		position: absolute;
		right: 0;
		z-index: 3;
	}
	@include element(input) {
		display: inline-block;
		width: 100%;
		height: 32px;
		line-height: 1.5;
		padding: 6px 32px 6px 7px;
		font-size: 14px;
		border: 1px solid #dcdee2;
		border-radius: 4px;
		color: #515a6e;
		background-image: none;
		position: relative;
		transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
	}
	@include element(focused) {
		border-color: #57a3f3;
		outline: 0;
		-webkit-box-shadow: 0 0 0 2px rgba(45,140,240,.2);
		box-shadow: 0 0 0 2px rgba(45,140,240,.2);
	}
	@include element(color) {
		width: 18px;
		height: 18px;
		border-radius: 2px;
		div {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
			border-radius: 2px;
		}
		.vc-icon {
			font-size: 10px;
			color: #999;
			transform: scale(.6);
		}
	}
	@include element(wrapper) {
		padding: 8px 8px 0;
	}
	@include element(confirm) {
		margin-top: 8px;
		border-top: 1px solid #e8eaec;
		text-align: right;
		padding: 8px;
		clear: both;
		.vc-btn {
			height: 24px;
			padding: 0 9px;
			line-height: 1.5;
		}
		.is-default {
			margin-right: 2px;
		}
	}
	@include element(value) {
		float: left;
		width: 138px;
		height: 24px;
		line-height: 24px;
		font-size: 14px;
		text-align: left;
		.vc-input {
			min-height: 24px;
			height: 24px;
			input {
				padding: 4px 7px;
			}
		}
	}
}

</style>