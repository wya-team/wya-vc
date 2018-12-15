<template>
	<div>
		<!-- <c-pick
			:data-source="area"
			v-model="show"
			:values.sync="values"
			:cols="3"
			:value-key="['region_name','region_name','region_name']"
			:item-style="{
				color:'#ff0000',
			}"
			@ok="handleConfirm"
			@cancel="handleCancel"/> -->
		<!-- <c-pick
			:data-source="other"
			v-model="showOther"
			:values.sync="valuesOther"
			:cols="1"
			:cascade="false"
			value-key="value"
			@ok="handleConfirm"
			@cancel="handleCancel"/> -->
		<!-- <button @click="handleByCompent">组件形式调用选择器</button>
		<button @click="handleByOther11">组件形式调用选择器q</button> -->
		<c-pick :data-source="area" :cascade="true" :cols="3" :current-value="['210000','210600','210682']"/>
		<button @click="handleByOther"/>

	</div>
</template>
<script>
import CPick from '../m-picker.vue';
import area from './data/area-data';


export default {
	name: "vcm-aaa",
	components: {
		CPick
	},
	data() {
		return {
			show: false,
			showOther: false,
			other: [],
			values: [],
			valuesOther: [],
			area: []
		};
	},
	computed: {
	},
	mounted() {
		this.area = area;
		setTimeout(() => {
			this.other = [{
				key: 0,
				value: '0'
			}, {
				key: 1,
				value: '1'
			}, {
				key: 2,
				value: '2'
			}, {
				key: 3,
				value: '3'
			}];
		}, 5000);
	},
	methods: {
		handleByOther() {
			pickerArea.popup({

			}).then(data => {
				console.log(data, /resolve/);
			}).catch(err => {
				console.log(err, /reject/);
			});
		}
	},
};

</script>
