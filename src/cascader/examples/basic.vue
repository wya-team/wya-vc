<template>
	<div style="margin: 40px">
		<vc-button @click="handleTestingStart">压力测试</vc-button>
		<vc-button @click="handleTestingEnd">取消测试</vc-button>
		<div style="margin: 40px 0 ">
			<vc-cascader :data-source="dataSource" v-model="value1"/>
		</div>
		<div style="margin: 40px 0 ">
			<vc-cascader :data-source="dataSource" v-model="value2" clearable/>
		</div>
		<div style="margin: 40px 0 ">
			<vc-cascader :data-source="dataAsyncSource1" v-model="value3"/>
		</div>
		<div style="margin: 40px 0 ">
			<vc-cascader :data-source="dataAsyncSource2" v-model="value4" :load-data="loadData"/>
		</div>
	</div>
</template>
<script>
import Cascader from '../cascader';
import Button from '../../button';

export default {
	name: "vc-cascader-basic",
	components: {
		"vc-cascader": Cascader,
		'vc-button': Button
	},
	data() {
		return {
			value1: [],
			value2: ['beijing'],
			value3: ['jiangsu', 'nanjing'],
			value4: [],
			dataSource: [
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
							label: '苏州',
							children: [
								{
									value: 'zhuozhengyuan',
									label: '拙政园',
								},
								{
									value: 'shizilin',
									label: '狮子林',
								}
							]
						}
					],
				}
			],
			dataAsyncSource1: [],
			dataAsyncSource2: [
				{
					value: 'beijing',
					label: '北京',
					children: []
				}
			]
		};
	},
	computed: {
		
	},
	mounted() {
		setTimeout(() => {
			this.dataAsyncSource1 = this.dataSource;
		}, 2000);
	},
	methods: {
		handleTestingStart() {
			clearInterval(this.timer);
			this.timer = setInterval(() => {
				document.querySelector('.vc-cascader input').click();
			}, 50);
			// Message.info(Math.random().toString(), { mask: false, duration: 110000 });
		},
		handleTestingEnd() {
			clearInterval(this.timer);
		},
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
		}
	}
};
</script>
