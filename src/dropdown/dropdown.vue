<template>
	<i-dropdown 
		:trigger="trigger"
		:visible="visible"
		:placement="placement"
		:transfer="portal"
		:transfer-class-name="portalClassName "
		@on-click="$emit('click', arguments[0])"
		@on-visible-change="$emit('visible-change', arguments[0])"
		@on-clickoutside="$emit('clickoutside', arguments[0])"
	>
		<slot slot="list" name="list" />
		<slot />
	</i-dropdown>
</template>
<script>
import Dropdown from 'iview/src/components/dropdown';

export default {
	name: "vc-dropdown",
	components: {
		'i-dropdown': Dropdown
	},
	props: {
		...Dropdown.props,
		portal: {
			type: Boolean,
			default: true
		},
		portalClassName: String,
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>
<style></style>