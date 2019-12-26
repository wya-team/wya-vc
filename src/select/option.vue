<template>
	<div
		v-if="isActive"
		:disabled="disabled"
		:class="{ 'is-select': isSelect, 'is-last': isLast }"
		class="vc-select-option"
		@click.stop="handleSelect"
		@touchend.stop="handleSelect"
		@mousedown.prevent
		@touchstart.prevent
	>
		<slot>{{ formatterLabel }}</slot>
		<vc-icon v-if="isSelect" type="correct" />
	</div>
</template>

<script>
import Icon from '../icon';

export default {
	name: 'vc-select-option',
	components: {
		'vc-icon': Icon
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
		isSelect() {
			return !this.owner.multiple 
				? this.owner.value == this.value
				: this.owner.value.includes(this.value);
		},
		/**
		 * 是否是最后一项
		 */
		isLast() {
			return !this.owner.multiple ? true : this.owner.value.slice(-1)[0] === this.value;
		},
		isActive() {
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
			if (!this.owner.multiple && this.isSelect) {
				this.owner.close();
				return;
			} else if (this.isSelect) {
				this.owner.remove(this.value, this.formatterLabel);
				return;
			}
			this.owner.add(this.value, this.formatterLabel);
		}
	},
};
</script>

<style lang="scss">
@import '../style/vars.scss';

$block: vc-select-option;

@include block($block) {
	display: flex;
	justify-content: space-between;
	align-items: center;
	line-height: normal;
	padding: 7px 16px;
	color: #666;
	font-size: 12px!important;
	white-space: nowrap;
	cursor: pointer;
	&:hover {
		background-color: #e6f7ff;
	}
	@include when(select) {
		background-color: #fff;
		color: #5495f6;
		.vc-icon {
			color: #5495f6;
		}
		@include when(last) {
			background-color: #e6f7ff;
		}
	}
	
	&[disabled] {
		color: #c5c8ce;
		cursor: not-allowed;
		pointer-events: none;
	}
}
</style>
