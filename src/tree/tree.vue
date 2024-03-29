<template>
	<div
		:class="{
			'vc-tree--highlight-current': highlightCurrent,
			'is-dragging': !!dragState.draggingNode,
			'is-drop-not-allow': !dragState.allowDrop,
			'is-drop-inner': dragState.dropType === 'inner'
		}"
		class="vc-tree"
		role="tree"
	>
		<vc-tree-node
			v-for="child in root.childNodes"
			:key="getNodeKey(child)"
			:node="child"
			:tree-props="treeProps"
			:render-after-expand="renderAfterExpand"
			:show-checkbox="showCheckbox"
			:render-content="renderContent"
			:allow-dispatch="allowDispatch"
			@node-expand="handleNodeExpand"
		/>
		<div v-if="isEmpty" class="vc-tree__empty-block">
			<span class="vc-tree__empty-text">{{ emptyText }}</span>
		</div>
		<div
			v-show="dragState.showDropIndicator"
			ref="dropIndicator"
			class="vc-tree__drop-indicator"
		/>
	</div>
</template>

<script>
import { $ } from '@wya/utils';
import TreeStore from './model/tree-store';
import { getNodeKey, findNearestComponent } from './model/util';
import TreeNode from './tree-node';
import Extends from '../extends';

export default {
	name: 'vc-tree',
	components: {
		'vc-tree-node': TreeNode
	},
	mixins: [...Extends.mixins(['emitter'])],
	/**
	 * 当v-model时，支持checkbox
	 */
	model: {
		prop: 'checkedKeys',
		event: 'change'
	},
	props: {
		dataSource: {
			type: Array
		},
		emptyText: {
			type: String,
			default: '暂无数据'
		},
		renderAfterExpand: {
			type: Boolean,
			default: true
		},
		checkStrictly: {
			type: Boolean,
			default: false
		},
		defaultExpandAll: Boolean,
		expandOnClickNode: {
			type: Boolean,
			default: true
		},
		checkOnClickNode: Boolean,
		checkDescendants: {
			type: Boolean,
			default: false
		},
		autoExpandParent: {
			type: Boolean,
			default: true
		},
		checkedKeys: {
			type: Array,
			default: () => ([])
		},
		expandedKeys: {
			type: Array,
			default: () => ([])
		},
		currentNodeKey: [String, Number],
		renderContent: Function,
		showCheckbox: {
			type: Boolean,
			default: false
		},
		draggable: {
			type: Boolean,
			default: false
		},
		allowDrag: Function,
		allowDrop: Function,
		lazy: {
			type: Boolean,
			default: false
		},
		highlightCurrent: Boolean,
		loadData: Function,
		filterNode: Function,
		accordion: Boolean,
		indent: {
			type: Number,
			default: 18
		},
		iconClassName: String,
		treeProps: {
			type: Object,
			default: () => ({
				children: 'children',
				label: 'label',
				value: 'value',
				disabled: 'disabled',
				isLeaf: 'isLeaf'
			})
		},
		allowDispatch: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			store: null,
			root: null,
			currentNode: null,
			treeItems: null,
			checkboxItems: [],
			dragState: {
				showDropIndicator: false,
				draggingNode: null,
				dropNode: null,
				allowDrop: true
			}
		};
	},
	computed: {
		treeItemArray() {
			return Array.prototype.slice.call(this.treeItems);
		},

		isEmpty() {
			const { childNodes } = this.root;
			return !childNodes || childNodes.length === 0 || childNodes.every(({ visible }) => !visible);
		}
	},

	watch: {
		checkedKeys(v) {
			/**
			 * [...v], 避免同一引用
			 */
			this.store.setCheckedKeys([...v]);
		},

		expandedKeys(v) {
			/**
			 * [...v], 避免同一引用
			 */
			this.store.expandedKeys = [...v];
			this.store.setExpandedKeys([...v]);
		},

		dataSource(v) {
			this.store.setData(v);
		},

		checkboxItems(v) {
			Array.prototype.forEach.call(v, (checkbox) => {
				checkbox.setAttribute('tabindex', -1);
			});
		},

		checkStrictly(v) {
			this.store.checkStrictly = v;
		}
	},

	created() {
		this.isTree = true;
		
		this.store = new TreeStore({
			key: this.treeProps.value,
			data: this.dataSource,
			lazy: this.lazy,
			props: this.treeProps,
			loadData: this.loadData,
			currentNodeKey: this.currentNodeKey,
			checkStrictly: this.checkStrictly,
			checkDescendants: this.checkDescendants,
			checkedKeys: [...this.checkedKeys], // 避免浅拷贝修改
			expandedKeys: [...this.expandedKeys],
			autoExpandParent: this.autoExpandParent,
			defaultExpandAll: this.defaultExpandAll,
			filterNode: this.filterNode
		});

		this.root = this.store.root;

		let dragState = this.dragState;
		this.$on('tree-node-drag-start', (event, treeNode) => {
			if (typeof this.allowDrag === 'function' && !this.allowDrag(treeNode.node)) {
				event.preventDefault();
				return false;
			}
			event.dataTransfer.effectAllowed = 'move';

			// wrap in try catch to address IE's error when first param is 'text/plain'
			try {
				// setData is required for draggable to work in FireFox
				// the content has to be '' so dragging a node out of the tree won't open a new tab in FireFox
				event.dataTransfer.setData('text/plain', '');
			} catch (e) {
				// TODO
			}
			dragState.draggingNode = treeNode;
			this.$emit('node-drag-start', treeNode.node, event);
		});

		this.$on('tree-node-drag-over', (event, treeNode) => {
			const dropNode = findNearestComponent(event.target, 'vc-tree-node');
			const oldDropNode = dragState.dropNode;
			if (oldDropNode && oldDropNode !== dropNode) {
				$(oldDropNode.$el).removeClass('is-drop-inner');
			}
			const draggingNode = dragState.draggingNode;
			if (!draggingNode || !dropNode) return;

			let dropPrev = true;
			let dropInner = true;
			let dropNext = true;
			let userAllowDropInner = true;
			if (typeof this.allowDrop === 'function') {
				dropPrev = this.allowDrop(draggingNode.node, dropNode.node, 'prev');
				userAllowDropInner = this.allowDrop(draggingNode.node, dropNode.node, 'inner');
				dropInner = userAllowDropInner;
				dropNext = this.allowDrop(draggingNode.node, dropNode.node, 'next');
			}
			event.dataTransfer.dropEffect = dropInner ? 'move' : 'none';
			if ((dropPrev || dropInner || dropNext) && oldDropNode !== dropNode) {
				if (oldDropNode) {
					this.$emit('node-drag-leave', draggingNode.node, oldDropNode.node, event);
				}
				this.$emit('node-drag-enter', draggingNode.node, dropNode.node, event);
			}

			if (dropPrev || dropInner || dropNext) {
				dragState.dropNode = dropNode;
			}

			if (dropNode.node.nextSibling === draggingNode.node) {
				dropNext = false;
			}
			if (dropNode.node.previousSibling === draggingNode.node) {
				dropPrev = false;
			}
			if (dropNode.node.contains(draggingNode.node, false)) {
				dropInner = false;
			}
			if (draggingNode.node === dropNode.node || draggingNode.node.contains(dropNode.node)) {
				dropPrev = false;
				dropInner = false;
				dropNext = false;
			}

			const targetPosition = dropNode.$el.getBoundingClientRect();
			const treePosition = this.$el.getBoundingClientRect();

			let dropType;
			const prevPercent = dropPrev ? (dropInner ? 0.25 : (dropNext ? 0.45 : 1)) : -1;
			const nextPercent = dropNext ? (dropInner ? 0.75 : (dropPrev ? 0.55 : 0)) : 1;

			let indicatorTop = -9999;
			const distance = event.clientY - targetPosition.top;
			if (distance < targetPosition.height * prevPercent) {
				dropType = 'before';
			} else if (distance > targetPosition.height * nextPercent) {
				dropType = 'after';
			} else if (dropInner) {
				dropType = 'inner';
			} else {
				dropType = 'none';
			}

			const iconPosition = dropNode.$el.querySelector('.vc-tree-node__expand-icon').getBoundingClientRect();
			const dropIndicator = this.$refs.dropIndicator;
			if (dropType === 'before') {
				indicatorTop = iconPosition.top - treePosition.top;
			} else if (dropType === 'after') {
				indicatorTop = iconPosition.bottom - treePosition.top;
			}
			dropIndicator.style.top = indicatorTop + 'px';
			dropIndicator.style.left = (iconPosition.right - treePosition.left) + 'px';

			if (dropType === 'inner') {
				$(dropNode.$el).addClass('is-drop-inner');
			} else {
				$(dropNode.$el).removeClass('is-drop-inner');
			}

			dragState.showDropIndicator = dropType === 'before' || dropType === 'after';
			dragState.allowDrop = dragState.showDropIndicator || userAllowDropInner;
			dragState.dropType = dropType;
			this.$emit('node-drag-over', draggingNode.node, dropNode.node, event);
		});

		this.$on('tree-node-drag-end', (event) => {
			const { draggingNode, dropType, dropNode } = dragState;
			event.preventDefault();
			event.dataTransfer.dropEffect = 'move';

			if (draggingNode && dropNode) {
				const draggingNodeCopy = { data: draggingNode.node.data };
				if (dropType !== 'none') {
					draggingNode.node.remove();
				}
				if (dropType === 'before') {
					dropNode.node.parent.insertBefore(draggingNodeCopy, dropNode.node);
				} else if (dropType === 'after') {
					dropNode.node.parent.insertAfter(draggingNodeCopy, dropNode.node);
				} else if (dropType === 'inner') {
					dropNode.node.insertChild(draggingNodeCopy);
				}
				if (dropType !== 'none') {
					this.store.registerNode(draggingNodeCopy);
				}

				$(dropNode.$el).removeClass('is-drop-inner');

				this.$emit('node-drag-end', draggingNode.node, dropNode.node, dropType, event);
				if (dropType !== 'none') {
					this.$emit('node-drop', draggingNode.node, dropNode.node, dropType, event);
				}
			}
			if (draggingNode && !dropNode) {
				this.$emit('node-drag-end', draggingNode.node, null, dropType, event);
			}

			dragState.showDropIndicator = false;
			dragState.draggingNode = null;
			dragState.dropNode = null;
			dragState.allowDrop = true;
		});
	},
	
	mounted() {
		this.initTabIndex();
		this.$el.addEventListener('keydown', this.handleKeydown);
	},

	updated() {
		this.treeItems = this.$el.querySelectorAll('[role=treeitem]');
		this.checkboxItems = this.$el.querySelectorAll('input[type=checkbox]');
	},

	destroyed() {
		this.$el.removeEventListener('keydown', this.handleKeydown);
	},

	methods: {
		filter(value) {
			if (!this.filterNode) throw new Error('[Tree] filterNode is required when filter');
			this.store.filter(value);
		},

		getNodeKey(node) {
			return getNodeKey(this.treeProps.value, node.data);
		},

		getNodePath(data) {
			if (!this.treeProps.value) throw new Error('[Tree] treeProps.value is required in getNodePath');
			const node = this.store.getNode(data);
			if (!node) return [];
			const path = [node.data];
			let parent = node.parent;
			while (parent && parent !== this.root) {
				path.push(parent.data);
				parent = parent.parent;
			}
			return path.reverse();
		},

		getCheckedNodes(leafOnly, includeHalfChecked) {
			return this.store.getCheckedNodes(leafOnly, includeHalfChecked);
		},

		getCheckedKeys(leafOnly) {
			return this.store.getCheckedKeys(leafOnly);
		},

		getCurrentNode() {
			const currentNode = this.store.getCurrentNode();
			return currentNode ? currentNode.data : null;
		},

		getCurrentKey() {
			if (!this.treeProps.value) throw new Error('[Tree] treeProps.value is required in getCurrentKey');
			const currentNode = this.getCurrentNode();
			return currentNode ? currentNode[this.treeProps.value] : null;
		},

		setCheckedNodes(nodes, leafOnly) {
			if (!this.treeProps.value) throw new Error('[Tree] treeProps.value is required in setCheckedNodes');
			this.store.setCheckedNodes(nodes, leafOnly);
		},

		setCheckedKeys(keys, leafOnly) {
			if (!this.treeProps.value) throw new Error('[Tree] treeProps.value is required in setCheckedKeys');
			this.store.setCheckedKeys(keys, leafOnly);
		},

		setChecked(data, checked, deep) {
			this.store.setChecked(data, checked, deep);
		},

		getHalfCheckedNodes() {
			return this.store.getHalfCheckedNodes();
		},

		getHalfCheckedKeys() {
			return this.store.getHalfCheckedKeys();
		},

		setCurrentNode(node) {
			if (!this.treeProps.value) throw new Error('[Tree] treeProps.value is required in setCurrentNode');
			this.store.setUserCurrentNode(node);
		},

		setCurrentKey(key) {
			if (!this.treeProps.value) throw new Error('[Tree] treeProps.value is required in setCurrentKey');
			this.store.setCurrentNodeKey(key);
		},

		getNode(data) {
			return this.store.getNode(data);
		},

		remove(data) {
			this.store.remove(data);
		},

		append(data, parentNode) {
			this.store.append(data, parentNode);
		},

		insertBefore(data, refNode) {
			this.store.insertBefore(data, refNode);
		},

		insertAfter(data, refNode) {
			this.store.insertAfter(data, refNode);
		},

		handleNodeExpand(nodeData, node, instance) {
			this.broadcast('vc-tree-node', 'tree-node-expand', node);
			this.$emit('node-expand', nodeData, node, instance);
		},

		updateKeyChildren(key, data) {
			if (!this.treeProps.value) throw new Error('[Tree] treeProps.value is required in updateKeyChild');
			this.store.updateChildren(key, data);
		},

		initTabIndex() {
			this.treeItems = this.$el.querySelectorAll('.is-focusable[role=treeitem]');
			this.checkboxItems = this.$el.querySelectorAll('input[type=checkbox]');
			const checkedItem = this.$el.querySelectorAll('.is-checked[role=treeitem]');
			if (checkedItem.length) {
				checkedItem[0].setAttribute('tabindex', 0);
				return;
			}
			this.treeItems[0] && this.treeItems[0].setAttribute('tabindex', 0);
		},

		handleKeydown(ev) {
			const currentItem = ev.target;
			if (currentItem.className.indexOf('vc-tree-node') === -1) return;
			const keyCode = ev.keyCode;
			this.treeItems = this.$el.querySelectorAll('.is-focusable[role=treeitem]');
			const currentIndex = this.treeItemArray.indexOf(currentItem);
			let nextIndex;
			if ([38, 40].indexOf(keyCode) > -1) { // up、down
				ev.preventDefault();
				if (keyCode === 38) { // up
					nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
				} else {
					nextIndex = (currentIndex < this.treeItemArray.length - 1) ? currentIndex + 1 : 0;
				}
				this.treeItemArray[nextIndex].focus(); // 选中
			}
			if ([37, 39].indexOf(keyCode) > -1) { // left、right 展开
				ev.preventDefault();
				currentItem.click(); // 选中
			}
			const hasInput = currentItem.querySelector('[type="checkbox"]');
			if ([13, 32].indexOf(keyCode) > -1 && hasInput) { // space enter选中checkbox
				ev.preventDefault();
				hasInput.click();
			}
		}
	}
};
</script>
