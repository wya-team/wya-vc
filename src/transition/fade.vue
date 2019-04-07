<template>
	<component 
		:is="componentType"
		:tag="tag"
		v-bind="$attrs"
		enter-active-class="vc-transition--in"
		move-class="vc-transition--move"
		leave-active-class="vc-transition--out"
		v-on="hooks"
	>
		<slot />
	</component>
</template>
<script>
import basicMixin from './basic-mixin';

export default {
	name: 'vc-transition-fade',
	mixins: [basicMixin]
};

</script>
<style lang="scss">
@import '../style/index.scss';

@include block(vc-transition) {
	@include modifier(in) {
		animation-name: vc-fade-in;
	}
	@include modifier(out) {
		animation-name: vc-fade-out;
	}
	@include modifier(move) {
		transition: transform $popup-duration ease-out;
	}
}

@keyframes vc-fade-out {
	from {
		opacity: 1;
	}

	to {
		opacity: 0;
	}
}

@keyframes vc-fade-in {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}
</style>
