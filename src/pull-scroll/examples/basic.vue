<template>
	<vc-pull-scroll
		:load-data="loadData"
		:data-source="dataSource"
		:total="total"
	>
		<template #header>
			<div>这是一个window下的滚动</div>
		</template>
		<template #default="{ it }">
			<div style="padding: 20px" @click="handleReset">{{ it }}</div>
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
			total: 0,
			dataSource: [],
		};
	},
	computed: {
		
	},
	methods: {
		loadData(page, isRefresh) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
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

						}
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
			this.total = 0;
			this.dataSource = [];
		}
	}

};
</script>
