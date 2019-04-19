<template>
	<div>
		<vc-sort-list v-model="dataSource">
			<div 
				slot-scope="{ it }" 
				:style="{ background: `#ff33${it.id}${it.id}` }"
				style="width: 200px;line-height: 5; color: white"
			>
				{{ it.id }}
			</div>
		</vc-sort-list>
		<button @click="handleAdd">添加</button>
		<button @click="handleDel">删除第一个</button>
		<button @click="handleShuffle">乱序</button>
	</div>
</template>
<script>
import { shuffle } from 'lodash';
import SortList from '../sort-list';

let count = 0;
export default {
	name: "vc-sort-list-basic",
	components: {
		'vc-sort-list': SortList
	},
	data() {
		return {
			dataSource: Array.from({ length: 5 }, () => ({ id: `${count++}` }))
		};
	},
	computed: {
		
	},
	methods: {
		handleAdd() {
			this.dataSource.push({ id: `${count++}` });
		},
		handleDel() {
			this.dataSource.shift();
		},
		handleShuffle() {
			this.dataSource = shuffle(this.dataSource);
		}
	}
};
</script>
