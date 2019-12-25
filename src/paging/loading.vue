<template>
	<div class="vc-paging-loading">
		<div :class="loading ? 'is-loading' : ''" class="vc-paging-loading__container">
			<slot />
		</div>
		<div 
			v-if="loading" 
			:style="wrapperStyle"
			:class="wrapperClassName"
			class="vc-paging-loading__spin"
		>
			<slot name="loading">
				<vc-spin />
			</slot>
		</div>
	</div>
</template>

<script>
import Spin from '../spin/index';

export default {
	name: 'vc-paging-loading',
	components: {
		'vc-spin': Spin
	},
	props: {
		loading: Boolean,
		wrapperStyle: Object,
		wrapperClassName: [String, Object, Array]
	},
	data() {
		return {
		};
	}
};
</script>

<style lang="scss">
@import '../style/index.scss';

@include block(vc-paging-loading) {
	position: relative;
	min-height: 130px;
	@include element(container) {
		transition: opacity .3s;
		@include when(loading) {
			opacity: 0.5;
		}
	}
	@include element(spin) {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
