<!-- 开发使用的版本，如各种操作改变属性值 -->
<template>
	<div style="padding: 20px; display: flex; flex-direction: column-reverse;">
		<!-- 组件展示 -->
		<vc-table ref="table" :data-source="dataSource" v-bind="attrs" v-on="hooks">
			<vc-table-item>
				<vc-table-column
					:fixed="fixed"
					prop="date"
					label="日期"
					min-width="180"
				/>
				<vc-table-column
					prop="name"
					label="姓名"
					width="180"
				/>
				<vc-table-column
					prop="address"
					label="地址"
				/>
				
				<!-- 动态 -->
				<vc-table-column
					v-for="(item, index) in dynamicColumns"
					:key="item"
					:label="`${dynamicText}-header: ${index}`"
					:fixed="dynamicColumns.length === index + 1 && fixed && 'right'"
				>
					<template #default="{ row, $index }">
						{{ dynamicText }}-item: {{ $index }}
					</template>
				</vc-table-column>
			</vc-table-item>
		</vc-table>
		<br>
		<!-- 控制区域 -->
		<div>
			<vc-button @click="handleBasic('border')">border: {{ attrs.border }}</vc-button>
			<vc-button @click="handleBasic('stripe')">stripe: {{ attrs.stripe }}</vc-button>
			<vc-button @click="handleBasic('maxHeight')">maxHeight: {{ attrs.maxHeight }}</vc-button>
			<vc-button @click="handleBasic('rowClassName')">rowClassName: {{ typeof attrs.rowClassName }}</vc-button>
			<vc-button @click="handleBasic('fixed')">fixed: {{ fixed }}(需要多个columns)</vc-button>
			<br>	
			<br>
			<vc-button @click="handleCloumn('add')">Add Columns</vc-button>
			<vc-button @click="handleCloumn('remove')">Remove Columns</vc-button>
			<vc-button @click="handleCloumn('update')">Update Columns</vc-button>

			<br>
			<br>
			<vc-button @click="handleRow('add')">Add Row</vc-button>
			<vc-button @click="handleRow('remove')">Remove Row</vc-button>
			<vc-button @click="handleRow('update')">Update Row</vc-button>
		</div>
	</div>
</template>
<script>
import Table from '..';
import Button from '../../button';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-table': Table,
		'vc-table-column': Table.Column,
		'vc-table-item': Table.Item,
		'vc-button': Button
	},
	data() {
		return {
			attrs: {
				border: true,
				stripe: true,
				rowClassName: '',
				maxHeight: undefined
			},
			hooks: {

			},
			dynamicColumns: [],
			dynamicText: 'dynamic',
			fixed: false,
			dataSource: [
				{
					id: 1,
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				}, 
				{
					id: 2,
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄',
				}, 
				{
					id: 3,
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},
				{
					id: 4,
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}
			]
		};
	},
	computed: {
		
	},
	methods: {
		handleBasic(type) {
			switch (type) {
				case 'rowClassName':
					this.attrs.rowClassName = this.attrs.rowClassName
						? ''
						: ({ row, rowIndex }) => {
							console.log(rowIndex);
							if (rowIndex === 0) {
								return 'warning';
							} else if (rowIndex === 2) {
								return 'success';
							}
							return '';
						};
					break;
				case 'maxHeight':
					this.attrs.maxHeight = !this.attrs.maxHeight ? 250 : '';
					break;
				case 'fixed':
					this.fixed = !this.fixed;
					break;
				default: 
					this.attrs[type] = !this.attrs[type];
					break;
			}
		},
		handleCloumn(type) {
			switch (type) {
				case 'add':
					this.dynamicColumns.push(Math.random());
					break;
				case 'remove':
					this.dynamicColumns.splice(0, 1);
					break;
				case 'update':
					this.dynamicText = this.dynamicText === 'update' ? 'dynamic' : 'update';
					break;
				default: 
					break;
			}

			this.$refs.table.doLayout();
		},
		handleRow(type) {
			switch (type) {
				case 'add':
					this.dataSource.push({
						id: Math.random(),
						date: Math.random(),
						name: Math.random(),
						address: Math.random()
					});
					break;
				case 'remove':
					this.dataSource.splice(0, 1);
					break;
				case 'update':
					if (this.dataSource.length > 0) {
						let updated = {
							...this.dataSource[0],
							date: Math.random()
						};
						this.$set(this.dataSource, 0, updated);
						// this.dataSource.splice(0, 1, updated);
					}
					break;
				default: 
					break;
			}

			// this.$refs.table.doLayout();
		}
	}
};
</script>
<style>
.vc-table .warning {
	background: oldlace!important;
}
.vc-table .success {
	background: #f0f9eb!important;
}

</style>

