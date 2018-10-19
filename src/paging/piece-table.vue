<template>
	<div>
		<template v-for="item in data">
			<slot :item="item"/>
		</template>
	</div>
</template>

<script>
export default {
	name: 'vc-piece-talbe',
	props: {
		data: {
			type: Array,
			default() {
				return [];
			}
		}
	},
};
</script>

<style lang="scss" scoped>

</style>


