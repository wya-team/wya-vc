<template>
	<div 
		:class="{ 'is-error': isError }"
		class="vc-upload-picker-file-item"
	>
		<slot :it="it">
			<div class="vc-upload-picker-file-item__content">
				<template v-if="isError">
					上传失败
				</template>
				<vc-progress
					v-if="!it[urlKey] && it.percent <= 100 && !it.errorFlag" 
					:percent="it.percent"
					:show-info="false"
					status="normal"
					style="width: 100%;padding: 0 5px"
				/>
				<template v-else>
					<vc-icon type="file" class="vc-upload-picker-file-item__file-icon" />
					<div :title="it.title" class="vc-upload-picker-file-item__title">
						{{ it.title }}
					</div>
				</template>
			</div>
			<vc-icon 
				v-if="!disabled && (isError || it[urlKey])" 
				type="close-small" 
				class="vc-upload-picker__delete"
				@click="handleDel" 
			/>
		</slot>
	</div>
</template>

<script>
import Icon from '../../icon';
import Progress from '../../progress/index';

export default {
	name: "vc-upload-picker-file-item",
	components: {
		'vc-icon': Icon,
		'vc-progress': Progress,
	},
	props: {
		it: {
			type: [String, Object, File],
			default: ''
		},
		disabled: Boolean,
		urlKey: String
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
@import '../../style/vars.scss';

@include block(vc-upload-picker-file-item) {
	position: relative;
	background-color: #fafafa;
	@include when(error) {
		position: relative;
		color: #f42626;
		border: 1px solid #f42626;
		@include element(error) {
			color: #E74854 !important;
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
}
</style>