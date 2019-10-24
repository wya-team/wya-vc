<template>
	<div class="vcm-input-search">
		<vcm-input
			ref="input"
			v-bind="binds"
			:value="currentValue"
			:clearable="clearable"
			:prepend="prepend"
			:type="type"
			class="vcm-input-search__content"
			v-on="hooks"
		>
			<template #prepend>
				<slot name="prepend">
					<vcm-icon type="search" class="vcm-input-search__icon"/>
				</slot>
			</template>
		</vcm-input>
		<!-- TODO, 待优化, isFocus隐藏，造成点击事件无效 -->
		<div 
			v-if="isFocus || showCancel" 
			class="vcm-input-search__btn"
			@touchend="handleCancel"
		>
			{{ cancelTxt }}
		</div>
	</div>
</template>

<script>
import inputSearchMixin from '../input-search-mixin';
import inputEventMixin from '../input-event-mixin';
import MIcon from '../../icon/index.m';
import MInput from './input';

export default {
	name: 'vcm-input-search',
	components: {
		'vcm-icon': MIcon,
		'vcm-input': MInput
	},
	mixins: [inputSearchMixin, inputEventMixin],
	props: {
		cancelTxt: {
			type: String,
			default: '取消'
		},
		type: {
			type: String,
			default: 'search'
		}
	},
	methods: {
		handleCancel(e) {
			this.$emit('input', '');
			this.$emit('cancel');
		}
	}
};
</script>

<style lang="scss">
@import '../../style/index.scss';

/**
 * TODO
 */
$block: vcm-input-search;
$size: 54px;

@include block($block) {
	display: flex;
	align-items: center;
	height: $size;
	padding: 10px;
	.vcm-input {
		height: 34px;
	}
	.vcm-input__prepend {
		line-height: 34px;
	}
	@include element(content) {
		background: white;
		border-radius: 16px;
		overflow: hidden;
		padding-right: 14px;
		input {
			padding-top: 6px ;
			padding-bottom: 5px;
			font-size: 14px;
			&::placeholder {
				font-size: 15px;
				color: #999;
			}
		}
		@include element(icon){
			font-size: 15px;
			margin-left: 14px;
			color: #999;
		}
		@include when(focus) {
			input {
				text-align: left;
			}
		} 
	}
	@include element(btn){
		padding-left: 8px;
		height: $size;
		line-height: $size;
		font-size: 15px;
		color: #333;
		text-align: right;
		white-space: nowrap;
	}
}
</style>


