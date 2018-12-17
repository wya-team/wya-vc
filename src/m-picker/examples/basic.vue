<template>
	<div>
		<c-pick :data-source="area" :cascade="true" :cols="3" v-model="v"/>
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
			area: [],
			v: []
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
