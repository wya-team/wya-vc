<template>
	<div :class="{ 'is-alphabetical': alphabetical }" class="vcm-cascader-col">
		<div class="vcm-cascader-col__list vc-hack-scroll">
			<div 
				v-for="(item, index) in dataSource"
				:id="item.isFirst && item[alphabetKey]"
				:key="index"
				:class="{ 'is-select': value === item.value }"
				class="vcm-cascader-col__item"
				@click="handleClick(item.value, index)"
			>
				<span class="vcm-cascader-col__label">
					<span 
						v-if="alphabetical" 
						class="vcm-cascader-col__letter"
					>
						{{ item.isFirst ? item[alphabetKey] : '' }}
					</span>
					{{ item.label }}
				</span>
				<vcm-spin v-if="value === item.value && item.loading" :size="16"/>
				<vcm-icon v-else-if="value === item.value" class="vcm-cascader-col__select" type="select-checked"/>
			</div>
		</div>

		<vcm-alphabet 
			v-if="alphabetical" 
			v-model="currentLetter"
			:alphabet="alphabet"
			@change="handleLetterChange"
		/>
	</div>
</template>

<script>
import { $ } from '@wya/utils';
import MIcon from '../../icon/index.m';
import MSpin from '../../spin/index.m';
import MToast from '../../toast/index.m';
import Alphabet from './alphabet';

export default {
	name: 'vcm-cascader-col',
	components: {
		'vcm-icon': MIcon,
		'vcm-spin': MSpin,
		'vcm-alphabet': Alphabet
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
		},
		alphabetical: {
			type: Boolean,
			default: false
		},
		alphabet: {
			type: Array,
			default: () => ([])
		},
		alphabetKey: {
			type: String,
			default: 'char'
		}
	},
	data() {
		return {
			currentLetter: this.alphabet[0]
		};
	},
	watch: {
		index(v, oldV) {
			// 滚动到初始位置
			let instance = this.dataSource.findIndex(i => this.value == i.value);

			$(this.$el).scrollIntoView({ to: instance * 40 });
		}
	},
	methods: {
		handleClick(value, rowIndex) {
			const { index: colIndex } = this;
			this.$emit('change', { value, rowIndex, colIndex });
		},
		handleLetterChange(letter) {
			MToast.destroy();
			MToast.info(letter, 0.8);
			const el = this.$el.querySelector(`#${letter}`);
			el && el.scrollIntoView();
		}
	}
};
</script>

<style lang="scss">
@import '../../style/index.scss';

$block: vcm-cascader-col;

@include block($block) {
	overflow: hidden;
	position: relative;
	display: flex;
	flex-direction: column;
	flex: 1;
	-webkit-overflow-scrolling: touch;
	overflow-scrolling: touch;
	background-color: #fff;
	@include when(alphabetical) {
		@include element(list) {
			padding-right: 36px;
		}
	}
	@include element(list) {
		overflow: auto;
		height: 100%;
		flex: 1;
	}
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
	@include element(letter) {
		margin-right: 2px;
		display: inline-block;
		width: 1em;
		font-size: 14px;
		line-height: 20px;
		color: #666;
	}
	@include element(select) {
		flex-shrink: 0;
		color: #5495f6;
	}
}
</style>
