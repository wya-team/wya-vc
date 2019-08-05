<template>
	<div :class="classes" class="vc-textarea">
		<div class="vc-textarea__wrapper">
			<div :class="classes" :style="contentStyle" class="vc-textarea__content">
				<textarea
					ref="textarea"
					:value="currentValue"
					:style="textareaStyle"
					v-bind="binds"
					v-on="hooks"
				/>
			</div>
			<div v-if="indicator" :class="indicateClassName" class="vc-textarea__indicator">
				{{ indicatorNum }}
			</div>
		</div>
	</div>
</template>
<script>
import TextareaMixin from './textarea-mixin';

export default {
	name: 'vc-textarea',
	mixins: [TextareaMixin],
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
			let length = this.indicator && this.indicator.inverted 
				? this.maxlength + this.extraLength - currentLength 
				: currentLength - this.extraLength;
			return `${length}/${this.maxlength}`;
		},
		indicateInline() {
			return this.indicator && this.indicator.inline;
		}
	}
};
</script>
<style lang="scss">
@import '../style/index.scss';

$block: vc-textarea;

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
	background-color: $white;

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
		position: relative;
	}
	@include element(content){
		flex: 1;
		align-items: center;
		textarea {
			position: relative;
			width: 100%;
			outline: 0;
			color: $c51;
			padding-top: 5px;
			padding-bottom: 5px; // 18 + 10 = 28
			padding-left: 7px;
			padding-right: 7px;

			overflow: auto;
			resize: vertical; // 形式拖拽按钮 
			min-height: 28px;

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
			textarea {
				background-color: #f4f4f4;
				cursor: not-allowed;
			}
		}
	}
	@include element(indicator) {
		position: absolute;
		height: 18px;
        line-height: 18px;
		bottom: -18px;
        right: 0px;
		color: #999999;
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