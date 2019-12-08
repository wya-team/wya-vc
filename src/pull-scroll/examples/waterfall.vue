<template>
	<div class="waterfall-demo">
		<vc-pull-scroll
			:load-data="loadData"
			:data-source="dataSource"
			:total="total"
			:columns="columns"
			waterfall
		>
			<template #header>
				<button style="margin-bottom: 20px;" @click="handleClick">切换列，当前列数为 {{ columns }}</button>
			</template>
			<template #default="{ it, index, width, styles }">
				<div :style="[styles, { width: width + 'px' }]" class="_water-item">
					<vc-img 
						v-if="index % 3" 
						fit="cover"
						wrapper="._water-item"
						src="https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/172/20191114/1425957403/!$.~=,^_()-`.jpg"
					/>
					<vc-img 
						v-else 
						fit="cover"
						wrapper="._water-item"
						src="https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/172/20191126/1608371765/a2.png"
					/>
					<div>{{ index + 1 }}</div>
				</div>
			</template>
		</vc-pull-scroll>
	</div>
</template>
<script>
import { ajax } from '@wya/http';
import PullScroll from '..';
import Img from '../../img';
import Transition from '../../transition';

let count = 0;
export default {
	name: "vc-pull-scroll-basic",
	components: {
		'vc-pull-scroll': PullScroll,
		'vc-img': Img,
		'vc-transition-fade': Transition.Fade
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
			},
			columns: 1
			// scrollText: (h, { status }, ctx) => {
			// 	return <span>{ status }</span>;
			// },
			// pullText: (h, { status }, ctx) => {
			// 	return <span>{ status }</span>;
			// }
		};
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
					delay: 1
				}).then((res) => {
					console.log('@wya/vc:', page);
					this.total = res.data.page.total;
					isRefresh 
						? (this.dataSource = res.data.list)
						: this.dataSource.splice(this.dataSource.length, 0, ...res.data.list);
					resolve(res.data.list);
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
			this.columns = this.columns >= 6 ? 1 : this.columns + 1;
		},
		
	}

};
</script>
<style lang="scss">
.waterfall-demo {
	._water-item {
		font-size: 20px;
		color: #f60;
		background-color: #eee;
		.vc-img {
			width: 100%;
		}
	}
}
</style>
