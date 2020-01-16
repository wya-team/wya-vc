<template>
	<div>
		<vcm-cascader
			v-model="value"
			:data-source="cascaderData"
			:alphabetical="true"
		/>
		<vcm-cascader-view
			v-model="value"
			:data-source="cascaderData"
			:alphabetical="true"
		/>
	</div>
</template>

<script>
import MCascader from '../index.m';

export default {
	name: 'cascader-picker-basic',
	components: {
		'vcm-cascader': MCascader,
		'vcm-cascader-view': MCascader.View,
	},
	data() {
		return {
			value: [],
			cascaderData: [
				{
					label: '阿里巴巴1',
					value: '01',
					char: 'A',
					children: [
						{
							label: '淘宝',
							value: '0103',
							char: 'T'
						},
						{
							label: '天猫',
							value: '0102',
							char: 'T'
						},
						{
							label: '支付宝',
							value: '0101',
							char: 'Z'
						}
					]
				},
				{
					label: '百度',
					value: '02',
					char: 'B'
				},
				{
					label: '杭州',
					value: '11',
					char: 'H'
				},
				{
					label: '网易',
					value: '03',
					char: 'W'
				},
				{
					label: '微一案',
					value: '04',
					char: 'W'
				},
				{
					label: '百度',
					value: '05',
					char: 'B'
				},
				{
					label: '网易',
					value: '06',
					char: 'W'
				},
				{
					label: '微一案',
					value: '07',
					char: 'W'
				},
				{
					label: '百度',
					value: '08',
					char: 'B'
				},
				{
					label: '网易',
					value: '09',
					char: 'W'
				},
				{
					label: '微一案',
					value: '10',
					char: 'W'
				},
				{
					label: '百度',
					value: '12',
					char: 'B'
				},
				{
					label: '网易',
					value: '13',
					char: 'W'
				},
				{
					label: '微一案',
					value: '14',
					char: 'W'
				}
			]
		};
	},
};
</script>

<style lang="scss">
.vcm-cascader-picker-popup {
	.vcm-popup__wrapper {
		height: 85vh;
		max-height: 85vh;                                                                
	}
}
</style>
