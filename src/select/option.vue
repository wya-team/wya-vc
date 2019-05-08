<template>
	<div
		:disabled="disabled"
		:class="classes"
		class="vc-select-option"
		@click.stop="handleSelect"
		@touchend.stop="handleSelect"
		@mousedown.prevent
		@touchstart.prevent
	>
		<slot>{{ formatLabel }}</slot>
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
		selected: {
			type: Boolean,
			default: false
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
		formatLabel() {
			return (this.label) ? this.label : this.value;
		},
		optionLabel() {
			return this.label || (this.$el && this.$el.textContent);
		},
		classes() {
			return {
				'is-select': false
			};
		}
	},
	watch: {
		
	},
	created() {
		console.log(this);
	},
	methods: {
		handleSelect() {
			if (this.disabled) return false;

			// this.dispatch('iSelect', 'on-select-selected', {
			// 	value: this.value,
			// 	label: this.optionLabel,
			// });
			// 暂不使用
			this.$emit('select', {
				value: this.value,
				label: this.optionLabel,
			});
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
	}
}
</style>
