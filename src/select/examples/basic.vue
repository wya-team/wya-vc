<template>
	<div style="margin: 40px;">
		<vc-button @click="handleTestingStart">
			内存测试
		</vc-button>
		<vc-button @click="handleTestingEnd">
			取消测试
		</vc-button>
		<vc-button @click="disabled = !disabled">
			disabled: {{ disabled }}
		</vc-button>

		<!-- 基本 -->
		<div style="margin: 40px 0 ">
			<vc-select 
				v-model="value1"
				:disabled="disabled"
				clearable 
				search
				style="width: 200px"
				@change="handleChange"
				@ready="handleReady"
				@close="handleClose"
				@visible-change="handleVisibleChange"
			>
				<vc-option 
					v-for="(item, index) in cityList" 
					:key="item.value" 
					:value="item.value"
					:disabled="index == 1"
				>
					{{ item.label }}
				</vc-option>
			</vc-select>
		</div>

		<!-- 基本分组 -->
		<div style="margin: 40px 0 ">
			<vc-select v-model="value1" style="width: 200px" search>
				<vc-option-group label="Hot Cities">
					<vc-option v-for="item in cityList1" :key="item.value" :value="item.value">
						{{ item.label }}
					</vc-option>
				</vc-option-group>
				<vc-option-group label="Other Cities">
					<vc-option v-for="item in cityList2" :key="item.value" :value="item.value">
						{{ item.label }}
					</vc-option>
				</vc-option-group>
			</vc-select>
		</div>

		<!-- 基本多选 -->
		<div style="margin: 40px 0 ">
			<vc-select 
				v-model="value2" 
				:max="5" 
				:disabled="disabled"
				style="width: 200px" 
				search
			>
				<vc-option-group label="Hot Cities">
					<vc-option v-for="item in cityList1" :key="item.value" :value="item.value">
						{{ item.label }}
					</vc-option>
				</vc-option-group>
				<vc-option-group label="Other Cities">
					<vc-option v-for="item in cityList2" :key="item.value" :value="item.value">
						{{ item.label }}
					</vc-option>
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
					:key="index" 
					:value="item.value"
				>
					{{ item.label }}
				</vc-option>
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
				<vc-option-group v-if="searchData1.length" label="Hot Cities">
					<vc-option 
						v-for="(item, index) in searchData1" 
						:key="index" 
						:value="item.value"
					>
						{{ item.label }}
					</vc-option>
					<vc-option
						:filterable="false"
						value="不会被过滤"
						label="不会被过滤"
					/>
				</vc-option-group>
				<vc-option-group v-if="searchData1.length" label="Other Cities">
					<vc-option 
						v-for="(item, index) in searchData2" 
						:key="index" 
						:value="item.value"
					>
						{{ item.label }}
					</vc-option>
				</vc-option-group>
			</vc-select>
		</div>
		
		<!-- 基本异步 -->
		<div style="margin: 40px 0 ">
			<vc-select 
				v-model="value5"
				clearable 
				search
				search-placeholder="请输入"
				style="width: 200px"
			>
				<vc-option 
					v-for="(item, index) in cityListAsync" 
					:key="item.value" 
					:value="item.value"
					:disabled="index == 1"
				>
					{{ item.label }}
				</vc-option>
			</vc-select>
		</div>

		<!-- 基本异步value -->
		<div style="margin: 40px 0 ">
			<vc-select 
				v-model="valueAsync"
				clearable 
				search
				style="width: 200px"
			>
				<vc-option 
					v-for="(item, index) in cityList" 
					:key="item.value" 
					:value="item.value"
					:disabled="index == 1"
				>
					{{ item.label }}
				</vc-option>
			</vc-select>
		</div>

		<!-- form -->

		<vc-form 
			ref="form" 
			:model="formValidate" 
			:rules="ruleValidate" 
			:label-width="196"
			position="left"
			@submit.native.prevent
		>
			<vc-form-item label="设置单选：" prop="value">
				<vc-select
					v-model="formValidate.value"
					clearable
					style="width: 300px;"
				>
					<vc-option
						v-for="(item, index) in cityList"
						:key="index"
						:value="item.value"
					>
						{{ item.label }}
					</vc-option>
				</vc-select>
			</vc-form-item>
			<vc-form-item label="设置多选：" prop="value1">
				<vc-select
					v-model="formValidate.value1"
					:max="5"
					clearable
					style="width: 300px;"
				>
					<vc-option
						v-for="(item, index) in cityList"
						:key="index"
						:value="item.value"
					>
						{{ item.label }}
					</vc-option>
				</vc-select>
			</vc-form-item>

			<vc-form-item label="搜索设置单选：" prop="value1">
				<vc-select 
					v-model="value3" 
					:load-data="handleSearch" 
					style="width: 200px"
					search
				>
					<vc-option 
						v-for="(item, index) in searchData" 
						:key="index" 
						:value="item.value"
					>
						{{ item.label }}
					</vc-option>
				</vc-select>
			</vc-form-item>
		</vc-form>
	</div>
</template>
<script>
import Select from '..';
import Button from '../../button';
import Option from '../option';
import OptionGroup from '../option-group';
import Form from '../../form';

import { cityList, cityList1, cityList2, searchData } from './basic/data';

export default {
	name: "vc-select-basic",
	components: {
		'vc-select': Select,
		'vc-option-group': OptionGroup,
		'vc-option': Option,
		'vc-button': Button,
		'vc-form': Form,
		'vc-form-item': Form.Item
	},
	data() {
		let value1 = 1;
		let value2 = ['1', '4'];

		let value3 = '';
		let value4 = [];

		let value5 = '1';

		return {
			disabled: false,

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
			searchData1: [],
			searchData2: [],

			value5,
			extra5: '',
			cityListAsync: [],

			valueAsync: '',

			formValidate: {
				value: '',
				value1: [],
				value2: ''
			},
			ruleValidate: {
				value: [
					{
						required: true,
						trigger: 'change',
					}
				],
				value1: [
					{
						required: true,
						trigger: 'change'
					}
				]
			}
		};
	},
	computed: {
	},
	mounted() {
		setTimeout(() => {
			this.cityListAsync = this.cityList;

			this.valueAsync = '1';
		}, 2000);
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
			return new Promise((resolve) => {
				setTimeout(() => {
					this.searchData = searchData; 

					this.searchData1 = cityList1; 
					this.searchData2 = cityList2; 
					resolve();
				}, 1000);
			});
		},
		handleChange(v) {
			console.log(v);
		},
		handleReady() {
			console.log('ready');
		},
		handleClose() {
			console.log('close');
		},
		handleVisibleChange(v) {
			console.log('visible-change', v);
		}
	}
};
</script>
