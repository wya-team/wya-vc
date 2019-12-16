<!-- 仅展示最基本的用法 -->
<template>
	<div style="overflow: auto; width: 100%; padding: 20px">
		<vc-slider v-model="width" :max="maxWidth" :min="0" style="width: 100px;" />
		<div :style="{ width: width + 'px' }">
			<h3>line: 0</h3>
			<vc-text :value="text14" :line="0" />
			<h3>line: 1</h3>
			<vc-text :value="text16" :line="1" />
			<h3>line: 2</h3>
			<vc-text :value="text18" :line="2" />
			<h3>line: 3</h3>
			<vc-text :value="text30" :line="3" />
		</div>
		<vc-text :line="3">
			{{ text30 }}
		</vc-text>
		<table :style="{ width: width + 'px' }" class="table">
			<thead>
				<tr>
					<th>line: 0</th>
					<th>line: 1</th>
					<th>line: 2</th>
					<th>line: 3</th>
				</tr>
			</thead>
			<colgroup>
				<col width="100">
				<col width="100">
				<col width="150">
				<col width="200">
			</colgroup>
			<tbody>
				<tr> 
					<td><vc-text :value="text10" :line="0" /></td>
					<td><vc-text :value="text12" :line="1" /></td>
					<td><vc-text :value="text14" :line="2" /></td>
					<td><vc-text :value="text30" :line="3" /></td>
				</tr>
				<tr>
					<td><vc-text :value="text10" :line="0" /></td>
					<td><vc-text :value="text12" :line="1" /></td>
					<td><vc-text :value="text14" :line="2" /></td>
					<td><vc-text :value="text30" :line="3" /></td>
				</tr>
			</tbody>
		</table>

		<vc-table :data-source="dataSource" :style="{ width: width + 'px' }">
			<vc-table-item>
				<vc-table-column label="日期">
					<template #default>
						<vc-text :value="text10" :line="0" />
					</template>
				</vc-table-column>
				<vc-table-column label="姓名">
					<template #default>
						<vc-text :value="text12" :line="1" />
					</template>
				</vc-table-column>
				<vc-table-column label="地址">
					<template #default>
						<vc-text :value="text14" :line="2" />
					</template>
				</vc-table-column>
				<vc-table-column label="地址2">
					<template #default>
						<vc-text :value="text30" :line="3" />
					</template>
				</vc-table-column>
			</vc-table-item>
		</vc-table>
	</div>
</template>
<script>
import Text from '..';
import Slider from '../../slider';
import Table from '../../table';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-text': Text,
		'vc-slider': Slider,
		'vc-table': Table,
		'vc-table-column': Table.Column,
		'vc-table-item': Table.Item,
	},
	data() {
		let text = 'A2，C,我E,';
		return {
			dataSource: Array.from({ length: 4 }).map(() => ({})),
			width: window.innerWidth - 40,
			maxWidth: window.innerWidth - 40,
			text,
			text10: text.repeat(10),
			text12: text.repeat(12),
			text14: text.repeat(14),
			text16: text.repeat(16),
			text18: text.repeat(18) + 'REPEAT_END_18',
			text30: text.repeat(30) + 'REPEAT_END_30',
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>

<style lang="scss">
.table {
	overflow-x: auto;
	background: #fff;
	position: relative;
	padding: 20px;
	border-collapse: collapse;
	width: 100%;
	text-align: left;
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px
}

.table thead th {
	background: #f0f2f7;
	font-size: 14px;
	font-weight: 400;
	vertical-align: middle;
	white-space: nowrap;
	padding: 9px 15px
}

.table tbody td {
	line-height: 22px;
	padding: 9px 15px;
	border-bottom: 1px solid #ebebeb !important
}

.table tbody td:after {
	content: "";
	display: block;
	clear: both;
	height: 0;
	font-size: 0;
	visibility: hidden
}

</style>
