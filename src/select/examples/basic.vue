<template>
	<div>
		<vc-select 
			v-model="value" 
			clearable 
			style="width: 200px"
		>
			<!-- vc-loader处理该bug -->
			<i-option 
				v-for="item in cityList" 
				:value="item.value" 
				:key="item.value"
			>{{ item.label }}</i-option>
		</vc-select>

		<vc-select v-model="model7" style="width:200px">
			<vc-option-group label="Hot Cities">
				<i-option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</i-option>
			</vc-option-group>
			<vc-option-group label="Other Cities">
				<i-option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</i-option>
			</vc-option-group>
		</vc-select>
	</div>
</template>
<script>
import Select from '..';
import Option from '../option';
import OptionGroup from '../option-group';

export default {
	name: "vc-select-basic",
	components: {
		'vc-select': Select,
		'vc-option-group': OptionGroup,
		'i-option': Option,
	},
	data() {
		return {
			cityList: [
				{
					value: 'New York',
					label: 'New York'
				},
				{
					value: 'London',
					label: 'London'
				},
				{
					value: 'Sydney',
					label: 'Sydney'
				},
				{
					value: 'Ottawa',
					label: 'Ottawa'
				},
				{
					value: 'Paris',
					label: 'Paris'
				},
				{
					value: 'Canberra',
					label: 'Canberra'
				}
			],
			value: 'Sydney',
			cityList1: [
				{
					value: 'New York',
					label: 'New York'
				},
				{
					value: 'London',
					label: 'London'
				},
				{
					value: 'Sydney',
					label: 'Sydney'
				}
			],
			cityList2: [
				{
					value: 'Ottawa',
					label: 'Ottawa'
				},
				{
					value: 'Paris',
					label: 'Paris'
				},
				{
					value: 'Canberra',
					label: 'Canberra'
				}
			],
			model7: ''
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>
