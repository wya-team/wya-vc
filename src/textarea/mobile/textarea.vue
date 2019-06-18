<template>
	<div :class="classes" class="vcm-textarea">
		<div class="vcm-textarea__wrapper">
			<div :class="{ 'is-right': true }" :style="contentStyle" class="vcm-textarea__content">
				<textarea
					ref="textarea"
					:value="currentValue"
					:style="textareaStyle"
					v-bind="binds"
					v-on="hooks"
				/>
			</div>
		</div>
	</div>
</template>
<script>
import TextareaMixin from '../textarea-mixin';

export default {
	name: 'vcm-textarea',
	mixins: [TextareaMixin],
	props: {
		right: {
			type: Boolean,
			default: false
		},
		// rows: {
		// 	type: Number,
		// 	default: 1
		// }
	}
};
</script>
<style lang="scss">
@import '../../style/index.scss';

$block: vcm-textarea;

@include block($block) {
	position: relative;
	width: 100%;
	display: inline-block;
	cursor: text;
	min-height: 24px; // 动态计算
	line-height: 1.5;
	@include element(wrapper) {
		display: flex;
		align-items: center;
		flex: 1;
	}
	@include element(content){
		flex: 1;
		textarea {
			position: relative;
			width: 100%;
			background-color: $white;
			outline: 0;
			color: #000;
			font-size: 16px;
			padding-left: 7px;
			padding-right: 7px;

			overflow: auto;
			resize: none;  // 不形式拖拽按钮
			min-height: 24px;

			&::placeholder {
				color: #999;
			}
			&[disabled] {
				background-color: #f3f3f3;
				opacity: 1;
				cursor: not-allowed;
				color: #ccc;
			}
		}
		@include when(right) {
			textarea {
				text-align: right;
				color: #999;
			}
		}
	}
}
</style>