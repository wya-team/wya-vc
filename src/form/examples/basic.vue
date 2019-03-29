<template>
	<vc-form ref="formValidate" :model="formValidate" :rules="ruleValidate">
		<vc-form-item prop="array" label="array">
			<!-- <template #label>
				？？	<i>2</i>	
			</template> -->
			<vc-array v-model="formValidate.array" />
		</vc-form-item>
		<vc-form-item
			v-for="(item, index) in formValidate.items"
			v-if="item.status"
			:key="index"
			:label="'Item ' + item.index"
			:prop="'items.' + index + '.value'"
			:rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'change'}"
		>
			<vc-tpl v-model="item.value" type="text" placeholder="Enter something..." >
				<span @click="handleRemove(index)">Delete</span>
			</vc-tpl>
		</vc-form-item>
		<vc-form-item>
			<div @click="handleAdd">Add item</div>
		</vc-form-item>
		<vc-form-item>
			<div @click="handleSubmit('formValidate')">Submit</div>
			<div style="margin-left: 8px" @click="handleReset('formValidate')">Reset</div>
		</vc-form-item>
	</vc-form>
</template>
<script>
import Form from '..';

import Tpl from './basic/tpl'; // 可以使用trigger
import FakeArray from './basic/array'; // 可以使用trigger

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-form': Form,
		'vc-form-item': Form.Item,
		'vc-tpl': Tpl,
		'vc-array': FakeArray,
	},
	data() {
		return {
			index: 1,
			formValidate: {
				array: [],
				items: [
					{
						value: '',
						index: 1,
						status: 1
					}
				]
			},
			ruleValidate: {
				items: {

				},
				array: [{
					required: true
				}]
			}
		};
	},
	computed: {
		
	},
	methods: {
		handleSubmit(name) {
			this.$refs[name].validate().then((res) => {

			}).catch((res) => {
				console.log(res, this.formValidate);
			});
		},
		handleReset(name) {
			this.$refs[name].resetFields();
		},
		handleAdd() {
			this.index++;
			this.formValidate.items.push({
				value: '',
				index: this.index,
				status: 1
			});
		},
		handleRemove(index) {
			this.formValidate.items[index].status = 0;
		}
	}
};
</script>
