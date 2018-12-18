<template>
	<div class="vcm-date-picker-basic">
		<vcm-date-picker 
			v-model="value"
			mode="datetime"
		/>
		<vcm-date-picker 
			v-model="value"
			mode="time"
		>
			<h2 slot-scope="it">
				{{ it.label }}
			</h2>
		</vcm-date-picker>
		<vcm-date-picker 
			v-model="value"
			mode="date"
		/>
		<div @click="handleClick">点击直接调用</div>
	</div>
</template>
<script>
import MToast from '../../m-toast/index';
import MDatePicker from '../m-date-picker';
import { cloneDeep } from '../../utils/index';

export default {
	name: "vcm-date-picker-basic",
	components: {
		'vcm-date-picker': MDatePicker
	},
	data() {
		return {
			show: false,
			value: new Date()
		};
	},
	computed: {
	},
	mounted() {
		
	},
	methods: {
		handleClick() {
			MDatePicker.popup({
				mode: 'datetime'
			}).then((res) => {
				MToast.info(res.label.join('-'));
			}).catch(() => {
			});
		}
	},
};

</script>

<style>
.vcm-date-picker-basic div {
	display: flex;
	height: 44px;
	background: white;
	border-bottom: 1px solid #e7e7e7;
	justify-content: center;
	align-items: center;
}
</style>