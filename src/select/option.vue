<template>
	<div
		v-if="visible"
		:disabled="disabled"
		:class="{ 'is-select': selected }"
		class="vc-select-option"
		@click.stop="handleSelect"
		@touchend.stop="handleSelect"
		@mousedown.prevent
		@touchstart.prevent
	>
		<slot>{{ formatterLabel }}</slot>
	</div>
</template>

<script>
export default {
	name: 'vc-select-option',
	components: {

	},
	props: {
		value: {
			type: [String, Number],
			required: true
		},
		label: {
			type: [String, Number]
		},
		disabled: {
			type: Boolean,
			default: false
		},
		/**
		 * 是否可过滤
		 */
		filterable: {
			type: Boolean,
			default: true
		}
	},
	inject: {
		select: {
			from: 'select',
			default: undefined
		}
	},
	data() {
		return {
		};
	},
	computed: {
		owner() {
			let parent = this.$parent;
			while (parent && !parent.selectId) {
				parent = parent.$parent;
			}
			return parent;
		},
		formatterLabel() {
			let v = String((this.$slots.default && this.$slots.default[0].text) || this.label || this.value);
			return v.trim();
		},
		selected() {
			return !this.owner.multiple 
				? this.owner.value == this.value
				: this.owner.value.includes(this.value);
		},
		visible() {
			return this.owner.searchRegex.test(this.formatterLabel) || !this.filterable;
		}
	},
	watch: {
		
	},
	methods: {
		handleSelect() {
			// 禁止操作
			if (this.disabled) return;
			// 已选中，弹层关闭
			if (!this.owner.multiple && this.selected) {
				this.owner.close();
				return;
			} else if (this.selected) {
				this.owner.remove(this.value, this.formatterLabel);
				return;
			}
			this.owner.add(this.value, this.formatterLabel);
		}
	},
};
</script>

<style lang="scss">
@import '../style/index.scss';

$block: vc-select-option;

@include block($block) {
	display: flex;
	justify-content: space-between;
	align-items: center;
	line-height: normal;
	padding: 7px 16px;
	color: #515a6e;
	font-size: 12px!important;
	white-space: nowrap;
	cursor: pointer;
	@include when(select) {
		background-color: #f3f3f3;
		color: #2d8cf0;
	}
	&[disabled] {
		color: #c5c8ce;
		cursor: not-allowed;
		pointer-events: none;
	}
}
</style>
