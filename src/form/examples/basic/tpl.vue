<template>
	<input :type="type" :value="value" @input="handleInput">
</template>

<script>
import Extends from '../../../extends';

export default {
	name: '',
	components: {

	},
	mixins: [...Extends.mixins(['emitter'])],
	props: {
		type: String,
		value: [String, Number],
	},
	data() {
		return {
		};
	},
	methods: {
		handleInput(e) {
			this.$emit('input', e.target.value);

			// form表单
			this.dispatch('vc-form-item', 'form-change', e.target.value);
		}
	},
};
</script>

<style lang="scss" scoped>
</style>
