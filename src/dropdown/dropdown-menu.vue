<template>
	<ul class="vc-dropdown-menu">
		<slot />
	</ul>
</template>

<script>
export default {
	name: 'vc-dropdown-menu',
};
</script>

<style lang="scss">
@import '../style/index.scss';
$block: vc-dropdown-menu;

@include block($block) {
	min-width: 100px;
}
</style>
