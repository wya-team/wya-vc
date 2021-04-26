import { isEqualWith } from 'lodash';

import Extends from '../extends';

export default {
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
		// 是否可拖拽 如 [ { id: 1， draggable: false } ]
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
		return {
			currentValue: [],
			dragging: false
		};
	},
	watch: {
		dataSource: {
			immediate: true,
			handler(v) {
				if (isEqualWith(v, this.currentValue)) {
					return;
				}
				this.currentValue = v;
			}
		}
	},
	created() {
		this.eleDrag = null;
	},
	methods: {
		getDraggable(item) {
			let value = item ? item[this.draggableKey] : undefined;
			return !!(typeof value === 'undefined' || value);
		},
		/**
		 * 获取左移、右移、拖拽、删除后的列表
		 */
		getSortList(current) {
			const { currentValue } = this;
			const { item, index, type } = current; // id:移动对象，i：目标位置，type：类型
			let isObject = typeof item === 'object';
			const arr = currentValue.filter(it => {
				if (isObject) {
					return it[this.valueKey] !== item[this.valueKey];
				}
				return it !== item;
			});

			let targetIndex;
			switch (type) {
				case 'left':
					arr.splice(index - 1, 0, currentValue[index]);
					break;
				case 'right':
					arr.splice(index + 1, 0, currentValue[index]);
					break;
				case 'drag':
					targetIndex = this.currentValue.findIndex(it => it === item); // 这个id元素对应的下标
					arr.splice(index, 0, currentValue[targetIndex]);
					break;
				default: // 删除
					break;
			}
			return arr;
		},

		handleClick(e, current) {
			this.currentValue = this.getSortList(current);
			this.sync();
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

			// 嵌套时，作用于目标元素上，避免被覆盖
			this.eleDrag = e.target;
			this.eleDrag.item = e.target.item 
				? e.target.item 
				: item;

			this.dragging = true;
		},

		/**
		 * 拖拽元素进入目标元素头上的时候
		 */
		handleDragEnter(e, index, _item) {
			if (!this.getDraggable(_item)) return;
			e.preventDefault();

			const { item } = this.eleDrag || {};

			/**
			 * 嵌套：拖动A.a -> B.a（此时item为空）
			 * 自己忽略
			 */
			if (!item || _item === item) {
				return;
			}

			// 嵌套下，父子，托动子元素，会触发父层的drag-enter（包在内部）;
			if (typeof item === 'object' && !item[this.valueKey]) return;
			
			// 频率控制			
			if (this.timer) return;
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.timer = null;
			}, 300);

			this.currentValue = this.getSortList({ item, index, type: 'drag' });
		},

		handleDragOver(e, index, _item) {
			if (!this.getDraggable(_item)) return;
			e.preventDefault();
		},
		/**
		 * 拖拽结束
		 */
		handleDragEnd(e) {
			e.dataTransfer.clearData("text");

			e.target.style.opacity = 1;
			this.eleDrag = null;
			this.dragging = false;

			this.sync();
		},

		/**
		 * v-model 同步, 外部的数据改变时不会触发
		 */
		sync() {
			this.$emit('change', this.currentValue);
			this.dispatch('vc-form-item', 'form-change', this.currentValue);
		}
	}
};