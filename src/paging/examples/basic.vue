<template>
	<vc-paging
		:data="data"
		:columns="columns" 
		:total="total"
		:cur-page="curPage"
		@load-data="loadData"
	/>
</template>
<script>
import Paging from '../paging';
import { getConstructUrl, getParseUrl } from '../../utils/utils';

export default {
	name: "vc-paging-basic",
	components: {
		'vc-paging': Paging
	},
	data() {
		return {
			data: [],
			columns: [
				{
					title: 'Name',
					key: 'name'
				},
				{
					title: 'Status',
					key: 'status',
					render: (h, params) => {
						return h('div', {
							style: {
								marginRight: '5px'
							},
							on: {
								click: () => {
									this.curPage = 3;
									this.data = [];
								}
							}
						}, 'View');
					}
				}
			],
			curPage: 1,
			total: 100
		};
	},
	computed: {
		
	},
	created() {
		let { query: { page = 1 } } = getParseUrl();
		this.loadData(page);
	},
	methods: {
		loadData(page) {
			let data = [];
			for (let i = 0; i < 10; i++) {
				data.push({
					name: 'Business' + Math.floor(Math.random() * 100 + 1),
					status: Math.floor(Math.random() * 3 + 1),
				});
			}
			this.curPage = page;
			this.data = data;
		},
	}
};
</script>
