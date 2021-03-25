<template>
	<span class="vc-table-sort">
		<span 
			:class="{'is-ascending': order === 'ascending'}"
			class="vc-table-sort__icon vc-table-sort__icon--ascending"
			@click.stop="handleClick('ascending')"
		/>
		<span 
			:class="{'is-descending': order === 'descending'}"
			class="vc-table-sort__icon vc-table-sort__icon--descending"
			@click.stop="handleClick('descending')"
		/>
	</span>
</template>

<script>
export default {
	name: 'vc-table-sort',
	props: {
		order: String
	},
	methods: {
		handleClick(order) {
			this.$emit('click', this.order !== order ? order : '');
		}
	},
};
</script>

<style lang="scss">
@import '../style/vars.scss';
$block: vc-table-sort;

@include block($block) {
    position: relative;
	display: inline-flex;
    flex-direction: column;
    align-items: center;
    height: 34px;
    width: 24px;
    vertical-align: middle;
    cursor: pointer;
    overflow: initial;
	@include element(icon) {
		width: 0;
		height: 0;
		border: 5px solid transparent;
		position: absolute;
		left: 7px;
		@include modifier(ascending) {
			border-bottom-color: #666;
			top: 5px;
		}
		@include modifier(descending) {
			border-top-color: #666;
			bottom: 7px;
		}
		@include when(ascending) {
			border-bottom-color: #5495f6;
		}
		@include when(descending) {
			border-top-color: #5495f6;
		}
	}
}
</style>
