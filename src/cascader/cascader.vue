<template>
	<div 
		class="vc-cascader"
		@mouseenter="isHover = true"
		@mouseleave="isHover = false"
	>
		<vc-popover 
			v-model="visible" 
			:arrow="false" 
			:trigger="trigger"
			placement="bottom-left"
			portal-classes="is-padding-none"
			@ready="handleReady"
		>
			<vc-input
				ref="input"
				:element-id="elementId"
				:readonly="true"
				:disabled="disabled"
				:value="formatLabel"
				:placeholder="placeholder || '请选择'"
				class="vc-cascader__input"
				@click="visible = true"
			>
				<template #append>
					<!-- down, up, clear -->
					<div class="vc-cascader__append">
						<vc-icon
							:type="showClear ? 'clear' : icon"
							:class="{ 'is-arrow': !showClear }"
							class="vc-cascader__icon"
							@click="handleClear"
						/>
					</div>
				</template>
			</vc-input>
			<template #content>
				<div>
					<vc-cascader-col
						v-for="(item, index) in cols"
						v-if="rebuildData[index] && rebuildData[index].length"
						ref="col"
						:value="currentValue[index]"
						:key="index"
						:index="index"
						:data-source="rebuildData[index]"
						@change="handleChange"
					/>
				</div>
			</template>
		</vc-popover>
	</div>
</template>

<script>
import { pick, cloneDeep } from 'lodash';
import { getSelectedData } from '../utils/index';
import { VcError } from '../vc/index';
import emitter from '../extends/mixins/emitter'; // 表单验证
import Input from '../input/index';
import Popover from '../popover/index';
import Icon from '../icon/index';
import InputMixin from '../input/input-mixin';
import Col from './col';
	
export default {
	name: 'vc-cascader',
	components: {
		'vc-input': Input,
		'vc-icon': Icon,
		'vc-popover': Popover,
		'vc-cascader-col': Col,
	},
	mixins: [emitter],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		...pick(InputMixin.props, [
			'elementId', 
			'readonly', 
			'disabled', 
			'value', 
			'size', 
			'placeholder',
			'clearable'
		]),
		trigger: {
			type: String,
			default: 'click'
		},
		dataSource: {
			type: Array,
			default: () => ([])
		},
		extra: {
			type: String,
			default: ''
		},
		formatter: {
			type: Function,
			default: v => (v && v.join(' / '))
		},
		/**
		 * 需要优化
		 */
		loadData: {
			type: Function,
		}
	},
	data() {
		return {
			isHover: false,
			visible: false,
			currentValue: [],
			currentLabel: [],
			rebuildData: []
		};
	},
	computed: {
		icon() {
			return this.visible ? 'up' : 'down';
		},
		showClear() {
			return this.currentValue && this.currentValue.length && this.clearable && !this.disabled && this.isHover;
		},
		cols() {
			return this.currentValue.length + 1;
		},
		/**
		 * TODO: 初始化时，存在查找耗时
		 */
		label() {
			const { label = [] } = getSelectedData(this.currentValue, this.dataSource);
			return label.filter(i => i);
		},
		formatLabel() {
			return this.formatter(this.label) || this.extra;
		}

	},
	watch: {
		dataSource: {
			immediate: false,
			handler() {
				this.rebuildData = this.makeRebuildData();
			}
		},
		value: {
			immediate: true,
			handler(v) {
				this.currentValue = v && v.length > 0 ? [...v] : [];
			}
		},
		// currentValue() {}
	},
	methods: {
		/**
		 * 初始化完成后格式化数据
		 */
		handleReady() {
			this.rebuildData = this.makeRebuildData();
		},
		handleClear(e) {
			if (!this.showClear) return;
			e.stopPropagation();

			this.currentValue.splice(0, this.currentValue.length);
			this.resetValue();
		},

		/**
		 * 单列数据
		 * @param  {Array} source 数据源
		 */
		makeData(source) {
			let data = source && source.map(i => ({
				value: i.value,
				label: i.label,
				hasChild: !!(i.children && (i.children.length > 0 || this.loadData)),
				loading: false
			}));
			return data;
		},

		/**
		 * 调整数据
		 * @return {Array} 每列的数据
		 */
		makeRebuildData() {
			if (!this.dataSource.length) return;
			let temp = this.dataSource;
			let data = this.currentValue.slice(0).reduce((pre, cur, index) => {
				pre[index] = this.makeData(temp);
				temp = ((temp && temp.find(i => i.value == cur)) || {}).children;
				return pre; 
			}, []);

			temp && data.push(this.makeData(temp));

			return data;
		},

		/**
		 * 改变后的回调
		 * @param  {String} value    改变后的值
		 * @param  {Number} index    索引
		 * @param  {Number} colIndex 列
		 */
		async handleChange(value, index, colIndex) {
			try {
				const len = this.currentValue.slice(colIndex).length;
				this.currentValue.splice(colIndex, len, value);

				/**
				 * TODO: 提前缓存index
				 */
				let children = this.currentValue.reduce((pre, cur) => {
					let target = pre.find(i => i.value == cur) || {};

					return target.children ? target.children : undefined;
				}, this.dataSource);

				/**
				 * 异步加载数据
				 */
				if (this.loadData && children && children.length === 0) {

					this.rebuildData[colIndex][index].loading = true;

					let res = await this.loadData();
					/**
					 * TODO: 优化，dataSource -> cloneData?
					 */
					children.splice(0, 0, ...res);
				}

				children && this.rebuildData.splice(colIndex + 1, len, this.makeData(children));

				this.resetValue();
			} catch (e) {
				throw new VcError('vc-cascader', e);
			} finally {
				this.rebuildData[colIndex][index].loading = false;
			}
			
		},
		resetValue() {
			/**
			 * v-model
			 */
			this.$emit('change', this.currentValue, this.label);

			this.dispatch && this.dispatch('vc-form-item', 'form-change', {
				value: this.currentValue,
				label: this.label
			});

			// 最后一项，自动关闭
			let lastData = this.rebuildData[this.currentValue.length];
			let isLast = !lastData || lastData.length === 0;
			if (isLast) {
				this.visible = false;
			}
		}
	},
};
</script>

<style lang='scss'>
@import '../style/index.scss';

$block: vc-cascader;

@include block($block) {
	@include element(input) {
		.vc-input__append {
			z-index: 0;
		}
	}
	@include element(append) {
		cursor: pointer;
		color: #808695;
		padding: 0 10px;
		background: white !important;
		position: relative;
		text-align: center;
		line-height: 26px;
		font-size: 12px;
		white-space: nowrap;
	}
	@include element(icon) {
		@include when(arrow) {
			transform: scale(0.7);
		}
	}
}

</style>
