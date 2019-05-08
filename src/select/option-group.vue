<template>
	<div class="vc-select-option-group">
		<div class="vc-select-option-group__title">{{ label }}</div>
		<div>
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	name: 'vc-select-option-group',
	props: {
		label: {
			type: String,
			default: ''
		}
	}
};
</script>

<style lang="scss">
@import '../style/index.scss';

$block: vc-select-option-group;

@include block($block) {
	@include element(title) {
		padding-left: 8px;
		font-size: 12px;
		color: #999;
		height: 30px;
		line-height: 30px;
	}

}

</style>
