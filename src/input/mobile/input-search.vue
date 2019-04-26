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
		/>
		<!-- TODO, 待优化, isFocus隐藏，造成点击事件无效 -->
		<div 
			v-if="$refs.input && $refs.input.isFocus" 
			class="vcm-input-search__btn"
			@click="handleCancel"
		>
			{{ cancelTxt }}
		</div>
	</div>
</template>

<script>
import inputSearchMixin from '../input-search-mixin';
import MIcon from '../../icon/index.m';
import MInput from './input';

export default {
	name: 'vcm-input-search',
	components: {
		'vcm-icon': MIcon,
		'vcm-input': MInput
	},
	mixins: [inputSearchMixin],
	props: {
		cancelTxt: {
			type: String,
			default: '取消'
		}
	},
	methods: {
		handleCancel(e) {
			this.$emit('input', '');
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

@include block($block) {
	display: flex;
	align-items: center;
	height: 44px;
	padding: 0 8px;
	background: #efeff4;
	@include element(content) {
		border-radius: 3px;
		background: white;
		overflow: hidden;
		input {
			text-align: center;
		}
		@include when(focus) {
			input {
				text-align: left;
			}
		} 
	}
	@include element(btn){
		padding-left: 8px;
		height: 44px;
		line-height: 44px;
		font-size: 16px;
		color: #108ee9;
		text-align: right;
		white-space: nowrap;
	}
}
</style>


