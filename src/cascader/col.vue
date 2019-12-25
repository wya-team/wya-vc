<template>
	<div class="vc-cascader-col">
		<div class="vc-cascader-col__wrapper">
			<div
				v-for="(item, index) in dataSource"
				:key="index"
				:class="{ 'is-select': value == item.value }"
				class="vc-cascader-col__item"
				@click="handleClick"
				@mouseenter="handleEnter(item.value, index)"
			>
				<span>
					{{ item.label }}
				</span>
				<vc-icon v-if="item.hasChildren && !item.loading" type="right" class="vc-cascader-col__icon" />
				<!-- TODO loading -->
				<vc-spin
					v-else-if="item.loading" 
					:size="14"
					class="vc-cascader-col__loading"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import Icon from '../icon/index';
import Spin from '../spin/index';

export default {
	name: 'vcm-picker-col',
	components: {
		'vc-icon': Icon,
		'vc-spin': Spin,
	},
	props: {
		dataSource: {
			type: Array,
			default: () => []
		},
		itemStyle: {
			type: Object,
			default: () => {}
		},
		value: {
			type: [String, Number]
		},
		index: {
			type: Number
		}
	},
	data() {
		return {
		};
	},
	computed: {
	},
	mounted() {
	},
	methods: {
		handleClick() {
			this.$emit('click');
		},

		handleEnter(value, rowIndex) {
			const { index: colIndex } = this;
			this.$emit('change', { value, rowIndex, colIndex });
		}
	}
};

</script>

<style lang='scss'>
@import '../style/index.scss';

$block: vc-cascader-col;

@include block($block) {
	display: inline-block;
	padding: 5px 0!important;
	margin: 0;
	@include commonBorder1PX(right);
	&:last-child {
		&:before, &:after {
			display: none;
		}
	}
	@include element(wrapper) {
		min-width: 100px;
		height: 180px;
		overflow: auto;
	}
	@include element(item) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: normal;
		padding: 7px 16px;
		color: #666;
		font-size: 12px!important;
		line-height: 16px;
		white-space: nowrap;
		cursor: pointer;
		@include when(select) {
			background-color: #e6f7ff;
			color: #5495f6;
		}
	}
	@include element(icon) {
		transform: scale(0.7);
	}
	@include element(loading) {
		margin-right: 5px;
	}
}

</style>
