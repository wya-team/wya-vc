<template>
	<div style="padding: 50px; display: flex">
		<div style="flex: 0 0 25%">
			<div @click="handleSave">
				👌保存👌
			</div>
			<div 
				@click="handleAddCategory"
			>👌添加分类👌</div>
			<div v-for="(i, iindex) in sku" :key="i.value">
				<div style="display: flex; align-items: center;">
					<h2>- 分类-{{ i.label }}</h2>
					<span @click="handleAddItem(i, iindex)">------>添加规格</span>
					<span @click="handleDelCategory(i)">------>删除分类</span>
				</div>
				<ul style="padding-left: 30px">
					<li v-for="(j, jindex) in i.children" :key="j.value">
						<span>规格{{ j.label }}</span>
						<span @click="handleDelItem(iindex, jindex)">------>删除规格</span>
					</li>
				</ul>
			</div>
		</div>
		<div style="flex: 0 0 75%">
			<vc-table
				:data-source="dataSource"
				:get-span="getSpan"
				style="width: 100%"
				row-key="id"	
			>
				<vc-table-item>
					<vc-table-column
						v-for="(i, index) in columns"
						:key="index"
						:label="`分类-${i.label}`"
						prop="label"
					>
						<template #default="{ row }">
							<span>{{ row.label[index].label }}</span>
						</template>
					</vc-table-column>
					<!-- 编辑数据 -->
					<vc-table-column
						label="库存"
						prop="stock"
					>
						<template #default="{ row }">
							<input v-model="row.stock" type="text">
						</template>
					</vc-table-column>
					<vc-table-column
						label="价格"
						prop="price"
					>
						<template #default="{ row }">
							<input v-model="row.price" type="text">
						</template>
					</vc-table-column>
					<vc-table-column
						label="序号"
						prop="index"
					/>
				</vc-table-item>
			</vc-table>
		</div>
	</div>
</template>

<script>
import { debounce, random } from 'lodash';
import Table from '..';

let categoryCount = 0;

export default {
	components: {
		'vc-table': Table,
		'vc-table-column': Table.Column,
		'vc-table-item': Table.Item
	},
	data() {
		return {
			sku: [],
			dataSource: []
		};
	},
	computed: {
		columns() {
			return this.sku.slice().filter((i) => i.children.length);
		} 
	},
	watch: {
		sku: {
			deep: true,
			handler() {
				this.makeData();
			}
		}
	},
	methods: {
		handleSave() {
			alert('已打印到控制台');
			console.log(this.dataSource, /dataSource/);
			console.log(this.sku, /sku/);
		},
		handleAddCategory() {
			this.sku.push({
				value: ++categoryCount,
				label: `${categoryCount}`,
				count: 0, // 用于记录子节点的个数
				children: []
			});

		},
		handleDelCategory(i) {
			this.sku.splice(i, 1);
		},
		handleAddItem(parent, i) {
			let item = Math.random();
			this.sku[i].children.push({
				value: `${parent.value}:${++parent.count}`,
				label: `${parent.label}:${parent.count}`,
			});

		},
		handleDelItem(i, j) {
			this.sku[i].children.splice(j, 1);
		},
		makeData() {
			let target = [];
			
			let tmp = this.columns.slice();
			if (tmp.length === 0) {
				this.dataSource = [];
				return;
			}

			// 总条数
			let total = tmp.reduce((pre, cur) => {
				return pre * (cur.children.length || 1);
			}, 1);

			for (let i = 0; i < total; i++) {
				let label = this.columns.reduce((pre, cur, columnIndex) => {

					let rowspan = this.getRowSpan(columnIndex + 1);
					let j = Math.floor(i / rowspan);
					let length = cur.children.length;

					pre.push(
						cur.children[j <= length ? j : j % length] 
						|| cur.children[i % length] 
						|| {}
					);
					return pre;
				}, []);

				/**
				 * 必须构建唯一的id, 确保每次key会变化
				 * 如果是随机数, 正常情况下是代码错了 - -！ 
				 */
				let id = label.reduce((pre, cur) => {
					return `${pre}__${cur.value}`;
				}, i) || Math.random();

				// 这里去判断初始值还是已编辑
				target[i] = {
					id, 
					label,
					index: i, // 必须要有,用于getSpan (已绑定在id上)
					stock: 0,
					price: 0,
				};
			}

			this.dataSource = target;
		},

		getRowSpan(index) {
			let rowspan = this.columns.slice(index).reduce((pre, cur, index) => {
				return pre * cur.children.length;
			}, 1);
			return rowspan;
		},

		/**
		 * 性能需要优化, 鼠标移动会连续触发
		 * debounce测试无效
		 */
		getSpan({ row, column, rowIndex, columnIndex }) {
			if (columnIndex + 1 >= this.columns.length) {
				return {
					rowspan: 1,
					colspan: 1
				};
			}
			// 当前的rowspan由后两者决定
			let rowspan = this.getRowSpan(columnIndex + 1);

			return {
				rowspan: ((row.index + rowspan) % rowspan) ? 0 : rowspan,
				colspan: 1
			};
		}
	}
};
</script>
<style>
	td {
		border-left: 1px solid #e8e8e8
	}
	tr {
		td:last-child {
			border-right: 1px solid #e8e8e8
		} 
	}
</style>
