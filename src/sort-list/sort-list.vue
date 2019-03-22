<template>
	<transition-group 
		tag="div" 
		class="vc-sort-list" 
		name="flip-list" 
	>
		<component 
			v-for="(item, index) in dataSource" 
			:key="typeof item === 'object' ? item[valueKey] : item"
			:is="tag"
			:draggable="getDraggable(item)"
			:class="[getDraggable(item) ? '__item-active' : '__item-forbid']"
			class="__item"
			@dragstart="handleDragStart($event, item)"
			@dragenter="getDraggable(item) && handleDragEnter($event, index, item)"
			@dragover.prevent="getDraggable(item) && handleDragOver($event, index, item)"
			@dragend="handleDragEnd"
		>
			<slot v-bind="typeof item === 'object' ? item : { src: item }" />
			<div v-if="mask" class="__mask">
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
	</transition-group>
</template>
<script>
import emitter from '../extends/mixins/emitter'; // 表单验证

export default {
	name: "vc-tpl",
	mixins: [emitter],
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
			const arr = dataSource.filter(it => it != item);

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
			let newValue = this.getSortList(current);

			this.$emit('change', newValue);
			// for iview
			this.dispatch('vc-form-item', 'form-change', newValue);
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

			const newValue = this.getSortList({ item, index, type: 'drag' });
			this.$emit('change', newValue);
			// for iview
			this.dispatch('vc-form-item', 'form-change', newValue);

			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.timer = null;
			}, 500);

			
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
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../style/index.scss';
.vc-sort-list {
	@include commonFlex();
	flex-wrap: wrap;
	.__item {
		transition: all .5s;
	}
	.__item-active {
		cursor: move;
	}
	.__item-forbid {
		cursor: no-drop;
	}
	& > div {
		margin: 10px;
		text-align: center;
		position: relative;
		
	}
	& > div:hover .__mask {
		transition: opacity .5s;
		opacity: 1;
	}
	.__mask {
		opacity: 0;
		position: absolute;
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
}

// group下其他元素，位置变换时触发
// .flip-list-move {
// 	transition: all .5s;
// }

// 开始消失/进入的元素
.flip-list-enter, 
.flip-list-leave-to{
	opacity: 0;
	// transform: translateY(30px);
}
// 开始消失，在变化过程中，使其宽高变化，其他元素会被添加flip-list-move
.flip-list-leave-active {
	// position: absolute !important;
	display: none;
}
</style>