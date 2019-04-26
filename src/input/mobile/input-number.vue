<template>
	<vcm-input
		v-bind="binds"
		:value="currentValue"
		:clearable="clearable"
		:prepend="prepend"
		:append="append"
		:type="type"
		class="vcm-input-number"
		v-on="hooks"
	>
		<template #prepend>
			<slot name="prepend" />
		</template>
		<template #append>
			<slot name="append" />
		</template>
	</vcm-input>
</template>

<script>
import inputNumberMixin from '../input-number-mixin';
import MInput from './input';

export default {
	name: 'vc-input-number',
	components: {
		'vcm-input': MInput
	},
	mixins: [inputNumberMixin]
};
</script>

<style lang="scss">
// @import '../../style/index.scss';

// $block: vcm-input-number;

// @include block($block) {
// }
</style>


