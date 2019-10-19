<template>
	<vc-pull-scroll
		:height="height"
		:load-data="loadData"
		:data-source="dataSource"
		:total="total"
		wrapper
	>
		<template #header>
			<div>这是一个容器下的滚动</div>
		</template>
		<template #default="{ it }">
			<div style="padding: 20px">{{ it }}</div>
		</template>
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
			total: 0,
			dataSource: []
		};
	},
	computed: {
		
	},
	methods: {
		loadData(page, isRefresh) {
			return new Promise((resolve, reject) => {
				ajax({
					url: 'test.json',
					localData: {
						status: 1,
						data: {
							page: {
								current: page,
								total: 2,
							},
							list: this.getFakeData(page)
						}
					},
					delay: 3
				}).then((res) => {
					console.log('@wya/vc:', page);
					this.total = res.data.page.total;
					isRefresh 
						? (this.dataSource = res.data.list)
						: this.dataSource.splice(this.dataSource.length, 0, ...res.data.list);
					resolve();
				}).catch((e) => {
					console.log(e);
					reject();
				});
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
			this.total = 0;
			this.dataSource = [];
		}
	}
};
</script>
