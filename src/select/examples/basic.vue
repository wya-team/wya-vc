<template>
	<div style="margin: 40px">
		<vc-button @click="handleTestingStart">内存测试</vc-button>
		<vc-button @click="handleTestingEnd">取消测试</vc-button>

		<!-- 基本 -->
		<div style="margin: 40px 0 ">
			<vc-select 
				v-model="value1"
				clearable 
				search
				style="width: 200px"
			>
				<vc-option 
					v-for="(item, index) in cityList" 
					:value="item.value" 
					:key="item.value"
					:disabled="index == 1"
				>{{ item.label }}</vc-option>
			</vc-select>
		</div>

		<!-- 基本分组 -->
		<div style="margin: 40px 0 ">
			<vc-select v-model="value1" style="width: 200px" search>
				<vc-option-group label="Hot Cities">
					<vc-option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</vc-option>
				</vc-option-group>
				<vc-option-group label="Other Cities">
					<vc-option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</vc-option>
				</vc-option-group>
			</vc-select>
		</div>

		<!-- 基本多选 -->
		<div style="margin: 40px 0 ">
			<vc-select 
				v-model="value2" 
				:max="5" 
				style="width: 200px" 
				search
			>
				<vc-option-group label="Hot Cities">
					<vc-option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</vc-option>
				</vc-option-group>
				<vc-option-group label="Other Cities">
					<vc-option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</vc-option>
				</vc-option-group>
			</vc-select>
		</div>

		<!-- 搜索单选 -->
		<div style="margin: 40px 0 ">
			<vc-select 
				v-model="value3" 
				:load-data="handleSearch" 
				style="width: 200px"
				search
			>
				<vc-option 
					v-for="(item, index) in searchData" 
					:value="item.value" 
					:key="index"
				>{{ item.label }}</vc-option>
			</vc-select>
		</div>

		<!-- 搜索多选 -->
		<div style="margin: 40px 0 ">
			<vc-select 
				v-model="value4" 
				:max="5" 
				:load-data="handleSearch" 
				style="width: 200px"
				search
			>
				<vc-option 
					v-for="(item, index) in searchData" 
					:value="item.value" 
					:key="index"
				>{{ item.label }}</vc-option>
			</vc-select>
		</div>
		
		<!-- 基本异步 -->
		<div style="margin: 40px 0 ">
			<vc-select 
				v-model="value5"
				clearable 
				search
				style="width: 200px"
			>
				<!-- vc-loader处理该bug -->
				<vc-option 
					v-for="(item, index) in cityListAsync" 
					:value="item.value" 
					:key="item.value"
					:disabled="index == 1"
				>{{ item.label }}</vc-option>
			</vc-select>
		</div>
	</div>
</template>
<script>
import Select from '..';
import Button from '../../button';
import Option from '../option';
import OptionGroup from '../option-group';
import { cityList, cityList1, cityList2, searchData } from './basic/data';

export default {
	name: "vc-select-basic",
	components: {
		'vc-select': Select,
		'vc-option-group': OptionGroup,
		'vc-option': Option,
		'vc-button': Button
	},
	data() {
		let value1 = '1';
		let value2 = ['1', '4'];

		let value3 = '';
		let value4 = [];

		let value5 = '1';

		return {
			cityList,
			cityList1,
			cityList2,
			value1,
			extra1: '',
			value2,
			extra2: [],

			value3: '',
			value4: [],
			searchData: [],

			value5,
			extra5: '',
			cityListAsync: []
		};
	},
	computed: {
	},
	mounted() {
		setTimeout(() => {
			this.cityListAsync = this.cityList;
		}, 5000);
	},
	methods: {
		handleTestingStart() {
			clearInterval(this.timer);
			this.timer = setInterval(() => {
				document.querySelector('.vc-select input').click();
			}, 50);
			// Message.info(Math.random().toString(), { mask: false, duration: 110000 });
		},
		handleTestingEnd() {
			clearInterval(this.timer);
		},
		handleSearch() {
			this.searchData = searchData; 
		}
	}
};
</script>
