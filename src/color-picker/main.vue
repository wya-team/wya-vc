<template>
	<!-- <i-color-picker 
		:value="value"
		:disabled="disabled"
		:editable="editable"
		:alpha="alpha"
		:hue="hue"
		:recommend="recommend"
		:colors="colors"
		:format="format"
		:size="size"
		@on-change="$emit('change', arguments[0])"
		@on-active-change="$emit('active-change', arguments[0])"
		@on-open-change="$emit('open-change', arguments[0])"
		@input="$emit('input', arguments[0])"
	/> -->
	<vc-popover
		v-bind="$attrs"
		v-model="isActive"
		:portal-class-name="['is-padding-none', portalClassName]"
		:class="classes"
		:trigger="trigger"
		:arrow="arrow"
		tag="div"
		class="vc-color-picker"
		@ready="$emit('ready')"
		@close="$emit('close')"
	>
		<div class="vc-color-picker__box">
			<input :value="value" type="hidden">
			<vc-icon type="down" class="vc-color-picker__icon" />
			<div class="vc-color-picker__container">
				<div class="vc-color-picker__input">
					<div class="vc-color-picker__color">
						<div v-show="value === '' && !isActive">
							<vc-icon type="close" />
						</div>
						<div v-show="value || visible" :style="displayedColorStyle" />
					</div>
				</div>
			</div>
		</div>
		<template #content>
			<div class="vc-color-picker__picker">
				<div class="vc-color-picker__wrapper">
					<vc-color-picker-panel />	
					<div class="vc-color-picker__hue">
						<vc-color-picker-hue-slider />
					</div>
					<div v-if="alpha" class="vc-color-picker__alpha">
						<vc-color-picker-alpha />
					</div>
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
								@blur="handleEditColor"
								@enter="handleEditColor"
							/>
						</template>
						<template v-else>{{ formatColor }}</template>
					</span>
					<vc-button>
						清空
					</vc-button>
					<vc-button type="primary">
						确定
					</vc-button>
				</div>
			</div>
		</template>
	</vc-popover>
</template>
<script>
import { pick } from 'lodash';
import ColorPickerPanel from "./color-picker-panel";
import COlorPickerHueSlider from "./color-picker-hue-slider";
import ColorPickerAlpha from "./color-picker-alpha";
import ColorPickerPredefine from "./color-picker-predefine";
import Popover from "../popover/index";
import Icon from '../icon/index';
import Input from '../input/index';
import Button from '../button/index';

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
	inheritAttrs: false,
	props: {
		...pick(Popover.props, [
			'portalClassName'
		]),
		value: {
			type: String,
			default: ''
		},
		trigger: {
			type: String,
			default: 'click'
		},
		arrow: {
			type: Boolean,
			default: false
		},
		size: {
			type: String,
			default: 'default',
			validator: v => /(large|small|default)/.test(v)
		},
		editable: {
			type: Boolean,
			default: true
		},
		alpha: {
			type: Boolean,
			default: true
		},
		predefine: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			isActive: false,
			customColor: '',
			color: {
				value: '#ff0000'
			}
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
		formatColor() {
			// TODO
			return '';
		},
		displayedColorStyle() {
			return { backgroundColor: this.value };
			// return { backgroundColor: toRGBAString(this.visible ? this.saturationColors.rgba : tinycolor(this.value).toRgb()) };
		},
	},
	methods: {
		handleEditColor() {
            
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
		background-color: #fff;
		background-image: none;
		position: relative;
		cursor: text;
		transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
		&:focus {
			border-color: #57a3f3;
			outline: 0;
			box-shadow: none;
		}
	}
	@include element(color) {
		width: 18px;
		height: 18px;
		border-radius: 2px;
		div {
			width: 100%;
			height: 100%;
			box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
			border-radius: 2px;
		}
	}
	@include element(wrapper) {
		padding: 8px 8px 0;
	}
	&__hue, &__alpha {
		width: 240px;
		margin-top: 8px;
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