<template>
	<div ref="vc-picker" class="vc-date-shortcuts">
		<ul class="vc-date-shortcuts__ul">
			<li
				v-for="(item, key) in config"
				:key="key"
				class="vc-date-shortcuts__li"
				@click="handleSelect(item)"
			>
				{{ item.text }}
			</li>
		</ul>
	</div>
</template>

<script>
import { Utils } from '@wya/utils';
import Icon from '../../icon/index';

export default {
	name: 'vc-date-header',
	components: {
		'vc-icon': Icon,
	},
	model: {
		prop: 'panelDate',
		event: 'change'
	},
	props: {
		panelDate: Date,
		config: Array,
		value: Date
	},
	computed: {
	},
	methods: {
		handleSelect({ value, onClick }) {
			if (typeof value != 'function' && !onClick) {
				throw Error('【vc-date-picker】:options[value]需要是一个方法');
			}
			this.$emit('click', { value, onClick });
		}
	},
};
</script>

<style lang="scss">
@import '../../style/vars.scss';

$block: vc-date-shortcuts;

@include block($block) {
	height: 100%;
	background: $cf8;
	border-right: 1px solid #e8eaec;
	@include element(ul) {
		list-style: none;
		@include element(li) {
			padding: 6px 16px;
			cursor: pointer;
			transition: .2s;
			&:hover {
				background: #e4e7e9;
			}
		}
	}
}
</style>
