<template>
	<div 
		:class="{ 'is-error': it.status == 0}"
		class="vc-upload-img-item"
	>
		<slot :it="it">
			<vc-img 
				v-if="typeof it !== 'object'" 
				:src="it" 
				:class="imgClassName"
				fit="cover"
				class="vc-upload-img-item__content"
				@click="handlePreview"
			/>
			<div v-else :class="imgClassName" class="vc-upload-img-item__content">
				<vc-progress
					v-if="it.percent && it.percent != 100" 
					:percent="it.percent"
					:show-info="false"
					status="normal"
					style="width: 100%;padding: 0 5px"
				/>
				<p v-else-if="!it.url && it.percent == 100 && !it.errorFlag" style="line-height: 1; padding: 5px">
					服务器正在接收...
				</p>
				<div v-else-if="it.status == 0" style="padding: 5px">
					上传失败
				</div>
			</div>
			<!-- 上传失败或者成功后显示 -->
			<vc-icon 
				v-if="!disabled && (typeof it !== 'object' || it.status == 0)" 
				type="close-small" 
				class="vc-upload-picker__delete"
				@click="handleDel" 
			/>
		</slot>
	</div>
</template>

<script>
import ImgsPreview from '../../imgs-preview/index';
import { VcInstance } from '../../vc/index';
import Icon from '../../icon/index';
import Progress from '../../progress/index';
import Img from '../../img';

export default {
	name: 'vc-upload-picker-img-item',
	components: {
		'vc-icon': Icon,
		'vc-progress': Progress,
		'vc-img': Img
	},
	props: {
		imgClassName: [String, Object, Array],
		disabled: Boolean,
		it: {
			type: [String, Object, File],
			default: ''
		},
		imgsPreviewOpts: {
			type: Object,
			default: () => ({})
		},
		index: [String, Number],
		dataSource: {
			type: Array,
			default: () => ([])
		}
	},
	methods: {
		handlePreview(e) {
			/**
			 * 渐进增强
			 */
			let { enhancer } = VcInstance.config.ImgsPreview || {};

			enhancer = this.imgsPreviewOpts.enhancer || enhancer || (() => false);
			let images = this.getPreviewData().map(item => ({ src: item }));
			enhancer(this.index, images, this) || this.previewByPS(e, this.index);
		},
		previewByPS(e, index) {
			let pos = {};
			try {
				const target = e.target; // 先得到pos, 否则getThumbBoundsFn再计划，target已变化（比如弹窗transition的影响）
				const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
				const rect = target.getBoundingClientRect();

				pos = { x: rect.left, y: rect.top + pageYScroll, w: rect.width };

			} catch (e) {
				console.log(e);
			}

			this.$emit('open');
			ImgsPreview.open({
				visible: true,
				dataSource: this.getPreviewData(),
				opts: {
					index,
					history: false,
					getThumbBoundsFn: (index) => pos
				},
				onSure: () => this.$emit('close'),
				onClose: () => this.$emit('close'),
			});
		},
		// 拿到可预览的图片，供预览组件使用
		getPreviewData() {
			return this.dataSource
				.filter(it => typeof it === 'string')
				.map((src) => src);
		},
		handleDel() {
			this.$emit('delete');
		}
	},
};
</script>

<style lang="scss">
@import '../../style/vars.scss';

@include block(vc-upload-img-item) {
	position: relative;
	display: flex;
	box-sizing: border-box;
	flex-wrap: wrap;
	@include when(error) {
		position: relative;
		color: #f42626;
		border: 1px solid #f42626;
	}
	@include element(content) {
		@include commonFlexCc();
		width: 100%;
		height: 100%;
		border-radius: 4px;
		background-size: cover;
		overflow: hidden;
		background-color: #F5F5F6;
	}
}
</style>
