<template>
	<vc-card :bordered="false">
		<p slot="title">Borderless card</p>
		<p>Content of card</p>
		<p>Content of card</p>
		<p>Content of card</p>
	</vc-card>
</template>
<script>
import Card from '../card';

export default {
	name: "vc-card-basic",
	components: {
		'vc-card': Card
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
