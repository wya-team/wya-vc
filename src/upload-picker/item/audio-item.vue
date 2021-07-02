<template>
	<div 
		:class="{ 'is-error': it.status == 0 }"
		class="vc-upload-picker-audio-item"
	>
		<slot :it="it">
			<div v-if="typeof it !== 'object'">
				<audio 
					:src="it" 
					:controls="false"
					class="vc-upload-picker-audio-item__content" 
					style="background-color: #000;"
				/>
				<div class="vc-upload-picker-audio-item__play" @click="handlePreview">
					<vc-icon type="toplay" class="vc-upload-picker-audio-item__play-icon" />
				</div>
			</div>
			<div v-else class="vc-upload-picker-audio-item__content">
				<vc-progress
					v-if="it.percent && it.percent != 100" 
					:percent="it.percent"
					:show-info="false"
					status="normal"
					style="width: 100%;padding: 0 5px"
				/>
				<p v-else-if="!it.url && it.percent == 100 && !it.errorFlag" style="line-height: 1; padding: 5px">
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
				class="vc-upload-picker__delete"
				@click="handleDel" 
			/>
		</slot>
	</div>
</template>

<script>
import Icon from '../../icon/index';
import Progress from '../../progress/index';
import { AudioPreview } from "../preview/audio";

export default {
	name: 'vc-upload-picker-audio-item',
	components: {
		'vc-icon': Icon,
		'vc-progress': Progress
	},
	props: {
		disabled: Boolean,
		it: {
			type: [String, Object, File],
			default: ''
		}
	},
	methods: {
		handlePreview(e) {
			AudioPreview.popup({
				dataSource: [this.it]
			});
		},
		handleDel() {
			this.$emit('delete');
		}
	},
};
</script>

<style lang="scss">
@import '../../style/vars.scss';

@include block(vc-upload-picker-audio-item) {
	position: relative;
	display: flex;
	box-sizing: border-box;
	flex-wrap: wrap;
	color: #515a6e;
	background-color: #000;
	@include when(error) {
		position: relative;
		color: #f42626;
		border: 1px solid #f42626;
		@include when(mobile) {
			color: #515a6e;
			border: none;
		}
	}
	@include element(content) {
		@include commonFlexCc();
		width: 64px;
		height: 64px;
		border-radius: 4px;
		background-size: cover;
		overflow: hidden;
	}
	@include element(play) {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		&::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate3d(-50%, -50%, 0);
			width: 24px;
			height: 24px;
			border: 1px solid #fff;
			border-radius: 50%;
		}
	}
	@include element(play-icon) {
		margin-left: 2px;
		color: #fff;
	}
}
</style>
