<template>
	<vc-pull-scroll
		:height="height"
		:load-data="loadData"
		:data-source="dataSource"
		:current="current"
		:total="total"
	>
		<div>这是一个容器下的滚动</div>
		<div 
			v-for="(item, index) in dataSource" 
			:key="index" 
			style="height: 200px"
			@click="handleReset"
		>
			{{ item }}
		</div>
	</vc-pull-scroll>
</template>
<script>
import { ajax } from '@wya/http';
import PullScroll from '..';

let count = 0;
export default {
	name: "vc-pull-scroll-basic",
	components: {
		'vc-pull-scroll': PullScroll
	},
	data() {
		return {
			height: window.innerHeight,

			// 数据源
			current: 0,
			total: 0,
			dataSource: []
		};
	},
	computed: {
		
	},
	methods: {
		loadData(isRefresh) {
			let page = isRefresh ? 1 : this.current + 1;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					ajax({
						url: 'test.json',
						localData: {
							status: 1,
							data: {
								currentPage: page,
								totalPage: 200,
								list: this.getFakeData(page)
							}

						}
					}).then((res) => {
						this.total = res.data.totalPage;
						this.current = page;
						isRefresh 
							? (this.dataSource = res.data.list)
							: this.dataSource.splice(this.dataSource.length, 0, ...res.data.list);
						resolve();
					}).catch((e) => {
						reject();
					});
				}, isRefresh ? 3000 : 3000);
			});
			
		},
		getFakeData(page, pageSize = 20) {
			let fakeData = [];
			for (let i = 0; i < pageSize; i++) {
				fakeData.push({
					id: `${page}_${count++}`,
					name: page + '-Business' + Math.floor(Math.random() * 100 + 1),
					status: Math.floor(Math.random() * 3 + 1),
					opt: Math.floor(Math.random() * 3 + 1)
				});
			}
			return fakeData;
		},
		handleReset() {
			this.current = 0;
			this.total = 0;
			this.dataSource = [];
		}
	}
};
</script>
