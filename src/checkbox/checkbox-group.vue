<template>
	<div class="vc-checkbox-group">
		<slot />
	</div>
</template>
<script>
import Emitter from '../extends/mixins/emitter';

export default {
	name: 'vc-checkbox-group',
	mixins: [Emitter],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: {
			type: Array,
			default: () => ([])
		}
	},
	provide() {
		return { group: this };
	},
	data() {
		return {
			currentValue: [],
		};
	},
	watch: {
		value: {
			immediate: true,
			handler(v) {
				this.currentValue = v;
			}
		},
		currentValue(v, old) {
			this.$emit('change', v);
			this.dispatch('vc-form-item', 'form-change', v);
		}
	},
	mounted() {
	},
	methods: {
		reset(v) {
			let index = this.currentValue.findIndex(i => i == v);
			index == -1 
				? this.currentValue.push(v)
				: this.currentValue.splice(index, 1);
		}
	}
};
</script>
<style lang="scss">
@import '../style/index.scss';

@include block(vc-checkbox-group) {
	font-size: 14px;
}
</style>