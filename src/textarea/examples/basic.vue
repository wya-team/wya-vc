<template>
	<div>
		<div style="width: 300px">
			<vc-textarea 
				v-model="textvalue"
				:autosize="true"
				type="textarea"
				style="margin-top: 10px;"
				placeholder="被禁用的textarea"
			/>
		</div>
	</div>
</template>
<script>
import Textarea from '..';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-textarea': Textarea
	},
	data() {
		return {
			value: '',
			textvalue: ''
		};
	},
	computed: {
		
	},
	methods: {
		handleChange() {
			console.log(this.value);
		},
		handleFocus() {
			console.log('聚焦的回调');
		},
		handleBlur() {
			console.log('失焦的回调');
		},
		handleEnter() {
			console.log('回车键的回调');
		}
	}
};
</script>
