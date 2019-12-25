<template>
	<vc-input
		ref="input"
		v-bind="binds"
		:value="currentValue"
		:clearable="clearable"
		:prepend="prepend"
		:type="type"
		:afloat="false"
		class="vc-input-search"
		v-on="hooks"
	>
		<template #prepend>
			<slot name="prepend" />
		</template>
		<template #append>
			<slot name="append">
				<div :class="{ 'is-disabled': binds.disabled }" class="vc-input-search__content">
					<vc-icon 
						v-if="enterTxt === true" 
						:type="append || 'search'"
					/>
					<template v-else>
						{{ enterTxt }}
					</template>
				</div>
			</slot>
		</template>
	</vc-input>
</template>

<script>
import inputSearchMixin from './input-search-mixin';
import inputEventMixin from './input-event-mixin';

import Icon from '../icon/index';
import Input from './input';

export default {
	name: 'vc-input-search',
	components: {
		'vc-icon': Icon,
		'vc-input': Input
	},
	mixins: [inputSearchMixin, inputEventMixin]
};
</script>

<style lang="scss">
@import '../style/index.scss';

$block: vc-input-search;

@include block($block) {
	@include element(content) {
		cursor: pointer;
		font-size: 14px;
		padding: 0 8px;
		color: #b2b2b2;
		transition: all .2s ease-in-out;
		position: relative;
		text-align: center;
		line-height: 28px;
		white-space: nowrap;
		@include when(disabled) {
			cursor: not-allowed;
			opacity: .4;
		}
	}
}
</style>


