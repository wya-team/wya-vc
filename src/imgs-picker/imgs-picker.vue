<template>
	<component :is="tag" class="vc-imgs-picker">
		<template v-if="!sortable">
			<vc-imgs-picker-item 
				v-for="(item, index) in currentValue" 
				:key="typeof item === 'object' ? item.uid : item"
				:class="[imgClassName, 'vc-imgs-picker__item-img']"
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
			v-model="currentValue" 
			:mask="mask" 
			value-key="uid" 
			class="is-sort"
		>
			<template #default="{ it, index }">
				<vc-imgs-picker-item 
					:class="[imgClassName, 'vc-imgs-picker__item-img']"
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
					class="vc-imgs-picker__upload vc-imgs-picker__box"
					@click="handleClick"
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
import { VcInstance } from '../vc/index';
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
		mask: {
			type: Boolean,
			default: false
		},
		gallery: {
			type: Boolean | Function,
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
		}
	}

};
</script>

<style lang="scss">
@import '../style/index.scss';
@include block(vc-imgs-picker) {
	display: flex;
	box-sizing: border-box;
	flex-wrap: wrap;
	@include share-rule(box) {
		width: 64px;
		height: 64px;
		margin-right: 12px;
		margin-bottom: 12px;
		border-radius: 4px;
		background-color: #fafafa;
		cursor: pointer;
	}
	@include element(item-img) {
		@include extend-rule(box);
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
		@include extend-rule(box);
	}
	.vc-sort-list > div {
		margin-right: 12px;
		margin-bottom: 12px;
		margin-top: 0;
		margin-left: 0;
	}
}
</style>