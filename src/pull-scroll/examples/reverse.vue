<template>
	<div>
		<vc-pull-scroll
			:load-data="loadData"
			:data-source="dataSource"
			:total="total"
			:height="height"
			inverted
			wrapper
		>
			<template #header>
				<div>这是一个window下的滚动</div>
			</template>
			<template #default="{ it }">
				<div style="padding: 20px" @click="handleReset">{{ it }}</div>
			</template>
		</vc-pull-scroll>

		<div style="position: fixed; bottom: 0; left: 0; right: 0; border: 1px solid red">
			<input style="width: 100%" type="text">
		</div>
	</div>
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
			height: window.innerHeight
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
								total: 10,
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
						: this.dataSource.splice(0, 0, ...res.data.list);
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