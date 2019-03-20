<template>
	<i-input 
		ref="input"
		:value="value"
		:size="size"
		:placeholder="placeholder"
		:clearable="clearable"
		:disabled="disabled"
		:readonly="readonly"
		:maxlength="maxlength"
		:icon="icon"
		:prefix="prefix"
		:suffix="suffix"
		:search="search"
		:enter-button="enterButton"
		:rows="rows"
		:number="number"
		:autofocus="autofocus"
		:autocomplete="autocomplete"
		:element-id="elementId"
		:spellcheck="spellcheck"
		:wrap="wrap"
		type="textarea"
		@on-enter="$emit('enter', arguments[0])"
		@on-click="$emit('click', arguments[0])"
		@on-change="$emit('change', arguments[0])"
		@on-focus="$emit('focus', arguments[0])"
		@on-blur="$emit('blur', arguments[0])"
		@on-keyup="$emit('keyup', arguments[0])"
		@on-keydown="$emit('keydown', arguments[0])"
		@on-keypress="$emit('keypress', arguments[0])"
		@on-search="$emit('search', arguments[0])"
		@input="$emit('input', arguments[0])"
	>
		<slot slot="prepend" name="prepend" />
		<slot slot="append" name="append" />
		<slot slot="prefix" name="prefix" />
		<slot slot="suffix" name="suffix" />
	</i-input>
</template>
<script>
import Input from 'iview/src/components/input';

export default {
	name: "vc-textarea",
	components: {
		'i-input': Input
	},
	props: {
		...Input.props
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	mounted() {
		this.focus = this.$refs.input.focus;
	},
	methods: {
	}
};
</script>
<style></style>