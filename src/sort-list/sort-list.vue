<template>
	<vc-transtion-fade tag="div" class="vc-sort-list" group>
		<component 
			v-for="(item, index) in dataSource" 
			:key="typeof item === 'object' ? item[valueKey] : item"
			:is="tag"
			:draggable="getDraggable(item)"
			class="vc-sort-list__item"
			@dragstart="handleDragStart($event, item)"
			@dragenter="handleDragEnter($event, index, item)"
			@dragover.prevent="handleDragOver($event, index, item)"
			@dragend="handleDragEnd"
		>
			<!-- 项目中统一使用it, key由slot决定 -->
			<slot :it="item" :index="index" />
			<div v-if="mask" class="vc-sort-list__mask">
				<span 
					:style="{visibility: index !== 0 ? 'unset' : 'hidden'}"
					@click="handleClick($event, { item, index, type: 'left' })"
				>&#10094;</span>
				<span @click="handleClick($event, { item, index, type: 'delete'})">&#10006;</span>
				<span 
					:style="{visibility: index !== dataSource.length - 1 ? 'unset' : 'hidden'}"
					@click="handleClick($event, { item, index, type: 'right' })"
				>&#10095;</span>
			</div>
		</component>
	</vc-transtion-fade>
</template>
<script>
import Transition from '../transition';
import BasicMixin from './basic-mixin';

export default {
	name: "vc-sort-list",
	components: {
		'vc-transtion-fade': Transition.Fade
	},
	mixins: [BasicMixin]
};
</script>
<style lang="scss">
@import '../style/index.scss';

@include block(vc-sort-list) {
	@include commonFlex();
	flex-wrap: wrap;
	@include element(item) {
		transition: opacity .5s; // 目的是让拖拽的那个元素保持不透明， 文档流里透明
		&[draggable=true] {
			cursor: move;
		}
		&[draggable=false] {
			cursor: no-drop;
		}
		/**
		 * 重置移除时动画
		 */
		@include when(move) {
			transition: all .5s;
		}
	}
	& > div {
		margin: 10px;
		text-align: center;
		position: relative;
	}
	@include element(mask) {
		position: absolute;
		opacity: 0;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
		color: #fff;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-sizing: border-box;
		& > span {
			cursor: pointer;
			font-size: 18px;
		}
	}
	& > div:hover {
		@include element(mask) {
			transition: opacity .5s;
			opacity: 1;
		}
	}
}
</style>