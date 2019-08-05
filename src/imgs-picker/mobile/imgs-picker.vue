<template>
	<component :is="tag" class="vcm-imgs-picker">
		<div 
			v-for="(item, index) in currentValue" 
			:key="typeof item === 'object' ? item.uid : item"
			:class="[{'is-error': item.status == 0}]"
			class="vcm-imgs-picker__item"
		>
			<slot 
				:it="item"
				name="image"
			>
				<div
					v-if="typeof item !== 'object'"
					:style="{backgroundImage: `url('${item}')`}"
					:class="imgClassName"
					class="vcm-imgs-picker__img"
					@click="handlePreview($event, index)"
				/>
				<div v-else :class="imgClassName" class="vcm-imgs-picker__img">
					<vc-spin v-if="typeof item.status === 'undefined'"/>
					<div v-else-if="item.status == 0" style="padding: 5px">
						上传失败
					</div>
				</div>
				<!-- 上传失败或者成功后显示 -->
				<div v-if="!disabled && (typeof item !== 'object' || item.status == 0)" class="vcm-imgs-picker__delete">
					<vc-icon 
						type="close" 
						style="color: white"
						@click="handleDel(item)" 
					/>
				</div>
			</slot>
		</div>
		<vc-upload 
			v-show="!disabled && (currentValue.length < max || max === 0)"
			v-bind="currentUploadOpts"
			:accept="accept"
			@file-before="handleFileBefore"
			@file-start="handleFileStart"
			@file-progress="handleFileProgress"
			@file-success="handleFileSuccess"
			@file-error="handleFileError"
			@error="handleError"
			@complete="handleFileComplete"
		>
			<slot name="upload">
				<div 
					:class="[uploadClassName, boxClassName]"
					class="vcm-imgs-picker__upload"
				>
					<vc-icon type="plus" style="font-size: 30px" />
				</div>
			</slot>
		</vc-upload>
	</component>
</template>

<script>
import BasicMixin from '../basic-mixin';
import Upload from '../../upload/index';
import Icon from '../../icon/index';
import Spin from '../../spin/index';

export default {
	name: "vc-imgs-picker",
	components: {
		'vc-upload': Upload,
		'vc-icon': Icon,
		'vc-spin': Spin
	},
	mixins: [BasicMixin],
	props: {
		/**
		 * 允许的图片类型, imgage/* 避免Android端失败
		 */
		accept: {
			type: String,
			default: 'image/*'
		},
	}
};
</script>

<style lang="scss">
@import '../../style/index.scss';



@include block(vcm-imgs-picker) {
	display: flex;
	box-sizing: border-box;
	flex-wrap: wrap;
	@include share-rule(box) {
		width: 78px;
		height: 78px;
		margin-right: 8px;
		margin-bottom: 8px;
		border-radius: 2px;
		background-color: #fafafa;
		cursor: pointer;
	}
	@include when(error) {
		position: relative;
		color: #f42626;
		border: 1px solid #f42626;
	}
	@include element(item) {
		position: relative;
		@include extend-rule(box);
	}
	@include element(img) {
		@include commonFlexCc();
		width: 100%;
		height: 100%;
		background-size: cover;
		border-radius: 2px;
		overflow: hidden;
		background-color: #F5F5F6;
	}
	@include element(upload) {
		background-color: #F5F5F6;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		color: #999999;
		line-height: 1;
		@include extend-rule(box);
	}
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
}
</style>