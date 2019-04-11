<template>
	<component 
		:is="componentType"
		:tag="tag"
		v-bind="$attrs"
		enter-active-class="vc-transition__scale--in"
		move-class="vc-transition__scale--move"
		leave-active-class="vc-transition__scale--out"
		v-on="hooks"
	>
		<slot />
	</component>
</template>
<script>
import basicMixin from './basic-mixin';

export default {
	name: 'vc-transition-scale',
	mixins: [basicMixin]
};

</script>
<style lang="scss">
@import '../style/index.scss';

@include block(vc-transition) {
	@include element(scale) {
		@include modifier(in) {
			animation-name: vc-scale-in;
		}
		@include modifier(out) {
			animation-name: vc-scale-out;
		}
		/**
		 * transition-group下删除元素, 其他元素位置变化动画
		 */
		@include modifier(move) {
			transition: transform .3s $ease-out-quint;
		}
	}
}

@keyframes vc-scale-in {
	from {
		opacity: 0;
		transform: scale(0)
	}

	to {
		opacity: 1;
	}
}

@keyframes vc-scale-out {
	from {
		opacity: 1;
	}

	to {
		opacity: 0;
		transform: scale(0);
	}
}

</style>
