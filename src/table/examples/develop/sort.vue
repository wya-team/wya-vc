<template>
	<div
		class="vc-table-sort"
		style="display: flex; align-items: center"
		@click="handleToggle"
	>
		<slot />
		<span style="display: flex; flex-direction: column;">
			<vc-icon
				:style="{ 'color': currentValue === 'ascending' ? 'blue' : '#ccc' }"
				style="margin-bottom: -2px"
				type="triangle-up"
				class="vc-table-sort__ascending"
			/>
			<vc-icon
				:style="{ 'color': currentValue === 'descending' ? 'blue' : '#ccc' }"
				style="margin-top: -2px"
				type="triangle-down"
				class="vc-table-sort__descending"
			/>
		</span>
	</div>
</template>

<script>
import Icon from '../../../icon';

export default {
	name: 'vc-table-sort',
	components: {
		'vc-icon': Icon,
	},
	model: {
		'prop': 'value',
		'event': 'change',
	},
	props: {
		value: {
			type: String,
			default: 'none'
		}
	},
	data() {
		return {
			currentValue: '',
		};
	},
	watch: {
		value: {
			immediate: true,
			handler(v) {
				this.currentValue = v;
			}
		}
	},
	methods: {
		handleToggle() {
			this.currentValue = this.currentValue === 'ascending' ? 'descending' : 'ascending';
			this.$emit('change', this.currentValue); 
		}
	}
};
</script>

<style lang="scss">

</style>
