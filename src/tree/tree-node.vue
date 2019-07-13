<template>
	<div
		v-show="node.visible"
		ref="node"
		:class="{
			'is-expanded': expanded,
			'is-current': node.isCurrent,
			'is-hidden': !node.visible,
			'is-focusable': !node.disabled,
			'is-checked': !node.disabled && node.checked
		}"
		:aria-expanded="expanded"
		:aria-disabled="node.disabled"
		:aria-checked="node.checked"
		:draggable="tree.draggable"
		class="vc-tree-node"
		role="treeitem"
		tabindex="-1"
		@click.stop="handleClick"
		@contextmenu="handleContextMenu($event)"
		@dragstart.stop="handleDragStart"
		@dragover.stop="handleDragOver"
		@dragend.stop="handleDragEnd"
		@drop.stop="handleDrop"
	>
		<div :style="{ 'padding-left': (node.level - 1) * tree.indent + 'px' }" class="vc-tree-node__content">
			<span
				:class="[
					{ 
						'is-expand': !node.isLeaf && expanded,
						'is-leaf': node.isLeaf
					}
				]"
				class="vc-tree-node__expand-icon"
				@click.stop="handleExpandIconClick"
			>
				<vc-icon type="triangle-up" />
			</span>
			<vc-checkbox
				v-if="showCheckbox"
				v-model="node.checked"
				:indeterminate="node.indeterminate"
				:disabled="!!node.disabled"
				@click.native.stop
				@change="handleCheckChange"
			/>
			<vc-spin 
				v-if="node.loading" 
				:size="12"
				class="vc-tree-node__loading-icon" 
			/>
			<vc-customer 
				v-if="renderContent" 
				:render="renderContent" 
				:node="node"
				:it="node.data"
			/>
			<span v-else>{{ node.label }}</span>
		</div>
		<vc-transition-collapse>
			<div
				v-if="!renderAfterExpand || childNodeRendered"
				v-show="expanded"
				:aria-expanded="expanded"
				class="vc-tree-node__children"
				role="group"
			>
				<vc-tree-node
					v-for="child in node.childNodes"
					:render-content="renderContent"
					:render-after-expand="renderAfterExpand"
					:show-checkbox="showCheckbox"
					:allow-dispatch="allowDispatch"
					:key="getNodeKey(child)"
					:node="child"
					@node-expand="handleChildNodeExpand"
				/>
			</div>
		</vc-transition-collapse>
	</div>
</template>

<script>
import Transition from '../transition';
import Checkbox from '../checkbox';
import Customer from '../customer';
import Spin from '../spin';
import Icon from '../icon';
import Extends from '../extends';
import { getNodeKey } from './model/util';

export default {
	name: 'vc-tree-node',
	componentName: 'vc-tree-node',
	components: {
		'vc-transition-collapse': Transition.Collapse,
		'vc-checkbox': Checkbox,
		'vc-customer': Customer,
		'vc-icon': Icon,
		'vc-spin': Spin,
	},
	mixins: [...Extends.mixins(['emitter'])],
	props: {
		node: {
			type: Object,
			default: () => ({})
		},
		renderContent: Function,
		renderAfterExpand: {
			type: Boolean,
			default: true
		},
		showCheckbox: {
			type: Boolean,
			default: false
		},
		allowDispatch: {
			type: Boolean,
			default: true
		}
	},

	data() {
		return {
			tree: null,
			expanded: false,
			childNodeRendered: false,
			oldChecked: null,
			oldIndeterminate: null
		};
	},

	watch: {
		'node.indeterminate': function (val) {
			this.handleSelectChange(this.node.checked, val);
		},

		'node.checked': function (val) {
			this.handleSelectChange(val, this.node.indeterminate);
		},

		'node.expanded': function (val) {
			this.$nextTick(() => this.expanded = val);
			if (val) {
				this.childNodeRendered = true;
			}
		}
	},


	created() {
		const parent = this.$parent;

		if (parent.isTree) {
			this.tree = parent;
		} else {
			// 中间还有个vc-transition-collapse
			this.tree = parent.$parent.tree;
		}

		const tree = this.tree;
		if (!tree) {
			console.warn('Can not find node\'s tree.');
		}

		const props = tree.treeProps || {};
		const childrenKey = props.children || 'children';

		this.$watch(`node.data.${childrenKey}`, () => {
			this.node.updateChildren();
		});

		if (this.node.expanded) {
			this.expanded = true;
			this.childNodeRendered = true;
		}

		if (this.tree.accordion) {
			this.$on('tree-node-expand', node => {
				if (this.node !== node) {
					this.node.collapse();
				}
			});
		}
	},

	methods: {
		getNodeKey(node) {
			return getNodeKey(this.tree.nodeKey, node.data);
		},

		handleSelectChange(checked, indeterminate) {
			if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
				this.tree.$emit('check-change', this.node.data, checked, indeterminate);
			}
			this.oldChecked = checked;
			this.indeterminate = indeterminate;
		},

		handleClick() {
			const store = this.tree.store;
			store.setCurrentNode(this.node);
			this.tree.$emit('current-change', store.currentNode ? store.currentNode.data : null, store.currentNode);
			this.tree.currentNode = this;
			if (this.tree.expandOnClickNode) {
				this.handleExpandIconClick();
			}
			if (this.tree.checkOnClickNode && !this.node.disabled) {
				this.handleCheckChange(null, {
					target: { checked: !this.node.checked }
				});
			}
			this.tree.$emit('node-click', this.node.data, this.node, this);
		},

		handleContextMenu(event) {
			if (this.tree._events['node-contextmenu'] && this.tree._events['node-contextmenu'].length > 0) {
				event.stopPropagation();
				event.preventDefault();
			}
			this.tree.$emit('node-contextmenu', event, this.node.data, this.node, this);
		},

		handleExpandIconClick() {
			if (this.node.isLeaf) return;
			if (this.expanded) {
				this.tree.$emit('node-collapse', this.node.data, this.node, this);
				this.node.collapse();
			} else {
				this.node.expand();
				this.$emit('node-expand', this.node.data, this.node, this);
			}
		},

		handleCheckChange(value, ev) {
			this.node.setChecked(ev.target.checked, !this.tree.checkStrictly);
			this.$nextTick(() => {
				const store = this.tree.store;
				let data = {
					checkedNodes: store.getCheckedNodes(),
					checkedKeys: store.getCheckedKeys(),
					halfCheckedNodes: store.getHalfCheckedNodes(),
					halfCheckedKeys: store.getHalfCheckedKeys(),
				};
				this.tree.$emit('check', this.node.data, data);

				// for v-model
				this.tree.$emit('change', data.checkedKeys, data);
				this.allowDispatch && this.dispatch('vc-form-item', 'form-change', this.currentValue);
			});
		},

		handleChildNodeExpand(nodeData, node, instance) {
			this.broadcast('vc-tree-node', 'tree-node-expand', node);
			this.tree.$emit('node-expand', nodeData, node, instance);
		},

		handleDragStart(event) {
			if (!this.tree.draggable) return;
			this.tree.$emit('tree-node-drag-start', event, this);
		},

		handleDragOver(event) {
			if (!this.tree.draggable) return;
			this.tree.$emit('tree-node-drag-over', event, this);
			event.preventDefault();
		},

		handleDrop(event) {
			event.preventDefault();
		},

		handleDragEnd(event) {
			if (!this.tree.draggable) return;
			this.tree.$emit('tree-node-drag-end', event, this);
		}
	}
};
</script>
