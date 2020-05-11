<!-- 开发使用的版本，如各种操作改变属性值 -->
<template>
	<div style="padding: 20px; display: flex; flex-direction: column-reverse;">
		<!-- 组件展示 -->
		<vc-table 
			ref="table" 
			:key="attrs.lazy" 
			:data-source="dataSource" 
			v-bind="attrs" 
			v-on="hooks"
		>
			<vc-table-item>
				<vc-table-column
					v-if="selection"
					type="selection"
				/>
				<vc-table-column
					:fixed="columnAttrs.fixed"
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
					:show-popover="columnAttrs.showPopover"
					prop="address"
					label="地址"
				/>
				<vc-table-column
					label="过滤"
				>
					<template #header>
						<vc-table-filter
							v-model="query.filter"
							:data-source="[{ value: '1', label: '1' }, { value: '2', label: '2' }]"
							@change="handleChange"
						>
							<span>标签</span>
						</vc-table-filter>
					</template>
					<template #default="{ row }">
						<div>{{ row.name }}</div>
					</template>
				</vc-table-column>
				<vc-table-column
					label="排序"
				>
					<template #header>
						<vc-table-sort
							v-model="query.sort"
							@change="handleChange"
						>
							<span>标签</span>
						</vc-table-sort>
					</template>
					<template #default="{ row }">
						<div>{{ row.name }}</div>
					</template>
				</vc-table-column>
				<!-- 动态 -->
				<vc-table-column
					v-for="(item, index) in dynamicColumns"
					:key="item"
					:label="`${dynamicText}-header: ${index}`"
					:fixed="dynamicColumns.length === index + 1 && columnAttrs.fixed && 'right'"
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
			<vc-button @click="handleTableAttr('border')">
				border: {{ attrs.border }}
			</vc-button>
			<vc-button @click="handleTableAttr('stripe')">
				stripe: {{ attrs.stripe }}
			</vc-button>
			<vc-button @click="handleTableAttr('maxHeight')">
				maxHeight: {{ attrs.maxHeight }}
			</vc-button>
			<vc-button @click="handleTableAttr('rowClassName')">
				rowClassName: {{ typeof attrs.rowClassName }}
			</vc-button>
			<vc-button @click="handleTableAttr('showSummary')">
				showSummary: {{ attrs.showSummary }}
			</vc-button>
			<vc-button @click="handleTableAttr('lazy')">
				lazy: {{ attrs.lazy }}
			</vc-button>
			<br>	
			<br>
			<vc-button @click="handleCloumn('add')">
				Add Columns
			</vc-button>
			<vc-button @click="handleCloumn('remove')">
				Remove Columns
			</vc-button>
			<vc-button @click="handleCloumn('update')">
				Update Columns
			</vc-button>
			<vc-button @click="handleCloumnAttr('fixed')">
				fixed: {{ columnAttrs.fixed }}(需要多个columns)
			</vc-button>
			<vc-button 
				@click="handleCloumnAttr('showPopover')"
			>
				showPopover: {{ columnAttrs.showPopover }}(需要更多的文字)
			</vc-button>
			<br>
			<br>
			<br>
			<vc-button @click="handleRow('add')">
				Add Row
			</vc-button>
			<vc-button @click="handleRow('remove')">
				Remove Row
			</vc-button>
			<vc-button @click="handleRow('update')">
				Update Row
			</vc-button>
			<br>

			<br>
			<br>
			<vc-button @click="selection = !selection">
				selection: {{ selection }}
			</vc-button>
			<vc-button @click="$refs.table.toggleAllSelection()">
				Select All
			</vc-button>
			<vc-button @click="$refs.table.toggleRowSelection(dataSource[1])">
				Select One
			</vc-button>
		</div>
	</div>
</template>
<script>
import { random } from 'lodash';
import Table from '..';
import Button from '../../button';
import TableFilter from './develop/filter';
import TableSort from './develop/sort';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-table': Table,
		'vc-table-column': Table.Column,
		'vc-table-item': Table.Item,
		'vc-button': Button,
		'vc-table-filter': TableFilter,
		'vc-table-sort': TableSort,
	},
	data() {
		return {
			attrs: {
				border: true,
				stripe: true,
				rowClassName: '',
				maxHeight: undefined,
				showSummary: false,
				getSummary(param) {
					const { columns, data } = param;
					return columns.map((item, index) => (index || '合计'));
				},
				lazy: false,
				rowKey: 'id',
				loadExpand(tree, treeNode) {
					return new Promise((resolve, reject) => {
						setTimeout(() => {
							resolve([
								{
									id: random(0, Number.MAX_SAFE_INTEGER),
									date: `${new Date().getTime()}`,
									name: `代号 - ${random(0, 10000)}`,
									address: `祥园路${random(0, 10000)}号`,
									hasChildren: true
								}, 
								{
									id: random(0, Number.MAX_SAFE_INTEGER),
									date: `${new Date().getTime()}`,
									name: `代号 - ${random(0, 10000)}`,
									address: `祥园路${random(0, 10000)}号`,
									hasChildren: true
								}
							]);
						}, 1000);
					});
				},
			},
			hooks: {

			},
			columnAttrs: {
				fixed: false,
				showPopover: true,
			},
			cloumnHooks: {

			},
			query: {
				filter: [],
				sort: ''
			},
			dynamicColumns: [],
			dynamicText: 'dynamic',
			selection: false,
			dataSource: [
				{
					id: 1,
					date: `${new Date().getTime()}`,
					name: `代号 - ${random(0, 10000)}`,
					address: `浙江省杭州市拱墅区祥符街道 
						showPopover showPopover showPopover showPopover showPopover
					`,
					hasChildren: true
				}, 
				{
					id: 2,
					date: `${new Date().getTime()}`,
					name: `代号 - ${random(0, 10000)}`,
					address: `浙江省杭州市拱墅区祥符街道 
						showPopover showPopover showPopover showPopover showPopover
					`,
					hasChildren: true
				}, 
				{
					id: 3,
					date: `${new Date().getTime()}`,
					name: `代号 - ${random(0, 10000)}`,
					address: `祥园路${random(0, 10000)}号`,
					hasChildren: true
				},
				{
					id: 4,
					date: `${new Date().getTime()}`,
					name: `代号 - ${random(0, 10000)}`,
					address: `祥园路${random(0, 10000)}号`,
					hasChildren: true
				}
			]
		};
	},
	methods: {
		handleTableAttr(type) {
			switch (type) {
				case 'rowClassName':
					this.attrs.rowClassName = this.attrs.rowClassName
						? ''
						: ({ row, rowIndex }) => {
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
				case 'lazy': 
					this.attrs[type] = !this.attrs[type];
					this.handleChange();
					break;
				default: 
					this.attrs[type] = !this.attrs[type];
					break;
			}
		},
		handleCloumnAttr(type) {
			switch (type) {
				default: 
					this.columnAttrs[type] = !this.columnAttrs[type];
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

			this.$refs.table.refreshLayout();
		},
		handleRow(type) {
			switch (type) {
				case 'add':
					this.dataSource.push({
						id: random(0, Number.MAX_SAFE_INTEGER),
						date: Math.random(),
						name: Math.random(),
						address: Math.random(),
						hasChildren: true
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
					}
					break;
				default: 
					break;
			}
		},
		handleChange(value) {
			this.dataSource = Array.from({ length: 3 }, (_, index) => ({
				id: index,
				date: Math.random(),
				name: Math.random(),
				address: Math.random(),
				hasChildren: true
			}));
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

