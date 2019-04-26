<template>
	<div style="padding: 20px">
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
					:precision="2"
					style="width: 200px;"
					placeholder="显示placeholder"
					@change="handleChange"
					@focus="handleFocus"
					@blur="handleBlur"
					@enter="handleEnter"
				>
					<p slot="append" style="background: red">icon</p>
				</vc-input>
			</div>
			<vc-input 
				v-model="value1"
				style="margin-top: 10px;"
				disabled
				placeholder="被禁用的input"
			/>
			<br>
			<br>
			<br>
			<br>
			<vc-form>
				<vc-form-item>
					<vc-input-number 
						v-model="value1" 
						:precision="2" 
						clearable
						prepend="rmb"
					/>
				</vc-form-item>
			</vc-form>

			<br>
			<br>
			<br>
			<br>
			<vc-input-search 
				v-model="value1" 
				clearable
			/>
			<br>
			<br>
			<vc-input-search 
				v-model="value1" 
				enter-txt="搜索" 
				clearable
			/>
		</div>
	</div>
</template>
<script>
import Input from '..';
import Form from '../../form';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-input': Input,
		'vc-input-number': Input.Number,
		'vc-input-search': Input.Search,
		'vc-form': Form,
		'vc-form-item': Form.Item,
	},
	data() {
		return {
			value: '',
			value1: 11,
			textvalue: ''
		};
	},
	computed: {
		
	},
	created() {
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
