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
			if (!this.getDraggable(_item)) return;
			e.preventDefault();

			const { item } = this.eleDrag || {};
			if (_item === item) {
				return;
			}

			if (this.timer) return;

			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.timer = null;
			}, 300);

			this.sync(this.getSortList({ item, index, type: 'drag' }));
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