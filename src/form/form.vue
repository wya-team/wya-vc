<template>
	<form :autocomplete="autocomplete" class="vc-form">
		<slot />
	</form>
</template>

<script>
import basicFormMixin from './form-mixin';

export default {
	/**
	 * 表单特殊, name由mixin管理
	 */
	mixins: [basicFormMixin],
};

</script>