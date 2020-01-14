<template>
	<div class="v-index">
		<router-link to="/zh-CN/components/installation">
			<h1>Hello @wya/vc - 开始使用</h1>
		</router-link>
	</div>
</template>

<script>
export default {
	name: 'v-index',
	
};
</script>

<style lang="scss">
.v-index {
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	min-height: 600px;
}
</style>
