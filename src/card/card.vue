<template>
	<i-card 
		:bordered="bordered"
		:dis-hover="disHover"
		:shadow="shadow"
		:padding="padding"
		:title="title"
		:icon="icon"
	>
		<slot slot="title" name="title" />
		<slot />
	</i-card>
</template>
<script>
import Card from 'iview/src/components/card';

export default {
	name: "vc-card",
	components: {
		'i-card': Card
	},
	props: {
		...Card.props
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