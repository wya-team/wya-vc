<template>
	<vc-transtion-fade tag="div" class="vc-sort-list" group>
		<component 
			v-for="(item, index) in dataSource" 
			:key="typeof item === 'object' ? item[valueKey] : item"
			:is="tag"
			:draggable="getDraggable(item)"
			:class="[getDraggable(item) ? 'is-active' : 'is-forbid']"
			class="vc-sort-list__item"
			@dragstart="handleDragStart($event, item)"
			@dragenter="getDraggable(item) && handleDragEnter($event, index, item)"
			@dragover.prevent="getDraggable(item) && handleDragOver($event, index, item)"
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
import Extends from '../extends';
import Transition from '../transition'; // 表单验证

export default {
	name: "vc-tpl",
	components: {
		'vc-transtion-fade': Transition.Fade
	},
	mixins: [...Extends.mixins(['emitter'])],
	model: {
		prop: 'dataSource',
		event: 'change'
	},
	props: {
		tag: {
			type: String,
			default: 'div'
		},
		dataSource: {
			type: Array,
			default() {
				return [];
			},
		},
		valueKey: {
			type: [String, Number],
			default: 'id'
		},
		draggableKey: String,
		mask: {
			type: Boolean,
			default: true
		},
		draggable: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {};
	},
	created() {
		this.eleDrag = null;
	},
	methods: {
		getDraggable(item) {
			let value = item[this.draggableKey];
			return !!(typeof value === 'undefined' || value);
		},
		/**
		 * 获取左移、右移、拖拽、删除后的列表
		 */
		getSortList(current) {
			const { dataSource } = this;
			const { item, index, type } = current; // id:移动对象，i：目标位置，type：类型
			let isObject = typeof item === 'object';
			const arr = dataSource.filter(it => {
				if (isObject) {
					return it[this.valueKey] !== item[this.valueKey];
				}
				return it !== item;
			});

			let targetIndex;
			switch (type) {
				case 'left':
					arr.splice(index - 1, 0, dataSource[index]);
					break;
				case 'right':
					arr.splice(index + 1, 0, dataSource[index]);
					break;
				case 'drag':
					targetIndex = this.dataSource.findIndex(it => it === item); // 这个id元素对应的下标
					arr.splice(index, 0, dataSource[targetIndex]);
					break;
				default: // 删除
					break;
			}
			return arr;
		},

		handleClick(e, current) {
			this.sync(this.getSortList(current));
		},

		/**
		 * 拖拽开始
		 */
		handleDragStart(e, item) {
			// 定义拖动数据 - 拖到别的输入框展示的内容
			e.dataTransfer.setData('text', item);

			// 拖放效果
			e.dataTransfer.effectAllowed = "move";

			e.target.style.opacity = 0;


			this.eleDrag = e.target;

			this.eleDrag.item = item;
		},

		/**
		 * 拖拽元素进入目标元素头上的时候
		 */
		handleDragEnter(e, index, _item) {
			const { item } = this.eleDrag || {};
			if (_item === item) {
				return;
			}

			if (this.timer) return;

			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.timer = null;
			}, 500);

			this.sync(this.getSortList({ item, index, type: 'drag' }));
		},

		handleDragOver(e, index, _item) {

		},
		/**
		 * 拖拽结束
		 */
		handleDragEnd(e) {
			e.dataTransfer.clearData("text");

			e.target.style.opacity = 1;
			this.eleDrag = null;
		},

		/**
		 * v-model 同步, 外部的数据改变时不会触发
		 */
		sync(v) {
			this.$emit('change', v);
			this.dispatch('vc-form-item', 'form-change', v);
		}
	}
};
</script>
<style lang="scss">
@import '../style/index.scss';

@include block(vc-sort-list) {
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