<template>
	<div class="vc-checkbox-group">
		<slot />
	</div>
</template>
<script>
import { isEqualWith } from 'lodash';
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
				if (isEqualWith(v, this.currentValue)) {
					return;
				}
				this.currentValue = v;
			}
		},
		currentValue(v, old) {
			// ..
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

			this.sync();
		},
		/**
		 * v-model 同步, 外部的数据改变时不会触发
		 */
		sync() {
			this.$emit('change', this.currentValue);
			this.dispatch('vc-form-item', 'form-change', this.currentValue);
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