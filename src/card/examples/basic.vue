<template>
	<div style="margin: 40px">
		<vc-card>
			<template #title>
				<p>Borderless card</p>
			</template>
			<template #extra>
				<p>Content of card</p>
			</template>
			<p>Content of card</p>
			<p>Content of card</p>
		</vc-card>
	</div>
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
