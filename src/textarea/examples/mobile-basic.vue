<template>
	<div>
		<vcm-textarea
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
		<vcm-form
			ref="formValidate" 
			:label-width="96"
			label-position="left"
		>
			<vcm-form-item label="test">
				<vcm-list-item :arrow="false">
					<template #extra>
						<vcm-textarea
							v-model="value"
							:autosize="{ maxRows: 2 }"
						/>
					</template>
				</vcm-list-item>
			</vcm-form-item>
			<vcm-form-item label="test">
				<vcm-list-item :arrow="false">
					<template #extra>
						<vcm-textarea
							v-model="value"
							:autosize="{ maxRows: 2 }"
						/>
					</template>
				</vcm-list-item>
			</vcm-form-item>
			<vcm-form-item label="test">
				<vcm-list-item :arrow="false">
					<template #extra>
						<vcm-textarea
							v-model="value"
							:autosize="{ maxRows: 2 }"
						/>
					</template>
				</vcm-list-item>
			</vcm-form-item>
			<vcm-form-item label="test">
				<vcm-list-item :arrow="false">
					<template #extra>
						<vcm-textarea
							v-model="value"
							:autosize="{ maxRows: 2 }"
						/>
					</template>
				</vcm-list-item>
			</vcm-form-item>
		</vcm-form>
	</div>
</template>
<script>
import MTextarea from '../index.m';
import MForm from '../../form/index.m';
import MList from '../../list/index.m';

export default {
	name: "vcm-tpl-basic",
	components: {
		'vcm-textarea': MTextarea,
		'vcm-form': MForm,
		'vcm-form-item': MForm.Item,
		'vcm-list-item': MList.Item,
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
