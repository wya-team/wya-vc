<template>
	<div class="vcm-picker-popup">
		<vcm-popup 
			v-model="isActive" 
			v-bind="$attrs" 
			:fixed="true"
			@close="handleClick('close')"
		>
			<div v-if="showToolbar" class="vcm-picker-popup__header">
				<div 
					v-if="cancelText" 
					class="vcm-picker-popup__item is-left"
					@click.stop="handleClick('cancel')"
				>
					{{ cancelText }}
				</div>

				<!-- title -->
				<div 
					class="vcm-picker-popup__item is-title"
					v-html="title"
				/>

				<div 
					v-if="okText" 
					class="vcm-picker-popup__item is-right" 
					@click.stop="handleClick('ok')"
				>
					{{ okText }}
				</div>
			</div>
			<slot />
		</vcm-popup>
	</div>
</template>

<script>
import { pick } from 'lodash';
import MPopup from '../../popup/index.m';
import { getSelectedData } from '../../utils/index';

export default {
	name: "vcm-picker-popup",
	components: {
		'vcm-popup': MPopup
	},
	inheritAttrs: false,
	model: {
		prop: 'visible',
		event: 'visible-change'
	},
	props: {
		visible: {
			type: Boolean,
			default: true
		},
		title: {
			type: String,
			default: ''
		},
		cancelText: {
			type: String,
			default: '取消'
		},
		okText: {
			type: String,
			default: '确定'
		},
		showToolbar: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			isActive: false,
		};
	},
	computed: {},
	watch: {
		visible: {
			immediate: true,
			handler(v) {
				this.isActive = v;
			}
		},
		isActive(v) {
			this.$emit('visible-change', v);
		}
	},
	methods: {
		handleClick(event) {
			this.isActive = false;
			this.$emit(event);
		},
	}
};

</script>

<style lang='scss'>
@import '../../style/index.scss';

@include block(vcm-picker-popup) {
	@include element(header) {
		position: relative;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		background-color: #fff;
		@include commonBorder1PX(bottom, #e7e7e7);
	}
	@include element(item) {
		padding: 0 15px;
		color: #108ee9;
		height: 44px;
		font-size: 17px;
		line-height: 44px;
		@include when(title) {
			flex: 1;
			text-align: center;
			color: #000;
		}
	}
	
}
</style>
