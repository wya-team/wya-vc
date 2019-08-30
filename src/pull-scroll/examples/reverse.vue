<template>
	<div>
		<vc-tabs 
			:value="type" 
			:animated="false"
			@click="handleChange"
		>
			<vc-tabs-pane 
				v-for="(item) in tabs"
				:key="item.value"
				:label="item.label" 
				:name="item.value"
			>
				<vc-pull-scroll
					:show="item.value == type" 
					:load-data="loadData"
					:data-source="listInfo[item.value].data"
					:total="listInfo[item.value].total"
					:height="height"					
					inverted
					wrapper
					style="padding-bottom: 45px"
				>
					<template #header>
						<div>这是一个tabs下的滚动</div>
					</template>
					<template #default="{ it }">
						<div style="padding: 20px" @click="handleReset">{{ it }}</div>
					</template>
				</vc-pull-scroll>
			</vc-tabs-pane>
		</vc-tabs>
		

		<div style="position: fixed; bottom: 0; left: 0; right: 0; border: 1px solid red">
			<input style="width: 100%" type="text">
		</div>
	</div>
</template>
<script>
import { ajax } from '@wya/http';
import { URL } from '@wya/utils';
import PullScroll from '..';
import Tabs from '../../tabs/index.m';
import { initScroll } from './utils/utils';
import HackManager from './utils/hack-manager';

let manager = new HackManager();
const initialState = {
	1: { ...initScroll },
	2: { ...initScroll },
	3: { ...initScroll }
};

let count = 0;

export default {
	name: "vc-pull-scroll-basic",
	components: {
		'vc-pull-scroll': PullScroll,
		'vc-tabs': Tabs,
		'vc-tabs-pane': Tabs.Pane,
	},
	data() {
		const { query = {} } = URL.parse() || {};
		return {
			total: 0,
			dataSource: [],
			height: window.innerHeight - 90,

			type: String(query.type || "1"), // 同tabs下的value
			tabs: [
				{ label: '标签一', value: '1' }, 
				{ label: '标签二', value: '2' }, 
				{ label: '标签三', value: '3' }
			],
			current: {},
			listInfo: initialState
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
					const { type } = this;
					console.log('@wya/vc:', page);
					this.listInfo[type].total = res.data.page.total;
					isRefresh 
						? (this.listInfo[type].data = res.data.list)
						: this.listInfo[type].data.splice(0, 0, ...res.data.list);
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
			this.listInfo = {
				...initialState
			};
		},
		handleChange(type) {
			this.type = type;

			this.setHistory({
				type
			});
		},
		setHistory(values) {
			let { path, query } = URL.parse();
			window.history.replaceState(null, null, URL.merge({
				path,
				query: {
					...query,
					...values
				}
			}));
		},
	}

};
</script>

<style>
.vcm-tabs {
	padding-top: 45px;
}
.vcm-tabs .vcm-tabs__bar {
	position: fixed;
	top: 0;
	width: 100%;
	margin-bottom: 0;
	z-index: 990;
}
</style>