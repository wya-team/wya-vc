<template>
	<div class="vcm-picker-basic">
		<vcm-picker
			:data-source="dataSource" 
			:cascade="true" 
			:cols="3" 
			v-model="value"
		/>
		
		<vcm-picker
			:data-source="dataAsyncSource" 
			:cascade="true" 
			:cols="3"
			:load-data="loadData"
			v-model="valueAsync"
		>
			<h2 slot-scope="it">
				{{ it.label }}
			</h2>
		</vcm-picker>

		<vcm-picker
			:data-source="dataSeasons" 
			:cascade="false" 
			:cols="2"
			v-model="valueSeasons"
			extra="非联动选择"
		/>
		<h3 @click="handleClick">点击直接调用</h3>

		<h2>表单</h2>
		<vc-form
			ref="form"
			:show-message="false"
			:model="formValidate" 
			:rules="ruleValidate" 
		>
			<vc-form-item prop="addr" @on-form-change="handleChange">
				<vcm-picker
					:data-source="dataSource" 
					:cascade="true" 
					:cols="3" 
					v-model="formValidate.addr"
				/>
			</vc-form-item>
			<div @click="handleSubmit">提交表单</div>
		</vc-form >
	</div>
</template>
<script>
import Form from '../../form';
import MToast from '../../m-toast/index';
import MPicker from '../m-picker.vue';
import { cloneDeep } from '../../utils/index';
import { cascadeData, seasons } from './basic/mock';

export default {
	name: "vcm-picker-basic",
	components: {
		'vcm-picker': MPicker,
		'vc-form': Form,
		'vc-form-item': Form.Item
	},
	data() {
		return {
			show: false,
			dataSource: cloneDeep(cascadeData),
			dataAsyncSource: [],
			value: ["140000", "140100", "140101"],
			valueAsync: ["140000", "140100", "140101"],
			valueSeasons: [],
			dataSeasons: cloneDeep(seasons),

			formValidate: {
				addr: [],
			},
			ruleValidate: {
				addr: [
					{ 
						required: true, 
						type: 'array', 
						message: '请选择地址', 
						trigger: 'change' 
					}
				],
			}
		};
	},
	computed: {
	},
	mounted() {
		
	},
	methods: {
		loadData() {
			MToast.info('异步加载中');
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					this.dataAsyncSource = cloneDeep(cascadeData);
					resolve();
				}, 3000);
			});
		},
		handleClick() {
			MPicker.popup({
				dataSource: cloneDeep(cascadeData),
				value: ["140000", "140100", "140101"],
				cols: 3
			}).then((res) => {
				MToast.info(res.label.join(','));
			}).catch(() => {
				MToast.info(res);
			});
		},
		handleChange(...value) {
			console.log(value);
		},
		handleSubmit(name) {
			this.$refs.form.validate((valid) => {
				if (valid) {
					MToast.info('Success!');
				} else {
					MToast.info('请先选择地址!');
				}
			});
		},
	},
};

</script>

<style>
.vcm-picker-basic .vcm-picker{
	display: flex;
	height: 44px;
	background: white;
	border-bottom: 1px solid #e7e7e7;
	justify-content: center;
	align-items: center;
}
</style>