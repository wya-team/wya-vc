<template>
	<div 
		:class="{ 'is-error': isError, 'is-mobile': isMobile }"
		class="vc-upload-picker-file-item"
	>
		<slot :it="it">
			<div class="vc-upload-picker-file-item__content">
				<div v-if="isError" class="vc-upload-picker-file-item__error">
					上传失败
				</div>
				<template v-else>
					<vc-icon type="file" class="vc-upload-picker-file-item__file-icon" />
					<div :title="it.title" class="vc-upload-picker-file-item__title">
						{{ it.title }}
					</div>
				</template>
				
				<div v-if="it.percent" class="vc-upload-picker-file-item__progress">
					<div 
						class="vc-upload-picker-file-item__progress-inner"
						:style="{ width: it.percent + '%' }"
					/>
				</div>
			</div>
			<vc-icon 
				v-if="(it.retcode == 0 && it.percent == 100) || it.errorFlag" 
				type="close-small" 
				class="vc-upload-picker-file-item__delete"
				@click="handleDel" 
			/>
		</slot>
	</div>
</template>

<script>
import Extends from '../extends';
import Message from '../message/index';
import Toast from '../toast/index';
import Icon from '../icon';

export default {
	name: "vc-upload-picker-file-item",
	components: {
		'vc-icon': Icon
	},
	props: {
		it: {
			type: [String, Object, File],
			default: ''
		},
		disabled: Boolean,
		isMobile: Boolean
	},
	computed: {
		isError() {
			const { retcode, percent, errorFlag } = this.it;
			return retcode == 0 && percent == 100 || errorFlag;
		}
	},
	methods: {
		handleDel() {
			this.$emit('delete');
		}
	},
};
</script>

<style lang="scss">
@import '../style/vars.scss';

@include block(vc-upload-picker-file-item) {
	position: relative;
	@include when(error) {
		position: relative;
		color: #f42626;
		border: 1px solid #f42626;
		@include element(error) {
			color: #E74854 !important;
		}
	}
	@include when(mobile) {
		@include element(delete) {
			@include commonFlexCc();
			position: absolute;
			top: 0px;
			right: 0px;
			width: 15px;
			height: 15px;
			font-size: 7px;
			background: rgba($color: #000000, $alpha: .3);
			color: #fff;
			border-radius: 2px;
			z-index: 10;
		}
		@include when(error) {
			color: #676767;
			border: none;
			@include element(error) {
				color: #676767 !important;
			}
		}
	}
	@include element(content) {
		overflow: hidden;
		padding: 4px;
		border-radius: 4px;
		display: flex;
		position: relative;
		box-sizing: border-box;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	@include element(title) {
		width: 100%;
		font-size: 12px;
		color: #676767;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	@include element(file-icon) {
		font-size: 24px;
		color: #999;
	}
	
	@include element(progress) {
		overflow: hidden;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #e8e8e8;
		height: 4px;
	}
	
	@include element(progress-inner) {
		display: block;
		background-color: #5495F6;
		height: 100%;
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