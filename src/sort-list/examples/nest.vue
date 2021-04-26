<template>
	<div style="width: 100%;">
		<vc-sort-list 
			v-model="dataSource" 
			:mask="false" 
			style="display: flex; flex-direction: row;"
		>
			<div 
				slot-scope="{ it }" 
				:style="{ background: `#${it.id * 3}${it.id * 3}${it.id * 3}` }"
				:mask="false"
				style="width: 100%;color: white; height: 600px"
			>
				<vc-sort-list 
					v-model="dataSourceNest[it.id]" 
					:mask="false"
					style="display: flex; flex-direction: column;"
					value-key="__id"
				>
					<div 
						slot-scope="row" 
						:style="{ background: `#${row.it.__id * 4}${row.it.__id * 4}${row.it.__id * 4}` }"
						style="width: 100%;color: white; height: 100px"
					>
						parent: {{ it.id }} + child: {{ row.it.__id }}
					</div>
				</vc-sort-list>
			</div>
		</vc-sort-list>
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
			dataSource: Array.from({ length: 5 }, () => ({ id: `${count++}` })),
			dataSourceNest: {
				0: Array.from({ length: 5 }, () => ({ __id: `${count++}` })),
				1: Array.from({ length: 5 }, () => ({ __id: `${count++}` })),
				2: Array.from({ length: 5 }, () => ({ __id: `${count++}` })),
				3: Array.from({ length: 5 }, () => ({ __id: `${count++}` })),
				4: Array.from({ length: 5 }, () => ({ __id: `${count++}` })),
				5: Array.from({ length: 5 }, () => ({ __id: `${count++}` })),
				6: Array.from({ length: 5 }, () => ({ __id: `${count++}` })),
			}
		};
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
