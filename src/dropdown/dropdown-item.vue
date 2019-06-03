<template>
	<li :class="classes" class="vc-dropdown-item" @click="handleClick">
		<slot />
	</li>
</template>

<script>
export default {
	name: 'vc-dropdown-item',
	props: {
		name: {
			type: [String, Number]
		},
		disabled: {
			type: Boolean,
			default: false
		},
		selected: {
			type: Boolean,
			default: false
		},
		divided: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		owner() {
			let parent = this.$parent;
			while (parent && !parent.dropdownId) {
				parent = parent.$parent;
			}
			return parent;
		},
		classes() {
			return {
				'is-selected': this.selected,
				'is-divided': this.divided,
				'is-disabled': this.disabled
			};
		}
	},
	methods: {
		handleClick() {
			if (this.disabled) return;
			this.$emit('click', this.name);
			this.owner.$emit('click', this.name);

			this.owner.close();
		}
	}
};
</script>

<style lang="scss">
@import '../style/index.scss';
$block: vc-dropdown-item;

@include block($block) {
	position: relative;
	margin: 0;
	line-height: normal;
	padding: 7px 16px;
	clear: both;
	color: #515a6e;
	font-size: 12px !important;
	white-space: nowrap;
	list-style: none;
	cursor: pointer;
	transition: background .2s ease-in-out;
	&:hover {
		background: $info;
		color: #fff;
	}
	@include when(disabled) {
		color: #c5c8ce;
		cursor: not-allowed;
		&:hover {
			background-color: #fff;
		}
	}
	@include when(selected) {
		color: #2d8cf0
	}
	@include when(divided) {
		margin-top: 5px;
		@include commonBorder1PX('top', #e8eaec)
	}
}
</style>
