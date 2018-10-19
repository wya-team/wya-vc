<template>
	<table class="vc-table-native">
		<thead>
			<th>
				<div class="_table-cell">
					1
				</div>
			</th>
		</thead>
		<tbody>
			<tr>
				<td>
					<div class="_table-cell">
						111
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	
};
</script>

<style lang="scss" scoped>
.vc-table-native {
	width: 100%;
	thead {
		th {
			text-align: left;
			height: 40px;
			white-space: nowrap;
			overflow: hidden;
			background-color: #f8f8f9;
		}
	}
	tbody {
		background-color: #ffffff;
		td {
			text-align: left;
			height: 40px;
			white-space: nowrap;
			overflow: hidden;
		}
	}
	._table-cell {
		padding-left: 18px;
		padding-right: 18px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: normal;
		word-break: break-all;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
}
</style>