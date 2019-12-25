<template>
	<div
		v-show="isReady"
		:class="{
			'is-active': isActive,
			'is-card': isCard,
			'is-in-stage': isInStage,
			'is-hover': isHover,
			'is-animating': isAnimating && !isMove
		}"
		:style="itemStyle"
		class="vc-carousel-item"
		@click="handleItemClick"
	>
		<div
			v-if="isCard"
			v-show="!isActive"
			class="vc-carousel-item__mask"
		/>
		<slot />
	</div>
</template>

<script>
import CarouselItemMixin from './carousel-item-mixin';

export default {
	name: 'vc-carousel-item',
	mixins: [CarouselItemMixin],
};
</script>

<style lang="scss">
@import '../style/index.scss';

@include block(vc-carousel-item) {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: inline-block;
	overflow: hidden;
	z-index: 0;

	@include when(active) {
		z-index: 2;
	}

	@include when(animating) {
		transition: transform .4s ease-in-out;
	}

	@include when(card) {
		width: 50%;
		transition: transform .4s ease-in-out;
		&.is-in-stage {
			cursor: pointer;
			z-index: 1;
			&:hover .vc-carousel-item__mask,
			&.is-hover .vc-carousel-item__mask {
				opacity: 0.12;
			}
		}
		&.is-active {
			z-index: 2;
		}
	}

	@include element(mask) {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: #fff;
		opacity: 0.24;
		transition: .2s;
	}
}

</style>
