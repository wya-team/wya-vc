<template>
	<div>
		<vc-textarea
			v-model="value"
			placeholder="显示placeholder"
			@change="handleChange"
			@focus="handleFocus"
			@blur="handleBlur"
			@enter="handleEnter"
		/>
		<br>	
		<br>	
		<br>	
		<br>	
		<vc-form
			ref="formValidate" 
			:label-width="96"
			style="padding-left: 56px; margin-top: 21px"
			@submit.native.prevent
		>
			<vc-form-item label="test">
				<vc-textarea
					v-model="value"
					:autosize="{ maxRows: 2 }"
				/>
			</vc-form-item>
			<vc-form-item label="test">
				<vc-textarea
					v-model="value"
				/>
			</vc-form-item>
			<vc-form-item label="test">
				<vc-textarea
					v-model="value"
					:autosize="{ maxRows: 2 }"
				/>
			</vc-form-item>
			<vc-form-item label="test">
				<vc-textarea
					v-model="value"
				/>
			</vc-form-item>
			<vc-form-item label="test1">
				<vc-textarea
					v-model="value"
					:maxlength="200"
					indicator
				/>
			</vc-form-item>
		</vc-form>
	</div>
</template>
<script>
import Textarea from '../index';
import Form from '../../form/index';
import List from '../../list/index';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-textarea': Textarea,
		'vc-form': Form,
		'vc-form-item': Form.Item,
		'vc-list-item': List.Item,
	},
	data() {
		return {
			value: ''
		};
	},
	computed: {
		
	},
	created() {
		setTimeout(() => {
			this.value = 9999;
		}, 3000);
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
