<template>
	<div :key="id" class="_item">
		<div>{{ name }}</div>
		<div @click="handleResetFirst">回到首页刷新</div>
		<div @click="handleResetCur">当前页刷新</div>
	</div>
</template>

<script>
import { initPage } from '../utils/utils';

export default {
	name: "vc-paging-piece-item",
	props: {
		id: [String, Number],
		name: String
	},
	methods: {
		/**
		 * 回到首页刷新
		 * 请使用vuex的commit，这里只负责实现
		 */
		handleResetFirst() {
			this.$parent.$parent.listInfo = {
				...initPage
			};
		},
		/**
		 * 当前页刷新
		 * 请使用vuex的commit，这里只负责实现
		 */
		handleResetCur() {
			this.$parent.$parent.listInfo = {
				...initPage,
				reset: true
			};
		}
	}
};
</script>
