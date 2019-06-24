<template>
	<component :is="tag" class="vcp-imgs-picker">
		<template v-if="!sort">
			<vc-imgs-picker-item 
				v-for="(item, index) in data" 
				:key="typeof item === 'object' ? item.uid : item"
				:img-class-name="imgClassName"
				:img-classes="imgClasses"
				:box-class-name="boxClassName"
				:disabled="disabled"
				:it="item"
				@delete="handleDel(arguments[0])"
				@preview="handlePreview(arguments[0], index)"
			>
				
				<template #default="{ it }">
					<slot :it="it" name="image"/>
				</template>
			</vc-imgs-picker-item>
		</template>
		<vc-sort-list 
			v-else 
			v-model="data" 
			:mask="sortMask" 
			value-key="uid" 
			class="is-sort"
		>
			<template #default="{ it, index }">
				<vc-imgs-picker-item 
					:img-class-name="imgClassName"
					:img-classes="imgClasses"
					:box-class-name="boxClassName"
					:disabled="disabled"
					:it="it"
					style="margin-right: 0; margin-bottom: 0"
					@delete="handleDel(arguments[0])"
					@preview="handlePreview(arguments[0], index)"
				>
					<template #default="{ it }">
						<slot :it="it" name="image"/>
					</template>
				</vc-imgs-picker-item>
			</template>
		</vc-sort-list>
		<vc-upload 
			v-show="!disabled && (data.length < max || max === 0)"
			v-bind="uploadOpts"
			:accept="accept"
			@file-start="handleFileStart"
			@file-progress="handleFileProgress"
			@file-success="handleFileSuccess"
			@file-error="handleFileError"
			@error="handleError"
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
import SortList from '../sort-list/index';
import Item from "./item";

export default {
	name: "vc-imgs-picker",
	components: {
		'vc-upload': Upload,
		'vc-icon': Icon,
		'vc-progress': Progress,
		'vc-sort-list': SortList,
		'vc-imgs-picker-item': Item
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
		sortMask: {
			type: Boolean,
			default: false
		}
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
		width: 14px;
		height: 14px;
		border-radius: 7px;
		background-color: #5495F6;
		color: #ffffff;
		font-size: 14px;
		z-index: 1;
	}
	@include element(progressbar) {
		flex: 1;
		background-color: #cdcdcd;
		height: 8px;
		border-radius: 5px;
		overflow: hidden;
		margin: 0 4px;
	}
	.vc-sort-list>div {
		margin-right: 12px;
		margin-bottom: 12px;
		margin-top: 0;
		margin-left: 0;
	}
}
</style>