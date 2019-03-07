<template>
	<vc-pull-scroll
		:load-data="loadData"
		:is-end="isEnd"
		:data-source="dataSource"
		:current="current"
		:show="true"
		:pull="true"
		:scroll="true"
		direction="up"
		class="vc-pull-scroll-basic"
		wrapper=".scroll-container"
	>
		<div>这是一个window下的滚动</div>
		<div v-for="(item, index) in dataSource" :key="index" style="height: 200px">
			{{ item }}
		</div>
	</vc-pull-scroll>
</template>
<script>
import PullScroll from '..';
// import { initScroll } from './utils/utils';
let count = 0;
export default {
	name: "vc-pull-scroll-basic",
	components: {
		'vc-pull-scroll': PullScroll
	},
	data() {
		return {
			current: 0,
			total: 0,
			dataSource: [],
			isEnd: 0,
		};
	},
	computed: {
		
	},
	methods: {
		loadData() {

			this.isEnd = 1;

			setTimeout(() => {
				this.total = 5;
				this.current = this.current + 1;

				this.isEnd = this.current + 1 > this.total ? 2 : 0;
				this.dataSource = [...this.dataSource, ...Array.from({ length: 10 }, () => count++)];
			}, 1000);
		}
	}
};
</script>
