<template>
	<vcm-transtion-fade tag="div" class="vcm-sort-list" group>
		<component 
			:is="tag" 
			v-for="(item, index) in currentValue"
			:key="typeof item === 'object' ? item[valueKey] : item"
			:draggable="getDraggable(item)"
			class="vcm-sort-list__item"
			@touchmove.prevent
			@dragstart="handleDragStart($event, item)"
			@dragenter="handleDragEnter($event, index, item)"
			@dragover="handleDragOver($event, index, item)"
			@dragend="handleDragEnd"
		>
			<!-- 项目中统一使用it, key由slot决定 -->
			<slot :it="item" :index="index" />
		</component>
	</vcm-transtion-fade>
</template>
<script>
/**
 * 移动端兼容dnd
 */
import { polyfill } from "mobile-drag-drop";
import { scrollBehaviourDragImageTranslateOverride } from "mobile-drag-drop/scroll-behaviour";
import "mobile-drag-drop/default.css";

import Transition from '../../transition';
import BasicMixin from '../basic-mixin';

polyfill({
	dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
	tryFindDraggableTarget: e => {
		let el = e.target;
		/* eslint-disable no-cond-assign, no-continue */
		do {
			if (el.draggable === false) {
				continue;
			}
			// img 标签 draggable默认为true, 避免影响
			// if (el.draggable === true) {
			// 	return el;
			// }
			if (el.getAttribute && el.getAttribute("draggable") === "true") {
				return el;
			}
		} while ((el = el.parentNode) && el !== document.body); 
	}
});

/**
 * hack for iOS 10
 * event.preventDefault()不会取消窗口滚动。
 */
window.addEventListener('touchmove', () => {});

export default {
	name: "vcm-sort-list",
	components: {
		'vcm-transtion-fade': Transition.Fade
	},
	mixins: [BasicMixin]
};
</script>
<style lang="scss">

@import '../../style/vars.scss';

@include block(vcm-sort-list) {
	@include commonFlex();
	flex-wrap: wrap;
	@include element(item) {
		transition: opacity .5s; // 目的是让拖拽的那个元素保持不透明， 文档流里透明
		@include when(active) {
			cursor: move;
		}
		@include when(forbid) {
			cursor: no-drop;
		}
		/**
		 * 重置移除时动画
		 */
		@include when(move) {
			transition: all .5s;
		}
	}
}
</style>