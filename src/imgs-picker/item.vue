<template>
	<div 
		:class="{ 'is-error': it.status == 0 }"
		class="vc-imgs-picker-item"
	>
		<slot :it="it">
			<vc-img 
				v-if="typeof it !== 'object'" 
				:src="it" 
				:class="imgClassName"
				fit="cover"
				class="vc-imgs-picker-item__img"
				@click="handlePreview"
			/>
			<div v-else :class="imgClassName" class="vc-imgs-picker-item__img">
				<vc-progress
					v-if="it.percent && it.percent != 100" 
					:percent="it.percent"
					:show-info="false"
					status="normal"
					style="width: 100%;padding: 0 5px"
				/>
				<p v-else-if="!it.url && it.percent == 100" style="line-height: 1; padding: 5px">
					服务器正在接收...
				</p>
				<div v-else-if="it.status == 0" style="padding: 5px">
					上传失败
				</div>
			</div>
			<!-- 上传失败或者成功后显示 -->
			<vc-icon 
				v-if="!disabled && (typeof it !== 'object' || it.status == 0)" 
				type="close-small" 
				class="vc-imgs-picker-item__delete"
				@click="handleDel(it)" 
			/>
		</slot>
	</div>
</template>

<script>
import Icon from '../icon/index';
import Img from '../img';

export default {
	name: 'vc-imgs-picker-item',
	components: {
		'vc-icon': Icon,
		'vc-img': Img
	},
	props: {
		imgClassName: [String, Object, Array],
		disabled: Boolean,
		it: {
			type: [String, Object],
			default: ''
		}
	},
	data() {
		return {
		};
	},
	computed: {

	},
	watch: {
		
	},
	created() {
		
	},
	methods: {
		handlePreview(e) {
			this.$emit('preview', event);
		},
		handleDel(it) {
			this.$emit('delete', it);
		}
	},
};
</script>

<style lang="scss">

@import '../style/vars.scss';
@include block(vc-imgs-picker-item) {
	position: relative;
	display: flex;
	box-sizing: border-box;
	flex-wrap: wrap;
	@include when(error) {
		position: relative;
		color: #f42626;
		border: 1px solid #f42626;
	}
	@include element(img) {
		@include commonFlexCc();
		width: 100%;
		height: 100%;
		border-radius: 4px;
		background-size: cover;
		overflow: hidden;
		background-color: #F5F5F6;
	}
	@include element(delete) {
		position: absolute;
		top: -6px;
		right: -6px;
		width: 14px;
		height: 14px;
		border-radius: 7px;
		background-color: #5495F6;
		color: #ffffff;
		font-size: 14px;
		z-index: 1;
	}
}
</style>
