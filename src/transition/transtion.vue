<!-- 无视这个文件，基于basic-mixin自行封装 -->
<template>
	<component 
		:is="componentType"
		:tag="tag"
		:enter-active-class="`${prefix} is-in`"
		:move-class="`${prefix} is-move`"
		:leave-active-class="`${prefix} is-out`"
		v-bind="$attrs"
		v-on="hooks"
	>
		<slot />
	</component>
</template>
<script>
import basicMixin from './basic-mixin';

export default {
	name: 'vc-transition',
	mixins: [basicMixin]
};

</script>