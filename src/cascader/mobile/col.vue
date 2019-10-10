<template>
	<div class="vcm-cascader-col vc-hack-scroll">
		<div 
			v-for="(item, index) in dataSource"
			:key="index"
			:class="{ 'is-select': value === item.value }"
			class="vcm-cascader-col__item"
			@click="handleClick(item.value, index)"
		>
			<span class="vcm-cascader-col__label">{{ item.label }}</span>
			<vcm-spin v-if="value === item.value && item.loading" :size="16"/>
			<vcm-icon v-else-if="value === item.value" class="vcm-cascader-col__select" type="select-checked"/>
		</div>
	</div>
</template>

<script>
import MIcon from '../../icon/index.m';
import MSpin from '../../spin/index.m';
import { scrollIntoView } from '../../utils/index';

export default {
	name: 'vcm-cascader-col',
	components: {
		'vcm-icon': MIcon,
		'vcm-spin': MSpin
	},
	props: {
		dataSource: {
			type: Array,
			default: () => []
		},
		value: {
			type: [String, Number]
		},
		loading: {
			type: Boolean,
			default: false
		},
		index: {
			type: Number
		}
	},
	watch: {
		index(v, oldV) {
			// 滚动到初始位置
			let instance = this.dataSource.findIndex(i => this.value == i.value);

			scrollIntoView(this.$el, { to: instance * 40 });
		}
	},
	methods: {
		handleClick(value, rowIndex) {
			const { index: colIndex } = this;
			this.$emit('change', { value, rowIndex, colIndex });
		}
	}
};
</script>

<style lang="scss">
@import '../../style/index.scss';

$block: vcm-cascader-col;

@include block($block) {
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
	overflow-scrolling: touch;
	background-color: #fff;
	@include element(item) {
		padding: 10px 12px;
		display: flex;
		justify-content: space-between;
	}
	@include element(label) {
		flex: 1;
		font-size: 14px;
		line-height: 20px;
		color: #000;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	@include element(select) {
		flex-shrink: 0;
		color: #5495f6;
	}
}
</style>
