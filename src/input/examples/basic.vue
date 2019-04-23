<template>
	<div>
		<div>
			<vc-input
				v-model="value"
				style="width: 200px;"
				clearable
				search
				enter-txt="搜索"
				placeholder="显示placeholder"
				@change="handleChange"
				@focus="handleFocus"
				@blur="handleBlur"
				@enter="handleEnter"
			/>
			<span>22</span>
			<br><br><br><br>
			<div>
				<vc-input 
					v-model="value"
					placeholder="显示placeholder"
					@change="handleChange"
					@focus="handleFocus"
					@blur="handleBlur"
					@enter="handleEnter"
				>
					<p slot="append">ico2222n</p>
				</vc-input>
			</div>
			<vc-input 
				v-model="value"
				style="margin-top: 10px;"
				disabled
				placeholder="被禁用的input"
			/>
		</div>
	</div>
</template>
<script>
import Input from '..';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-input': Input
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
