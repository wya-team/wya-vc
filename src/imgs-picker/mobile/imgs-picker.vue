<template>
	<component :is="tag" class="vcm-imgs-picker">
		<div 
			v-for="(item, index) in data" 
			:key="typeof item === 'object' ? item.uid : item"
			:class="{'vcm-imgs-picker__error': item.status == 0, imgClassName, boxClassName}"
			class="vcm-imgs-picker__item vcm-imgs-picker__box"
		>
			<div
				v-if="typeof item !== 'object'"
				:style="{backgroundImage: `url('${item}')`}"
				:class="imgClasses"
				@click="handlePreview($event, index)"
			/>
			<div v-else :class="imgClasses">
				<div v-if="typeof item.status === 'undefined'">xx</div>
				<div v-else-if="item.status == 0" style="padding: 5px">
					上传失败
				</div>
			</div>
			<!-- 上传失败或者成功后显示 -->
			<div class="vcm-imgs-picker__delete">
				<vc-icon 
					v-if="!disabled && (typeof item !== 'object' || item.status == 0)" 
					type="close" 
					@click="handleDel(item)" 
				/>
			</div>
		</div>
		<vc-upload 
			v-show="!disabled && (data.length < max || max === 0)"
			v-bind="uploadOpts"
			:accept="accept"
			:class="{uploadClassName: true, boxClassName: true}"
			class="vcm-imgs-picker__upload vcm-imgs-picker__box"
			@file-start="handleFileStart"
			@file-progress="handleFileProgress"
			@file-success="handleFileSuccess"
			@file-error="handleFileError"
			@error="$emit('error', arguments[0])"
			@complete="handleFileComplete"
		>
			<vc-icon type="plus" style="font-size: 30px" />
		</vc-upload>
	</component>
</template>

<script>
import BasicMixin from '../basic-mixin';
import Upload from '../../upload/index';
import Icon from '../../icon/index';
import Progress from '../../progress/index';

export default {
	name: "vc-imgs-picker",
	components: {
		'vc-upload': Upload,
		'vc-icon': Icon,
		'vc-progress': Progress,
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
	},
	computed: {
		imgClasses() {
			return `vcm-imgs-picker__img ${this.imgClassName || ''}`;
		}
	},
};
</script>

<style lang="scss">
@import '../../style/index.scss';
@include block(vcm-imgs-picker) {
	display: flex;
	box-sizing: border-box;
	flex-wrap: wrap;
	@include element(box) {
		width: 78px;
		height: 78px;
		margin-right: 13px;
		margin-bottom: 13px;
		border-radius: 2px;
		background-color: #fafafa;
		cursor: pointer;
	}
	@include element(item) {
		position: relative;
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
	@include element(error) {
		position: relative;
		color: #f42626;
		border: 1px solid #f42626;
	}
	@include element(upload) {
		background-color: #F5F5F6;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		color: #999999;
		line-height: 1;
	}
	@include element(delete) {
		@include commonFlexCc();
		position: absolute;
		top: 0px;
		right: 0px;
		width: 15px;
		height: 15px;
		font-size: 7px;
		background: #000;
		opacity: 0.3;
		border-radius: 2px;
		z-index: 10;
	}
}
</style>