<template>
	<section>
		<div 
			v-for="item in items"
			:key="item"
			:class="{ 'red': value.includes(item) }"
			@click="handleClick($event, item)"
		>
			{{ item }}
		</div>
	</section>
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
		value: {
			type: Array,
			default: () => []
		},
	},
	data() {
		return {
			items: [1, 2, 3, 4]
		};
	},
	methods: {
		handleClick(e, item) {
			let result = [];
			if (!this.value.includes(item)) {
				this.value.push(item);
				result = this.value;
			} else {
				result = this.value.filter((it) => it !== item);
			}

			this.$emit('input', result);

			// form表单
			this.dispatch('vc-form-item', 'form-change', result);
		}
	},
};
</script>

<style lang="scss">
section {
	display: flex;
	> div {
		border: 1px solid #c9c9c9;
		padding: 40px 20px
	}
	.red {
		color: red;
		border: 1px solid red;
	}
}
</style>
