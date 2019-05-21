<template>
	<component :is="tag" class="vcp-imgs-picker">
		<div 
			v-for="(item, index) in data" 
			:key="typeof item === 'object' ? item.uid : item"
			:class="{'vcp-imgs-picker__error': item.status == 0, imgClassName, boxClassName}"
			class="vcp-imgs-picker__item vcp-imgs-picker__box"
		>
			<slot 
				:it="item" 
				name="image"
			>
				<div
					v-if="typeof item !== 'object'"
					:style="{backgroundImage: `url('${item}')`}"
					:class="imgClasses"
					@click="handlePreview($event, index)"
				/>
				<div v-else :class="imgClasses">
					<vc-progress
						v-if="item.percent && item.percent != 100" 
						:percent="item.percent"
						:show-info="false"
						status="normal"
						style="width: 100%;padding: 0 5px"
					/>
					<p v-else-if="!item.url && item.percent == 100" style="line-height: 1; padding: 5px">
						服务器正在接收...
					</p>
					<div v-else-if="item.status == 0" style="padding: 5px">
						上传失败
					</div>
				</div>
				<!-- 上传失败或者成功后显示 -->
				<vc-icon 
					v-if="!disabled && (typeof item !== 'object' || item.status == 0)" 
					type="clear" 
					class="vcp-imgs-picker__delete"
					@click="handleDel(item)" 
				/>
				<div class="vcp-imgs-picker__delete--bg"/>
			</slot>
		</div>
		<vc-upload 
			v-show="!disabled && (data.length < max || max === 0)"
			v-bind="uploadOpts"
			:accept="accept"
			@file-start="handleFileStart"
			@file-progress="handleFileProgress"
			@file-success="handleFileSuccess"
			@file-error="handleFileError"
			@error="$emit('error', arguments[0])"
			@complete="handleFileComplete"
		>
			<slot name="upload">
				<div 
					:class="{uploadClassName: true, boxClassName: true}"
					class="vcp-imgs-picker__upload vcp-imgs-picker__box"
				>
					<vc-icon type="plus" style="font-size: 14px; margin-bottom: 8px" />
					<span>上传</span>
				</div>
			</slot>
		</vc-upload>
	</component>
</template>

<script>
import BasicMixin from './basic-mixin';
import Upload from '../upload/index';
import Icon from '../icon/index';
import Progress from '../progress/index';

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
		 * 允许的图片类型
		 */
		accept: {
			type: String,
			default: 'image/gif,image/jpeg,image/jpg,image/png' // 不默认为image/*是因为在Webkit浏览器下回响应很慢
		},
	},
	computed: {
		imgClasses() {
			return `vcp-imgs-picker__img ${this.imgClassName || ''}`;
		}
	},
};
</script>

<style lang="scss">
@import '../style/index.scss';
@include block(vcp-imgs-picker) {
	display: flex;
	box-sizing: border-box;
	flex-wrap: wrap;
	@include element(box) {
		width: 64px;
		height: 64px;
		margin-right: 12px;
		margin-bottom: 12px;
		border-radius: 4px;
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
		border-radius: 4px;
		background-size: cover;
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
		border: 1px dashed #D9D9D9;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		color: #999999;
		line-height: 1;
	}
	@include element(delete) {
		position: absolute;
		top: -6px;
		right: -6px;
		color: #5495F6;
		font-size: 16px;
		z-index: 1;
		@include modifier(bg) {
			position: absolute;
			top: -5px;
			right: -5px;
			background: #ffffff;
			width: 14px;
			height: 14px;
			border-radius: 7px;
		}
	}
	@include element(progressbar) {
		flex: 1;
		background-color: #cdcdcd;
		height: 8px;
		border-radius: 5px;
		overflow: hidden;
		margin: 0 4px;
	}
}
</style>