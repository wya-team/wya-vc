<template>
	<component :is="tag" :class="{ 'is-mobile': isMobile }" class="vc-upload-picker">
		<template v-if="thumbnail">
			<template v-if="!sortable">
				<template v-for="(item, index) in currentValue">
					<vc-upload-picker-img-item 
						v-if="recognizer(typeof item === 'object' ? item.name || item.title : item) === 'image'"
						:key="typeof item === 'object' ? item.uid : item"
						:class="[imgClassName, 'vc-upload-picker__item']"
						:disabled="disabled"
						:is-mobile="isMobile"
						:it="item"
						@delete="handleDel(index)"
						@preview="handlePreview(arguments[0], index)"
					>
						<template #default="{ it }">
							<slot :it="it" name="image" />
						</template>
					</vc-upload-picker-img-item>

					<vc-upload-picker-video-item
						v-else-if="recognizer(typeof item === 'object' ? item.name || item.title : item) === 'video'"
						:key="typeof item === 'object' ? item.uid : item"
						:class="[videoClassName, 'vc-upload-picker__item']"
						:it="item"
						:disabled="disabled"
						:is-mobile="isMobile"
						@delete="handleDel(index)"
						@preview="handleVideoPreview(item)"
					>
						<template #default="{ it }">
							<slot :it="it" name="image" />
						</template>
					</vc-upload-picker-video-item>

					<vc-upload-picker-file-item 
						v-else
						:key="item.uid"
						:it="item"
						:class="[fileClassName, 'vc-upload-picker__item']"
						:disabled="disabled"
						:is-mobile="isMobile"
						@delete="handleDel(index)"
					/>
				</template>
			</template>
			<vc-sort-list 
				v-else 
				:data-source="currentValue" 
				:mask="mask" 
				value-key="uid" 
				class="is-sort"
				@change="handleSortChange"
			>
				<template #default="{ it, index }">
					<vc-upload-picker-img-item 
						v-if="recognizer(typeof it === 'object' ? it.name || it.title : it) === 'image'"
						:key="typeof it === 'object' ? it.uid : it"
						:class="[imgClassName, 'vc-upload-picker__item']"
						:disabled="disabled"
						:is-mobile="isMobile"
						:it="it"
						@delete="handleDel(index)"
						@preview="handlePreview(arguments[0], index)"
					>
						<template #default="{ it }">
							<slot :it="it" name="image" />
						</template>
					</vc-upload-picker-img-item>

					<vc-upload-picker-video-item
						v-else-if="recognizer(typeof it === 'object' ? it.name || it.title : it) === 'video'"
						:key="typeof it === 'object' ? it.uid : it"
						:class="[videoClassName, 'vc-upload-picker__item']"
						:it="it"
						:disabled="disabled"
						:is-mobile="isMobile"
						@delete="handleDel(index)"
						@preview="handleVideoPreview(item)"
					>
						<template #default="{ it }">
							<slot :it="it" name="video" />
						</template>
					</vc-upload-picker-video-item>

					<vc-upload-picker-file-item 
						v-else
						:key="it.uid"
						:it="it"
						:class="[fileClassName, 'vc-upload-picker__item']"
						:disabled="disabled"
						:is-mobile="isMobile"
						@delete="handleDel(index)"
					/>
				</template>
			</vc-sort-list>
		</template>
		<vc-upload 
			v-show="!disabled && multiple"
			v-bind="currentUploadOpts"
			:accept="dynamicAccept"
			:max="dynamicMax"
			:multiple="multiple"
			class="vc-upload-picker__upload"
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
					class="vc-upload-picker__box"
					@click="handleClick"
				>
					<vc-icon type="mini-plus" class="vc-upload-picker__plus-icon" />
					<span v-if="!isMobile" style="margin-top: 8px">上传</span>
				</div>
			</slot>
		</vc-upload>
	</component>
</template>

<script>
import PickerMixin from './picker-mixin';
import Upload from "./upload";
import Icon from '../icon/index';
import { VcInstance } from '../vc/index';
import SortList from '../sort-list/index';
import ImgItem from "./img-item";
import VideoItem from './video-item';
import FileItem from './file-item';

export default {
	name: "vc-upload-picker",
	components: {
		'vc-upload': Upload,
		'vc-icon': Icon,
		'vc-sort-list': SortList,
		'vc-upload-picker-img-item': ImgItem,
		'vc-upload-picker-video-item': VideoItem,
		'vc-upload-picker-file-item': FileItem
	},
	mixins: [PickerMixin],
	props: {
		accept: String,
		mask: {
			type: Boolean,
			default: false
		},
		gallery: {
			type: [Function, Boolean],
			default: true
		}
	},
	methods: {
		/**
		 * 仅PC端有效
		 */
		handleClick(e) {
			const { ImgsPicker = {} } = VcInstance.config;
			if (typeof this.gallery === 'function' || (this.gallery && ImgsPicker.gallery)) {
				e.stopPropagation();

				let fn = typeof this.gallery === 'function' 
					? this.gallery
					: ImgsPicker.gallery;
					
				fn(this);
			} 
		},
		handleSortChange(imgs) {
			this.currentValue = imgs;
			this.$emit('change', imgs.filter(img => typeof img === 'string'));
		}
	}

};
</script>

<style lang="scss">
@import '../style/vars.scss';
@include block(vc-upload-picker) {
	display: flex;
	box-sizing: border-box;
	flex-wrap: wrap;
	@include when(mobile) {
		@include element(box) {
			border: none;
		}
		@include element(plus-icon) {
			font-size: 30px;
		}
	}
	@include share-rule(box) {
		width: 64px;
		height: 64px;
		border-radius: 4px;
		background-color: #fafafa;
		cursor: pointer;
	}
	@include element(item) {
		margin-right: 12px;
		margin-bottom: 12px;
		@include extend-rule(box);
	}
	@include element(upload) {
		margin-right: 12px;
		margin-bottom: 12px;
	}
	@include element(box) {
		background-color: #F5F5F6;
		border: 1px dashed #D9D9D9;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		color: #999999;
		line-height: 1;
		@include extend-rule(box);
	}
	@include element(plus-icon) {
		font-size: 14px;
	}
	.vc-sort-list > div {
		margin-right: 12px;
		margin-bottom: 12px;
		margin-top: 0;
		margin-left: 0;
	}
}
</style>