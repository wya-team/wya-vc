<template>
	<vc-modal
		v-model="isActive"
		size="medium"
		class="form"
		@ok="handleOk"
		@cancel="handleClose"
	>
		<vc-form
			ref="form"
			:model="formData" 
			:rules="ruleValidate" 
			:label-width="150"
			class="_form g-m-t-16"
		>
			<vc-form-item label="活动名称： " prop="name">
				<vc-input v-model="formData.name"/>
			</vc-form-item>
			<vc-form-item label="活动描述： " prop="remark">
				<vc-input v-model="formData.remark"/>
			</vc-form-item>
			<vc-form-item label="活动类型： " prop="typeText">
				<vc-input v-model="formData.typeText"/>
			</vc-form-item>
			<vc-form-item label="活动地点： " prop="region">
				<vc-input v-model="formData.region"/>
			</vc-form-item>
			<vc-form-item label="活动组织者： " prop="person">
				<vc-input v-model="formData.person"/>
			</vc-form-item>
			<vc-form-item label="活动性质： " prop="type">
				<vc-checkbox-group v-model="formData.type">
					<vc-checkbox label="美食/餐厅线上活动" name="type"/>
					<vc-checkbox label="地推活动" name="type"/>
					<vc-checkbox label="线下主题活动" name="type"/>
					<vc-checkbox label="单纯品牌曝光" name="type"/>
				</vc-checkbox-group>
			</vc-form-item>
			<vc-form-item label="特殊资源： " prop="resource">
				<vc-radio-group v-model="formData.resource">
					<vc-radio label="线上品牌商赞助"/>
					<vc-radio label="线下场地免费"/>
				</vc-radio-group>
			</vc-form-item>
			<vc-form-item label="活动形式： " prop="desc">
				<vc-input v-model="formData.desc" type="textarea"/>
			</vc-form-item>
		</vc-form>
	</vc-modal>
</template>


<script>
import Form from "../..";
import Portal from "../../../portal";
import Input from "../../../input";
import Button from "../../../button";
import Checkbox from "../../../checkbox";
import Radio from "../../../radio";
import Modal from "../../../modal";

const config = {
	name: 'form',
	components: {
		'vc-form': Form,
		'vc-form-item': Form.Item,
		'vc-input': Input,
		'vc-checkbox-group': Checkbox.Group,
		'vc-checkbox': Checkbox,
		'vc-radio-group': Radio.Group,
		'vc-radio': Radio,
		'vc-modal': Modal,
	},
	data() {
		return {
			formData: {
				name: '',
				remark: '',
				typeText: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: '',
				person: '',
			},
			isActive: false,
			ruleValidate: {
				name: [
					{ required: true, message: '请输入活动名称', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				person: [
					{ required: true, message: '请输入组织者', trigger: 'blur' }
				],
				remark: [
					{ required: true, message: '请输入活动名称', trigger: 'blur' }
				],
				typeText: [
					{ required: true, message: '请输入活动类型', trigger: 'blur' }
				],
				region: [
					{ required: true, message: '请选择活动区域', trigger: 'change' }
				],
				type: [
					{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
				],
				resource: [
					{ required: true, message: '请选择活动资源', trigger: 'change' }
				],
				desc: [
					{ required: true, message: '请填写活动形式', trigger: 'blur' }
				]
			},
		};
	},
	watch: {
	},
	mounted() { 
		this.isActive = true;
	},
	methods: {
		handleOk() {
			return this.$refs.form.validate().then((res) => {
				this.isActive = false;
				this.$emit("sure");
				Promise.resolve();
			}).catch((res) => {
				console.log(res, this.formValidate);
			});
		},
		handleClose() {
			this.$emit('close');
		},
	},
};
export default config;
export const FormPopup = new Portal(config, {
	
});
</script>

<style lang="scss" >
.form {
    .vc-modal__header {
        padding: 24px;
    }
    .vc-modal__container {
        
    }
}
</style>
