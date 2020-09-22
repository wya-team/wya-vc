<template>
	<div class="vc-steps-bar">
		<div
			v-for="(item, index) in dataSource"
			:key="item[step]"
			:class="{ 'is-active': value >= item[step] }"
			:style="{ 'zIndex': dataSource.length - index }"
			class="vc-steps-bar__item"
			@click="handleClick(item)"
		>
			{{ item[label] }}
		</div>
	</div>
</template>

<script>
export default {
	name: 'vc-steps-bar',
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: {
			type: String,
			default: ''
		},
		dataSource: {
			type: Array,
			default: () => ([])
		},
		dataSourceKey: {
			type: Object,
			default: () => ({
				step: 'step',
				label: 'label'
			})
		},
		// 是否只读，非只读状态可点击切换
		readonly: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		step() {
			return this.dataSourceKey.step;
		},
		label() {
			return this.dataSourceKey.label;
		}
	},
	methods: {
		/**
		 * 点击事件委托
		 */
		handleClick(item) {
			if (!this.readonly) {
				const { step } = this;
				this.$emit('change', item[step], item);
			}
		}
	}
};
</script>

<style lang="scss">
@import '../style/vars.scss';

@include block(vc-steps-bar) {
	display: flex;
	align-items: center;
	@include element(item) {
		position: relative;
		height: 56px;
		line-height: 56px;
		background-color: #f9f9f9;
		flex: 1;
		text-align: center;

		&:not(:first-child) {
			margin-left: 10px;
			&::before {
				content: '';
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				width: 0;
				height: 0;
				border-width: 28px 20px 28px 20px;
				border-color: transparent transparent transparent #fff;
				border-style: solid;
			}
			
		}
		&:not(:last-child) {
			&::after {
				content: '';
				position: absolute;
				top: 0;
				bottom: 0;
				right: -40px;
				width: 0;
				height: 0;
				border-width: 28px 20px 28px 20px;
				border-color: transparent transparent transparent #f9f9f9;
				border-style: solid;
			}
		}
		@include when(active) {
			color: #fff;
			background-color: #5495f6;
			&:before {
				border-left-color: #fff;
			}
			&::after {
				border-left-color: #5495f6;
			}
		}
	}
}
</style>
