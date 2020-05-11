<template>
	<div 
		:class="{ 'is-error': isError}"
		class="vcm-upload-picker-file-item"
	>
		<slot :it="it">
			<div class="vcm-upload-picker-file-item__content">
				<template v-if="isError">
					上传失败
				</template>
				<vc-spin v-else-if="!it[urlKey] && it.percent <= 100 && !it.errorFlag" />
				<template v-else>
					<vc-icon type="file" class="vcm-upload-picker-file-item__file-icon" />
					<div :title="it.title" class="vcm-upload-picker-file-item__title">
						{{ it.title }}
					</div>
				</template>
			</div>
			<vc-icon 
				v-if="!disabled && (isError || it[urlKey])" 
				type="close" 
				class="vcm-upload-picker__delete"
				@click="handleDel" 
			/>
		</slot>
	</div>
</template>

<script>
import Extends from '../../../extends';
import Icon from '../../../icon';
import Spin from '../../../spin';

export default {
	name: "vcm-upload-picker-file-item",
	components: {
		'vc-icon': Icon,
		'vc-spin': Spin
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
@import '../../../style/vars.scss';

@include block(vcm-upload-picker-file-item) {
	position: relative;
	@include when(error) {
		position: relative;
		color: #f42626;
		border: 1px solid #f42626;
	}
	@include element(content) {
		overflow: hidden;
		padding: 4px;
		border-radius: 2px;
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