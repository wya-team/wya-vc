<template>
	<div>
		22232
		<vc-pull-scroll
			:load-data="loadData"
			:data-source="dataSource"
			:total="total"
		>
			<template #header>
				<div @click="handleClick">这是一个window下的滚动</div>
			</template>
			<template #default="{ it }">
				<div style="padding: 20px" @click="handleReset">{{ it }}</div>
			</template>
		</vc-pull-scroll>
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
			scrollText: {
				1: (h) => {
					return (
						<span>2</span>
					);
				},
				2: "22"
			}
			// scrollText: (h, { status }, ctx) => {
			// 	return <span>{ status }</span>;
			// },
			// pullText: (h, { status }, ctx) => {
			// 	return <span>{ status }</span>;
			// }
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
		},
		handleClick() {
			console.log(2);
		}
	}

};
</script>
