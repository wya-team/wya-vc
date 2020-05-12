<template>
	<!-- 用于占位，默认使用一个div, 利于动画 -->
	<div :style="style" :name="currentName" class="vc-tabs-pane">
		<slot v-if="isReady" />
	</div>
</template>
<script>
import TabsPaneMixin from './tabs-pane-mixin';

export default {
	name: 'vc-tabs-pane',
	mixins: [TabsPaneMixin],
	props: {
		closable: {
			type: Boolean,
			default: null
		},
	}
};
</script>

<style>
.vc-tabs-pane {
	flex-shrink: 0;
	width: 100%;
}
.vc-tabs.is-animated .vc-tabs-pane{
	transition: opacity .3s cubic-bezier(.35, 0, .25, 1);
	opacity: 1;
}
</style>
