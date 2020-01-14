<template>
	<div :class="classes" class="vc-input">
		<div class="vc-input__wrapper">
			<!-- 前置 -->
			<div 
				v-if="$slots.prepend || prepend" 
				:class="[{ 'is-icon': prepend, 'is-afloat': afloat }, classes]" 
				class="vc-input__prepend"
			>
				<slot name="prepend">
					<vc-icon
						v-if="prepend" 
						:type="prepend"
					/>
				</slot>
			</div>
			<div :class="classes" class="vc-input__content">
				<slot name="content">
					<!-- maxlength主要用于覆盖v-bind -->
					<input
						ref="input"
						v-bind="binds"
						:value="currentValue"
						:maxlength="curMaxlength"
						:style="inputStyle"
						v-on="hooks"
					>
				</slot>
			</div>
			<!-- 清除 -->
			<vc-transition-fade>
				<vc-icon
					v-if="!disabled && clearable && currentValue" 
					class="vc-input__icon-clear" 
					type="clear" 
					@click="handleClear"
				/>
			</vc-transition-fade>
			<div
				v-if="$slots.append || append || indicator" 
				:class="[{ 'is-icon': append, 'is-afloat': afloat }, classes]" 
				class="vc-input__append"
			>
				<slot name="append">
					<vc-icon 
						v-if="append" 
						:type="append"
					/>
					<!-- place为‘in’的计数放入append内 -->
					<span 
						v-else-if="indicator && indicateInline" 
						:class="indicateClassName"
						class="vc-input__indicator is-in"
					>
						{{ indicatorNum }}
					</span>
				</slot>
			</div>
			<!-- hack, 莫名的黑点-->
			<div class="vc-input__hack" />
		</div>
		<!-- 计数 -->
		<span 
			v-if="indicator && !indicateInline" 
			:class="indicateClassName"
			class="vc-input__indicator is-out"
		>
			{{ indicatorNum }}
		</span>
	</div>
</template>

<script>
import inputMixin from './input-mixin';
import Icon from '../icon/index';
import Transition from '../transition/index';

export default {
	name: 'vc-input',
	components: {
		'vc-icon': Icon,
		'vc-transition-fade': Transition.Fade
	},
	mixins: [inputMixin],
	props: {
		indicator: {
			type: [Boolean, Object],
			default: false
		},
		indicateClassName: String
	},
	computed: {
		indicatorNum() {
			let currentLength = (String(this.value) || '').length;
			let extraLength = this.bytes ? this.getExtraLength() || 0 : 0;
			let length = this.indicator && this.indicator.inverted 
				? this.maxlength + extraLength - currentLength 
				: currentLength - extraLength;
			return `${length}/${this.maxlength}`;
		},
		indicateInline() {
			return this.indicator && this.indicator.inline;
		}
	}
};
</script>

<style lang="scss">
@import '../style/vars.scss';

$block: vc-input;

@include block($block) {
	display: inline-block;
	position: relative;
	width: 100%;
	cursor: text;
	font-size: 12px;
	border-radius: 4px;
	min-height: 28px;
	line-height: 1.5;
	transition: border .2s ease-in-out, 
		background .2s ease-in-out, 
		box-shadow .2s ease-in-out;
	@include commonBorder1PX('', $cd9); // 不占边距
	@include when(focus) {
		&:after, &:before {
			border-color: #5495f6;
		}
		z-index: 2;
		box-shadow: 0 0 1px 1px rgba(45, 140, 240, .2)
	}
	&:hover {
		border-color: #5495f6
	}
	@include element(wrapper) {
		display: flex;
		flex: 1;
		align-items: center;
		border-radius: 4px;
		overflow: hidden;
	}
	@include element(content){
		flex: 1;
		background-color: $white;
		input {
			position: relative;
			width: 100%;
			outline: 0;
			color: $c51;
			padding-top: 5px;
			padding-bottom: 5px; // 18 + 10 = 28
			padding-left: 7px;
			padding-right: 7px;
			&::placeholder {
				color: #aaa;
			}
		}
		@include when(disabled) {
			background-color: #f4f4f4;
			opacity: 1;
			cursor: not-allowed;
			color: #ccc;
			// hack需要设置
			input {
				background-color: #f4f4f4;
				cursor: not-allowed;
			}
		}
	}
	@include share-rule(icon) {
		width: 28px;
		height: 28px;
		line-height: 28px!important; // 强制处理【目前potral会导致style重复，导致覆盖，延后处理】
		font-size: 13px;
		text-align: left;
		padding-left: 1px; // hack for vc-icon
		color: #808695;
	}

	/**
	 * clear
	 */
	@include element(icon-clear){
		@include extend-rule(icon);
		background-color: #fff;
		cursor: pointer;
		display: none;
	}

	/**
	 * prend
	 */
	
	@include element(icon-prepend){
		// @include extend-rule(icon);
		
	}

	@include pseudo(hover) {
		@include element(icon-clear){
			display: inline-block;
		}
	}
	
	@include share-rule(pend) {
		height: 100%;
		text-align: center;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
		white-space: nowrap;
		z-index: 0; // 让虚线在下方
		background: #fff;
		@include when(icon) {
			width: 16px;
			font-size: 12px;
			background: #e5e5e5;
			color: #515151;
		}
		@include when(disabled) {
			cursor: not-allowed;
			background-color: #f4f4f4;
		}
		// 让虚线在下方
		@include when(afloat) {
			z-index: 3;
		}
	}
	/**
	 * prepend / append
	 */
	@include element(prepend) {
		@include extend-rule(pend);
	}

	@include element(append) {
		@include extend-rule(pend);
	}
	@include when(focus) {
		@include element(prepend) {
			z-index: 1;
		}

		@include element(append) {
			z-index: 1;
		}
	}

	/**
	 * hack, 1px处理黑边
	 */
	@include element(hack) {
		padding-right: 1px;
	}

	// 计数
	@include element(indicator) {
		line-height: 28px;
		color: #999999;
		font-size: 12px;
		z-index: 1;
		top: 0px;
		@include when(in) {
			margin-right: 8px;
		}
		@include when(out) {
			position: absolute;
			right: -6px;
			transform: translateX(100%);
		}
	}
}
.vc-form-item.is-error {
	@include block($block) {
		&:after, &:before {
			border-color: $error;
			box-shadow: none;
		}
		z-index: 2;
	}
}
</style>