<template>
	<vc-table
		:columns="columns"
		:data="data"
		width="550"
		border
	/>
</template>
<script>
import Table from '..';

export default {
	name: "vc-table-basic",
	components: {
		'vc-table': Table
	},
	data() {
		return {
			columns: [
				{
					title: 'Name',
					key: 'name',
					width: 100,
					fixed: 'left'
				},
				{
					title: 'Age',
					key: 'age',
					width: 100
				},
				{
					title: 'Province',
					key: 'province',
					width: 100
				},
				{
					title: 'City',
					key: 'city',
					width: 100
				},
				{
					title: 'Address',
					key: 'address',
					width: 200
				},
				{
					title: 'Postcode',
					key: 'zip',
					width: 100
				},
				{
					title: 'Action',
					key: 'action',
					fixed: 'right',
					width: 120,
					render: (h, params) => {
						return h('div', [
							h('div', {
								props: {
									type: 'text',
									size: 'small'
								}
							}, 'View'),
							h('div', {
								props: {
									type: 'text',
									size: 'small'
								}
							}, 'Edit')
						]);
					}
				}
			],
			data: [
				{
					name: 'John Brown',
					age: 18,
					address: 'New York No. 1 Lake Park',
					province: 'America',
					city: 'New York',
					zip: 100000
				},
				{
					name: 'Jim Green',
					age: 24,
					address: 'Washington, D.C. No. 1 Lake Park',
					province: 'America',
					city: 'Washington, D.C.',
					zip: 100000
				},
				{
					name: 'Joe Black',
					age: 30,
					address: 'Sydney No. 1 Lake Park',
					province: 'Australian',
					city: 'Sydney',
					zip: 100000
				},
				{
					name: 'Jon Snow',
					age: 26,
					address: 'Ottawa No. 2 Lake Park',
					province: 'Canada',
					city: 'Ottawa',
					zip: 100000
				}
			]
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>
