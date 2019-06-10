<template>
	<vc-input
		ref="input"
		v-bind="binds"
		:value="formatterValue"
		:clearable="clearable"
		:prepend="prepend"
		:append="append"
		:type="type"
		class="vc-input-number"
		v-on="hooks"
	>
		<template #prepend>
			<slot name="prepend" />
		</template>
		<template v-if="step" #append>
			<slot name="append">
				<div class="vc-input-number__icon">
					<div 
						:disabled="plusDisabled" 
						class="vc-input-number__up"
						@click="handleStepper(1)"
					>
						<vc-icon type="up"/>
					</div>
					<div 
						:disabled="minusDisabled" 
						class="vc-input-number__down"
						@click="handleStepper(-1)" 
					>
						<vc-icon type="down"/>
					</div>	
				</div>
			</slot>
			<div class="vc-input-number__hack"/>
		</template>
	</vc-input>
</template>

<script>
import inputNumberMixin from './input-number-mixin';
import Icon from '../icon/index';
import Input from './input';

export default {
	name: 'vc-input-number',
	components: {
		'vc-icon': Icon,
		'vc-input': Input
	},
	mixins: [inputNumberMixin]
};
</script>

<style lang="scss">
@import '../style/index.scss';

$block: vc-input-number;

@include block($block) {
	@include element(hack) {
		padding-right: 1px;
	}
	@include pseudo(hover) {
		.vc-input__append{
			z-index: 1;
		}
		@include element(icon){
			display: block;
		}
		@include element(hack) {
			padding-right: 0;
		}
	}
	@include element(icon) {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 12px;
		color: #999;
		width: 20px;
		height: 28px;
		display: none;
		&:hover {
			color: #57a3f3;
			cursor: pointer;
		}
	}
	@include share-rule(icon) {
		height: 14px;
		line-height: 14px;
		background-color: #fff;
		@include commonBorder1PX(left); // 不占边距
		&[disabled] {
			background-color: #f3f3f3;
			cursor: not-allowed;
			pointer-events: none;
			color: #ccc;
		}
		@include when(disabled) {
			display: none;	
		}
		> i {
			transform: scale(0.6);
		}

	}

	@include element(up) {
		@include extend-rule(icon);
		@include commonBorder1PX(bottom); // 不占边距
	}
	@include element(down) {
		@include extend-rule(icon);
	}

	.vc-input__append.is-disabled {
		display: none;
	}

}
</style>


