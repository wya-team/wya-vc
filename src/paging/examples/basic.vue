<template>
	<vc-paging
		:data-source="data"
		:columns="columns" 
		:total="total"
		:cur-page="curPage"
		:reset-page="resetPage"
		:history="true"
		v-bind="page"
		@page-change="loadData"
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
			data: {},
			curPage: 1,
			resetPage: 1,
			total: 0,
			page: {
				'show-total': false
			},
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
									this.curPage = 1;
									this.resetPage = 1;
									this.total = 0;
									this.data = {};
								}
							}
						}, '回到首页刷新');
					}
				},
				{
					title: 'Opt',
					key: 'opt',
					render: (h, params) => {
						return h('div', {
							style: {
								marginRight: '5px'
							},
							on: {
								click: () => {
									let { query: { page = 1 } } = getParseUrl();

									this.resetPage = this.curPage;
									this.curPage = 1;
									this.total = 0;
									this.data = {};
								}
							}
						}, '当前页刷新');
					}
				}
			],
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
					opt: Math.floor(Math.random() * 3 + 1),
				});
			}
			this.curPage = page;
			this.resetPage = page;
			this.total = 100;
			if (!this.data[page] || this.data[page].length === 0) {
				this.data[page] = data;
			}
		},
	}
};
</script>
