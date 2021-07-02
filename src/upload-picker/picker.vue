<!-- picker和dataSource必须要对应，否则会显示不出来 -->
<template>
	<div class="vc-upload-picker">
		<template v-for="(picker, index) in currentPicker">
			<vc-fragment :key="`picker-${index}`">
				<template v-if="!sortable">
					<component
						:is="picker.item"
						v-for="(item, i) in currentValue[picker.type]"
						:key="typeof item === 'object' ? item.uid : item"
						:it="item"
						:disabled="disabled"
						:imgs-preview-opts="imgsPreviewOpts"
						:img-class-name="imgClassName"
						:video-class-name="videoClassName"
						:audio-class-name="audioClassName"
						:file-class-name="fileClassName"
						:url-key="urlKey"
						:index="i"
						:data-source="currentValue[picker.type]"
						class="vc-upload-picker__item"
						@delete="handleDel(i, picker.type)"
					>
						<template #default="{ it }">
							<slot :it="it" :index="i" :name="picker.type" />
						</template>
					</component>
				</template>
				<vc-sort-list
					v-else 
					:data-source="currentValue[picker.type]" 
					:mask="mask" 
					value-key="uid" 
					class="is-sort"
					@change="handleSortChange(...arguments ,picker.type)"
				>
					<template #default="{ it, index }">
						<component
							:is="picker.item"
							:key="typeof it === 'object' ? it.uid : it"
							:it="it"
							:disabled="disabled"
							:imgs-preview-opts="imgsPreviewOpts"
							:img-class-name="imgClassName"
							:video-class-name="videoClassName"
							:audio-class-name="audioClassName"
							:file-class-name="fileClassName"
							:url-key="urlKey"
							:index="index"
							:data-source="currentValue[picker.type]"
							class="vc-upload-picker__item"
							@delete="handleDel(index, picker.type)"
						>
							<template #default="{ it }">
								<slot :it="it" :index="index" :name="picker.type" />
							</template>
						</component>
					</template>
				</vc-sort-list>
				<vc-upload
					v-show="!disabled && multiple[picker.type]"
					v-bind="currentUploadOpts[picker.type]"
					:max="dynamicMax[picker.type]"
					:multiple="multiple[picker.type]"
					class="vc-upload-picker__upload"
					@file-before="handleFileBefore(...arguments, picker.type)"
					@file-start="handleFileStart(...arguments, picker.type)"
					@file-progress="handleFileProgress(...arguments, picker.type)"
					@file-success="handleFileSuccess(...arguments, picker.type)"
					@file-error="handleFileError(...arguments, picker.type)"
					@error="handleError(...arguments, picker.type)"
					@complete="handleFileComplete(...arguments, picker.type)"
				>
					<slot :name="`${picker.type}-upload`">
						<div 
							:class="[boxClassName]"
							class="vc-upload-picker__box"
							@click="handleClick($event, picker.type)"
						>
							<vc-icon type="mini-plus" class="vc-upload-picker__plus-icon" />
							<span style="margin-top: 8px">上传</span>
						</div>
					</slot>
				</vc-upload>
			</vc-fragment>
		</template>
	</div>
</template>

<script>
import { picker } from 'lodash';
import PickerMixin from './picker-mixin';
import { VcInstance } from '../vc/index';
import Upload from '../upload/index';
import Fragment from '../fragment/index';
import Icon from '../icon/index';
import SortList from '../sort-list/index';
import ImgItem from './item/img-item';
import VideoItem from './item/video-item';
import AudioItem from './item/audio-item';
import FileItem from './item/file-item';

export default {
	name: "vc-upload-picker",
	components: {
		'vc-fragment': Fragment,
		'vc-upload': Upload,
		'vc-icon': Icon,
		'vc-sort-list': SortList
	},
	mixins: [PickerMixin],
	props: {
		// PC端特有
		gallery: {
			type: [Function, Boolean],
			default: true
		}
	},
	computed: {
		currentPicker() {
			return this.picker.reduce((pre, cur) => {
				switch (cur) {
					case 'image':
						pre.push({
							type: cur,
							item: ImgItem
						});
						return pre;
					case 'video':
						pre.push({
							type: cur,
							item: VideoItem
						});
						return pre;
					case 'audio':
						pre.push({
							type: cur,
							item: AudioItem
						});
						return pre;
					case 'file':
						pre.push({
							type: cur,
							item: FileItem
						});
						return pre;
					default:
						return pre;
				}
			}, []);
		},
	},
	methods: {
		handleClick(e, type) {
			const { UploadPicker = {} } = VcInstance.config;
			if (typeof this.gallery === 'function' || (this.gallery && UploadPicker.gallery)) {

				let fn = typeof this.gallery === 'function' 
					? this.gallery
					: UploadPicker.gallery;
				
				// 阻止原生事件，如video, file不走gallery, 可以跳过;
				fn(this, type) && e.stopPropagation();
			} 
		},
	}

};
</script>

<style lang="scss">
@import '../style/vars.scss';

@include block(vc-upload-picker) {
	display: flex;
	box-sizing: border-box;
	flex-wrap: wrap;
	@include share-rule(box) {
		width: 64px;
		height: 64px;
		border-radius: 4px;
		cursor: pointer;
	}
	@include element(item) {
		margin-right: 12px;
		margin-bottom: 12px;
		@include extend-rule(box);
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
		margin-right: 0;
		margin-bottom: 0;
		margin-top: 0;
		margin-left: 0;
	}
}
</style>