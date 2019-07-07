<template>
	<div style="margin-top: 30px;">
		<vcm-cascader
			v-model="value"
			:data-source="dataSource2"
			:load-data="loadData"
		/>
		<br>
		<br>
		<div @click="handleClick">直接调用</div>
		<br>
		<br>
		<vcm-cascader-view
			ref="target"
			v-model="value"
			:data-source="dataSource2"
			:load-data="loadData"
		/>
	</div>
</template>

<script>
import MCascader from '../index.m';
import dataSource from './basic/big-data';

export default {
	name: 'cascader-picker-basic',
	components: {
		'vcm-cascader': MCascader,
		'vcm-cascader-view': MCascader.View,
	},
	data() {
		return {
			dataSource,
			dataSource2: [
				{
					value: 'beijing',
					label: '北京',
					children: [
						{
							value: 'gugong',
							label: '故宫'
						},
						{
							value: 'tiantan',
							label: '天坛'
						},
						{
							value: 'wangfujing',
							label: '王府井'
						}
					]
				}, 
				{
					value: 'jiangsu',
					label: '江苏',
					children: [
						{
							value: 'nanjing',
							label: '南京',
							children: [
								{
									value: 'fuzimiao',
									label: '夫子庙',
								}
							]
						},
						{
							value: 'suzhou',
							label: '苏州'
						}
					],
				}
			],
			value: [],
		};
	},
	mounted() {
		window.vm = this.$refs.target;
	},
	methods: {
		loadData() {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve([
						{
							value: 'gugong',
							label: '故宫'
						},
						{
							value: 'tiantan',
							label: '天坛'
						},
						{
							value: 'wangfujing',
							label: '王府井'
						}
					]);
				}, 2000);
			});
		},
		handleClick() {
			MCascader.open({
				dataSource: this.dataSource2,
				value: []
			});
		}
	}

};
</script>