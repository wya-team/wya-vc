<template>
	<vc-popup 
		v-model="visible"
		theme="dark"
		placement="center"
		class="vc-video-preview"
	>
		<div class="vc-video-preview__video-wrapper">
			<video 
				ref="video"
				:src="srcList[0]"
				:x5-video-player-type="isMobile && 'h5'" 
				:playsinline="isMobile"
				:x5-playsinline="isMobile"
				:webkit-playsinline="isMobile"
				:mtt-playsinline="isMobile"
				controlslist="nodownload"
				class="vc-video-preview__video"
				controls
				disablePictureInPicture
			/>
		</div>
		<vc-icon type="close" class="vc-video-preview__close" @click="handleClose" />
	</vc-popup>
</template>

<script>
import { Device } from '@wya/utils';
import Portal from '../portal';
import Popup from '../popup/index';
import Icon from '../icon';

const wrapperComponent = {
	name: 'vc-video-preview',
	components: {
		'vc-popup': Popup,
		'vc-icon': Icon
	},
	props: {
		/**
		 * 视频数据，目前只支持一个视频预览
		 * TODO：多个视频切换预览，类似于imgs-preview ？？
		 */
		dataSource: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			visible: false,
			isMobile: Device.touch
		};
	},
	computed: {
		srcList() {
			return this.dataSource.map(it => {
				return typeof it === 'string' ? it : it.src;
			});
		}
	},
	mounted() {
		this.visible = true;
	},
	methods: {
		handleClose() {
			this.$refs.video.pause();
			this.visible = false;
			this.$emit('close');
		}
	},
};

export default wrapperComponent;
export const VideoPreview = new Portal(wrapperComponent, {
	promise: false
});
</script>

<style lang="scss">
@import '../style/vars.scss';

@include block(vc-video-preview) {
	position: relative;
	@include element(video-wrapper) {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	@include element(video) {
		max-width: 100%;
		max-height: 100%;
		outline: none;
	}

	@include element(close) {
		position: absolute;
		top: 20px;
		right: 20px;
		font-size: 16px;
		color: #fff;
		cursor: pointer;
	}

	.vcm-popup__wrapper {
		top: 0 !important;
		left: 0 !important;
		bottom: 0;
		right: 0;
		transform: none !important;
		background-color: #000 !important;
	}
}
</style>
